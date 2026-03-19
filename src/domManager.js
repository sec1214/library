export const render = (myLibrary) => {
  // 1. Match the ID from your template.html
  const display = document.querySelector("#bookInfoDisplay");

  // 2. Clear the current display
  display.innerHTML = "";

  // 3. Loop through and build cards using your CSS classes
  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");

    // Using .card to match your CSS
    bookCard.classList.add("card");

    // Add content with the correct button classes
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
