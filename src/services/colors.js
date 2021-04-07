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
  const rgb = [ r, g, b ].map(val => val.toString(16));
  const [ h, e, x ] = rgb.map(char => (char = char.length === 1 ? `0${char}` : char));
  return `#${h}${e}${x}`;
};

const removeHash = str => {
  return str.charAt(0) === '#' ? str.slice(1) : str;
};

const toFloat = n => {
  return Number(n.toFixed(2));
};

const hex2rgb = str => {
  str = removeHash(str);
  const r = parseInt(str.substring(0, 2), 16);
  const g = parseInt(str.substring(2, 4), 16);
  const b = parseInt(str.substring(4, 6), 16);
  return { r, g, b };
};

const rgb2hsl = ({ r, g, b }) => {
  const [ R, G, B ] = [ r, g, b ].map(n => (n /= 255));
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  let h;
  let s;
  let l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    // eslint-disable-next-line default-case
    switch (max) {
      case R:
        h = (G - B) / d + (G < B ? 6 : 0);
        break;
      case G:
        h = (B - R) / d + 2;
        break;
      case B:
        h = (R - G) / d + 4;
        break;
    }
  }
  h /= 6;

  h = toFloat(h * 360);
  s = toFloat(s * 100);
  l = toFloat(l * 100);

  return { h, s, l };
};

export const convertHslToHex = hsl => {
  return rgb2hex(hsl2rgb(hsl));
};

export const convertHextoHsl = str => {
  return rgb2hsl(hex2rgb(str));
};

export const keepHueInRange = hue => {
  hue = Number(hue);
  while (hue >= 360 || hue < 0) {
    hue = hue >= 360 ? hue - 360 : hue < 0 ? hue + 360 : hue;
  }
  return hue;
};

export const keepPercentinRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
