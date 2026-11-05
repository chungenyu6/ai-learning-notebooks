# Plan: Post-training Extended Materials (RLHF, DPO, GRPO)

Status: **draft v2, under discussion**. Nothing is built yet. Follows [`AGENTS.md`](../../AGENTS.md), except for the proposed change to the weights rule below.

## Why

The extended materials cover architecture, pretraining and fine-tuning, but nothing after supervised fine-tuning. For interviews that is the largest gap:

- "Walk me through the post-training stack: SFT → RLHF → DPO → RLVR/GRPO" is a standard breadth question.
- Training-oriented roles ask to write the **DPO loss** and explain the **GRPO objective** (group-relative advantage) from memory.
- The maintainer's research angle is that **RLVR works when rewards are verifiable and fails when they are not**, which connects to reliability and uncertainty work. The notebooks should make that argument concrete with runnable evidence.
- The same material doubles as demos for a TA lecture on RLHF/RLVR.

## 1. Compute: what runs where

### Hardware we have

| Machine | Memory | Use it for |
|---|---|---|
| Maintainer's laptop: Apple M3, **8 GB** unified memory, ~27 GB free disk | 8 GB shared by macOS, browser and the model | toy models on CPU; loading a 0.6B model for a few generations at most. **No training of real models.** |
| Google Colab free, CPU runtime | ~12 GB RAM, 2 slow cores | the default "Run all" path |
| Google Colab free, T4 GPU | 15 GB GPU memory; GPU not guaranteed, sessions are time-limited | optional GPU sections |

### What the upstream code needs (from Raschka's own notes)

| Task | Model | Reported cost | Fits where? |
|---|---|---|---|
| DPO (`dpo-from-scratch.ipynb`) | GPT-2 medium, 355M | ~2 min on A100, ~4 min on L4, ~30 min on an M3 MacBook Air | Colab T4: yes (expect several minutes). Laptop: risky with 8 GB (policy + reference model + AdamW states is roughly 7 GB before activations). |
| GRPO (`reasoning-from-scratch` Ch. 6 scripts) | Qwen3-0.6B | 4 rollouts × 256 tokens: 10.6 GB; 4 × 512: 12.8 GB; 8 × 512 (the setting in his results): 20.3 GB | Colab T4: only the small settings, and slowly. Laptop: no. |
| Loading Qwen3-0.6B for generation | 0.6B, checkpoint ~1.5 GB | inference only | laptop and Colab CPU: yes for a handful of answers; T4: fast |

Raschka also publishes **training logs and checkpoints** of his GRPO runs (Hugging Face `rasbt/qwen3-from-scratch-grpo-checkpoints`, 1.5 GB each; CSV logs in Ch. 7 `02_logs`). His results table is itself a teaching artifact: original GRPO with the KL term reaches 33.4% on MATH-500 at step 50 and **collapses to 0.4% at step 100**, while the no-KL and Olmo 3 / DeepSeek-V3.2 variants stay around 44–47%.

### Proposed change to the weights rule

Current rule: "Runs on CPU in Google Colab in a few minutes, without downloading model weights."

Proposed rule:

> Default path ("Run all") runs on Colab CPU in a few minutes. It may download one small model (up to ~0.6B parameters, ~1.5 GB) for **inference only**, plus published logs. Training a real model goes in an **optional GPU section**, off by default (`RUN_GPU = False  #@param {type:"boolean"}`), with the expected GPU, memory and time written above it. The saved outputs on the site always come from the default path.

Why this split:

- Every concept and test runs on a **tiny model** on CPU, so readers see the mechanism in seconds and the notebook never depends on getting a GPU.
- The **real-model evidence** (DPO on GPT-2 medium, GRPO on Qwen3-0.6B) comes from Raschka's published logs and checkpoints by default, and readers with a GPU can reproduce a short run.
- Nothing heavy ever runs on the 8 GB laptop. I execute only the default path locally; if we want saved outputs from a GPU section, the maintainer runs that section in Colab and we commit the notebook with outputs.

## 2. How many notebooks: three

Two notebooks would each be about twice the length of the existing ones. Three keeps each at the usual size (25–40 cells, a few minutes) and splits at boundaries interviews also use:

| File | Title | Builds on | Real model in default path |
|---|---|---|---|
| `08_preference_tuning_rlhf_dpo.ipynb` | Preference Tuning: Reward Models, RLHF and DPO | `06_finetuning_instructions.ipynb`, `07_lora_peft` | none (GPT-2 medium DPO is the optional GPU section) |
| `09_inference_time_scaling_and_evaluation.ipynb` | Reasoning at Inference Time: Sampling, Verifiers and Evaluation | `04_pretraining.ipynb` (decoding), `08` | Qwen3-0.6B, a few generations |
| `10_rlvr_grpo.ipynb` | Reinforcement Learning with Verifiable Rewards: GRPO | `08`, `09` | Raschka's GRPO logs and one checkpoint |

