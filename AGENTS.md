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
4. **Worked examples by hand** with small numbers before the general formula. **Define every symbol** where it first appears, in the sentence or in a small "Symbol | Meaning | Example value" table right after the equation, and never reuse one letter for two things in the same notebook.
5. **Tests instead of eyeballing.** `assert` that an implementation matches a reference or a property holds (no future leakage, cached == uncached, and so on).
6. **Quick checks and interview questions** in collapsible `<details>` blocks. Inline `$...$` math works inside them on the site (rendered by `plugins/details-math.mjs`). Put one 30-second, no-math explanation question in "Check yourself".
7. **Callouts for the few things to remember**, written as GitHub-style alerts so they render as colored boxes on the site and as plain quotes in Colab. About one per section plus a "Key takeaways" box before "Check yourself"; move an existing key sentence into the box rather than repeating it.
   - `> [!IMPORTANT]` (yellow): key equations, facts and rules. `> [!TIP]` (green): the core intuition. `> [!WARNING]` (red): a common mistake.
   - The box title is fixed, so start the body with a bold label: `> **Key equation: ...**`, `> **Common mistake: ...**`.
   - Write display math inside a callout on **one line** (`> $$...$$`); in multi-line `$$` blocks MyST keeps the `>` markers in the formula.
   - Whenever you add or change content, re-read the notebook's callouts and its "Key takeaways" box, and update, add or remove callouts so they still match the content. New key ideas belong in the takeaways too.
   - Colors come from `styles/callouts.css`, which the deploy workflow appends to the theme stylesheet (`myst-theme.css`). For a local preview, append it yourself after building: `cat styles/callouts.css >> _build/html/myst-theme.css`.

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
2. **Update the date on every page you changed**, with any edit, even a single link or callout: the `Content updated: YYYY-MM-DD` line near the top of a notebook, and the `date:` field in the front matter of a Markdown page (overview pages, `00-home.md`, `00-toc-*.md`). Use the date of the change.
3. If you add, rename or reorder a notebook, update `02-LLM/live/00-extended-materials.md`, `02-LLM/00-toc-llm.md`, `02-LLM/live/README.md`, and links in other notebooks.
4. Build the site and check for warnings:

   ```bash
   npm ci
   npx mystmd build --html
   ```

5. Pushing to `main` deploys the site through GitHub Actions.

## Working with the maintainer

### How material arrives, and how to add it

- Requests often come as **pasted text or a ChatGPT share link**, with a note such as "add Parts 1, 2, 5 and 7". Read all of it, compare it with the notebook, and **add only what is missing**. Skip what is already covered and say so; a short "Part | already in the notebook? | what I added" table works well.
- **Supplements stay short**: a few cells that fill a gap, not a rewrite. Rewrite the material in English in the notebook's own voice; reuse the notebook's running example and numbers where they connect, instead of introducing new ones.
- **Check every number and claim** before it goes in: recompute it, or verify it against the primary source. Leave out what cannot be verified and say so. Redraw figures from such sources in matplotlib (rule 3 above).
- Put new material where the concept is introduced. In main notebooks, keep Raschka's flow and insert supplements next to the relevant section.
- **Propose before building anything large** (a new notebook or series, interactive elements across several notebooks, a restructure): give a short recommendation and let the maintainer choose. Small, clearly requested edits: just do them.
- ChatGPT share links are rendered with JavaScript: open them in a browser and wait for the answers to load (the answer text is also in the page's embedded data). A share link is a snapshot; newer messages appear only after the maintainer updates the link.

### Running analogies already in use

Keep these when you add to a notebook; do not introduce a second analogy for the same idea.

| Notebook | Analogy |
|---|---|
| Tokenization and Embeddings | a dictionary: entry numbers (ids), cards (embeddings), a librarian's summary (embedding models) |
| Self-, Multi-Head and Cross-Attention; the block section of Architecture - GPT | a meeting room: questions, name tags, what people say; committees (heads); another room (cross-attention) |
| KV Cache and GQA | a factory waiting for trucks (compute vs memory bandwidth) |
| Post-training series | a restaurant kitchen training an apprentice chef |

### After changing a notebook

- **Commit, push and check the live page** after each finished change; the maintainer reads the site. GitHub Pages lets browsers cache pages for up to 10 minutes.
- **Offer to sync the change to the OLIVER vault** (`~/Documents/obsidian-vaults/active/my-council/OLIVER`, the maintainer's Obsidian knowledge base, its own git repository). Sync only when the maintainer agrees. When syncing:
  - follow the vault's `_meta/rules.md`: body in Traditional Chinese with technical terms in English, tables, Mermaid for flows, a Feynman explanation with its limits, Obsidian callouts (`> [!important]`, `> [!tip]`, `> [!warning]`);
  - add to the existing page that fits (for example `concepts/transformer-architecture.md`, `references/llm-inference-memory-budget.md`, `references/online-learning-resources-triage.md`), and link to related pages instead of repeating them;
  - update the page's `updated:` date, add an entry at the top of `log.md`, then commit and push the vault.

### Technical pitfalls

- **Keep each notebook's JSON formatting** when editing it programmatically: main notebooks use 2-space indentation, Extended Materials 1-space, both with `ensure_ascii=False` and a trailing newline. Otherwise the whole file shows up as changed.
- In Plotly subplots, avoid `scaleanchor`: on the site the figure collapses to about 20 px wide.
- Images in a newly added or renamed `img/` folder are fetched from raw GitHub during the build; if that build ran before GitHub served them, rerun the deploy.

## Language

Notebook content is in English. Talk to the maintainer in Traditional Chinese. OLIVER vault pages are written in Traditional Chinese (technical terms stay in English).
