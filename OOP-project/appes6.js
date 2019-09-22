// Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Handles UI tasks
class UI {
  addBookToList(book) {
    const list = document.querySelector("#book-list");
    // Create tr element
    const row = document.createElement("tr");
    // Insert columns
    row.innerHTML = `<td> ${book.title} </td>
                        <td> ${book.author}</td>
                        <td> ${book.isbn}</td>
                        <td><a href='#' class='delete'>X</a></td>`;
    list.appendChild(row);
  }

  showAlert(message, className) {
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
  }

  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI();
      // display local storage data
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    // Get the books array from Local Storage
    const books = Store.getBooks();

    // Iterate through the books array
    books.forEach(function(book, index) {
      // Compare if 'isbn' of the current book/item matched the 'isbn' in the parameter
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
      // if (
      //   book.isbn === isbn
      //     ? books.splice(index, 1)
      //     : console.log("Still not working")
      // );
    });
    // Returns the updated value of the books array to Local Storage
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//   Load Event Listener
document.addEventListener("DOMContentLoaded", Store.displayBooks);
// Event Listeners for adding
document.querySelector("#book-form").addEventListener("submit", function(e) {
  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  //Instantiate UI
  const ui = new UI();
  //Validate
  if (title === "" || author === "" || isbn === "") {
    // if (!title || !author || !isbn) {
    ui.showAlert("Please fill in all the fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add book to storage
    Store.addBook(book);
    // Show success alert
    ui.showAlert("Book Added on the list", "success");
  }
  // Clear forms after instantiating
  ui.clearFields();
  e.preventDefault();
});

// Event Listener for delete
document.querySelector("#book-list").addEventListener("click", function(e) {
  //Instantiate UI
  const ui = new UI();
  // Delete Book
  ui.deleteBook(e.target);
  // Delete Book from Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // Show success deleted alert
  ui.showAlert("Book has been removed on the list", "success");
  e.preventDefault();
});
