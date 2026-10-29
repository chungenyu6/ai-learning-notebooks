# LLM Extended Materials

Short notebooks that extend the main LLM notebooks; the site page is [`00-extended-materials.md`](00-extended-materials.md). Each one uses Sebastian Raschka's material as its backbone, adds tests, measurements and explanations that interviews ask about, and ends with interview-style check questions (collapsible answers). All run on CPU in Google Colab (*File → Upload notebook → Runtime → Run all*) without downloading model weights.

They complement — not replace — the main notebooks in `../` (Raschka, *Build a Large Language Model From Scratch*).

| Notebook | Backbone (Raschka) | Added |
|---|---|---|
| `00_rnn_lstm_to_transformer` | *ML with PyTorch & Scikit-Learn* Ch15 (RNN, LSTM, char-level LM); *LLMs-from-scratch* Ch3 §3.1–3.2 | gradient-decay plot, LSTM cell check, causal attention, RNN/LSTM/Transformer recall experiment |
| `01_tokenization_clm_mlm` | BPE-from-scratch and embedding-vs-matmul bonuses; Ch2 figures | GPT-2 vs cl100k quirks, simple-BPE CJK limitation, CLM vs MLM |
| `02_self_and_cross_attention` | Ch3 §3.4–3.6; efficient-MHA and buffers bonuses | √d_k measurement, causal leakage test, MHA vs `nn.MultiheadAttention`, cross-attention, O(T²) |
| `03_gqa_kv_cache` | KV-cache and GQA bonuses (scripts in `03-gqa_kv_cache/data/`) | cached == uncached tests for MHA/GQA/MQA, GiB calculator, 8B capacity question |
| `04_positional_encoding_rope` | GPT→Llama 2 §1.4–1.5, Llama 2→3 §1.2 | relative-position test, layout equivalence, KV-cache offset bug, Llama 3.1 frequency scaling plot |
| `05_gpt_vs_llama_vs_moe` | GPT→Llama 2 §1.1–2, Llama 2→3, MoE bonus | comparison diagram, meta-device 7B count, parameter formulas, load-balancing demo |
| `06_lora_peft` | Appendix E (LoRA) | rank experiment, merging, full FT / LoRA / QLoRA memory, SFT loss masking |

Pretraining has no extended notebook yet.

## Sources and licenses

Each notebook tags sections taken from Raschka with 📗 (or 📘 for *Machine Learning with PyTorch and Scikit-Learn*); untagged text and code are written for these notebooks. License details live only here and in `SOURCE.md`, not in the notebooks. Each `<nn>-<topic>/` folder holds:

- `img/` — figures copied from the author's books/repositories, with `SOURCE.md` listing every original path. Figures from *Machine Learning with PyTorch and Scikit-Learn* are MIT-licensed. Figures from *Build a Large Language Model (From Scratch)* are **not** covered by that repository's Apache-2.0 license; copyright remains with the author/publisher, and they are included for educational use with attribution.
- `data/` — helper scripts copied unchanged from [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) (Apache-2.0, license file included) and public-domain texts.

Notebooks load figures via `github.com/chungenyu6/ai-learning-notebooks/blob/main/...?raw=true` and helper files from this repository first, falling back to the original repository, so they work in Colab once pushed.
