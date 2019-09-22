// Book Class: Represents a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// UI Class: Handles UI tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");
    row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href="#" class= "delete-item">
                        <i class="fa fa-remove"></i></a></td>`;
    list.appendChild(row);
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector(".book-form");
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  static ClearFields() {
    document.querySelector("#bookName").value = "";
    document.querySelector("#authorName").value = "";
    document.querySelector("#isbn").value = "";
  }

  static deleteBook(el) {
    if (el.parentElement.classList.contains("delete-item")) {
      el.parentElement.parentElement.parentElement.remove();
    }
  }
}

// Store class: Handles storage
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

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn == isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
// Event to display books
document.addEventListener("DOMContentLoaded", UI.displayBooks);
// Event to add book
document.querySelector(".book-form").addEventListener("submit", e => {
  // Prevent Default Value
  e.preventDefault();
  // Get form values
  const title = document.querySelector("#bookName").value;
  const author = document.querySelector("#authorName").value;
  const isbn = document.querySelector("#isbn").value;

  // Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "error");
  } else {
    // Instantiate book
    const book = new Book(title, author, isbn);

    // Add book to display
    UI.addBookToList(book);

    // Add book to Store
    Store.addBook(book);

    // Show success message
    UI.showAlert("Book added to the list", "success");

    // Clear Fields
    UI.ClearFields();
  }
});

// Event to remove a book
document.querySelector("#book-list").addEventListener("click", e => {
  // Remove book from UI
  UI.deleteBook(e.target);
  // Remove book from store
  Store.removeBook(
    e.target.parentElement.parentElement.previousElementSibling.TextContent
  );
  console.log(
    e.target.parentElement.parentElement.previousElementSibling.TextContent
  );
  // Show success message
  UI.showAlert("Book Removed", "success");
});
// Event to remove all books
