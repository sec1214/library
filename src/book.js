export function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//method to the prototype to save memory
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};
