
var api = require('./api.js');


function Song(name){
  this.name = name;
  this.score = 3;
  this.onList = true;
}

Song.prototype.getSentiment = function(text,target,callback){
  $.ajax({
    url: 'http://access.alchemyapi.com/calls/text/TextGetTargetedSentiment',
    method: 'GET',
    data:{
      apikey: alchemy,
      text: text,
      target: target,
      outputMode: 'json',
    },
    success: function(response, status){
      this.score += parseFloat(response);
      console.log(parseFloat(response));
    }
  });
};

// module.exports = Song;
