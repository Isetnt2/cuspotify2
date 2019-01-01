

// Get the hash of the url
const hash = window.location.hash
.substring(1)
.split('&')
.reduce(function (initial, item) {
  if (item) {
    var parts = item.split('=');
    initial[parts[0]] = decodeURIComponent(parts[1]);
  }
  return initial;
}, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;
$.cookie('_token', hash.access_token, { expires: 3600, path: '/' });
const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = 'f49138eb3c684fd4af3dfc8f2b0474bb';
const redirectUri = 'http://127.0.0.1:5500';
const scopes = [
  'streaming',
  'user-read-birthdate',
  'user-read-private',
  'user-modify-playback-state',
  'user-read-playback-state'
];

// If there is no token, redirect to Spotify authorization
if ($.cookie('_token') != hash.access_token) {
  window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}
// Set up the Web Playback SDK
window.onSpotifyPlayerAPIReady = () => {
  const player = new Spotify.Player({
    name: 'Cuspotify test client',
    getOAuthToken: cb => { cb(_token);}
    });
    var devid = "";
    var serverduration = "";
    var serverval = "";
    var clientval = "";
    var data=[];
    var labels=[];
    var myLineChart;
    function drawChart() {
    var ctx = document.getElementById("myLineChart").getContext("2d");
        // Instantiate a new chart
        var myLineChart = new Chart(ctx , {
          type: "line",
          options: {
            title: {
                display: false,
      },
      animation: {
        duration: 0
    },
        elements: {
          line: {
              tension: 0, // disables bezier curves
          }
      }
        },
          data: pitchData, 
      });
    }
    $('.volume-high').hide();
    $('.volume-medium').hide();
    $('.volume-low').hide();
    $('.mute').hide();
    $('.repeat-2').hide();
    $('.repeat-1').hide();
    $('.previus').hide();
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.spotify.com/v1/me",
  "method": "GET",
  "headers": {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer "+_token,
  }
  }
  $.ajax(settings).done(function (response) {
console.log(response);
    var userId = response.id;
    var userName = response.display_name;
    var userImg = "";
    if (response.images[0].url != null){
      userImg = response.images[0].url;
    }
    else if (response.images[0].url == null){
      userImg = ('https://cdn.glitch.com/df085f6b-d132-4ffb-9b13-36a107621e6b%2Funknown-profile.jpg?1542797782500')
    }
  var userNotification = function() {
    }
var options = {
   title: 'Welcome',
   options: {
     body: 'Welcome ' + userName + "!",
     icon: userImg,
     tag: "UserInfo",
     onClose: userNotification,
   }
};
$("#easyNotify").easyNotify(options);    
var settings = {
  "async": true,
  "crossDomain": true,
  "url": 'https://api.spotify.com/v1/users/' +userId+ "/playlists?limit=50&offset=0",
  "method": "GET",
  "headers": {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer "+_token,
  }
    }

$.ajax(settings).done(function (response) {
  console.log(response); 
var listDiv = document.getElementById('vertical-menu');
var a = "";
var img = "";
var p = "";
var br = "";
var imgSrc = "";
var playlistUris = [];
for (var i = 0; i < response.items.length; ++i) {
      a = document.createElement('li');
      p = document.createElement('p');
      br = document.createElement('br');
      img = document.createElement('img');
      if (response.items[i].images.length == 0){
      imgSrc = ('https://cdn.glitch.com/df085f6b-d132-4ffb-9b13-36a107621e6b%2Fmissing.png?1540402854088')
      }
      else {
      imgSrc = response.items[i].images[0].url;
      }
      $(img).attr({
    'src': imgSrc,
    'id': i,
  });
  
    p.innerHTML = response.items[i].name + "     ";  
  $(p).attr({
    'id':i,
    'class': "playlistName",
});
    $(a).attr({
    'id':i,
    'class': "listChild",
});
      listDiv.appendChild(a).appendChild(p).appendChild(br);
      p.appendChild(img);
      playlistUris.push(response.items[i].uri);
}
        $('.vertical-menu').on('click', 'li', function(){
       var clickedChild = $(this).attr('id');
       var listDiv = document.getElementById('vertical-menu');
       var playlistUri = ""
      console.log(clickedChild)
      playlistUri = response.items[clickedChild].uri;
      console.log(response.items[clickedChild].uri);
      Array.from(listDiv.parentNode.children).indexOf(clickedChild)
      console.log(Array.from(listDiv.parentNode.children).indexOf(clickedChild));
 var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.spotify.com/v1/me/player/play?device_id="+devid,
  "method": "PUT",
  "headers": {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer "+_token,
  },
  "processData": false,
  "data": "{\"context_uri\":\"" + playlistUri + "\" "+",\"offset\":{\"position\":1},\"position_ms\":0},"
}

$.ajax(settings).done(function (response) {
  console.log(response);
  togglePanel();
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.spotify.com/v1/me/player/currently-playing",
      "method": "GET",
      "headers": {
        "accept": "application/json",
        "content-type": "application/json",
        "authorization": "Bearer "+_token,
      }
        }
    $.ajax(settings).done(function (response) {
    console.log(response);
    songId = response.item.id;
   function drawLineChart() {

  var jsonData = $.ajax({
    "async": true,
    "crossDomain": true,
    "url": "https://api.spotify.com/v1/audio-analysis/"+songId,
    "method": "GET",
    "headers": {
      "accept": "application/json",
      "content-type": "application/json",
      "authorization": "Bearer "+_token,
    }
  }).done(function (results) {
    console.log(results);
    // Split timestamp and data into separate arrays
     data=[];
     labels=[];
    var i="";
    var number="";
    var roundedNumber="";
    for (i=0; i<results.segments.length; i++) {
        data.push(results.segments[i].loudness_max);
        number = results.segments[i].start;
        roundedNumber = Math.round(number * 10) / 10;
        labels.push(roundedNumber);
    }

    // Create the chart.js data structure using 'labels' and 'data'
    var pitchData = {
      labels : labels,
      yAxisID : "loudness",
      datasets : [{
          strokeColor           : "blue",
          pointBackgroundColor  : "blue",
          borderColor           : "blue",
          pointHighlightFill    : "#fff",
          data                  : data
      }]
    };
    // Get the context of the canvas element we want to select
    var ctx = document.getElementById("myLineChart").getContext("2d");

    // Instantiate a new chart
    var myLineChart = new Chart(ctx , {
      type: "line",
      options: {
        title: {
            display: false,
    },
    elements: {
      line: {
          tension: 0, // disables bezier curves
      }
  }
    },
      data: pitchData, 
  });
  
  });
}

drawLineChart();
});
});
  });
  });
  });
});
  // Error handling
  player.on('initialization_error', e => console.error(e));
  player.on('authentication_error', e => console.error(e));
  player.on('account_error', e => console.error(e));
  player.on('playback_error', e => console.error(e));
  	
