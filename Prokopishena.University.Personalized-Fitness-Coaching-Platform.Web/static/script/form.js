document.addEventListener('DOMContentLoaded', function () {
    const loginBlock = document.querySelector('.login');
    const signUpBlock = document.querySelector('.sign-up');
    const signUpLink = document.getElementById('sign-up-link');
    const loginLink = document.getElementById('login-form-link');
  
    if (signUpLink && loginLink) {
      signUpLink.addEventListener('click', function (event) {
        event.preventDefault();
        loginBlock.style.display = 'none';
        signUpBlock.style.display = 'block';
      });
  
      loginLink.addEventListener('click', function (event) {
        event.preventDefault();
        signUpBlock.style.display = 'none';
        loginBlock.style.display = 'block';
      });
    } else {
      console.error('One or both of the links are not found.');
    }
});