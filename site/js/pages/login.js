import {
  baseUrl
} from "./../api/path.js";
import {
  getStorage as getAuth,
  setStorage as setAuth
} from "./../util/storage.js";
import { printFooter, printHeader } from "../components/commonSectionsAsHtml.js";

printHeader();
printFooter();

// Selectors
const loginForm = document.querySelector("#loginForm");
const user = document.querySelector("#user");
const userError = document.querySelector("#userError");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

console.log(localStorage.getItem('auth'));

// Validation
function validateCredentials(e) {
  e.preventDefault();

  userError.style.display = checkLength(user.value, 0) ? 'none' : 'block';
  passwordError.style.display = checkLength(password.value, 0) ? 'none' : 'block';

  // validate before trying login
  login(user.value, password.value);
}

function checkLength(value, minLength) {
  return value.trim().length > minLength ? true : false;
}

loginForm.addEventListener("submit", validateCredentials);

async function login(user, pass) {
  const url = baseUrl + "auth/local";

  // disable form and start spinner?
  const data = JSON.stringify({
    identifier: user,
    password: pass
  })
  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  }

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      setAuth("auth", json);
      location.href = "./admin.html";
    }

    if (json.error) {
      alert("Invalid credentials. Try again");
      // location.href = "./admin.html";
    }

  } catch (e) {
    console.log(e);
  }

}