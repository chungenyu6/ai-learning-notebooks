# AI Learning Notes

這個 repository 是獨立的 MyST 教材網站，保存 Chung-En (Johnny) Yu 的 machine learning 與 large language model notebooks。

- 教材網站：<https://chungenyu6.github.io/ai-learning-notebooks/>
- 個人網站：<https://chungenyu6.github.io/my-personal-website/>

## Local preview

先安裝 site plugin 需要的套件（`plugins/details-math.mjs` 用 KaTeX 渲染 `<details>` 裡的公式）：

```bash
npm ci
```

```bash
npx myst start
```

## Static build

```bash
npx myst build --html
```

Generated output 位於 `_build/html/`，而且不得 commit 到 Git。

## Deployment

Push 至 `main` 後，GitHub Actions 會 build MyST static HTML 並部署到 GitHub Pages。CI 預設不重新執行 notebooks，而是 render notebook 中已存在的 outputs。
