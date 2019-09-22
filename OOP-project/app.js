// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

// Store constructor
function Store() {}
// Add Book to List
UI.prototype.addBookToList = function(book) {
  const list = document.querySelector("#book-list");
  // Create tr element
  const row = document.createElement("tr");
  // Insert columns
  row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href="#" class="delete">X<a></td>`;
  list.appendChild(row);
};

// Show Alert after adding/removing list
UI.prototype.showAlert = function(message, className) {
  // Create a div
  const div = document.createElement("div");
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get Parent
  const container = document.querySelector(".container");
  // Get form
  const form = document.querySelector("#book-form");
  // Insert alert
  container.insertBefore(div, form);

  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

//Remove certain book field
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.remove();
  }
};

// Clear Fields
UI.prototype.clearFields = function() {
  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#isbn").value = "";
};

// Event Listeners for adding
document.querySelector("#book-form").addEventListener("submit", function(e) {
  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  //Validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all the fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success alert
    ui.showAlert("Book Added on the list", "success");
  }
  // Clear forms after instantiating
  ui.clearFields();
  e.preventDefault();
});

// Event Listener for delete
document.querySelector("#book-list").addEventListener("click", function(e) {
  // Instantiate UI
  const ui = new UI();
  // Delete Book
  ui.deleteBook(e.target);

  // Show success deleted alert
  ui.showAlert("Book has been removed on the list", "success");
  e.preventDefault();
});

Store.prototype.getBooks = function(book) {
  let books;
  if (localStorage.getItem("books")) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem(books));
  }
};
