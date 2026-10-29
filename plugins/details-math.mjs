// MyST parses markdown inside <details> blocks as HTML, so `$...$` comes out as
// <span class="math-inline"> text instead of a math node and is never rendered.
// Turn those spans back into math nodes so collapsible answers show formulas.
// MyST renders math with KaTeX before plugins run, so render these here too.
import katex from 'katex';

function mathNode(type, node) {
  const value = (node.children ?? []).map((child) => child.value ?? '').join('');
  const html = katex.renderToString(value, { displayMode: type === 'math', throwOnError: false });
  return { type, value, html };
}

function convert(node) {
  if (!node || !Array.isArray(node.children)) return;
  node.children = node.children.map((child) => {
    if (child.type === 'span' && child.class === 'math-inline') {
      return mathNode('inlineMath', child);
    }
    if ((child.type === 'div' || child.type === 'span') && child.class === 'math-display') {
      return mathNode('math', child);
    }
    convert(child);
    return child;
  });
}

const plugin = {
  name: 'Math inside details',
  transforms: [
    {
      name: 'details-math',
      stage: 'document',
      plugin: () => (tree) => convert(tree),
    },
  ],
};

export default plugin;
