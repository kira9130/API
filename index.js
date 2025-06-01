// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Step 4: In-memory array to store books
let books = [];
let nextId = 1;

//////////////////////////////////////////////////
// Step 5: GET /books – return all books
app.get('/books', (req, res) => {
  res.json(books);
});

//////////////////////////////////////////////////
// Step 6: POST /books – add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  const newBook = {
    id: nextId++,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

//////////////////////////////////////////////////
// Step 7: PUT /books/:id – update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

//////////////////////////////////////////////////
// Step 8: DELETE /books/:id – delete a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const deletedBook = books.splice(index, 1)[0];
  res.json(deletedBook);
});

//////////////////////////////////////////////////
// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
