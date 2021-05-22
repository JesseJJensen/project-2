const db = require('../models');

const fetchAllAuthors = () => {
    db.author.findAll()
    .then(authors => {
        console.log(authors);
    })
}

fetchAllAuthors();
