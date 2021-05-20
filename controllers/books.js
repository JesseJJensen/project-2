const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const db = require('../models');



  


// // Get /show - return page with book details
// router.get('./results/:bookId', function(req, res) {
//     let bookId = req.query.bookId;
//     // console.log(input);
//     let googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?${API_KEY}&q=${bookId}`;
//     // sets a variable equal to the API path + search terms
//     axios.get(googleBooksUrl).then(response => {
//       // uses axios to request the JSON data from the googleBooksURL and returns it as "response"
//       let searchReturn = response.data.items;
//       console.log('here is search return')
//       console.log(searchReturn)
//       let bookData = [];
//       searchReturn.forEach( e => {
//           bookData.push(e)
//       });
//       console.log('here is book data .id')
//       console.log(bookData[0].id)
//       res.render('show', {book: bookData});
  
//     });
//   });

module.exports = router;