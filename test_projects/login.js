// UI VARS
const form = document.querySelector("#task-form");
const login = document.querySelector("#login");
const username = document.querySelector("#uName");
const password = document.querySelector("#pWord");
const h1 = document.querySelector("#h1");
const clear = document.querySelector("#clear");
// Load all event Listeners
loadEventListeners();

function loadEventListeners() {
  //  Login form event
  form.addEventListener("submit", registerTask);
  //  Register form event
  login.addEventListener("click", LoginTask);
  // Clear local storage event
  clear.addEventListener("click", clearTask);
}
// REGISTER W/ CONDITION IF AND SEND TO ANOTHER FUNCTION
function registerTask(e) {
  if (username === "" && password === "") {
  }

  storeInsideLocalStorage(username.value, password.value);
  username.value = "";
  password.value = "";
  e.preventDefault();
}
// INSERTING INSIDE THE LOCAL STORAGE WITH AN OBJECT ARRAY
function storeInsideLocalStorage(username, password) {
  let users;

  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
}

// LOGIN AND FINDING IF USER AND PASS MATCHES INSIDE THE STORAGE
function LoginTask(e) {
  let users;

  if (localStorage.getItem("users") === null) {
    users = [];
  } else {
    users = JSON.parse(localStorage.getItem("users"));
  }
  for (i = 0; i < users.length; i++) {
    if (
      users[i].username === username.value &&
      users[i].password === password.value
    ) {
      h1.innerHTML = `Welcome: ${username.value}`;
      username.value = "";
      password.value = "";
      break;
    } else {
      h1.innerHTML = `Invalid Login of ${username.value}`;
    }

    e.preventDefault();
  }
}

// CLEAR THE KEY USED FOR STORAGE
function clearTask(e) {
  localStorage.removeItem("users");

  username.value = "";
  password.value = "";
  e.preventDefault();
}
