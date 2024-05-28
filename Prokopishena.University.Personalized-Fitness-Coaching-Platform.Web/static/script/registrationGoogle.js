function onGoogleSignIn(googleUser, formType) {
    const profile = googleUser.getBasicProfile();
    const email = profile.getEmail();
    const firstName = profile.getGivenName();
    const lastName = profile.getFamilyName();

    if (formType === 'login') {
      document.getElementById('login_email').value = email;
      document.getElementById('login_username').value = '';
      document.getElementById('login_password').value = '';
      document.getElementById('login-link').click();
    }

    else if (formType === 'signup') {
      document.getElementById('signup_first-name').value = firstName;
      document.getElementById('signup_last-name').value = lastName;
      document.getElementById('signup_email').value = email;
      document.getElementById('signup_password').value = '';
      document.getElementById('terms').checked = true;
      document.getElementById('sign-up-link').click();
    }
}

function signInWithGoogle(formType) {
    gapi.auth2.getAuthInstance().signIn().then((googleUser) => {
      onGoogleSignIn(googleUser, formType);
    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}