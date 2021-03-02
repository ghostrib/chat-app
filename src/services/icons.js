import * as jdenticon from 'jdenticon';

function removeHash(str) {
  return str.charAt(0) === '#' ? str.slice(1) : str;
}

function toFloat(n) {
  return Number(n.toFixed(2));
}

function hex2rgb(str) {
  str = removeHash(str);
  const r = parseInt(str.substring(0, 2), 16);
  const g = parseInt(str.substring(2, 4), 16);
  const b = parseInt(str.substring(4, 6), 16);
  return { r, g, b };
}


function rgb2hsl({ r, g, b }) {
  const [ R, G, B ] = [ r, g, b ].map((n) => (n /= 255));
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

  return { hue: h, saturation: s, lightness: l };
}

function hex2hsl(str) {
  const rgb = hex2rgb(str);
  const hsl = rgb2hsl(rgb);
  return hsl;
}


export const createIcon = (hash, color, config) => {
  hash = hash || Date.now().toString();
  const size = 40;
  const { hue } = hex2hsl(color);
  console.log({ color, hue });

  config = config || {
    hues: [ hue ],
    lightness: {
      color: [ 0.15, 0.4 ],
      grayscale: [ 0.15, 0.4 ],
    },
    saturation: {
      color: 1,
      grayscale: 1,
    },
    // backColor: '#e6e6e6',
    // backColor: background, // + '80',
    padding: 0.06,
  };
  return jdenticon.toSvg(hash, size, config);
};

window.createIcon = createIcon;

