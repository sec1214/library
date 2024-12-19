// Store books in an array
const myLibrary = [];

// Constructor to create new Book objects
function Book(title, author, pages, read) {
  this.title = title; // Set the book's title
  this.author = author; // Set the book's author
  this.pages = pages; // Set the book's number of pages
  this.read = read; // Set the read status (true/false)
}

// Add a book to the library array and display it
function addBookToLibrary(bookInfo) {
  myLibrary.push(bookInfo); // Push the book object into the array
  //display book
  displayBookInfo(); // Refresh the display
}

// Function to create a delete button
//index is an argument how does createDeleteButton know its the number in the array?
function createDeleteButton(index) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");

  // FIX: Add a `data-index` attribute to store the book's index
  //setAttribute takes two paramaters name and value
  deleteButton.setAttribute("data-index", index); // This ensures the button knows which book it is tied to

  return deleteButton; // Return the button (no direct event listener here)
}

// Create the toggle read button
function createToggleReadButton(book, index) {
  const toggleReadButton = document.createElement("button");
  toggleReadButton.textContent = book.read
    ? "Not Read"
    : "Read"; // Set button text based on status
  toggleReadButton.classList.add("toggle-read-button");
  toggleReadButton.setAttribute("data-index", index); // Assign the index as a data attribute
  return toggleReadButton; // Return the button (no direct event listener here)
}

// Function to display book information
function displayBookInfo() {
  const bookDisplay = document.getElementById("bookInfoDisplay");
  bookDisplay.innerHTML = ""; // Clear previous book display

  myLibrary.forEach((book, index) => {
    // Create a card for each book
    const createCard = document.createElement("div");
    createCard.classList.add("card"); // Add a "card" style class

    // Determine read status for styling
    const readStatus = book.read ? "Read" : "Not Read";

    // Populate the card with book details
    createCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Status:</strong> ${readStatus}</p>`;

    // Append the delete button (with data-index) to the card
    createCard.appendChild(createDeleteButton(index));

    // Append the toggle read button to the card
    createCard.appendChild(createToggleReadButton(book, index));

    // Append the card to the display section
    bookDisplay.appendChild(createCard);
  });
}

// Attach a single event listener to the parent container for delete and toggle buttons
document
  .getElementById("bookInfoDisplay")
  .addEventListener("click", (event) => {
    // Check if the clicked element is a delete button
    if (event.target.classList.contains("delete-button")) {
      const index = event.target.getAttribute("data-index"); // Get the index from the data attribute
      deleteBookFromLibrary(index); // Delete the book
    }

    // Check if the clicked element is a toggle read button
    if (event.target.classList.contains("toggle-read-button")) {
      const index = event.target.getAttribute("data-index"); // Get the index from the data attribute
      toggleReadStatus(index); // Toggle the read status of the book
    }
  });

// Function to toggle read status of a book
function toggleReadStatus(index) {
  const book = myLibrary[index];
  book.read = !book.read; // Toggle the read status (true/false)
  displayBookInfo(); // Refresh the display to update the button and status
}

// Function to delete a book from the library
function deleteBookFromLibrary(index) {
  myLibrary.splice(index, 1); // Remove the book from the array
  displayBookInfo(); // Refresh the display
}

// Open the form dialog when the "Add New Book" button is clicked
const bookFormDialog = document.getElementById("bookFormDialog");
document.getElementById("newBookButton").addEventListener("click", () => {
  bookFormDialog.showModal(); // Open the dialog as a modal
});

// Handle the form submission
document.getElementById("bookForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form action (reloading the page)

  // Gather form data
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  // Create a new book object
  const newBook = new Book(title, author, pages, read);

  // Add the book to the library
  addBookToLibrary(newBook);

  // Close the dialog and reset the form
  bookFormDialog.close(); // Close the modal dialog
  document.getElementById("bookForm").reset(); // Clear all input fields
});

// Close the dialog if the "Cancel" button is clicked
document.getElementById("cancelButton").addEventListener("click", () => {
  bookFormDialog.close(); // Close the modal dialog
});
