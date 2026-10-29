# Extended Materials

The main LLM notebooks follow Sebastian Raschka's *Build a Large Language Model (From Scratch)* chapter by chapter and build one model, GPT-2, end to end. Interviews ask about more than that one model, so these notebooks fill the gaps:

- **What came before.** Why recurrent networks struggled and what attention changed.
- **What came after.** The changes that turned GPT-2 into Llama-style models (RoPE, RMSNorm, SwiGLU, GQA) and Mixture of Experts.
- **What it costs.** KV-cache and GPU-memory estimates, the $O(T^2)$ attention cost, and LoRA vs full fine-tuning memory.
- **How to check it.** Tests instead of eyeballing: the causal mask does not leak, cached decoding matches a full pass, RoPE depends only on relative position.

Each notebook is short, runs on CPU in Google Colab without downloading model weights, and ends with interview-style check questions with collapsible answers. Most of them reuse Raschka's bonus material and his other books; each notebook lists its sources at the top.

## How they map to the main notebooks

| Extended material | Builds on | What it adds |
|---|---|---|
| [From RNN to LSTM to Transformer](./00_rnn_lstm_to_transformer.ipynb) | [Attention](../02_attention.ipynb) | RNNs, stacked layers (depth vs time), why tanh, LSTM and GRU with comparison tables, vanishing gradients, a character-level LSTM, an RNN vs LSTM vs Transformer recall experiment, and section quizzes |
| [Tokenization: BPE, Real Tokenizers, CLM vs MLM](./01_tokenization_clm_mlm.ipynb) | [Tokenization](../01_tokenization.ipynb) | BPE from scratch, GPT-2 vs GPT-4 tokenizer quirks, embedding as one-hot × matrix, causal vs masked LM |
| [Self-, Multi-Head and Cross-Attention](./02_self_and_cross_attention.ipynb) | [Attention](../02_attention.ipynb) | a worked attention example, why divide by $\sqrt{d_k}$ (measured), a causal-mask leakage test, efficient implementations, cross-attention, the Transformer block components, $O(T^2)$ cost |
| [KV Cache and GQA](./03_gqa_kv_cache.ipynb) | [Attention](../02_attention.ipynb), [Architecture - GPT](../03_architecture_gpt.ipynb) | how a KV cache works, MHA vs GQA vs MQA with equivalence tests, a GPU-memory calculator |
| [Positional Encoding: Sinusoidal to RoPE](./04_positional_encoding_rope.ipynb) | [Architecture - GPT](../03_architecture_gpt.ipynb) | why attention needs positions, learned and sinusoidal embeddings, RoPE with tests, Llama 3.1 frequency scaling |
| [GPT vs Llama vs MoE](./05_gpt_vs_llama_vs_moe.ipynb) | [Architecture - GPT](../03_architecture_gpt.ipynb) | GPT-2 → Llama 2 → Llama 3 one component at a time, counting parameters from a config, Mixture of Experts |
| [Pretraining at Scale: Data, Training Loop, Compute](./06_pretraining_pipeline.ipynb) | [Pretraining](../04_pretraining.ipynb) | a toy data pipeline (filters, MinHash dedup, decontamination, packing, mixture), warmup + cosine decay + gradient clipping, $6ND$ FLOPs and Chinchilla IsoFLOP curves, training-speed and parallelism tables |
| [LoRA and PEFT](./07_lora_peft.ipynb) | [Finetuning for Classification](../05_finetuning_classification.ipynb), [Finetuning To Follow Instructions](../06_finetuning_instructions.ipynb) | LoRA layers and rank experiments, merging adapters, full FT vs LoRA vs QLoRA memory, loss masking in instruction SFT |

## Suggested order

Read each extended notebook after the main notebook it builds on. Within the extended materials, the numbering is the suggested order: notebook 03 assumes 02, notebook 04 assumes 02–03, and notebook 05 reuses the RoPE code from 04.
