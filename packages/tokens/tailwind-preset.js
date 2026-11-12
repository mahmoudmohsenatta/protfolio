/**
 * Tailwind preset generated from Sahm tokens, so web apps share the exact
 * values used by the mobile app.
 * For Tailwind v4, you can also read these values and emit an @theme block.
 */
const t = require('./index');

const px = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, `${v}px`]));

module.exports = {
  theme: {
    extend: {
      colors: {
        coral: t.palette.coral,
        indigo: t.palette.indigo,
        mint: t.palette.mint,
        sand: t.palette.sand,
        terracotta: t.palette.terracotta,
        olive: t.palette.olive,
      },
      fontFamily: { sans: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'] },
      borderRadius: px(t.radius),
      spacing: px(t.spacing),
    },
  },
};