player.addListener('ready', ({ device_id }) => {
   devid = device_id;
    console.log (device_id);
})
player.on('player_state_changed', state => {

});
player.addListener('player_state_changed', ({
 position,
  duration,
  paused,
  track_window: { current_track, next_tracks }
}) => {
  var serverduration = duration;

});
  
  // Playback status updates
  player.on('player_state_changed', state =>  {
  var artistName = "";
  var artistUri = "";
  var artistUrl = "";
for (var i = 0; i < state.track_window.current_track.artists.length; i++) {
  if (i < state.track_window.current_track.artists.length - 1){
  artistName += state.track_window.current_track.artists[i].name + ", ";
      } 
  else if (i = state.track_window.current_track.artists.length - 1){
    artistName += state.track_window.current_track.artists[i].name + "";
  }
   else if (state.track_window.current_track.artists.length = 1){
  artistName += state.track_window.current_track.artists[i].name;
  artistUri = state.track_window.current_track.artists[i].uri.replace(":", "/").replace(":", "/");
  artistUrl = artistUri.replace("spotify", "https://open.spotify.com");
      }
}
    if (state.track_window.current_track.artists.length == 1){
   $('#artists').off('click').on('click', function(){
      window.open((artistUrl), '_blank');});
    }
  var songName = state.track_window.current_track.name;
  var artist = state.track_window.current_track.artists;
  var albumCover = state.track_window.current_track.album.images[0].url;  
  var nextAlbumCover = state.track_window.next_tracks[0].album.images[0].url;
  var songId = state.track_window.current_track.id;
  var jsonData = $.ajax({
    "async": true,
    "crossDomain": true,
    "url": "https://api.spotify.com/v1/audio-analysis/"+songId,
    "method": "GET",
    "headers": {
      "accept": "application/json",
      "content-type": "application/json",
      "authorization": "Bearer "+_token,
    }
  }).done(function (results) {
    console.log(results);
    if (typeof myLineChart != 'undefined') {
      myLineChart.destroy();
 }    function drawLineChart() {

      var jsonData = $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://api.spotify.com/v1/audio-analysis/"+songId,
        "method": "GET",
        "headers": {
          "accept": "application/json",
          "content-type": "application/json",
          "authorization": "Bearer "+_token,
        }
      }).done(function (results) {
        console.log(results);
        // Split timestamp and data into separate arrays
         data=[];
         labels=[];
        var i="";
        var number="";
        var roundedNumber="";
        for (i=0; i<results.segments.length; i++) {
            data.push(results.segments[i].loudness_max);
            number = results.segments[i].start;
            roundedNumber = Math.round(number * 10) / 10;
            labels.push(roundedNumber);
        }
    
        // Create the chart.js data structure using 'labels' and 'data'
        var pitchData = {
          labels : labels,
          yAxisID : "loudness",
          datasets : [{
              strokeColor           : "blue",
              pointBackgroundColor  : "blue",
              borderColor           : "blue",
              pointHighlightFill    : "#fff",
              data                  : data
          }]
        };
        // Get the context of the canvas element we want to select
        var ctx = document.getElementById("myLineChart").getContext("2d");
    
        // Instantiate a new chart
        var myLineChart = new Chart(ctx , {
          type: "line",
          options: {
            title: {
                display: false,
        },
        animation: {
          duration: 0
      },
        elements: {
          line: {
              tension: 0, // disables bezier curves
          }
      }
        },
          data: pitchData, 
      });
      
      });
    }
    
    drawLineChart();
  });
 if(!document.hasFocus()) {

     var songNotification = function() {
     };
var options = {
    title: songName,
    options: {
      body: 'ARTIST: ' + artistName,
      icon: albumCover,
      tag: "song",
      onClose: songNotification
    }
};
$("#easyNotify").easyNotify(options);
 }
  
    $('#info-pic').attr('src', albumCover);
    $('#songName').text(songName);
    $('title').text(songName)
    $('#artists').text(artistName + " ");
    $('#nexttrack').attr('src', nextAlbumCover);
      if ( (state.paused == false)){
  $('.play').hide();
  $('.pause').show();
  } else{
    $('.pause').hide();
  $('.play').show();
  }
  if (state.repeat_mode == 0){
  $('.repeat-track').show()
;
  $('.repeat-1').hide();
   $('.repeat-2').hide();
 }
  else if (state.repeat_mode == 1){
  $('.repeat-1').show();
  $('.repeat-track').hide();
   $('.repeat-2').hide();
  }
