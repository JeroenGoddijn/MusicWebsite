let express = require('express');
let router = express.Router();

// define required data files
let artistFile = require('../data/artist.json');
let albumsFile = require('../data/albums.json');

// build index.html content
router.get('/', (req, res) => {

    let artistName = artistFile.name;
    let artistID = artistFile.id;
    let artistURI = artistFile.uri;

    console.log(`We've found ${artistName} with SpotifyID ${artistID} and SpotifyURI ${artistURI}`);

    let albumNames = [];
    let albumCovers = [];
    let albumIDs = [];

    // API GET albums url = 	`https://api.spotify.com/v1/artists/${artistID}/albums`
    // API GET album-tracks url = 	`https://api.spotify.com/v1/albums/{albumID}/tracks`

    albumsFile.items.forEach((item) => {
        console.log(item);
        albumNames = albumNames.concat(item.name);
        albumCovers = albumCovers.concat(item.images[0].url);
        albumIDs = albumIDs.concat(item.id);
        console.log(albumNames);
        console.log(albumCovers);
        console.log(albumIDs);
    });
    
    res.render('index', {
        pageTitle: artistName,
        albumNames: albumNames,
        albumCovers: albumCovers,
        albumIDs: albumIDs
    })
});

module.exports = router;