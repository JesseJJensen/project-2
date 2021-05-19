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

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log(SECRET_SESSION);


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);


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


app.get('/home', (req,res) => {
  res.render('home');
})

app.get('/search', (req,res) => {
  res.render('search');
})

// // movies (results from the search)
// app.get('/results', (req, res)=>{
//   let titleSearch = req.query.titleSearch
//   axios.get(`https://www.googleapis.com/books/v1/volumes?${API_KEY}&q=${titleSearch}`)
//   .then(response=>{
//       // res.send(response.data)
//       res.render('results', {results: response.data.items})
//   })
// })




app.get('/results', function(req, res) {
  let input = req.query.titleSearch;
  // console.log(input);
  let googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?${API_KEY}&q=${input}`;
  // sets a variable equal to the API path + search terms
  axios.get(googleBooksUrl).then(response => {
    // uses axios to request the JSON data from the googleBooksURL and returns it as "response"
    let searchReturn = response.data.items;
    let bookData = [];
    searchReturn.forEach( e => {
        bookData.push(e.volumeInfo)
    });
     console.log(bookData)
    res.render('results', {book: bookData});

  });
});

app.get('/results/:bookId', function(req, res) {
  let bookId = req.query.bookId;
  // console.log(input);
  let googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?${API_KEY}&q=${bookId}`;
  // sets a variable equal to the API path + search terms
  axios.get(googleBooksUrl).then(response => {
    // uses axios to request the JSON data from the googleBooksURL and returns it as "response"
    let searchReturn = response.data.items;
    let bookData = [];
    searchReturn.forEach( e => {
        bookData.push(e)
    });
    console.log(bookData)
    res.render('show', {book2: bookData});

  });
});



// app.get('/profile', (req, res) => {
//   res.render('profile');
// });

app.use('/auth', require('./controllers/auth'));

app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});

// post this to my faves table
app.post('/faves', (req, res)=>{
  console.log("Form data: ", req.body)
  db.fave.findOrCreate({
      where: {title: req.body.title,bookId: req.body.bookId},
      defaults: {authors: req.body.authors},

  })
  .then(([createdFave, wasCreated]) => {
      res.redirect('/faves')
  })
})

// GET ALL FAVORITES FROM DB
app.get('/faves', (req, res)=>{
  db.fave.findAll()
  .then(favorites=>{
      // res.send(favorites)
      res.render('faves', {favorites: favorites})
  })
})



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
