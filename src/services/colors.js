const hue2rgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

const mapPreciseValues = ({ h, s, l }) => {
  return [ h, s, l ].map((value, i) => {
    return i === 0 ? value / 360 : value / 100;
  });
};

const hsl2rgb = ({ h, s, l }) => {
  let r, g, b;
  [ h, s, l ] = mapPreciseValues({ h, s, l });

  if (s === 0) {
    r = l;
    g = l;
    b = l;
  }
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  r = Math.max(0, Math.min(Math.round(r * 255), 255));
  g = Math.max(0, Math.min(Math.round(g * 255), 255));
  b = Math.max(0, Math.min(Math.round(b * 255), 255));

  return { r, g, b };
};

const rgb2hex = ({ r, g, b }) => {
  const rgb = [ r, g, b ].map((val) => val.toString(16));
  const [ h, e, x ] = rgb.map(
    (char) => (char = char.length === 1 ? `0${char}` : char)
  );
  return `#${h}${e}${x}`;
};

export const convertHslToHex = ({ h, s, l }) => {
  const { r, g, b } = hsl2rgb({ h, s, l });
  const hex = rgb2hex({ r, g, b });
  return hex;
};

export const keepHueInRange = (hue) => {
  hue = Number(hue);
  while (hue >= 360 || hue < 0) {
    hue = hue >= 360 ? hue - 360 : hue < 0 ? hue + 360 : hue;
  }
  return hue;
};
