// UI VARIABLES
const login = document.querySelector("#logBtn");
const regis = document.querySelector("#regBtn");
const log = document.querySelector("#log");
const reg = document.querySelector("#reg");
const form = document.querySelector("#task-form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const h5 = document.querySelector("#h4");
const alert = document.querySelector("#alerts");
const logout = document.querySelector("#logout");

// load event listeners
login.addEventListener("click", loginAcc);
regis.addEventListener("click", regAcc);

// function register account
function regAcc(e) {
  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }
  let idnum = users.length;
  idnum++;
  if (username.value === "" && password.value === "") {
    showAlert("Enter values on both inputs", "error");
  } else if (username === users.username) {
    showAlert(
      "There is already an existing account with this username",
      "error"
    );
  } else {
    storeInsideLocalStorage(idnum, username.value, password.value);
    showAlert("Register Complete", "success");
    username.value = "";
    password.value = "";
  }

  e.preventDefault();
}

// INSERTING INSIDE THE LOCAL STORAGE WITH AN OBJECT ARRAY
function storeInsideLocalStorage(idnum, username, password) {
  let users;

  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }

  users.push({ idnum, username, password });
  localStorage.setItem("users", JSON.stringify(users));
}

// LOGIN AND FINDING IF USER AND PASS MATCHES INSIDE THE STORAGE
function loginAcc(e) {
  let users;

  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }
  users.forEach(function(user) {
    if (user.username === username.value && user.password === password.value) {
      window.location.href = "dashboard.html";
    }
  });

  e.preventDefault();
}

// ALERT MESSAGE BOX
function showAlert(message, className) {
  // Create a div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get Parent
  const container = document.querySelector(".container");

  // Insert alert
  alerts.appendChild(container.appendChild(div));

  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
}
