const myLibrary = [];


function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
}

Book.prototype.info = function() {
    const state = this.isRead ? 'already read' : 'not read yet';
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${state}`;
};

function addBookToLibrary(title, author, numPages, isRead) {
  const newBook = new Book(title, author, numPages, isRead);
  myLibrary.push(newBook);
}

function displayBooks() {
  const bookList = document.getElementById('book-list');
  // catch error with booklist not loading properly
  if (!bookList) return;
  bookList.innerHTML = '';
  myLibrary.forEach(book => {
    const div = document.createElement('div');
    div.className = 'book';
    if (book.isRead) {
      div.classList.add('read');
    }
    div.textContent = book.info();
    bookList.appendChild(div);
  });
}

// Sample books
addBookToLibrary("The Hobbit", "JRR Tolkien", 250, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);

window.onload = displayBooks;


// Modal section
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('new-book-btn');
const closeModalBtn = document.getElementById('close-modal');
const addBookForm = document.getElementById('add-book-form');

openModalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  addBookForm.reset();
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
    addBookForm.reset();
  }
});

addBookForm.addEventListener('submit', function(e) {
    // prevent default form submission behavior, we handle logic in js
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const numPages = document.getElementById('numPages').value;
    const isRead = document.getElementById('isRead').value === 'true';

  if (title && author && numPages) {
    addBookToLibrary(title, author, parseInt(numPages), isRead);
    displayBooks();
    modal.style.display = 'none';
    addBookForm.reset();
  }
});