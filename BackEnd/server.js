// Importing necessary modules for creating an Express app
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Configuring middleware to enable CORS and handle request headers
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Configuring middleware to parse JSON and URL-encoded data in requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Function to connect to the MongoDB database using Mongoose
async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/DB14?retryWrites=true&w=majority');
}

// Calling the main function to connect to the database
main().catch(err => console.log(err));

// Defining a Mongoose schema for the 'my_books' collection
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String,
});

// Creating a Mongoose model based on the schema
const bookModel = mongoose.model('my_books', bookSchema);

// Handling HTTP DELETE requests to delete a book by ID
app.delete('/api/book/:id', async (req, res) => {
  console.log("Delete: " + req.params.id);

  // Finding and deleting the book by ID
  let book = await bookModel.findByIdAndDelete(req.params.id);

  // Sending the deleted book as a response
  res.send(book);
});

// Handling HTTP POST requests to create a new book
app.post('/api/book', (req, res) => {
  console.log(req.body);

  // Creating a new book using the data in the request body
  bookModel
    .create({
      title: req.body.title,
      cover: req.body.cover,
      author: req.body.author,
    })
    .then(() => {
      // Sending a success response if the book is created
      res.send('Book Created');
    })
    .catch(() => {
      // Sending an error response if the book creation fails
      res.send('Book NOT Created');
    });
});

// Handling HTTP GET requests for the root path
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Handling HTTP GET requests to fetch all books
app.get('/api/books', async (req, res) => {
  // Fetching all books from the database
  let books = await bookModel.find({});
  // Sending the books as a JSON response
  res.json(books);
});

// Handling HTTP GET requests to fetch a book by ID
app.get('/api/book/:identifier', async (req, res) => {
  console.log(req.params.identifier);
  // Fetching a book by ID from the database
  let book = await bookModel.findById(req.params.identifier);
  // Sending the book as a response
  res.send(book);
});

// Handling HTTP PUT requests to update a book by ID
app.put('/api/book/:identifier', async (req, res) => {
  console.log('Edit: ' + req.params.identifier);
  // Finding and updating the book by ID with the data in the request body
  let book = await bookModel.findByIdAndUpdate(req.params.identifier, req.body, { new: true });
  // Sending the updated book as a response
  res.send(book);
});

// Starting the Express app and listening on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
