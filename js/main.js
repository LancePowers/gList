// add scripts

$(document).on('ready', function() {
  $('p').hide();
});

$('form').on('submit', function(event){
  event.preventDefault();
  var searchTerm = $('#search-term').val().trim();
  getAlbums(searchTerm);
  $('p').show();
})

function clearSpaces(searchTerm){
  for (var i = 0; i < searchTerm.length; i++) {
    if(searchTerm.charAt(i) === ' '){
      searchTerm.charAt(i) = '+';
    }
  }
  console.log(searchTerm)
  return searchTerm;
}

function getAlbums(searchTerm){
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
    getFullResults(fullDataUrl);
    $.each(albums, function(i, album){
      var albumName = album.name;
      var albumImage = album.images[0].url;
      var spotifyLink = album.external_urls.spotify;
      display = '<img src="'+albumImage+'"/>'
      $('.results').append('<li>' + albumName +'\n'+ display + '\n' + spotifyLink + '</li>');
      // var fullData = album.href
    })
  })
};

function getFullResults(album){
  var request = $.ajax({
    url: album,
    method:'GET',
    dataType:'json',
  });
  request.done(function(response){
    var artistUrl = response.artists[0].href;
    getArtist(artistUrl);
    console.log(artistUrl);
  })
};

function getArtist(artistUrl){
  var request = $.ajax({
    url: artistUrl,
    method: 'GET',
    dataType: 'json',
  });
  request.done(function(response){
    console.log(response)
  })
}

function getSentiment(text,target){
  var request = $.ajax({
    url: 'http://access.alchemyapi.com/calls/text/TextGetTextSentiment',
    method: 'GET',
    data:{
      apikey: alchemyapi,
      text: text,
      target: target,
      outputMode: 'json',
    },
    dataType: 'json',
  });
  request.done(function(response){
    console.log(response)
  })
}


/*
Echonest
Your API Key: ENIRWM643INVFE5BC

Your Consumer Key: 01586f4dd7d1710d1092b4bbae936ef3

Your Shared Secret: jOdSYOHLQTCUtZxpn3KnQw

Your API Key is: 6889f9fd6f1a094a963298badffbb5cee0046edf
*/
