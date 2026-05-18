// Tailwind v4 emits `padding-inline` / `margin-inline` / `padding-block` /
// `margin-block` (logical properties) for utilities like `px-5`, `my-2`, etc.
// NativeScript's CSS engine only understands the physical equivalents, so it
// silently drops these declarations. This plugin expands them back to the
// physical forms NS actually applies.
const LOGICAL_TO_PHYSICAL = {
  'padding-inline': ['padding-left', 'padding-right'],
  'padding-block': ['padding-top', 'padding-bottom'],
  'margin-inline': ['margin-left', 'margin-right'],
  'margin-block': ['margin-top', 'margin-bottom'],
};

module.exports = () => ({
  postcssPlugin: 'postcss-expand-logical',
  Declaration(decl) {
    const physical = LOGICAL_TO_PHYSICAL[decl.prop];
    if (!physical) return;
    decl.replaceWith(physical.map((prop) => decl.clone({ prop })));
  },
});
module.exports.postcss = true;
