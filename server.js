//Khai báo thư viện express
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//Khai báo đường dẫn để dùng dễ dàng
const booksRoute = require('./routes/booksRoute'); //Đường dẫn cho bookRoute 
const accountRoute = require('./routes/accountRoute'); //Đường dẫn cho accountRoute 
var cookieParser = require('cookie-parser');

//Dùng 2 đường dẫn vừa khai báo
app.use('/api/books/', booksRoute)
app.use('/api/auth/', accountRoute)
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json('Hello')
})

//Khởi động server 
app.listen('3000', () => {
  console.log('Server is running on http://localhost:3000');
})




