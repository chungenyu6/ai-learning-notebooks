# Plan: Post-training Extended Materials (RLHF, DPO, GRPO)

Status: **draft, waiting for review**. Nothing is built yet. Follows the rules in [`AGENTS.md`](../../AGENTS.md).

## Why

The extended materials cover architecture, pretraining and fine-tuning, but nothing after supervised fine-tuning. For interviews that is the largest gap:

- "Walk me through the post-training stack: SFT → RLHF → DPO → RLVR/GRPO" is a standard breadth question.
- Training-oriented roles ask to write the **DPO loss** and explain the **GRPO objective** (group-relative advantage) from memory.
- The maintainer's research angle is that **RLVR works when rewards are verifiable and fails when they are not**, which connects to reliability and uncertainty work. The notebooks should make that argument concrete with runnable evidence (reward hacking, verifier noise).
- The same material is reusable as demos for a TA lecture on RLHF/RLVR.

## Recommendation: two notebooks, not one

One notebook covering SFT, reward models, PPO, DPO, GRPO and reward hacking would be about twice as long as the others. Split at the natural boundary, human preferences versus verifiable rewards:

| File | Title | Builds on |
|---|---|---|
| `08_preference_tuning_rlhf_dpo.ipynb` | Preference Tuning: Reward Models, RLHF and DPO | `06_finetuning_instructions.ipynb`, `07_lora_peft` |
| `09_rlvr_grpo.ipynb` | Reinforcement Learning with Verifiable Rewards: GRPO | `08_preference_tuning_rlhf_dpo` |

Decoding strategies and inference-time scaling (best-of-N, self-consistency) fit naturally at the start of 09, because best-of-N with a verifier is the simplest form of "use a reward at inference time".

## Running analogy: an apprentice chef

Used across both notebooks, introduced with a mapping table and a minimal illustration.

| In the kitchen | In post-training |
|---|---|
| reading every cookbook in the library | pretraining |
| copying the head chef's dishes exactly | supervised fine-tuning (SFT) |
| a food critic who learned the customers' taste from "dish A or dish B?" votes | reward model (Bradley–Terry) |
| cooking, getting scored by the critic, while a coach stops you from drifting too far from your training | RLHF with PPO and a KL penalty to the reference model |
| learning straight from the vote cards, without hiring a critic | DPO |
| cooking eight versions of the same dish and comparing each with the batch average | GRPO's group-relative advantage |
| a thermometer and a recipe checklist instead of a critic's opinion | verifiable reward (RLVR) |
| the critic loves garnish, so you pile on parsley | reward hacking / over-optimization |

Where it breaks: a reward model scores whole responses but the policy is trained token by token; the "coach" (KL term) is a soft penalty, not a hard rule.

## Constraints

- CPU only in Colab, a few minutes per notebook, **no model-weight downloads** (same rule as the other notebooks). Raschka's DPO notebook fine-tunes GPT-2 medium and `reasoning-from-scratch` uses Qwen3-0.6B, so we keep their **loss functions and training-step code** but run them on tiny models and toy tasks where the effect is visible in seconds.
- Toy tasks must make the "right answer" obvious so readers can see *what* each method learns.

## Notebook 08: Preference Tuning (Reward Models, RLHF, DPO)

| Part | Content | Figures / tables |
|---|---|---|
| 1 | The post-training stack and where each stage sits; what SFT cannot teach (preferences between two acceptable answers) | pipeline diagram drawn in matplotlib; table "stage → data → objective → typical size" |
| 2 | Preference data: prompt, chosen, rejected; how it is collected | table of a few toy pairs |
| 3 | Reward model with the Bradley–Terry loss $-\log\sigma(r(x,y_w)-r(x,y_l))$; worked example by hand; train a tiny reward model on the toy task | plot of $\sigma(\Delta r)$; reward histogram for chosen vs rejected |
| 4 | RLHF with PPO, conceptually: the objective $\mathbb{E}[r]-\beta\,\mathrm{KL}(\pi\Vert\pi_{\text{ref}})$, the four models in memory (policy, reference, reward, value), clipping | "four models" memory table; KL-penalty illustration |
| 5 | DPO: derive the loss from the RLHF objective in a few lines, then Raschka's `compute_dpo_loss` and training step on a tiny GPT | plot of implicit reward margin and log-prob of chosen vs rejected during training |
| 6 | Tests: DPO loss equals $\log 2$ when policy = reference; gradient pushes chosen up and rejected down; $\beta$ controls how far the policy moves | table of $\beta$ vs final KL |
| 7 | Reward hacking: optimize a policy against a proxy reward model that also likes length, and watch true quality fall while proxy reward rises (Goodhart) | the over-optimization curve: proxy reward and true reward vs KL from reference |
| 8 | Check yourself + References | — |

Toy task idea: responses are short token sequences; the hidden "true preference" is a simple rule (for example, contains a polite token and is short). Chosen/rejected pairs are generated from the rule, so we can measure true quality exactly.

