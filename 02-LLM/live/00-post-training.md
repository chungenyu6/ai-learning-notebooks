# Post-training

The main LLM notebooks end with instruction fine-tuning: the model can follow instructions by copying demonstrations. Modern assistants and reasoning models go further. This series covers the three ideas behind that step, the topics behind interview questions such as "walk me through SFT → RLHF → DPO → GRPO" and "how do reasoning models get better at math?":

- **Learning from preferences.** When two answers are both acceptable, people still prefer one. Reward models, RLHF and DPO turn those votes into training signal.
- **Spending compute at answer time.** Sampling, chain-of-thought, verifiers, best-of-N and majority voting improve answers without changing the weights, and evaluation has to measure all of it.
- **Learning from verifiable rewards.** When a program can check the answer (math, code), reinforcement learning with that check (GRPO) trains a model to reason.

The notebooks share one running analogy, **a restaurant kitchen training an apprentice chef**: the critic and the vote cards, the pass where plates are checked, and the apprentice who cooks a batch of versions and learns from the best ones. Read them in order.

| Part | Notebook | Builds on | What it covers |
|---|---|---|---|
| 1 | [Preference Tuning: Reward Models, RLHF and DPO](./08_preference_tuning_rlhf_dpo.ipynb) | [Finetuning To Follow Instructions](../06_finetuning_instructions.ipynb), [LoRA and PEFT](./07_lora_peft.ipynb) | Bradley–Terry reward model, the KL-regularized RLHF optimum (interactive β), PPO's clipping, DPO derived and trained on a toy kitchen, DPO collapse, reward hacking (interactive), Raschka's GPT-2 medium DPO log |
| 2 | [Reasoning at Inference Time: Sampling, Verifiers and Evaluation](./09_inference_time_scaling_and_evaluation.ipynb) | [Pretraining](../04_pretraining.ipynb) (decoding), part 1 | temperature (interactive) and top-p on Qwen3-0.6B, chain-of-thought (15% → 41% on MATH-500), a math verifier and its blind spots, best-of-N vs majority vote (interactive simulation), accuracy vs inference compute, multiple choice, Elo vs Bradley–Terry, LLM-judge biases |
| 3 | *RLVR and GRPO* (in progress) | parts 1 and 2 | reinforcement learning with verifiable rewards: the GRPO update, a toy run, and Raschka's published Qwen3-0.6B training logs |

**How these notebooks run.** None of them trains a real model; that would need a large GPU and is not the point. Toy models show each mechanism in seconds on CPU, and real-model results come from Sebastian Raschka's published checkpoints, training logs and saved outputs (*Build a Large Language Model (From Scratch)* and *Build a Reasoning Model (From Scratch)*). Each notebook runs on a laptop or Colab CPU in a few minutes.
