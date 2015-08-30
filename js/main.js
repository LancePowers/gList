// add scripts

$(document).on('ready', function() {
  $('p').hide();
});

$('form').on('submit', function(event){
  event.preventDefault();
  var searchTerm = $('#search-term').val().trim();
  getAlbums(searchTerm);
  $('p').show();
});
