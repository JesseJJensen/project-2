require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');
const API_KEY = process.env.API_KEY;
const db = require('./models')
const methodOverride = require('method-override')

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log(SECRET_SESSION);


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride(`_method`));

app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));
app.use(flash());            // flash middleware

app.use(passport.initialize());      // Initialize passport
app.use(passport.session());         // Add a session

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
});

// Renders Search Page
app.get('/search', isLoggedIn, (req,res) => {
  res.render('search');
})

app.get('/results', isLoggedIn, (req, res) => {
  const user = req.user.get()
  let input = req.query.titleSearch;
  // console.log(input);
  let googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?${API_KEY}&q=${input}`;
  // sets a variable equal to the API path + search terms
  axios.get(googleBooksUrl).then(response => {
    // uses axios to request the JSON data from the googleBooksURL and returns it as "response"
    let searchReturn = response.data.items;
    let bookData = [];
    searchReturn.forEach( e => {
        bookData.push(e)
    });
     console.log(bookData)
    res.render('results', {results: bookData, user});

  });
});

// app.get('/results/:bookId', function(req, res) {
//   let bookId = req.query.bookId;
//   // console.log(input);
//   let googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?${API_KEY}&q=${bookId}`;
//   // sets a variable equal to the API path + search terms
//   axios.get(googleBooksUrl).then(response => {
//     // uses axios to request the JSON data from the googleBooksURL and returns it as "response"
//     let searchReturn = response.data.items;
//     console.log('here is search return')
//     console.log(searchReturn)
//     //let bookData = [];
//     searchReturn.forEach( e => {
//         bookData.push(e)
//     });
//     console.log('here is book data .id')
//     console.log(bookData[0].id)
//     res.render('show', {book: bookData});

//   });
// });

// app.get('/results/:bookId', (req, res)=>{
//   let bookId = req.query.bookId
//   axios.get(`https://www.googleapis.com/books/v1/volumes?${API_KEY}&q=${bookId}`)
//   .then(response=>{
//       console.log(response.data)
//       res.render('show', {book: response.data.items})
//   })
// })

// Renders User Profile
app.get('/profile', isLoggedIn, (req, res) => {
  const user = req.user.get()
  db.fave.findAll()
  .then(favoriteBooks => {
    res.render('profile', {favoriteBooks, user});
  })
  
});

app.post('/faves', isLoggedIn, function(req, res) {
  db.fave.create(req.body)   
  .then( b =>{
    res.redirect('/profile')
    // profile page is bookshelf
  })
})
// GET ALL FAVORITES FROM DB
// app.get('/faves', (req, res)=>{
//   db.fave.findAll()
//   .then(favorites=>{
//       // res.send(favorites)
//       res.render('faves', {favorites: favorites})
//   })
// })

app.delete("/remove/:id", (req, res) => {
  db.fave.destroy({
    where: {id: req.params.id },
  });
  res.redirect("/profile");
});
// app.delete('/:id', (req, res) => {
//   // Delete from the join table
//   db.faves.destroy({
//     where: { categoryId: req.params.id }
//   })
//   .then(() => {
//     // Now I am free to delete the category itself
//     db.category.destroy({
//       where: { id: req.params.id }
//     })
//     .then(destroyedCategory => {
//       res.redirect('/categories')
//     })
//     .catch(err => {
//       console.log('Oh no what happened', err)
//       res.render('main/404')
//     })
//   })
//   .catch(err => {
//     console.log('Oh no what happened', err)
//     res.render('main/404')
//   })
// })

// Imports all routes from the not pokemon controllers file
app.use('/faves', require('./controllers/faves'));
app.use('/auth', require('./controllers/auth'));
app.use('/authors', require('./controllers/authors'))
app.use('/articles', require('./controllers/articles'))
app.use('/comments', require('./controllers/comments'))


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;