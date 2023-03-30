const tvStations = [];

// Fetch the CSV file and parse it
fetch('tv.csv')
.then(response => response.text())
.then(data => {
  // Parse the CSV data
  const parsedData = Papa.parse(data).data;
  // Remove the first row (header values)
  parsedData.shift();

  // Convert the data into an array of objects
  parsedData.forEach(row => {
    tvStations.push({
      english_name: row[0],
      farsi_name: row[1],
      tv_link: row[2],
    });
  });

  // Get the TV stations list element
  const tvList = document.getElementById('tv-stations-list');

  // Create a list item for each TV station
  tvStations.forEach((station) => {
    // Create a div for the TV station
    const tvStationDiv = document.createElement('div');
    tvStationDiv.classList.add('tv-station');

    // Create an image for the TV station
    const tvStationImg = document.createElement('img');
    tvStationImg.src = 'placeholder.jpg';
    tvStationImg.alt = station.farsi_name;

    // Create a div for the TV station names
    const tvStationNamesDiv = document.createElement('div');
    tvStationNamesDiv.classList.add('tv-station-names');

    // Create a heading for the TV station English name
    const tvStationEnglishName = document.createElement('h3');
    tvStationEnglishName.textContent = station.english_name;

    // Create a paragraph for the TV station Farsi name
    const tvStationFarsiName = document.createElement('p');
    tvStationFarsiName.classList.add('farsi-name');
    tvStationFarsiName.textContent = station.farsi_name;

    // Append the English and Farsi names to the TV station names div
    tvStationNamesDiv.appendChild(tvStationEnglishName);
    tvStationNamesDiv.appendChild(tvStationFarsiName);

    // Append the image and names div to the TV station div
    tvStationDiv.appendChild(tvStationImg);
    tvStationDiv.appendChild(tvStationNamesDiv);

    // Add a click event listener to the TV station div
    tvStationDiv.addEventListener('click', () => {
      // Create an iframe for the TV station video
      const tvStationVideoIframe = document.createElement('iframe');
      tvStationVideoIframe.src = station.tv_link;
      tvStationVideoIframe.allowfullscreen = true;
      tvStationVideoIframe.autoplay = true;

      // Create a div for the TV station video player
      const tvStationVideoPlayerDiv = document.createElement('div');
      tvStationVideoPlayerDiv.classList.add('tv-station-video-player');
      tvStationVideoPlayerDiv.appendChild(tvStationVideoIframe);

      // Create a div for the TV station video player container
      const tvStationVideoPlayerContainerDiv = document.createElement('div');
      tvStationVideoPlayerContainerDiv.classList.add('tv-station-video-player-container');
      tvStationVideoPlayerContainerDiv.appendChild(tvStationVideoPlayerDiv);

      // Add the TV station video player container to the body
      document.body.appendChild(tvStationVideoPlayerContainerDiv);

      // Add a click event listener to the TV station video player container
      tvStationVideoPlayerContainerDiv.addEventListener('click', () => {
        // Remove the TV station video player container from the body
        document.body.removeChild(tvStationVideoPlayerContainerDiv);
      });
    });

    // Append the TV station div to the TV stations list
    tvList.appendChild(tvStationDiv);
  });
});
