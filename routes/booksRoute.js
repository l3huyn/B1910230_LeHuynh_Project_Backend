//Khai báo thư viện express 
const express = require('express');
const router = express.Router();

//Khai báo đường dẫn qua file BooksController bên folder controller
const BooksController = require('../controllers/booksController');

//Khai báo các phương thức kèm đường dẫn
router.get('/profile/:id', BooksController.getBooksByUser);
router.get('/', BooksController.getBooks);
router.get('/:id', BooksController.getOneBook);
router.post('/', BooksController.postBooks);
router.delete('/:id', BooksController.deleteOneBook);
router.patch('/:id', BooksController.updateOneBook);


module.exports = router;