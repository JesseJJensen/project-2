const db = require('../models');

const fetchAllArticles = () => {
    db.article.findAll()
    .then(articles => {
        console.log(articles);
    })
}

fetchAllArticles();
