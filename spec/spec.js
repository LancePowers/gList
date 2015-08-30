var Playlist = require('../js/playlist');
var Song = require('../js/song');

describe('proritize songs', function(){
  beforeEach(function(){
    var sentimentScore = 0;
    var chip = new Playlist('chip');
    var samplePositiveTarget = 'The Beatles';
    var sampleNegativeTarget = 'Justin Beiber';
    var sampleText = 'Hello, my name is chip. I sure do love the Beatles. The Beatles are probably the best band around. Justin Beiber is pretty terrible. Justin Beiber has less musical talent than even Ringo Star! The Beatles are so amazing they make Beiber look like a flaming pile of dogshit.'
    chip.addSong('The Beatles');
    chip.songs[0].songSentiment(sampleText, samplePositiveTarget)
    chip.songs[0].updatSentiment()
  })
  it('should find sentiment for keywords', function(){
    expect(sentimentScore).toEqual(0.540293);
    expect(chip.songs[0].score).toEqual(3.540293);
  })
})
// it should get targeted sentiment keywords
// it should search spotify to create a song
// it should add/subtract sentiment score from song score
// it should rearrange the playlist by score
// it should receive a critical statement via text
// it should add terms to the song
// it should add artist and album to the song
// it should add songs to the database