## Notebook 09: RLVR and GRPO

| Part | Content | Figures / tables |
|---|---|---|
| 1 | Verifiable rewards: math answers, unit tests, format checks; why they made RL cheap again (no reward model) | table "task → verifier → can it be gamed?" |
| 2 | Using a verifier at inference time: greedy vs temperature sampling, best-of-N, self-consistency (majority vote) | accuracy vs N curve |
| 3 | GRPO step by step: sample a group of $G$ answers per prompt, reward each, advantage $A_i=(r_i-\bar r)/\sigma_r$, clipped policy-gradient update, optional KL to reference; worked example with $G=4$ by hand | bar chart of rewards → advantages for one group |
| 4 | Train a tiny policy on a toy arithmetic task with an exact-match verifier, using the GRPO step from `reasoning-from-scratch` Ch. 6 | reward and accuracy curves; response-length curve |
| 5 | Stabilizing GRPO (Ch. 7): tracking, clip ratio, KL term, format reward; one ablation | table of variants and what each fixes |
| 6 | When the verifier is imperfect: add label noise or a loophole to the verifier and show the policy exploiting it; connect to non-verifiable tasks (open-ended answers, LLM-as-judge) | true accuracy vs verifier reward as noise grows |
| 7 | PPO vs DPO vs GRPO summary | comparison table: needs reward model? value model? online sampling? memory |
| 8 | Check yourself + References | — |

## Sources

| Source | Use | License (internal note only) |
|---|---|---|
| Raschka, LLMs-from-scratch [`ch07/04_preference-tuning-with-dpo/dpo-from-scratch.ipynb`](https://github.com/rasbt/LLMs-from-scratch/tree/main/ch07/04_preference-tuning-with-dpo) | DPO loss, log-prob computation, training step (📗 in 08) | Apache-2.0 code |
| Raschka, [`reasoning-from-scratch`](https://github.com/rasbt/reasoning-from-scratch) Ch. 6 (`ch06_main.ipynb`, `02_rlvr_grpo_scripts_intro`) and Ch. 7 (`03_rlvr_grpo_scripts_advanced`: tracking, clip ratio, KL, format reward) | GRPO implementation and stabilizations (📗 in 09) | Apache-2.0 |
| Raschka, `reasoning-from-scratch` Ch. 3–4 | evaluation with a verifier, inference-time scaling (09 Part 2) | Apache-2.0 |
| Nathan Lambert, *The RLHF Book* (rlhfbook.com) and its course slides, Ch. 5–8, 14 | structure and explanations; **cite only, do not copy text or figures** | check before quoting |
| Papers: InstructGPT (Ouyang et al., 2022, arXiv:2203.02155); PPO (Schulman et al., 2017, arXiv:1707.06347); DPO (Rafailov et al., 2023, arXiv:2305.18290); DeepSeekMath / GRPO (Shao et al., 2024, arXiv:2402.03300); DeepSeek-R1 (2025, arXiv:2501.12948); reward-model over-optimization (Gao et al., 2022, arXiv:2210.10760) | formulas and claims, cited in References | — |

All figures are self-made in matplotlib; Raschka figures only if they add something the toy plots cannot show.

## Interview questions to cover

- Walk through SFT → RLHF → DPO → GRPO. What problem does each stage solve?
- Write the Bradley–Terry reward-model loss and the DPO loss. What is the "implicit reward" in DPO?
- Why does RLHF need a KL penalty? What happens with $\beta\to0$ and $\beta\to\infty$?
- PPO needs four models in memory; DPO and GRPO need fewer. Which ones, and why?
- What is the group-relative advantage, and why does GRPO not need a value model?
- What is reward hacking? Give two concrete examples and two mitigations.
- When does RLVR work, and why does it break for open-ended tasks? (the maintainer's research hook)
- 30-second, no-math explanation of RLHF.

## Checklist when building

- [ ] Agree on one vs two notebooks and the toy tasks (open questions below).
- [ ] Copy needed upstream scripts into `NN-topic/data/` with `LICENSE` and note them in `02-LLM/live/README.md`.
- [ ] Build 08, execute, check figures; then 09.
- [ ] Update `00-extended-materials.md`, `00-toc-llm.md`, `02-LLM/live/README.md`, the "Builds on" links, and the OLIVER page `references/online-learning-resources-triage.md` (its Extended Materials table).
- [ ] `npm ci && npx mystmd build --html` without warnings; push; check the live pages.

## Open questions for the maintainer

1. Two notebooks (recommended) or one longer notebook?
2. Toy tasks: is a synthetic preference rule (08) and single-digit arithmetic (09) concrete enough, or would you rather see a tiny real-text example even if it takes longer to run?
3. Include a short PPO implementation, or keep PPO conceptual (recommended: conceptual plus the clipped objective in a few lines, since GRPO reuses the clipping)?
