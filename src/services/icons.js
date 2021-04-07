import * as jdenticon from 'jdenticon';
import { convertHslToHex, keepHueInRange, convertHextoHsl, keepPercentinRange } from './colors';

const randomColor = () => {
  return `#${Math.random().toString(16).slice(2, 8)}`;
};

const groupColors = (color) => {
  let { h } = convertHextoHsl(color);
  h = h <= 75 || h >= 165 ? h : keepHueInRange(h + h);
  // trying to avoid a wash of green

  const hue1 = keepHueInRange(h + 45);
  const hue2 = keepHueInRange(h - 45);
  const sat1 = keepPercentinRange(90, 100);
  const sat2 = keepPercentinRange(90, 100);
  const light1 = keepPercentinRange(70, 80);
  const light2 = keepPercentinRange(70, 80);

  const hue = h;
  const sat = keepPercentinRange(90, 100);
  const light = keepPercentinRange(60, 80);

  const main = convertHslToHex({ h: hue, s: sat, l: light });
  const alt1 = convertHslToHex({ h: hue1, s: sat1, l: light1 });
  const alt2 = convertHslToHex({ h: hue2, s: sat2, l: light2 });

  const colors = [ main, alt2, alt1 ];
  return colors;
};

export const createIcon = (hash, background = '#0000', size = 100) => {
  const colors = groupColors(randomColor());
  colors.push(background);
  let icon = jdenticon.toSvg(hash, size, { backColor: '#ffffff', padding: 0.115 });
  icon.match(/#[a-fA-F0-9]{6}/g).forEach((match) => {
    icon = icon.replace(match, colors[colors.length - 1]);
    colors.pop();
  });
  return icon;
};

