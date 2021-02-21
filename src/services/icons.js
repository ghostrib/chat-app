import * as jdenticon from 'jdenticon';
import { convertHslToHex, keepHueInRange } from './colors';

const random = (n) => {
  return Math.floor(Math.random() * (n + 1));
};

const getRandomColorPalette = () => {
  const primary = random(360);
  const shiftBy = keepHueInRange(primary - 150);
  const hsl = { h: shiftBy, s: 29, l: 65 };
  const background = convertHslToHex(hsl);
  return { primary, background };
};


export const createIcon = (hash, size = 40) => {
  hash = hash || Date.now().toString();
  const { primary, background } = getRandomColorPalette();

  const config = {
    hues: [ primary ],
    lightness: {
      color: [ 0.15, 0.4 ],
      grayscale: [ 0.15, 0.4 ],
    },
    saturation: {
      color: 1,
      grayscale: 1,
    },
    backColor: '#e6e6e6',
    // backColor: background, // + '80',
    padding: 0.06,
  };
  return jdenticon.toSvg(hash, size, config);
};

window.createIcon = createIcon;
