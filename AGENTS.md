# AGENTS.md

Rules for anyone (human or AI agent) creating or editing notebooks in this repository. `CLAUDE.md` is a symlink to this file.

## What this repo is

A MyST site of hands-on ML/LLM notebooks for interview preparation, published at <https://chungenyu6.github.io/ai-learning-notebooks/>. Readers know basic ML and want to understand modern models from the inside out.

- `01-ML/`, `02-LLM/`: main notebooks. The LLM series follows Sebastian Raschka, *Build a Large Language Model (From Scratch)*.
- `02-LLM/live/`: **Extended Materials**, shorter notebooks that each extend one or more main notebooks. The overview page is `02-LLM/live/00-extended-materials.md`.
- `docs/plans/`: plans for notebooks that are not built yet.
- The site navigation lives in `myst.yml`.

## How a notebook should teach

The reader learns best from **pictures, tables, worked examples and plain-language analogies**, and only then from formulas and code. Every notebook should have:

1. **One running analogy (Feynman technique).** Introduce one everyday picture near the top, map each concept to it in a table, and come back to it in a sentence or two in each section. Say where the analogy breaks, so it never replaces the real mechanism. Keep it light: the analogy frames the math, it does not replace it.
2. **Tables** for comparisons, shapes, trade-offs and "where it is used".
3. **Figures.** Prefer self-made figures drawn in code cells with matplotlib, from the notebook's own numbers where possible (heatmaps, curves, shape diagrams, minimal flat illustrations). They render in Colab and on the site, need no hosting, and have no copyright issues. Raschka's figures may be reused from `NN-topic/img/` with a caption naming the original file. Do not copy figures from other authors.
4. **Worked examples by hand** with small numbers before the general formula.
5. **Tests instead of eyeballing.** `assert` that an implementation matches a reference or a property holds (no future leakage, cached == uncached, and so on).
6. **Quick checks and interview questions** in collapsible `<details>` blocks. Inline `$...$` math works inside them on the site (rendered by `plugins/details-math.mjs`). Put one 30-second, no-math explanation question in "Check yourself".
7. **Callouts for the few things to remember**, written as GitHub-style alerts so they render as colored boxes on the site and as plain quotes in Colab. About one per section plus a "Key takeaways" box before "Check yourself"; move an existing key sentence into the box rather than repeating it.
   - `> [!IMPORTANT]` (yellow): key equations, facts and rules. `> [!TIP]` (green): the core intuition. `> [!WARNING]` (red): a common mistake.
   - The box title is fixed, so start the body with a bold label: `> **Key equation: ...**`, `> **Common mistake: ...**`.
   - Write display math inside a callout on **one line** (`> $$...$$`); in multi-line `$$` blocks MyST keeps the `>` markers in the formula.
   - Colors come from `styles/callouts.css`.

## Interactive elements (only where they teach)

Add a slider or buttons only when moving a knob shows something a static figure cannot: a distribution sharpening, a curve shifting, a vector rotating, a trade-off moving. Two or three per notebook at most; most figures stay static.

| Need | Use | On the site | In Colab |
|---|---|---|---|
| explore a few precomputed settings | **Plotly figure with a slider or buttons** | interactive (plain JavaScript, no kernel) | interactive |
| type any number into a calculator | **Colab form field**: `x = 8  #@param {type:"number"}` or `{type:"slider", min:1, max:32}` | plain code with its saved output | form with a field or slider |
| anything that needs Python to rerun on each change | avoid `ipywidgets` / `interact` | shows "a Jupyter kernel connection is required" | works |

- Plotly: in the setup cell, `import plotly.io as pio` and, outside Colab, `pio.renderers.default = "plotly_mimetype+notebook_connected"` so the saved output renders on the site. Keep figures small (about 30 slider steps or fewer, a handful of traces).
- The default slider position must tell the story on its own, for readers who never touch it.

## Link to existing interactive tools

If a well-regarded interactive site already shows the concept, link it where the concept is introduced, with one line on what to try, instead of rebuilding it. Examples: [Tiktokenizer](https://tiktokenizer.vercel.app/) (tokenization), [Transformer Explainer](https://poloclub.github.io/transformer-explainer/) (a GPT-2 forward pass), [LLM Visualization](https://bbycroft.net/llm) (3D walk through a GPT), [TensorFlow Playground](https://playground.tensorflow.org/) (small neural networks), [Distill: Why Momentum Really Works](https://distill.pub/2017/momentum/) (optimizers). When building a notebook, search for such tools; prefer ones from research groups, publications or widely used projects, check the link works, and do not quote their numbers as facts.

## Notebook structure (Extended Materials)

- File name `02-LLM/live/NN_topic.ipynb`; assets in `02-LLM/live/NN-topic/img/` and `NN-topic/data/`. Load them by raw GitHub URL (`https://github.com/chungenyu6/ai-learning-notebooks/blob/main/...?raw=true`) so the notebook also works in Colab.
- First cell: title; creator; content-updated date; the Colab link block used by the main notebooks; one sentence starting "Extends [Title](link)..."; the sources table; runtime note; a "Part | Content" table.
- Sources: tag sections and code taken from Raschka with 📗 (📘 for *Machine Learning with PyTorch and Scikit-Learn*) and a short source label; untagged text and code are written for the notebook. Code cells copied from a source start with `# Source: ...`.
- Sections numbered `## 1.`, `## 2.`, ...; last section "Check yourself (interview-style)", then "References".
- Runs on CPU in Google Colab (and on an 8 GB laptop) in a few minutes. The point is learning, not training: **never train a real model**. Toy models that train in seconds are fine. To show real-model behaviour, use published checkpoints (at most ~0.6B parameters, for a few short generations), training logs and saved outputs, preferably Raschka's. When a notebook does this instead of a full fine-tuning run, say so in a short "How this notebook works" note right after the sources table.
- A notebook that belongs to a series (several notebooks on one topic, sharing one running analogy) starts with a one-line series banner naming the parts in order by title, with links to the other parts and to the series overview page. A series gets its own overview page and its own group in the site navigation, outside Extended Materials.

## Do not put in notebooks

- License text (keep license details in `02-LLM/live/README.md` and `NN-topic/img/SOURCE.md`).
- "Added" / 🧪 tags.
- Class dates, module numbers (M14...), or the word "companion".
- Notebook numbers or file names in text (`03`, `05_gpt_vs_llama_vs_moe`): the site shows titles, not numbers. Refer to another notebook by its title as a link, for example `[KV Cache and GQA](./03_gqa_kv_cache.ipynb)`.

## Before committing

1. **Execute the notebook** top to bottom and save outputs. CI does not run notebooks; the site shows the saved outputs.
2. If you add, rename or reorder a notebook, update `02-LLM/live/00-extended-materials.md`, `02-LLM/00-toc-llm.md`, `02-LLM/live/README.md`, and links in other notebooks.
3. Build the site and check for warnings:

   ```bash
   npm ci
   npx mystmd build --html
   ```

4. Pushing to `main` deploys the site through GitHub Actions.

## Language

Notebook content is in English. Conversation with the maintainer is usually in Traditional Chinese.
