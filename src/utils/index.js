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
        null;
      }
    obj[key] = val;
    return obj;
  }, {});
};

export const checkCookies = function () {
  let firstCookie = document.cookie;
  return function () {
    let currentCookie = document.cookie;

    if (firstCookie !== currentCookie) {
      if (Object.values(parseCookies()).length) {
        echo('User refreshed or did something but is still signed in');
      } else {
        echo('User has cleared cookies so we should sign out');
        firebase.auth().signOut();
      }
      // console.log('cookieChanged', 'first', firstCookie, 'current', currentCookie);
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
        supportedPopupSignInMethods.includes(p),
      );

      // Test: Could this happen with email link then trying social provider?
      if (!firstPopupProviderMethod) {
        throw new Error(`Your account is linked to a provider that isn't supported.`);
      }

      const linkedProvider = getProvider(firstPopupProviderMethod);
      linkedProvider.setCustomParameters({ login_hint: err.email });

      const result = await firebase.auth().signInWithPopup(linkedProvider); //.signInWithPopup(linkedProvider);
      result.user.linkWithCredential(err.credential);
    }

    // Handle errors...
    // toast.error(err.message || err.toString());
  }
}

window.parseCookies = parseCookies;

// var watchForChanges = checkCookies();

// setInterval(watchForChanges, 100);

export function initApp() {
  // Result from Redirect auth flow.
  firebase
    .auth()
    .getRedirectResult()
    .then(function (result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;

        // The signed-in user info.
        var user = result.user;

        echo({ token, user });
      }
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
        // If you are using multiple auth providers on your app you should handle linking
        // the user's accounts here.
      } else {
        console.error(error);
      }
    });
}
