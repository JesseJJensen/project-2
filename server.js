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



app.get('/home', isLoggedIn, (req, res) => {
  db.post.findAll()
  .then( foundPosts => {
    let allPosts = [];
    foundPosts.forEach(post =>{
      allPosts.push(post.dataValues)
    })
    res.render('home', {allPosts});
  })
});

// Renders Page to Create a New Post
app.get('/new', isLoggedIn, (req,res) => {
  const user = req.user.get()
  res.render('new', {user})
})

// Renders Info on a Specific Post to the Page
app.get('/home/:title', isLoggedIn, (req,res) => {
  const user = req.user.get()
  db.post.findOne({
    where: 
    {title: req.params.title}
    // include: [db.comment]
  })
  .then(thisPost => {
    let postData = thisPost
    // let allComments = thisPost.dataValues.comments
    console.log(`~~~~~~~~Here is post data~~~~~~~~~`)
    console.log(postData)
    // res.render('show', {postData, allComments, user});
    res.render('show', {postData, user})
   
  })
});







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
        bookData.push(e)
    });
     console.log(bookData)
    res.render('results', {results: bookData});

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
    console.log('here is search return')
    console.log(searchReturn)
    let bookData = [];
    searchReturn.forEach( e => {
        bookData.push(e)
    });
    console.log('here is book data .id')
    console.log(bookData[0].id)
    res.render('show', {book: bookData});

  });
});

// app.get('/results/:bookId', (req, res)=>{
//   let bookId = req.query.bookId
//   axios.get(`https://www.googleapis.com/books/v1/volumes?${API_KEY}&q=${bookId}`)
//   .then(response=>{
//       console.log(response.data)
//       res.render('show', {book: response.data.items})
//   })
// })

app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});

// post this to my faves table
app.post('/faves', (req, res)=>{
  console.log("Form data: ", req.body)
  db.fave.findOrCreate({
      where: {title: req.body.title,authors: req.body.authors},
      defaults: {bookId: req.body.bookId},
  })
  .then(([createdFave, wasCreated]) => {
    console.log(wasCreated)
    console.log(createdFave)
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

app.get('/:id', (req, res) => {
  db.article.findOne({
    where: { id: req.params.id },
    include: [db.user, db.fave]
  })
  .then((article) => {
    if (!article) throw Error()
    console.log(article.author)
    res.render('articles/show', { article: article })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

app.delete('/:id', (req, res) => {
  // Delete from the join table
  db.faves.destroy({
    where: { categoryId: req.params.id }
  })
  .then(() => {
    // Now I am free to delete the category itself
    db.category.destroy({
      where: { id: req.params.id }
    })
    .then(destroyedCategory => {
      res.redirect('/categories')
    })
    .catch(err => {
      console.log('Oh no what happened', err)
      res.render('main/404')
    })
  })
  .catch(err => {
    console.log('Oh no what happened', err)
    res.render('main/404')
  })


})


let moment = require('moment')
app.set('view engine', 'ejs')

app.use(require('morgan')('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(layouts)
app.use(express.static(__dirname + '/public/'))

// middleware that allows us to access the 'moment' library in every EJS view
app.use((req, res, next) => {
  res.locals.moment = moment
  next()
})

// GET / - display all articles and their authors
app.get('/', (req, res) => {
  db.article.findAll({
    include: [db.author]
  }).then((articles) => {
    res.render('main/index', { articles: articles })
  }).catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})

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

// Imports all routes from the pokemon controllers file
// app.use('/books', require('./controllers/books'));
app.use('/auth', require('./controllers/auth'));
app.use('/authors', require('./controllers/authors'))
app.use('/articles', require('./controllers/articles'))
app.use('/comments', require('./controllers/comments'))



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
