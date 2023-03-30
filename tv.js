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
    tvStations.forEach(station => {
      const stationDiv = document.createElement('div');
      stationDiv.classList.add('station');
      stationDiv.style.cursor = 'pointer';

      const englishName = document.createElement('div');
      englishName.classList.add('english-name');
      englishName.textContent = station.english_name;
      stationDiv.appendChild(englishName);

      const farsiName = document.createElement('div');
      farsiName.classList.add('farsi-name');
      farsiName.textContent = station.farsi_name;
      stationDiv.appendChild(farsiName);

      stationDiv.addEventListener('click', () => {
        window.location.href = station.tv_link;
      });

      tvList.appendChild(stationDiv);
    });
  });


  function handleSearch() {
    const searchInput = document.querySelector('#search-input');
    const searchTerm = searchInput.value.toLowerCase();
  
    // Filter the TV stations that match the search term
    const filteredStations = tvStations.filter(station => {
      const englishName = station.english_name.toLowerCase();
      const farsiName = station.farsi_name.toLowerCase();
  
      return englishName.includes(searchTerm) || farsiName.includes(searchTerm);
    });
  
    // Clear the current list of stations
    const tvList = document.querySelector('.tv-list');
    tvList.innerHTML = '';
  
    // Display the filtered list of stations
    filteredStations.forEach(station => {
      const stationDiv = document.createElement('div');
      stationDiv.classList.add('station');
      stationDiv.style.cursor = 'pointer';
    
      const englishName = document.createElement('div');
      englishName.classList.add('english-name');
      englishName.textContent = station.english_name;
      stationDiv.appendChild(englishName);
    
      const farsiName = document.createElement('div');
      farsiName.classList.add('farsi-name');
      farsiName.textContent = station.farsi_name;
      stationDiv.appendChild(farsiName);
    
      stationDiv.addEventListener('click', () => {
        window.location.href = station.tv_link;
      });
    
      // Add or remove the 'hidden' class based on whether the station matches the search term
      if (englishName.textContent.toLowerCase().includes(searchTerm) || farsiName.textContent.toLowerCase().includes(searchTerm)) {
        stationDiv.classList.remove('hidden');
      } else {
        stationDiv.classList.add('hidden');
      }
    
      tvList.appendChild(stationDiv);
    });    
  }

const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', handleSearch);

  