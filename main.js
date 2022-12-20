// Get stations from file - store in array
const radioStations = [];

// Fetch the CSV file and parse it
fetch('stations.csv')
  .then(response => response.text())
  .then(data => {
    // Parse the CSV data
    const parsedData = Papa.parse(data).data;

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

  console.log(radioStations);

  const radioList = document.getElementById('radio-list');

    radioStations.forEach((station) => {
    // create a list item for each radio station
    const radioItem = document.createElement('li');
    radioItem.classList.add('radio-item');
    radioItem.addEventListener('click', () => {
    // remove "playing" class from all radio items
    if (audioPlayer.src != station.url) {
            // remove "playing" class from all radio items
        Array.from(radioList.children).forEach((child) => {
            child.classList.remove('playing');
        });
        // add "playing" class to the clicked radio item
        radioItem.classList.add('playing');
    }

    // set audio player to curr station
    if (audioPlayer.src != station.url) {
        // station.radioItem.classList.add('playing');
        // currentRadio.radioItem.classList.remove('playing');
        audioPlayer.src = station.url;
    }
    // check if the audio player is currently paused
    if (audioPlayer.paused) {
        // play the audio
        audioPlayer.play();
        radioItem.classList.add('playing');
        // update the play/pause button's text
        document.getElementById('play-pause-button').innerText = 'Pause';
    } else {
        // pause the audio
        audioPlayer.pause();
        //remove playing classlist
        radioItem.classList.remove('playing');
        
        // update the play/pause button's text
        document.getElementById('play-pause-button').innerText = 'Play';
    }
    });
});

radioList.appendChild(radioItem);

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

});


  
  // create an audio player element
const audioPlayer = document.createElement('audio');
document.body.appendChild(audioPlayer);

document.getElementById('play-pause-button').addEventListener('click', () => {
if (audioPlayer.paused) {
    // play the audio
    audioPlayer.play();
    // update the button's text
    document.getElementById('play-pause-button').innerText = 'Pause';
} else {
    // pause the audio
    audioPlayer.pause();
    // update the button's text
    document.getElementById('play-pause-button').innerText = 'Play';
    }
  });
  


/*  
const radioList = document.getElementById('radio-list');

//   let currentRadio = station[0];

radioStations.forEach((station) => {
// create a list item for each radio station
const radioItem = document.createElement('li');
radioItem.classList.add('radio-item');
radioItem.addEventListener('click', () => {
// // remove "playing" class from all radio items
// Array.from(radioList.children).forEach((child) => {
//   child.classList.remove('playing');
// });
// add "playing" class to the clicked radio item
// radioItem.classList.remove('playing');
// for (const radio of radioStations) {
//     const li = document.querySelector(`#${radio.id}`);
//     radio.classList.remove('playing');
//   }
if (audioPlayer.src != station.url) {
        // remove "playing" class from all radio items
    Array.from(radioList.children).forEach((child) => {
        child.classList.remove('playing');
    });
    // add "playing" class to the clicked radio item
    radioItem.classList.add('playing');
}


// set audio player to curr station
if (audioPlayer.src != station.url) {
    // station.radioItem.classList.add('playing');
    // currentRadio.radioItem.classList.remove('playing');
    audioPlayer.src = station.url;
}
// check if the audio player is currently paused
if (audioPlayer.paused) {
    // play the audio
    audioPlayer.play();
    radioItem.classList.add('playing');
    // update the play/pause button's text
    document.getElementById('play-pause-button').innerText = 'Pause';
} else {
    // pause the audio
    audioPlayer.pause();
    //remove playing classlist
    radioItem.classList.remove('playing');
    
    // update the play/pause button's text
    document.getElementById('play-pause-button').innerText = 'Play';
}
});
radioList.appendChild(radioItem);

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

});

*/