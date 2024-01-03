const textInputs = document.querySelectorAll("input");

textInputs.forEach((textInput) => {
  textInput.addEventListener("focus", () => {
    let parent = textInput.parentNode;
    parent.classList.add("active");
  });

  textInput.addEventListener("blur", () => {
    let parent = textInput.parentNode;
    parent.classList.remove("active");
  });
});

const passwordInput = document.querySelector(".password-input");
const eyeBtn = document.querySelector(".eye-btn");

eyeBtn.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeBtn.innerHTML = "<i class='uil uil-eye'></i>";
  } else {
    passwordInput.type = "password";
    eyeBtn.innerHTML = "<i class='uil uil-eye-slash'></i>";
  }
});

const signUpBtn = document.querySelector(".sign-up-btn");
const signInBtn = document.querySelector(".sign-in-btn");
const signUpForm = document.querySelector(".sign-up-form");
const signInForm = document.querySelector(".sign-in-form");

signUpBtn.addEventListener("click", () => {
  signInForm.classList.add("hide");
  signUpForm.classList.add("show");
  signInForm.classList.remove("show");
});

signInBtn.addEventListener("click", () => {
  signInForm.classList.remove("hide");
  signUpForm.classList.remove("show");
  signInForm.classList.add("show");
});

document.addEventListener("DOMContentLoaded", function () {
  function handleFormLogin(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value;
    const password = document.querySelector('#password-login').value;
    const submit = document.querySelector('#submit-login');

    if (submit) {
      submit.value = 'Loading...';
      submit.disabled = true;
    }


    fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        const res = data.data;
        if(res && res.token){
          const expirationTime = new Date().getTime() / 1000 + 3600;
          localStorage.setItem('token',res.token);
          localStorage.setItem('tokenExpiration',expirationTime);
          window.location.href = '/dashboard';
        }else {
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: data.errors || 'Gagal Login',
          });
        }
        if (submit) {
          submit.value = 'Login';
          submit.disabled = false;
        }
      })
      .catch((e) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        if (submit) {
          submit.value = 'Login';
          submit.disabled = false;
        }
      });
  }
  const loginForm = document.querySelector("#loginForm");
  loginForm.addEventListener("submit", handleFormLogin);
  
  function handleFormRegister(event){
    event.preventDefault();

    const name = document.querySelector('#name-register').value;
    const username = document.querySelector('#username-register').value;
    const password = document.querySelector('#password-register').value;
    const confirmPassword = document.querySelector('#confirmPassword-register').value;
    const submit = document.querySelector('#submit-register');

    if (submit) {
      submit.value = 'Loading...';
      submit.disabled = true;
    }

    if(confirmPassword !== password){
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text:  'Confirm Password must be match Password'
      });
      return;
    }

    const dataToSend = {
      name,
      username,
      password
    };

  fetch('http://localhost:5000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(dataToSend),
  })
    .then(response => response.json())
    .then(data => {
      if (data.data) {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have successfully registered.',
        });
        if (submit) {
          submit.value = 'Login';
          submit.disabled = false;
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: data.errors.replace(/\." /g, '"\n"')
        });
        if (submit) {
          submit.value = 'Login';
          submit.disabled = false;
        }
      }
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
      if (submit) {
        submit.value = 'Login';
        submit.disabled = false;
      }
    });
  }
  const registerForm = document.querySelector("#registerForm");
  registerForm.addEventListener("submit", handleFormRegister);

  const token = localStorage.getItem("token");

  if (token) {
    window.location.href = "/dashboard";
  }

});