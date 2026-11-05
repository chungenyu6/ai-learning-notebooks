# Extended Materials

The main LLM notebooks follow Sebastian Raschka's *Build a Large Language Model (From Scratch)* chapter by chapter and build one model, GPT-2, end to end. Interviews ask about more than that one model, so these notebooks fill the gaps:

- **What came before.** Why recurrent networks struggled and what attention changed.
- **What came after.** The changes that turned GPT-2 into Llama-style models (RoPE, RMSNorm, SwiGLU, GQA) and Mixture of Experts.
- **What it costs.** KV-cache and GPU-memory estimates, the $O(T^2)$ attention cost, and LoRA vs full fine-tuning memory.
- **How to check it.** Tests instead of eyeballing: the causal mask does not leak, cached decoding matches a full pass, RoPE depends only on relative position.

Each notebook is short, runs on CPU in Google Colab in a few minutes, trains only toy models (real-model results come from published checkpoints and logs), and ends with interview-style check questions with collapsible answers. Most of them reuse Raschka's bonus material and his other books; each notebook lists its sources at the top.

## How they map to the main notebooks

| Extended material | Builds on | What it adds |
|---|---|---|
| [From RNN to LSTM to Transformer](./00_rnn_lstm_to_transformer.ipynb) | [Attention](../02_attention.ipynb) | RNNs, stacked layers (depth vs time), why tanh, LSTM and GRU with comparison tables, vanishing gradients, a character-level LSTM, an RNN vs LSTM vs Transformer recall experiment, and section quizzes |
| [Tokenization: BPE, Real Tokenizers, CLM vs MLM](./01_tokenization_clm_mlm.ipynb) | [Tokenization](../01_tokenization.ipynb) | BPE from scratch, GPT-2 vs GPT-4 tokenizer quirks, embedding as one-hot × matrix, causal vs masked LM |
| [Self-, Multi-Head and Cross-Attention](./02_self_and_cross_attention.ipynb) | [Attention](../02_attention.ipynb) | a meeting-room analogy with self-drawn figures, a worked attention example, why divide by $\sqrt{d_k}$ (measured), a causal-mask leakage test, efficient implementations, cross-attention, the Transformer block components, $O(T^2)$ cost |
| [KV Cache and GQA](./03_gqa_kv_cache.ipynb) | [Attention](../02_attention.ipynb), [Architecture - GPT](../03_architecture_gpt.ipynb) | how a KV cache works, MHA vs GQA vs MQA with equivalence tests, a GPU-memory calculator |
| [Positional Encoding: Sinusoidal to RoPE](./04_positional_encoding_rope.ipynb) | [Architecture - GPT](../03_architecture_gpt.ipynb) | why attention needs positions, learned and sinusoidal embeddings, RoPE with tests, Llama 3.1 frequency scaling |
| [GPT vs Llama vs MoE](./05_gpt_vs_llama_vs_moe.ipynb) | [Architecture - GPT](../03_architecture_gpt.ipynb) | GPT-2 → Llama 2 → Llama 3 one component at a time, counting parameters from a config, Mixture of Experts |
| [Pretraining at Scale: Data, Training Loop, Compute](./06_pretraining_pipeline.ipynb) | [Pretraining](../04_pretraining.ipynb) | a toy data pipeline (filters, MinHash dedup, decontamination, packing, mixture), warmup + cosine decay + gradient clipping, $6ND$ FLOPs and Chinchilla IsoFLOP curves, training-speed and parallelism tables |
| [LoRA and PEFT](./07_lora_peft.ipynb) | [Finetuning for Classification](../05_finetuning_classification.ipynb), [Finetuning To Follow Instructions](../06_finetuning_instructions.ipynb) | LoRA layers and rank experiments, merging adapters, full FT vs LoRA vs QLoRA memory, loss masking in instruction SFT |
| [Preference Tuning: Reward Models, RLHF and DPO](./08_preference_tuning_rlhf_dpo.ipynb) | [Finetuning To Follow Instructions](../06_finetuning_instructions.ipynb), [LoRA and PEFT](./07_lora_peft.ipynb) | Bradley–Terry reward model, the KL-regularized RLHF optimum (interactive β), PPO's clipping, DPO derived and trained on a toy kitchen, DPO collapse, reward hacking (interactive), Raschka's GPT-2 medium DPO log |
| [Reasoning at Inference Time: Sampling, Verifiers and Evaluation](./09_inference_time_scaling_and_evaluation.ipynb) | [Pretraining](../04_pretraining.ipynb) (decoding), [Preference Tuning](./08_preference_tuning_rlhf_dpo.ipynb) | temperature (interactive) and top-p on Qwen3-0.6B, chain-of-thought (15% → 41% on MATH-500), a math verifier and its blind spots, best-of-N vs self-consistency (interactive simulation), Raschka's accuracy-vs-compute results, multiple choice, Elo vs Bradley–Terry, LLM-judge biases |

## Post-training series

Notebooks 08–10 form one series on what happens after instruction fine-tuning: **08** preference tuning (reward models, RLHF, DPO), **09** reasoning at inference time (sampling, verifiers, evaluation) and **10** reinforcement learning with verifiable rewards (GRPO). They share one running analogy, a restaurant kitchen training an apprentice chef, and are meant to be read in order. None of them trains a real model: toy models show each mechanism on CPU, and real-model results come from Sebastian Raschka's published checkpoints and logs. (10 is in progress.)

## Suggested order

Read each extended notebook after the main notebook it builds on. Within the extended materials, the numbering is the suggested order: notebook 03 assumes 02, notebook 04 assumes 02–03, and notebook 05 reuses the RoPE code from 04.
