/*
need to make sure that the HTML and JavaScript files are served from the same origin, or that the server is configured to allow cross-origin resource sharing (CORS) for the JavaScript code.
*/

// Get stations from file - store in array
const radioStations = [];

// Fetch the CSV file and parse it
fetch('https://raw.githubusercontent.com/ebootehsaz/persianradio/master/stations.csv')
.then(response => response.text())
.then(data => {
  // Parse the CSV data
  const parsedData = Papa.parse(data).data;
  // Remove the first row (header values)
  parsedData.shift();

  // Convert the data into an array of objects
  parsedData.forEach(row => {
    radioStations.push({
      name: row[0],
      url: row[1],
      farsiName: row[2],
      id: row[3],
      imageUrl: row[4]
    });
  });

  // console.log(radioStations);

  const radioList = document.getElementById('radio-list');

  radioStations.forEach((station) => {
    // create a list item for each radio station
    const radioItem = document.createElement('li');
    radioItem.classList.add('radio-item');
    radioList.appendChild(radioItem);

    const mainContent = document.getElementById("main-content");
    const radioListHeight = radioList.offsetHeight;
    const viewportHeight = mainContent.offsetHeight;

    radioList.style.marginBottom = "170px";  // height of play/pause button

    // create a div to hold the radio station's photo
    const radioCover = document.createElement('div');
    radioCover.classList.add('radio-photo-div');
    radioItem.appendChild(radioCover);

    // create an img element for the radio station's photo
    const radioImg = document.createElement('img');
    radioImg.src = station.imageUrl;
    radioImg.classList.add('radio-cover');
    radioCover.appendChild(radioImg);

    // create a div to hold the radio station's English name
    const englishName = document.createElement('div');
    englishName.classList.add('english-name');
    englishName.innerText = station.name;
    radioItem.appendChild(englishName);

    // create a div to hold the radio station's Farsi name
    const farsiName = document.createElement('div');
    farsiName.classList.add('farsi-name');
    farsiName.innerText = station.farsiName;
    radioItem.appendChild(farsiName);



    radioItem.addEventListener('click', function(event) {
      try {
        let isplaying = radioList.querySelector('.radio-cover.playing');
        // console.log(isplaying);
        if (isplaying) {
          isplaying.classList.remove('playing');
        }
        // console.log(isplaying);

        // radioItem.querySelector('.radio-cover').classList.remove('playing');

        if (audioPlayer.src != station.url) {
          console.log(audioPlayer.src);
          console.log(station.url);
          // remove "playing" class from all radio items
          Array.from(radioList.children).forEach((child) => {
            child.classList.remove('playing');
          });

          // add "playing" class to the clicked radio item
          radioItem.classList.add('playing');

          audioPlayer.src = station.url

          navigator.mediaSession.metadata = new MediaMetadata({
            title: station.farsiName,
            artist: station.name,
            // artwork: [{ src: station.imageUrl, sizes: '16x16', type: 'image/png' }]
            // artwork: 
          });
          // audioPlayer.setAttribute('poster', station.imageUrl);
        }
       

    
        // check if the audio player is currently paused
        if (audioPlayer.paused) {
          // Show the loading indicator
          radioImg.src = "https://media.tenor.com/wfEN4Vd_GYsAAAAC/loading.gif";
          // "https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif";
          
        
          // Start playing the radio station
          audioPlayer.play();
          

          // outer timeout: if link causes error, make cover 'X'
          // inner timeout: after cover has been "X" for certain interval, return to OG cover
          let timeout = setTimeout(function() {
            radioImg.src = "https://us.123rf.com/450wm/photoart23d/photoart23d1902/photoart23d190201517/photoart23d190201517.jpg?ver=6"
            
            let timeoutClear = setTimeout(function() {
              radioImg.src = station.imageUrl;
            }, 20000);

          }, 10000);

          // Hide the loading indicator
          audioPlayer.onplaying = function() {
            // no need to timeout
            clearTimeout(timeout);
            // Hide the loading indicator
            radioImg.src = station.imageUrl;
            
            
            // button.innerHTML = "Pause <img src='pause.png'>";
            button.innerHTML = "<img src='pause.png'>";
            // document.title = "Persian Radio: " + station.name;
            // faviconLink.href = station.imageUrl;
            // document.querySelector("link[rel~='favicon']").href = station.imageUrl;
            favicon.setAttribute("href", station.imageUrl);

            console.log("is playing audio");
            radioItem.querySelector('.radio-cover').classList.add('playing');
            

          };


        } else {
          audioPlayer.pause();
          //remove playing classlist
          radioItem.classList.remove('playing');

          // update the play/pause button's text
          // button.innerHTML = "Play <img src='play.png'>";
          button.innerHTML = "<img src='play.png'>";

          radioImg.src = station.imageUrl;
        }

      }
      catch (error) {
        throw error;
        // console.log("Caught the Exception");
      } 

    });

  });

});

const button = document.getElementById('play-pause-button');
const radioCoverElements = Array.from(document.querySelectorAll('.radio-cover'));


const favicon = document.getElementById("favicon");

navigator.mediaSession.metadata = new MediaMetadata({
  title: 'Persian Radio',
  artist: '',
  artwork: [
    // { src: 'https://cdn.countryflags.com/thumbs/iran/flag-square-250.png', sizes: '512x512', type: 'image/png' },
    // { src: 'https://cdn.countryflags.com/thumbs/iran/flag-square-250.png', sizes: '1024x1024', type: 'image/png' },
    // { src: 'https://cdn.countryflags.com/thumbs/iran/flag-square-250.png', sizes: '2048x2048', type: 'image/png' }
  ]
});




// play/pause from control center
navigator.mediaSession.setActionHandler('play', function() {
  audioPlayer.play();
  // update the pages button's text
  // button.innerHTML = "Pause <img src='pause.png'>";
  button.innerHTML = "<img src='pause.png'>";
  // document.getElementById('.radio-photo-div');

});
navigator.mediaSession.setActionHandler('pause', function() {
  audioPlayer.pause();
  // update the pages button's text
  // button.innerHTML = "Play <img src='play.png'>";
  button.innerHTML = "<img src='play.png'>";
});



// const audioPlayer = document.createElement('audio');
const audioPlayer = document.getElementById('audio-player')

let currplaying = null;

// audioPlayer.poster = 'https://cdn.countryflags.com/thumbs/iran/flag-square-250.png';
document.body.appendChild(audioPlayer);

document.getElementById('play-pause-button').addEventListener('click', () => {

  if (audioPlayer.paused) {

    audioPlayer.play();
    // update the button's text
    // button.innerHTML = "Pause <img src='pause.png'>";
    button.innerHTML = "<img src='pause.png'>";

    // addPlayingClass(currplaying);
      
  } else {

    audioPlayer.pause();
    
    // currplaying = removePlayingClass;
    // update the button's text
    // button.innerHTML = "Play <img src='play.png'>";
    button.innerHTML = "<img src='play.png'>";
  }
});
