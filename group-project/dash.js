// UI Variables
const uList = document.querySelector("#user-list");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const addUser = document.querySelector("#addUser");
const alert = document.querySelector("#alerts");
// class User
class User {
  static displayUsers() {
    const users = Store.getUsers();

    users.forEach(user => User.addToList(user));
  }

  static addToList(user) {
    const list = document.querySelector("#user-list");

    const row = document.createElement("tr");
    row.innerHTML = `<td>${user.idnum}</td>
                        <td>${user.username}</td>
                        <td>${user.password}</td>
                        <td>
                            <btn class="btn-small"><i class="fa fa-wrench"></i></btn>
                            <a href="" class="btn-small delete-item"><i class="fa fa-remove"></i></a></td>`;
    list.appendChild(row);
  }

  static deleteUser(el) {
    if (el.parentElement.classList.contains("delete-item")) {
      el.parentElement.parentElement.parentElement.remove();
    }
  }

  // ALERT MESSAGE BOX
  static showAlert(message, className) {
    // Create a div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector(".container");

    // Insert alert
    alert.appendChild(container.appendChild(div));

    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

// Store Class
class Store {
  static getUsers() {
    let users;
    if (localStorage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));
    }

    return users;
  }

  static storeInsideLocalStorage(idnum, username, password) {
    let users;

    if (localStorage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));
    }

    users.push({ idnum, username, password });
    localStorage.setItem("users", JSON.stringify(users));
  }

  static removeUser(id) {
    const users = Store.getUsers();

    users.forEach((user, index) => {
      if (user.id == id) {
        users.splice(index - 1, 1);
      }
    });
    localStorage.setItem("users", JSON.stringify(users));
  }
}

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
    User.showAlert(
      "There is already an existing account with this username",
      "error"
    );
  } else {
    Store.storeInsideLocalStorage(idnum, username.value, password.value);
    User.showAlert("Register Complete", "success");
    username.value = "";
    password.value = "";
  }

  e.preventDefault();
}
// Event to display books
document.addEventListener("DOMContentLoaded", User.displayUsers);

// Add user event listener
addUser.addEventListener("click", regAcc);

// Event to remove a book
document.querySelector("#user-list").addEventListener("click", e => {
  // Remove book from UI
  User.deleteUser(e.target);
  
  // Remove book from store
  Store.removeUser(e.target.parentElement.previousElementSibling.TextContent);
  // Show success message
  User.showAlert("Book Removed", "success");
});

// Modal Trigger
$(document.querySelector("#terms")).ready(function() {
  $(".modal").modal();
});
