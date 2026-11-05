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

## Notebook structure (Extended Materials)

- File name `02-LLM/live/NN_topic.ipynb`; assets in `02-LLM/live/NN-topic/img/` and `NN-topic/data/`. Load them by raw GitHub URL (`https://github.com/chungenyu6/ai-learning-notebooks/blob/main/...?raw=true`) so the notebook also works in Colab.
- First cell: title; creator; content-updated date; the Colab link block used by the main notebooks; one sentence starting "Extends `xx.ipynb`..."; the sources table; runtime note; a "Part | Content" table.
- Sources: tag sections and code taken from Raschka with 📗 (📘 for *Machine Learning with PyTorch and Scikit-Learn*) and a short source label; untagged text and code are written for the notebook. Code cells copied from a source start with `# Source: ...`.
- Sections numbered `## 1.`, `## 2.`, ...; last section "Check yourself (interview-style)", then "References".
- Runs on CPU in Google Colab in a few minutes, without downloading model weights.

## Do not put in notebooks

- License text (keep license details in `02-LLM/live/README.md` and `NN-topic/img/SOURCE.md`).
- "Added" / 🧪 tags.
- Class dates, module numbers (M14...), or the word "companion"; refer to other notebooks by file name.

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
