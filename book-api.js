const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = 3000

let books = [{
    "resid": "1",
    "restaurent": "Harish Restaurent",
    "item1": "pizza",
    "item2": "burger",
    "item3": "maggi",
    "item4": "biryani",
},
// {
//     "resid": "9781449331818",
//     "title": "Learning JavaScript Design Patterns",
//     "author": "Addy Osmani",
//     "publish_date": "2012-07-01",
//     "publisher": "O'Reilly Media",
//     "numOfPages": 254,
// },
// {
//     "resid": "9781449365035",
//     "title": "Speaking JavaScript",
//     "author": "Axel Rauschmayer",
//     "publish_date": "2014-02-01",
//     "publisher": "O'Reilly Media",
//     "numOfPages": 460,
];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const book = req.body;

    // output the book to the console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

app.get('/book', (req, res) => {
    res.json(books);
});

app.get('/book/:resid', (req, res) => {
    // reading isbn from the URL
    const resid = req.params.resid;

    // searching books for the isbn
    for (let book of books) {
        if (book.resid === resid) {
            res.json(book);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});

app.delete('/book/:resid', (req, res) => {
    // reading isbn from the URL
    const resid = req.params.resid;

    // remove item from the books array
    books = books.filter(i => {
        if (i.resid !== resid) {
            return true;
        }

        return false;
    });

    // sending 404 when not found something is a good practice
    res.send('Book is deleted');
});

app.post('/book/:resid', (req, res) => {
    // reading isbn from the URL
    const resid = req.params.resid;
    const newBook = req.body;

    // remove item from the books array
    for (let i = 0; i < books.length; i++) {
        let book = books[i]

        if (book.resid === resid) {
            books[i] = newBook;
        }
    }

    // sending 404 when not found something is a good practice
    res.send('Book is edited');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));