else if (state.repeat_mode == 2){
  $('.repeat-2').show();
  $('.repeat-1').hide();
  $('.repeat-track').hide();
      $('#nexttrack').attr('src', albumCover);

  }
  else{
      $('.repeat-track').show;
  }
  if (state.repeat_mode == 2)
  $('.next').click(function(){
    player.seek(0 * 1000).then(() => {
});
}); 
      $('#songName').off('click').on('click', function(){
      window.open(('https://open.spotify.com/track/' + songId), '_blank');
      });
      $('#album3').off('click').on('click', function(){
      window.open(('https://open.spotify.com/track/' + songId), '_blank');
      });
  var album1 = state.track_window.current_track.album.images[0].url;  
  var album2 = state.track_window.next_tracks[0].album.images[0].url;
  var album3 = state.track_window.next_tracks[1].album.images[0].url;
    if(state.repeat_mode == 2){
    $('#album3').attr('src', album1);
    $('#album2').attr('src', album1);
    $('#album1').attr('src', album1);
  }  
else {
  $('#album3').attr('src', album1);
  $('#album2').attr('src', album2);
  $('#album1').attr('src', album3);
}
  });


  // Ready
  player.on('ready', data => {
    const deviceId = data.device_id;
    // Play a track using our new device ID
    player(data.device_id);
    deviceId;
    console.log("deviceId is:" + deviceId);
  });
    player.connect().then(success => {
  if (success) {
  }
  $('.play').show();
  $('.pause').hide();
  $('.crl').show();
  $('#info-pic').show();
  $('#songName').show();
  $('#artists').show();
  $('#nexttrack').show();
  $('.repeat-track').show();
  $("#slider").slider();
  $('.volume-high').show();
  $('.previus').hide();
});
$('.disconnect').click(function(){
  player.disconnect();
  $('.crl').hide();
  $('#songName').hide();
  $('#artists').hide();
  $('#info-pic').hide();
  $('#nexttrack').hide();
  $('.repeat-track').hide;
  $('.repeat-2').ide;
  $('.repeat-1').hide;
  $('.play').hide();
  $('.pause').hide();
  $('.volume').hide();
  $('.mute').hide();
  $('.previus').hide();
  $('.connect').show();
});
$('.play').click(function(){
  player.togglePlay().then(() =>  {
    console.log('Toggled playback!');
});
  });
