import * as jdenticon from 'jdenticon';
// import { convertHslToHex, keepHueInRange } from './colors';

// const random = (n) => {
//   return Math.floor(Math.random() * (n + 1));
// };

// const getRandomColorPalette = () => {
//   const primary = random(360);
//   const shiftBy = keepHueInRange(primary - 150);
//   const hsl = { h: shiftBy, s: 29, l: 65 };
//   const background = convertHslToHex(hsl);
//   return { primary, background };
// };


// const defaultConfig = {};


export const createIcon = (hash, color, config) => {
  hash = hash || Date.now().toString();
  // const { primary } = getRandomColorPalette();
  const size = 40;
  console.log({ color });

  config = config || {
    hues: [ color ],
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


// const renderIcon = (id, svgString) => {
//   const doc = new DOMParser().parseFromString(svgString, "application/xml");
//   const div = document.getElementById(id);
//   div.appendChild(document.adoptNode(doc.documentElement));

//   //div.replaceWith(div.ownerDocument.importNode(doc.documentElement, true));
//   // div.appendChild(div.ownerDocument.importNode(doc.documentElement, true));
// };

// var interval = setInterval(() => {

//   const div = document.getElementById("box");

//   renderIcon("box", icon);
// }, 1000);

// clearInterval(interval);
// // const icon = jdenticon.toSvg(Date.now().toString(), 200, config);
// // renderIcon("box", icon);

// for (const key in map) {
//   const svgString = jdenticon.toSvg(map[key], 100, config);
//   const doc = new DOMParser().parseFromString(svgString, 'application/xml');
//   const grid = document.querySelector('.grid');
//   grid.appendChild(grid.ownerDocument.importNode(doc.documentElement, true));
//   // grid.appendChild(div)
// }
;
