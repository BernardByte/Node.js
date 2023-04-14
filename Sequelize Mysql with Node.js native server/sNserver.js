const http = require('http');
const db_connection = require("./models/db")
const Book = require('./models/book')


// Create an HTTP server
const server = http.createServer(async (req, res) => {

  if(req.url==='/books' && req.method ==='GET'){
  try {
    // Fetch all books from the database
    let books = await Book.findAll();
    // Send the response to the client
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(books));
  } catch (err) {
    console.error('Error fetching books: ' + err.stack);
    res.statusCode = 500;
    res.end();
  }
}else if (req.url === '/books' && req.method === 'POST') {
  // Create a new book
  try {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    // req.on(eventName,function)
    req.on('end', async () => {
      let book = JSON.parse(body);
      let newBook = await Book.create(book);
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(newBook));
    });
  } catch (err) {
    console.error('Error creating book: ' + err.stack);
    res.statusCode = 500;
    res.end();
  }

}else if (req.url.match(/\/books\/(\d+)/) && req.method === 'GET') {
  // Fetch a single book by ID
  const bookId = req.url.split('/')[2];
  try {
    const book = await Book.findByPk(bookId);
    if (book) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(book));
    } else {
      res.statusCode = 404;
      res.end();
    }
  } catch (err) {
    console.error('Error fetching book: ' + err.stack);
    res.statusCode = 500;
    res.end();
  }

}else if (req.url.match(/\/books\/(\d+)/) && req.method === 'PUT') {
  // Update a book by ID
  const bookId = req.url.split('/')[2];
  try {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      let book = JSON.parse(body);
      let updatedBook = await Book.update(book, {
        where: { id: bookId }
      });
      if (updatedBook[0] === 1) {
        res.setHeader('Content-Type', 'application/json');
        let updatedBook = await Book.findByPk(bookId); // Fetch updated book
        res.end(JSON.stringify(updatedBook));
      } else {
        res.statusCode = 404;
        res.end();
      }
    });
  } catch (err) {
    console.error('Error updating book: ' + err.stack);
    res.statusCode = 500;
    res.end();
  }
} else if (req.url.match(/\/books\/(\d+)/) && req.method === 'DELETE') {
  // Delete a book by ID
  const bookId = req.url.split('/')[2];
  try {
    const deletedBook = await Book.destroy({
      where: { id: bookId }
    });
    if (deletedBook) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: `Book deleted successfully with id : ${bookId}` }));
    } else {
      res.statusCode = 404;
      res.end();
    }
  } catch (err) {
    console.error('Error deleting book: ' + err.stack);
    res.statusCode = 500;
    res.end(JSON.stringify(error.stack));
  }
}

});

// Synchronize the model with the database and start the server
// Book.sync().then(() => {
  server.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
// });
