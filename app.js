const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());



// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://rissasanmiguel:button@cluster0.npaw6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// //create a cookie
// app.get('/set-cookies', (req, res)=> {
//   // res.setHeader('Set-Cookie', 'newUser=true');

//   //does the same as setHeader, looks cleaner
//   res.cookie('newUser', false);
//   res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
//   res.send('You got the cookie, check the Application tab in the inspect tool!')
// })


// //read a cookie
// app.get('/read-cookies', (req, res)=> {

//   const cookies = req.cookies;
//   console.log(cookies.newUser)

//   res.json(cookies)

// })