Why 09 sits between them: GRPO samples a group of answers and scores them with a verifier. Notebook 09 teaches exactly those two pieces without any training (sampling, best-of-N, self-consistency, verifiers, LLM-as-judge), so 10 only has to add the update rule. It is also the natural home for evaluation, the maintainer's strongest interview topic.

More than three would cut topics that need each other (for example, separating PPO from DPO loses the derivation that links them).

## 3. Running analogy: one kitchen for the whole series

**Recommendation: share one analogy across 08–10**, because the stages form one pipeline and one story helps recall the order (pretrain → SFT → reward → RL). Each notebook opens with the same mapping table, highlighting its own rows, so each one still stands alone. The attention notebooks keep their own analogy (the meeting room); a new analogy per *topic series*, not per notebook.

| In the kitchen | In post-training | Notebook |
|---|---|---|
| reading every cookbook in the library | pretraining | (04, 06) |
| copying the head chef's dishes exactly | supervised fine-tuning (SFT) | (06) |
| a food critic who learned the customers' taste from "dish A or dish B?" votes | reward model (Bradley–Terry) | 08 |
| cooking, being scored by the critic, while a coach stops you drifting too far from your training | RLHF with PPO and a KL penalty | 08 |
| learning straight from the vote cards, without hiring a critic | DPO | 08 |
| the critic loves garnish, so you pile on parsley | reward hacking / over-optimization | 08 |
| cooking several versions and serving the one that passes the taste test | best-of-N with a verifier | 09 |
| asking several cooks and serving the most common answer | self-consistency (majority vote) | 09 |
| a thermometer and a recipe checklist instead of a critic's opinion | verifiable reward | 09, 10 |
| cooking eight versions of the same dish and comparing each with the batch average | GRPO's group-relative advantage | 10 |
| a broken thermometer you learn to fool | an exploitable verifier | 10 |

Where it breaks: a reward scores a whole response but training updates token by token; the coach (KL term) is a soft penalty, not a rule; and a real verifier checks only the final answer, not the reasoning.

## 4. Notebook outlines

Figures are self-made in matplotlib unless noted. ⚙️ marks the optional GPU section. 🎚️ marks the (at most two or three) interactive Plotly figures.

### 08 Preference Tuning: Reward Models, RLHF and DPO

| Part | Content | Figures / tables |
|---|---|---|
| 1 | The post-training stack; what SFT cannot teach (choosing between two acceptable answers) | pipeline diagram; table "stage → data → objective → models in memory" |
| 2 | Preference data: prompt, chosen, rejected; a toy task with a hidden "true preference" rule (for example, polite and short), so true quality is measurable | table of toy pairs |
| 3 | Reward model with the Bradley–Terry loss $-\log\sigma(r_w-r_l)$: worked example by hand, then train a tiny reward model | $\sigma(\Delta r)$ curve; reward histograms for chosen vs rejected |
| 4 | RLHF with PPO, conceptually: $\mathbb{E}[r]-\beta\,\mathrm{KL}(\pi\Vert\pi_{\text{ref}})$, the four models (policy, reference, reward, value), the clipped objective in a few lines | 🎚️ slider over $\beta$: how far the optimal policy moves from the reference |
| 5 | DPO: derive the loss from the RLHF objective; Raschka's `compute_dpo_loss` on a tiny GPT | chosen vs rejected log-prob and implicit-reward margin during training |
| 6 | Tests: DPO loss $=\log 2$ when policy = reference; gradients raise chosen and lower rejected; larger $\beta$ keeps the policy closer | table of $\beta$ vs final KL |
| 7 | Reward hacking: optimize against a proxy reward model that also likes length; proxy reward rises while true quality falls | over-optimization curve (proxy and true reward vs KL) |
| ⚙️ | DPO on GPT-2 medium with Raschka's data, as in his notebook (Colab T4, several minutes) | his reward-margin plot reproduced |
| 8 | Check yourself + References | — |

### 09 Reasoning at Inference Time: Sampling, Verifiers and Evaluation

| Part | Content | Figures / tables |
|---|---|---|
| 1 | Decoding recap: greedy, temperature, top-k, top-p | 🎚️ slider over temperature on a real next-token distribution |
| 2 | Load Qwen3-0.6B (inference only) with Raschka's `reasoning_from_scratch` code; base vs reasoning variant on two math problems | side-by-side outputs table |
| 3 | Verifiers: extracting a final answer, exact-match and symbolic checks (`reasoning-from-scratch` Ch. 3) | table "task → verifier → how it can be gamed" |
| 4 | Inference-time scaling: best-of-N and self-consistency on a small problem set, with toy numbers precomputed where generation is slow | accuracy vs N curve |
| 5 | Evaluating without a verifier: multiple-choice (MMLU-style), leaderboards, LLM-as-judge and its biases (Appendix F) | table of judge biases (position, length, self-preference) |
| 6 | Check yourself + References | — |