$('.pause').click(function(){
  player.togglePlay().then(() =>  {
    console.log('Toggled playback!');
});
  });
$('.next').click(function(){
  player.nextTrack().then(() =>  {
    console.log('Skipped to next track!');
});
});
    setInterval(function() { 
  player.getCurrentState().then(state => {
  if (!state) {
    console.error('User is not playing music through the Web Playback SDK');
    return;
  }

  let {
    current_track,
    next_tracks: [next_track]
  } = state.track_window;
  $('.prev').off('click').on('click', function(){
    if( state.position >= 3000){
  player.seek(0 * 1000).then(() => {});   
     }
  else if (state.position <= 3000 ){
    	player.previousTrack().then(() => {
  console.log('Set to previous track!');
});
  }
    }); 
});
    }, 500);
$( "#slider" ).slider({
  max: 100,
  min: 0,
  value: 50,
  step: 1,
  animate: "fast"
});
setInterval(function() {
player.getVolume().then(volume => {
  let volume_percentage = volume * 100;
      clientval = $( "#slider" ).slider( "value" )
      serverval = volume * 100
      $('#slidervalue').text(Math.round(serverval) + "/" +clientval);
}); 

}, 1);

  setInterval(function(){
  if (clientval != serverval ) {
$("#slider").slider({
value: serverval
});
}
else {

}
  }, 600);
  $( "#slider" ).slider({
  change: function( event, ui ) {},
  slide: function( event, ui ) {}
});
  $( "#slider" ).on( "slidechange", function( event, ui ) {
    updateValue();
    var val = $( "#slider" ).slider( "value" ) / 100;
player.setVolume(val).then(() => {
  console.log(val);
});
  });
