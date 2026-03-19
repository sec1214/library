// domManager.js

export const render = (myLibrary) => {
  const display = document.querySelector("#bookInfoDisplay");
  display.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");
    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>By:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <button 
        class="toggle-read ${book.read ? "" : "not-read"}" 
        data-index="${index}">
        ${book.read ? "Read" : "Not Read"}
      </button>
      <button class="delete-button" data-index="${index}">
        Remove
      </button>
    `;
    display.appendChild(bookCard);
  });
};

// New function to handle custom validation messages
export const displayError = (inputId, message) => {
  const input = document.querySelector(`#${inputId}`);
  const errorSpan = input.nextElementSibling; // Targets the <span> after the input
  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.classList.add("active");
    input.classList.add("invalid");
  }
};

// New function to clear errors when the form resets or re-opens
export const clearErrors = () => {
  const errorSpans = document.querySelectorAll(".error-message");
  const inputs = document.querySelectorAll("input");
  errorSpans.forEach((span) => {
    span.textContent = "";
    span.classList.remove("active");
  });
  inputs.forEach((input) => input.classList.remove("invalid"));
};