### 10 RLVR and GRPO

| Part | Content | Figures / tables |
|---|---|---|
| 1 | Why verifiable rewards made RL cheap: no reward model, no value model | table "PPO vs DPO vs GRPO: models in memory, online sampling, needs preferences?" |
| 2 | GRPO step by step: group of $G$ answers, $A_i=(r_i-\bar r)/\sigma_r$, clipped update, optional KL; worked example with $G=4$ by hand | rewards → advantages bar chart |
| 3 | Train a tiny policy on a toy arithmetic task with an exact-match verifier using Raschka's GRPO step | reward, accuracy and response-length curves |
| 4 | The real run: plot Raschka's published Qwen3-0.6B logs; why the KL variant collapses at step 100 and what the Ch. 7 fixes change | log curves; his results table |
| 5 | Stabilizing GRPO (Ch. 7): tracking, clip ratio, KL, format reward; one ablation on the toy task | table of variants and what each fixes |
| 6 | When the verifier is imperfect: add noise or a loophole and watch the policy exploit it; why open-ended tasks have no reliable verifier | 🎚️ slider over verifier noise: true accuracy vs verifier reward |
| ⚙️ | A short GRPO run on Qwen3-0.6B with 4 rollouts × 256 tokens (Colab T4, ~11 GB) | — |
| 7 | Check yourself + References | — |

## 5. Sources

| Source | Use | Notes |
|---|---|---|
| Raschka, LLMs-from-scratch [`ch07/04_preference-tuning-with-dpo`](https://github.com/rasbt/LLMs-from-scratch/tree/main/ch07/04_preference-tuning-with-dpo) | DPO loss, log-probs, training step, ⚙️ section of 08 | Apache-2.0 code |
| Raschka, [`reasoning-from-scratch`](https://github.com/rasbt/reasoning-from-scratch) Ch. 2–4, Appendix F | Qwen3 loading, verifiers, inference-time scaling, evaluation (09) | Apache-2.0 |
| Raschka, `reasoning-from-scratch` Ch. 6 (`02_rlvr_grpo_scripts_intro`), Ch. 7 (`02_logs`, `03_rlvr_grpo_scripts_advanced`), checkpoints on Hugging Face | GRPO code, published logs and results table (10) | Apache-2.0 |
| Nathan Lambert, *The RLHF Book* (rlhfbook.com), Ch. 5–8 and 14, and its course slides | structure and explanations; cite only | — |
| InstructGPT (arXiv:2203.02155); PPO (arXiv:1707.06347); DPO (arXiv:2305.18290); DeepSeekMath/GRPO (arXiv:2402.03300); DeepSeek-R1 (arXiv:2501.12948); reward-model over-optimization (Gao et al., arXiv:2210.10760); self-consistency (Wang et al., arXiv:2203.11171) | formulas and claims, cited in References | — |

Interactive tools to link where they fit (check each link when building): the RLHF Book's interactive pages, Transformer Explainer for the sampling-temperature part.

## 6. Interview questions to cover

- Walk through SFT → RLHF → DPO → GRPO. What problem does each stage solve?
- Write the Bradley–Terry loss and the DPO loss. What is DPO's implicit reward?
- Why does RLHF need a KL penalty? What happens as $\beta\to0$ and $\beta\to\infty$?
- PPO keeps four models in memory; DPO and GRPO fewer. Which, and why?
- Best-of-N vs self-consistency: what does each need, and when does each fail?
- How would you evaluate an LLM when there is no ground truth? What can go wrong with LLM-as-judge?
- What is the group-relative advantage, and why does GRPO need no value model?
- What is reward hacking? Two examples, two mitigations.
- When does RLVR work, and why does it break for open-ended tasks?
- 30-second, no-math explanation of RLHF.

## 7. Build order and checklist

1. Agree on this plan, and update the weights rule in `AGENTS.md`.
2. Build 08 (CPU only), execute, review figures with the maintainer.
3. Build 09, then 10.
4. For each: copy upstream scripts into `NN-topic/data/` with the license file; update `00-extended-materials.md`, `00-toc-llm.md`, `02-LLM/live/README.md`, and the OLIVER page `references/online-learning-resources-triage.md`.
5. `npm ci && npx mystmd build --html` without warnings; push; check the live pages.

## 8. Open questions

1. Is the proposed weights rule acceptable (small model for inference by default; real training only in an optional GPU section)?
2. Three notebooks as above, or fold 09 into the other two?
3. One kitchen analogy across 08–10 (recommended), or a separate analogy per notebook?
4. Should the ⚙️ GPU sections ship with saved outputs (you run them in Colab once), or stay as code only?
