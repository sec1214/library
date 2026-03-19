// controller.js

import { render, displayError, clearErrors } from "./domManager.js";
import { Book } from "./book.js";
import { saveLibrary, loadLibrary } from "./storage.js";

let myLibrary = loadLibrary();

export const initController = () => {
  const dialog = document.querySelector("#bookFormDialog");
  const newBookBtn = document.querySelector("#newBookButton");
  const cancelBtn = document.querySelector("#cancelButton");
  const bookForm = document.querySelector("#bookForm");
  const display = document.querySelector("#bookInfoDisplay");

  render(myLibrary);

  newBookBtn.addEventListener("click", () => {
    clearErrors();
    bookForm.reset();
    dialog.showModal();
  });

  cancelBtn.addEventListener("click", () => dialog.close());

  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors(); // Clear previous errors before re-validating

    const title = document.querySelector("#title").value.trim();
    const author = document.querySelector("#author").value.trim();
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#read").checked;

    let hasError = false;

    // Validation Logic
    if (!title) {
      displayError("title", "The book title must be filled!");
      hasError = true;
    }
    if (!author) {
      displayError("author", "The author name must be filled!");
      hasError = true;
    }

    if (hasError) return; // Stop the function here if validation fails

    // Proceed if valid
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);

    saveLibrary(myLibrary);
    render(myLibrary);

    bookForm.reset();
    dialog.close();
  });

  display.addEventListener("click", (e) => {
    const target = e.target;
    const index = target.dataset.index;
    if (index === undefined) return;

    if (target.classList.contains("delete-button")) {
      myLibrary.splice(index, 1);
      saveLibrary(myLibrary);
    } else if (target.classList.contains("toggle-read")) {
      myLibrary[index].read = !myLibrary[index].read;
      saveLibrary(myLibrary);
    }
    render(myLibrary);
  });
};