function updateValue() {
  var rangeInput = clientval
  if (rangeInput >= 50) {
$('.volume-high').show();
 $('.volume-medium').hide();
 $('.volume-low').hide();
 $('.mute').hide(); 
  } else if (rangeInput <= 30 && rangeInput > 0){
$('.volume-low').show();
   $('.volume-high').hide();
 $('.volume-medium').hide();
 $('.mute').hide(); 
  }
 else if (rangeInput < 50 && rangeInput > 30){
 $('.volume-medium').show();
   $('.volume-high').hide();
 $('.volume-low').hide();
 $('.mute').hide(); 
 } 
 else if (rangeInput < 1){
 $('.mute').show();
   $('.volume-high').hide();
 $('.volume-medium').hide();
 $('.volume-low').hide();
 } 
 else{
 $('.volume-high').hide();
 $('.volume-medium').hide();
 $('.volume-low').hide();
 $('.mute').hide(); 
 }
}
$('.repeat-track').click(function(){
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.spotify.com/v1/me/player/repeat?state=context&device_id=" + devid,
  "method": "PUT",
  "headers": {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer "+_token,
  }
}
$.ajax(settings).done(function (response) {
  console.log(response);
});
$(".repeat-track").hide();  
$(".repeat-1").show();
});
$(".repeat-1").click(function(){
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.spotify.com/v1/me/player/repeat?state=track&device_id=" + devid,
  "method": "PUT",
  "headers": {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer "+_token,
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
  $(".repeat-1").hide();
$(".repeat-2").show();
});
$(".repeat-2").click(function(){
  var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.spotify.com/v1/me/player/repeat?state=off&device_id=" + devid,
  "method": "PUT",
  "headers": {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer "+_token,
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

  $(".repeat-2").hide();
$(".repeat-track").show();
}); 


  // a key map of allowed keys
var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};

// the 'official' Konami Code sequence
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

// a variable to remember the 'position' the user has reached so far.
var konamiCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function(e) {
  // get the value of the key code from the key map
  var key = allowedKeys[e.keyCode];
  // get the value of the required key from the konami code
  var requiredKey = konamiCode[konamiCodePosition];

  // compare the key with the required key
  if (key == requiredKey) {

    // move to the next key in the konami code sequence
    konamiCodePosition++;

    // if the last key is reached, activate cheats
    if (konamiCodePosition == konamiCode.length) {
      activateCheats();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

function activateCheats() {
  alert('cheats activated!');
  var canvas = document.body.appendChild( document.createElement( 'canvas' ) ),
    context = canvas.getContext( '2d' );
context.globalCompositeOperation = 'lighter';
canvas.width = window.screen.availWidth;
canvas.height = window.screen.availHeight;
canvas.style.position = 'fixed';
canvas.style.top = '0px';
canvas.style.zIndex = '-100';
draw();

var textStrip = ['诶', '比', '西', '迪', '伊', '吉', '艾', '杰', '开', '哦', '屁', '提', '维'];

var stripCount = 60, stripX = new Array(), stripY = new Array(), dY = new Array(), stripFontSize = new Array();

for (var i = 0; i < stripCount; i++) {
    stripX[i] = Math.floor(Math.random()*1265);
    stripY[i] = -100;
    dY[i] = Math.floor(Math.random()*7)+3;
    stripFontSize[i] = Math.floor(Math.random()*16)+8;
}

var theColors = ['#cefbe4', '#81ec72', '#5cd646', '#54d13c', '#4ccc32', '#43c728'];

var elem, context, timer;

function drawStrip(x, y) {
    for (var k = 0; k <= 20; k++) {
        var randChar = textStrip[Math.floor(Math.random()*textStrip.length)];
        if (context.fillText) {
            switch (k) {
            case 0:
                context.fillStyle = theColors[0]; break;
            case 1:
                context.fillStyle = theColors[1]; break;
            case 3:
                context.fillStyle = theColors[2]; break;
            case 7:
                context.fillStyle = theColors[3]; break;
            case 13:
                context.fillStyle = theColors[4]; break;
            case 17:
                context.fillStyle = theColors[5]; break;
            }
            context.fillText(randChar, x, y);
        }
        y -= stripFontSize[k];
    }
}

function draw() {
    // clear the canvas and set the properties
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.shadowOffsetX = context.shadowOffsetY = 0;
    context.shadowBlur = 8;
    context.shadowColor = '#94f475';
    
    for (var j = 0; j < stripCount; j++) {
        context.font = stripFontSize[j]+'px MatrixCode';
        context.textBaseline = 'top';
        context.textAlign = 'center';
        
        if (stripY[j] > 1358) {
            stripX[j] = Math.floor(Math.random()*canvas.width);
            stripY[j] = -100;
            dY[j] = Math.floor(Math.random()*7)+3;
            stripFontSize[j] = Math.floor(Math.random()*16)+8;
            drawStrip(stripX[j], stripY[j]);
        } else drawStrip(stripX[j], stripY[j]);
        
        stripY[j] += dY[j];
    }
  setTimeout(draw, 70);
}


}
$(window).keypress(function(e) {
  if (e.keyCode == 0 || e.keyCode == 32) {
	
player.togglePlay().then(() =>  {
     console.log('Toggled playback!');
});
  }
});
var togglePanel = function () {
  var e = $('.vertical-menu');
  var i = $('.playlistToggle')
  
  if ( e.hasClass("off" ) &&  i.hasClass("off")) {
    e.addClass("on").removeClass("off");
    i.addClass("on").removeClass("off");
  
  } else if ( e.hasClass("on") &&  i.hasClass("on")) {
    e.addClass("off").removeClass("on");
    i.addClass("off").removeClass("on");
  } else {
    e.addClass("on");
    i.addClass("on");
  }
}
  var shows = $('[data-toggle="vertical-menu"]');
shows.on('click', function() {
  togglePanel();
});

};