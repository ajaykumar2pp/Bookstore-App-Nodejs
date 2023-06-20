const winston = require('winston');
const bookModel = require('../models/bookModel');
const Book = require('../models/bookModel')


// Logging configuration
winston.add(new winston.transports.Console());
winston.add(new winston.transports.File({ filename: 'error.log' }));

function bookController() {
    return {
        // ************************ data Get************************************//
        home(req, resp) {
            resp.render('home')
        },

        // ****************************  Book Create ******************************//

        async create(req, resp) {
            try {
                const { bookTitle, authorName, price } = req.body;
                const createBook = await bookModel.create({
                    bookTitle,
                    authorName,
                    price,
                });
                resp.status(201).json({ book: createBook });
                createBook.save();
            } catch (err) {
                winston.error('Failed to save book', err);
                resp.status(500).json({ error: 'Failed to save book' });
            }
        },

        //******************************** Book Update by Id  **************************** */
        async update(req, resp) {
            try {
                const bookId = req.params.id;
                const { bookTitle, authorName, price } = req.body;
                const updateBook = await Book.findOneAndUpdate(
                    { _id: bookId },
                    {
                        bookTitle,
                        authorName,
                        price,
                    },
                    { new: true }
                ).select('-updatedAt -createdAt -__v')
                    .sort({ _id: -1 });
                if (!updateBook) {
                    return resp.status(404).json({ error: 'Book not found' });
                }
                console.log(updateBook);
                resp.status(200).json({ book: updateBook, message: "Book Update sucessfully" });

            } catch (err) {

                winston.error(`Failed to update book with id ${req.params.id}`, err);
                resp.status(500).json({ error: 'Failed to update book' });
            }

        },

        // ********************************  Find List All Book *******************************//
        async index(req, resp) {
            try {
                const books = await Book.find().select('-updatedAt -createdAt -__v').sort({ _id: -1 });
                resp.json({ "books": books });
            } catch (err) {
                // console.error('Failed to fetch books', err);
                winston.error('Failed to fetch books', err);
                resp.status(500).json({ error: 'Failed to fetch books' });
            }
        },

        //**********************************  Find One Book  ******************************** */
        async find(req, resp) {
            try {
                const bookId = req.params.id;
                const findOneBook = await Book.findOne({ _id: bookId }).select('-updatedAt -createdAt -__v');
                if (!findOneBook) {
                    return resp.status(404).json({ error: 'Book not found' });
                }
                resp.json(findOneBook);
            } catch (err) {
                winston.error(`Failed to fetch book with id ${req.params.id}`, err);
                resp.status(500).json({ error: 'Failed to fetch book' });
            }
        },
        // ********************************  Delete Book by Id  ******************************//
        async delete(req, resp,) {
            try {
                const bookId = req.params.id;
                const deleteBook = await Book.findByIdAndRemove(bookId);
                if (!deleteBook) {
                    return resp.status(404).json({ error: 'Book not found' });
                }
                resp.json({ message: 'Book deleted successfully' });
            } catch (err) {
                winston.error(`Failed to delete book with id ${req.params.id}`, err);
                resp.status(500).json({ error: 'Failed to delete book' });
            }
        },

    }
}
module.exports = bookController

