const tvStations = [];

// Fetch the CSV file and parse it
fetch('https://raw.githubusercontent.com/ebootehsaz/persianradio/master/tv.csv')
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

  // Display stations in list
  const tvList = document.querySelector('.tv-list');

  // Determine number of columns based on screen size
  let numColumns = 6; // desktop
  if (window.innerWidth < 768) {
    numColumns = 3; // mobile
  }

  // Calculate number of stations per column
  const numStations = tvStations.length;
  const stationsPerColumn = Math.ceil(numStations / numColumns);

  // Create station boxes
  for (let i = 0; i < numColumns; i++) {
    const column = document.createElement('div');
    column.classList.add('column');
    tvList.appendChild(column);

    for (let j = 0; j < stationsPerColumn; j++) {
      const stationIndex = i * stationsPerColumn + j;
      if (stationIndex >= numStations) {
        break;
      }

      const station = tvStations[stationIndex];
      const box = document.createElement('div');
      box.classList.add('box');
      column.appendChild(box);

      const link = document.createElement('a');
      link.href = station.tv_link;
      link.target = '_blank';
      box.appendChild(link);

      const overlay = document.createElement('div');
      overlay.classList.add('overlay');
      link.appendChild(overlay);

      const title = document.createElement('div');
      title.classList.add('title');
      title.innerHTML = station.english_name;
      overlay.appendChild(title);

      const farsiTitle = document.createElement('div');
      farsiTitle.classList.add('farsi-title');
      farsiTitle.innerHTML = station.farsi_name;
      overlay.appendChild(farsiTitle);

// Request fullscreen when the user clicks on the iframe
      iframe.addEventListener('click', () => {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
          iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
          iframe.msRequestFullscreen();
        }
      });
    
      
    }
  }
});
