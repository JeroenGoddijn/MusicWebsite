var request = require('request');
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

// get Spotify app token
app.get('/token', function(req, resp) {
    resp.header('Access-Control-Allow-Origin', '*');
    resp.header('Access-Control-Allow-Headers', 'X-Requested-With');
  
    var client_id = process.env.SPOTIFY_CLIENT_ID;
    var client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  
    // your application requests authorization
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64')
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        resp.json({ token: body.access_token });
      }
    });
  });

// start server
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});