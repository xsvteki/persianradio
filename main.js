// define an array of radio stations
const radioStations = [
    {
      name: "KIRN 670 AM",
      url: "https://stream.zeno.fm/wyth8w2r3heuv",
      farsiName: "رادیو ایران ۶۷۰",
      id: "kirn",
      imageUrl: "https://cdn-profiles.tunein.com/s33212/images/logog.png?t=1"
    },
    {
      name: "Radio Hamrah",
      url: "https://stream-16.zeno.fm/euutwhsru2wtv?zs=TBxpkKBIRL6HU-rTFfrwqg",
      farsiName: "رادیو همراه",
      id: "hamrah",
      imageUrl: "https://www.radio.net/images/broadcasts/fc/92/103046/1/c300.png"
    }
    ];
  
  
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
  

  document.getElementById('next-button').addEventListener('click', () => {
    playNextRadioStation();
  });


  
  const radioList = document.getElementById('radio-list');

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
    for (const radio of radioStations) {
        const li = document.querySelector(`#${radio.id}`);
        radio.classList.remove('playing');
      }
    
    
    // set audio player to curr station
    if (audioPlayer.src != station.url) {
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
      
      // update the play/pause button's text
      document.getElementById('play-pause-button').innerText = 'Play';
    }
  });
  radioList.appendChild(radioItem);

  // create a div to hold the radio station's photo
  const radioCover = document.createElement('div');
  radioCover.classList.add('radio-photo');
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
