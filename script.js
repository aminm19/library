const myLibrary = [];


function Book(title, author, numPages, isRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

Book.prototype.info = function() {
    const state = this.isRead ? 'read' : 'not read yet';
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
    div.setAttribute('data-id', book.id);
    div.setAttribute('id', book.id);
    const readStatus = document.createElement('input');
    readStatus.setAttribute('type', 'checkbox');
    readStatus.className = book.isRead ? 'true' : 'false';
    readStatus.checked = book.isRead;
    readStatus.addEventListener('change', () => {
      book.isRead = readStatus.checked;
      displayBooks();
    });
    div.appendChild(readStatus);
    if (book.isRead) {
      div.classList.add('read');
    }
    const infoSpan = document.createElement('span');
    const titleSpan = document.createElement('span');
    titleSpan.className = 'title';
    titleSpan.textContent = `"${book.title}" `;
    infoSpan.appendChild(titleSpan);
    const authorSpan = document.createElement('span');
    authorSpan.className = 'author';
    authorSpan.textContent = `by ${book.author}, `;
    infoSpan.appendChild(authorSpan);
    const pagesSpan = document.createElement('span');
    pagesSpan.className = 'pages';
    pagesSpan.textContent = `${book.numPages} pages, `;
    infoSpan.appendChild(pagesSpan);
    const statusSpan = document.createElement('span');
    statusSpan.className = 'status';
    statusSpan.textContent = book.isRead ? 'read' : 'not read yet';
    infoSpan.appendChild(statusSpan);
    div.appendChild(infoSpan);
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deleteBtn';
    deleteBtn.addEventListener('click', () => {
      const index = myLibrary.findIndex(b => b.id === book.id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
      }
    });
    div.appendChild(deleteBtn);
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