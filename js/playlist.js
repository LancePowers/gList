// var Song = require('song.js');

function Playlist(name){
  this.name = name;
  this.songs = [];
}


Playlist.prototype.clearSpaces = function(searchTerm){
  for (var i = 0; i < searchTerm.length; i++) {
    if(searchTerm.charAt(i) === ' '){
      searchTerm.charAt(i) = '+';
    }
  }
  console.log(searchTerm);
  return searchTerm;
};

Playlist.prototype.getAlbums = function(searchTerm){
  var request = $.ajax({
    url:'https://api.spotify.com/v1/search',
    method:'GET',
    data: {
      q: 'artist:'+searchTerm,
      type: 'album',
      limit: 15
    },
    dataType:'json',
  });
  request.done(function(response){
    console.log(response);
    var albums = response.albums.items;
    var display = "";
    var fullDataUrl = response.albums.items[0].href;
    this.getFullResults(fullDataUrl);
    $.each(albums, function(i, album){
      var albumName = album.name;
      var albumImage = album.images[0].url;
      var spotifyLink = album.external_urls.spotify;
      display = '<img src="'+albumImage+'"/>'
      $('.results').append('<li>' + albumName +'\n'+ display + '\n' + spotifyLink + '</li>');
      // var fullData = album.href
    });
  });
};

Playlist.prototype.getFullResults = function(album){
  var request = $.ajax({
    url: album,
    method:'GET',
    dataType:'json',
  });
  request.done(function(response){
    var artistUrl = response.artists[0].href;
    this.getArtist(artistUrl);
    console.log(artistUrl);
  });
};

Playlist.prototype.getArtist = function(artistUrl){
  var request = $.ajax({
    url: artistUrl,
    method: 'GET',
    dataType: 'json',
  });
  request.done(function(response){
    console.log(response);
  });
};

Playlist.prototype.addSong = function (song) {
  this.songs.push(new Song(song));
};
//
// Playlist.prototype.processSentiment = function (first_argument) {
//   // body...
// };

//
// module.exports = Playlist;
