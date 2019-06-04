let express = require('express');
let router = express.Router();

// define required data files
let artistFile = require('../data/artist.json');
let albumsFile = require('../data/albums.json');

// build albumdetails.html content
router.get('/albumdetails/:id/:name', (req, res) => {
    let albumID = req.params.id;
    let albumName = req.params.name;
    console.log(albumID);
    let url = 'https://api.spotify.com/v1/albums/' + albumID +'/tracks';
    console.log(url);
    var albumTracks = (albumID, callback) => {
        console.log(url);
        $.ajax({
            url: url,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization:
                  'Bearer ' +
                  token
              },
        
            success: function (res) {
                console.log('response:',res);
                callback(res);
            }
        });
    }
    console.log(JSON.stringify(albumTracks));

    res.render('albumdetails', {
        pageTitle: albumID,
        trackList: albumTracks
        // albumName: albumName,
        // albumCover: albumCover,
        // albumReleaseDate: albumReleaseDate,
        // albumTotalTracks: albumTotalTracks
    })
});


// router.get('/albumdetails/:id/:name', (req, res) => {

//     console.log(req.params.id);
//     let albumID = req.params.id;
//     let albumName = req.params.name;

//     albumsFile.items.forEach((item) => {
//         if (item.id === req.params.id) {
//             let albumIndex = albumsFile.items.indexOf(item);
//             let albumName = albumsFile.items[albumIndex].name;
//             let albumCover = albumsFile.items[albumIndex].images[0].url;
//             let albumReleaseDate = albumsFile.items[albumIndex].release_date;
//             let albumTotalTracks = albumsFile.items[albumIndex].total_tracks;

//             console.log(albumIndex);
//             console.log(albumName);
//             console.log(albumCover);
//             console.log(albumReleaseDate);
//             console.log(albumTotalTracks);

//             res.render('albumdetails', {
//                 pageTitle: albumID,
//                 albumName: albumName,
//                 albumCover: albumCover,
//                 albumReleaseDate: albumReleaseDate,
//                 albumTotalTracks: albumTotalTracks
//             })
//         }
//     });
// });


module.exports = router;