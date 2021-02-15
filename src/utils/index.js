import firebase from '../firebase';

export const echo = (...args) => console.log(...args);

export const parseCookies = () => {
  return document.cookie.split(/; */).reduce((obj, str) => {
    if (str === '') return obj;
    const eq = str.indexOf('=');
    const key = eq > 0 ? str.slice(0, eq) : str;
    let val = eq > 0 ? str.slice(eq + 1) : null;
    if (val !== null)
      try {
        val = decodeURIComponent(val.replace(/"+/g, ''));
      } catch (ex) {
        return null;
      }
    obj[key] = val;
    return obj;
  }, {});
};

export const checkCookies = function () {
  let firstCookie = document.cookie;
  return function () {
    const currentCookie = document.cookie;

    if (firstCookie !== currentCookie) {
      if (Object.values(parseCookies()).length) {
        echo('User refreshed or did something but is still signed in');
      } else {
        echo('User has cleared cookies so we should sign out');
        firebase.auth().signOut();
      }
      firstCookie = currentCookie;
    }
  };
};

function getProvider(providerId) {
  switch (providerId) {
    case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
      return new firebase.auth.GoogleAuthProvider();
    case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
      return new firebase.auth.FacebookAuthProvider();
    case firebase.auth.GithubAuthProvider.PROVIDER_ID:
      return new firebase.auth.GithubAuthProvider();
    default:
      throw new Error(`No provider implemented for ${providerId}`);
  }
}

const supportedPopupSignInMethods = [
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  firebase.auth.GithubAuthProvider.PROVIDER_ID,
];

export async function loginWith(provider) {
  try {
    await firebase.auth().signInWithRedirect(provider);
  } catch (err) {
    if (
      err.email &&
      err.credential &&
      err.code === 'auth/account-exists-with-different-credential'
    ) {
      const providers = await firebase.auth().fetchSignInMethodsForEmail(err.email);
      const firstPopupProviderMethod = providers.find((p) =>
        supportedPopupSignInMethods.includes(p)
      );

      if (!firstPopupProviderMethod) {
        throw new Error(`Your account is linked to a provider that isn't supported.`);
      }

      const linkedProvider = getProvider(firstPopupProviderMethod);
      linkedProvider.setCustomParameters({ login_hint: err.email });

      const result = await firebase.auth().signInWithPopup(linkedProvider);
      result.user.linkWithCredential(err.credential);
    }
  }
}

window.parseCookies = parseCookies;
