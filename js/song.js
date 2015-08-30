// var api = require(api.js);
var sentimentScore = 0;
function Song(name){
  this.name = name;
  this.score = 3;
  this.onList = true;
}

// needs to be song
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
      callback(response.docSentiment.score);
    }
  });
}

Song.prototype.songSentiment = function(text, target){
  this.getSentiment(text,target,function(response){
    sentimentScore += parseFloat(response);
    console.log(parseFloat(response));
  });
}

Song.prototype.updateSentiment = function () {
  this.score += sentimentScore
  sentimentScore = 0;
};

// module.exports = Song;
