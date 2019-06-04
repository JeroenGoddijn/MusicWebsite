var templateSource = document.getElementById('album').innerHTML,
    template = Handlebars.compile(templateSource),
    resultsPlaceholder = document.getElementById('album-tracks'),
    albumID = albumID,
    audioObject = null;

var searchAlbums = function (query) {
    console.log('query is:', query);
    $.ajax({
        url: 'https://api.spotify.com/v1/albums/' + query + '/tracks',
        data: {
            market: "US",
            limit: 50
        },
        success: function (response) {
            resultsPlaceholder.innerHTML = template(response);
        }
    });
};
