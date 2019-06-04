
let express = require('express');
let app = express();

let port = 8888;

// set public site folder
app.use(express.static('public'));

// set view engine and folder
app.set('view engine', 'ejs');
app.set('views', 'views');

// define routes for each page
app.use(require('./routes/index.js'));
app.use(require('./routes/albumdetails.js'));


// start server
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});