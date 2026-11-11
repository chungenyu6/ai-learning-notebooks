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
| [Tokenization and Embeddings](./01_tokenization_clm_mlm.ipynb) | [Tokenization](../01_tokenization.ipynb) | BPE from scratch, GPT-2 vs GPT-4 tokenizer quirks, why ids are not fed as numbers, embedding as one-hot × matrix, causal vs masked LM, and embedding models (contextual vectors, pooling, negation and question–answer similarity, contrastive training, dimensions) |
| [Self-, Multi-Head and Cross-Attention](./02_self_and_cross_attention.ipynb) | [Attention](../02_attention.ipynb) | a meeting-room analogy with self-drawn figures, a worked attention example, why divide by $\sqrt{d_k}$ (measured), a causal-mask leakage test, efficient implementations, cross-attention, the Transformer block components, $O(T^2)$ cost |
| [KV Cache and GQA](./03_gqa_kv_cache.ipynb) | [Attention](../02_attention.ipynb), [Architecture - GPT](../03_architecture_gpt.ipynb) | how a KV cache works, MHA vs GQA vs MQA with equivalence tests, a GPU-memory calculator |
| [Positional Encoding: Sinusoidal to RoPE](./04_positional_encoding_rope.ipynb) | [Architecture - GPT](../03_architecture_gpt.ipynb) | why attention needs positions, learned and sinusoidal embeddings, RoPE with tests, Llama 3.1 frequency scaling |
| [GPT vs Llama vs MoE](./05_gpt_vs_llama_vs_moe.ipynb) | [Architecture - GPT](../03_architecture_gpt.ipynb) | GPT-2 → Llama 2 → Llama 3 one component at a time, counting parameters from a config, Mixture of Experts |
| [Pretraining at Scale: Data, Training Loop, Compute](./06_pretraining_pipeline.ipynb) | [Pretraining](../04_pretraining.ipynb) | a toy data pipeline (filters, MinHash dedup, decontamination, packing, mixture), warmup + cosine decay + gradient clipping, $6ND$ FLOPs and Chinchilla IsoFLOP curves, training-speed and parallelism tables |
| [LoRA and PEFT](./07_lora_peft.ipynb) | [Finetuning for Classification](../05_finetuning_classification.ipynb), [Finetuning To Follow Instructions](../06_finetuning_instructions.ipynb) | LoRA layers and rank experiments, merging adapters, full FT vs LoRA vs QLoRA memory, loss masking in instruction SFT |

## Suggested reading order

### Do I need the main notebooks first?

Every extended notebook **runs on its own**: it carries or downloads all the code it needs, so you can open any of them in Colab and run it top to bottom. What differs is how much each one assumes you already know:

| You can start here directly | Know a GPT block first ([Architecture - GPT](../03_architecture_gpt.ipynb)) | Know the training loop first ([Pretraining](../04_pretraining.ipynb), fine-tuning) |
|---|---|---|
| [From RNN to LSTM to Transformer](./00_rnn_lstm_to_transformer.ipynb) | [KV Cache and GQA](./03_gqa_kv_cache.ipynb) | [Pretraining at Scale](./06_pretraining_pipeline.ipynb) |
| [Tokenization and Embeddings](./01_tokenization_clm_mlm.ipynb) | [Positional Encoding: Sinusoidal to RoPE](./04_positional_encoding_rope.ipynb) | [LoRA and PEFT](./07_lora_peft.ipynb) |
| [Self-, Multi-Head and Cross-Attention](./02_self_and_cross_attention.ipynb) (a condensed version of the main [Attention](../02_attention.ipynb) notebook) | [GPT vs Llama vs MoE](./05_gpt_vs_llama_vs_moe.ipynb) | |

How to choose:

- **The topic is new to you:** read the main notebook first. It builds the model step by step; the extended notebook assumes you have seen that build and focuses on follow-up questions, tests and trade-offs.
- **You know the topic and are preparing for interviews:** go straight to the extended notebook.
- **Not sure:** try its "Check yourself" questions first. If you cannot answer half of them, read the main notebook.

A few extended notebooks also build on each other:

- [KV Cache and GQA](./03_gqa_kv_cache.ipynb) assumes [Self-, Multi-Head and Cross-Attention](./02_self_and_cross_attention.ipynb).
- [Positional Encoding: Sinusoidal to RoPE](./04_positional_encoding_rope.ipynb) assumes both of those.
- [GPT vs Llama vs MoE](./05_gpt_vs_llama_vs_moe.ipynb) reuses the RoPE code from [Positional Encoding: Sinusoidal to RoPE](./04_positional_encoding_rope.ipynb).

### One path through everything

Main notebooks in **bold**, extended notebooks in plain text:

1. **[Tokenization](../01_tokenization.ipynb)** → [Tokenization and Embeddings](./01_tokenization_clm_mlm.ipynb)
2. [From RNN to LSTM to Transformer](./00_rnn_lstm_to_transformer.ipynb), for why attention was needed
3. **[Attention](../02_attention.ipynb)** → [Self-, Multi-Head and Cross-Attention](./02_self_and_cross_attention.ipynb)
4. **[Architecture - GPT](../03_architecture_gpt.ipynb)** → [KV Cache and GQA](./03_gqa_kv_cache.ipynb) → [Positional Encoding: Sinusoidal to RoPE](./04_positional_encoding_rope.ipynb) → [GPT vs Llama vs MoE](./05_gpt_vs_llama_vs_moe.ipynb)
5. **[Pretraining](../04_pretraining.ipynb)** → [Pretraining at Scale](./06_pretraining_pipeline.ipynb)
6. **[Finetuning for Classification](../05_finetuning_classification.ipynb)** → **[Finetuning To Follow Instructions](../06_finetuning_instructions.ipynb)** → [LoRA and PEFT](./07_lora_peft.ipynb)
7. The [Post-training](./00-post-training.md) series, in its own order

What happens after fine-tuning (preference tuning, inference-time scaling, reinforcement learning with verifiable rewards) has its own series: [Post-training](./00-post-training.md).
