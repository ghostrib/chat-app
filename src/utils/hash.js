// https://stackoverflow.com/a/43383990
export const generateHash = filename => {
  const strBuf = new TextEncoder('utf-8').encode(filename);
  return crypto.subtle.digest('SHA-256', strBuf).then(hash => {
    let result = '';
    const view = new DataView(hash);
    for (let i = 0; i < hash.byteLength; i += 4) {
      result += ('00000000' + view.getUint32(i).toString(16)).slice(-8);
    }
    return result;
  });
};


window.generateHash = generateHash;
