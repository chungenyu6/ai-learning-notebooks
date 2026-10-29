# Overview

These are my notes for preparing ML/AI interviews in 2025 to 2026.
The notes assume readers have a basic understanding of ML and LLMs
and are eager to learn more details.
The code is mainly tested in Google Colab.

## Large Language Model (LLM)

- [Tokenization](./01_tokenization.ipynb)
- [Attention](./02_attention.ipynb)
- [Architecture - GPT](./03_architecture_gpt.ipynb)
- [Pretraining](./04_pretraining.ipynb)
- [Finetuning for Classification](./05_finetuning_classification.ipynb)
- [Finetuning To Follow Instructions](./06_finetuning_instructions.ipynb)

## Extended Materials

Shorter notebooks that go beyond the main series: tests, measurements, and interview-style check questions on topics the main notebooks only touch on. Every notebook runs on CPU in Google Colab without downloading model weights.

- [From RNN to LSTM to Transformer](./live/00_rnn_lstm_to_transformer.ipynb)
- [Tokenization: BPE From Scratch, Real Tokenizers, and CLM vs MLM](./live/01_tokenization_clm_mlm.ipynb)
- [Self-Attention, Multi-Head Attention, and Cross-Attention](./live/02_self_and_cross_attention.ipynb)
- [KV Cache and Grouped-Query Attention (GQA)](./live/03_gqa_kv_cache.ipynb)
- [Positional Encoding: from Sinusoidal to RoPE](./live/04_positional_encoding_rope.ipynb)
- [LoRA and Parameter-Efficient Fine-Tuning](./live/05_lora_peft.ipynb)
- [GPT vs Llama vs MoE](./live/06_gpt_vs_llama_vs_moe.ipynb)
