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
let moment = require('moment')
let rowdy = require('rowdy-logger')

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log(SECRET_SESSION);

rowdy.begin(app)

app.set('view engine', 'ejs')

app.use(require('morgan')('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(layouts)
app.use(express.static(__dirname + '/public/'))
app.use(methodOverride(`_method`));


// middleware that allows us to access the 'moment' library in every EJS view
app.use((req, res, next) => {
  res.locals.moment = moment
  next()
})

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

// Renders User Profile
app.get('/profile', isLoggedIn, (req, res) => {
  const user = req.user.get()
  db.fave.findAll()
  .then(favoriteBooks => {
    res.render('profile', {favoriteBooks, user});
  })
  
});

// // GET / - display homepage
// app.get('/', (req, res) => {
//   res.render('index');
// });

// GET / - display all articles and their authors
app.get('/', (req, res) => {
  db.article.findAll({
    include: [db.author]
  }).then((articles) => {
    res.render('index', { articles: articles })
  }).catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

// POST / - adds comments to article
app.post('/comments', (req, res) => {
  db.comment
    .create({
      content: req.body.content,
      name: req.body.name,
      articleId: req.body.articleId,
    })
    .then(res.redirect(`articles/${req.body.articleId}`))
    .catch(err => console.log(err));
});

// GET / Renders Search Page
app.get('/search', isLoggedIn, (req,res) => {
  res.render('search');
})

// GET / uses google book api to display books on results page
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

// profile is library
app.post('/faves', isLoggedIn, function(req, res) {
  db.fave.create(req.body)   
  .then( b =>{
    res.redirect('/profile')
  })
})

//Delete fave from db
app.delete("/remove/:id", (req, res) => {
  db.fave.destroy({
    where: {id: req.params.id },
  });
  res.redirect("/profile");
});

// Imports all routes from the controllers file
app.use('/faves', require('./controllers/faves'));
app.use('/auth', require('./controllers/auth'));
app.use('/authors', require('./controllers/authors'))
app.use('/articles', require('./controllers/articles'))
app.use('/comments', require('./controllers/comments'))


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
  rowdy.print()
});

module.exports = server;