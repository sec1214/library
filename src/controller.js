import { render } from "./domManager.js";
import { Book } from "./book.js";
import { saveLibrary, loadLibrary } from "./storage.js";

let myLibrary = loadLibrary();

export const initController = () => {
  const dialog = document.querySelector("#bookFormDialog");
  const newBookBtn = document.querySelector("#newBookButton");
  const cancelBtn = document.querySelector("#cancelButton");
  const bookForm = document.querySelector("#bookForm");
  const display = document.querySelector("#bookInfoDisplay");

  // Initial render to show saved books
  render(myLibrary);

  // Open/Close Dialog
  newBookBtn.addEventListener("click", () => dialog.showModal());
  cancelBtn.addEventListener("click", () => dialog.close());

  // Handle Form Submission
  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#read").checked;

    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);

    saveLibrary(myLibrary);
    render(myLibrary);

    bookForm.reset();
    dialog.close();
  });

  // Handle Clicks on the Book Cards (Delete & Toggle)
  display.addEventListener("click", (e) => {
    const target = e.target;
    const index = target.dataset.index;

    if (index === undefined) return;

    // Updated class names to match CSS/domManager
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
