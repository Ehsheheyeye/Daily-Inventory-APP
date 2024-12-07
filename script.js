document.addEventListener('DOMContentLoaded', function() {
    const placesInput = document.getElementById('location');
    const autocompleteResults = document.getElementById('autocomplete-results');

    // Initial list of places
    const initialPlaces = [
        'DSK', 'Aasha homeopathy', 'Acme IT Solutions', 'Audio Video Care', 'BAP Computers',
        'Bhurani Computers', 'Boy\'s Town', 'CA Chafekar', 'Chakaradhar engineering', 'Chip com',
        'Crucial Service Center', 'Fins Solutions', 'Gangagiri Ambad', 'Gangagiri Ashok Nagar',
        'Great Eastern', 'Hotel Ayodhya', 'Hotel BLVD', 'Hotel Curry Leaves Accounts',
        'Hotel Curry Leaves Bavan', 'Hotel Curry Leaves Jehan', 'Hotel Grand Curry Leaves',
        'Hotel Mazali', 'HP Service Center', 'Infowave Computer', 'Ira diagnosis', 'IT Solutions',
        'Jay Shiv Om industry', 'Korus Computers', 'Mayur', 'Meera Home', 'MHB Colony',
        'Moule Petrolum', 'Multitech Services', 'Nate', 'Nice Computers', 'Om Hardware',
        'Om Sonography', 'Orbital', 'Parshwa', 'Prime Graphite', 'Prime Graphite D62', 'Rahul sir',
        'Raka Infosys', 'Ravi Raka', 'RP Tech', 'Rx Service Center', 'Saikrupa Industries',
        'San Computek', 'Sankal Hospital', 'Sapat Tea', 'Satguru Trasport', 'SBI Ashok Nagar',
        'SH Jadhav', 'Shree Enterprises', 'Shreenath Engineering', 'Varad Agency', 'Vighnaharata Sales',
        'Winar Enterprises', 'Hindavi Trasport', 'Total Computer Solutions', 'Ajju Da Dhabha',
        'Hotel Amrut Garden', 'Jay Lab Satpur', 'Dhandai Enterprises', 'Nitin Electicals',
        'Perfect Computers', 'Kamgar Kalyan', 'Kamgar Kalyan Cidco', 'Quest Computers',
        'Abhay Steel', 'Abhay Products', 'Mahalaxmi Pathswanshta Satpur', 'Vijay Nagar Nagari Pathswanshta',
        'Datasoft Computers', 'Korus Infotech', 'Korus Computech', 'Slidewell',
        'Bhor Chemical Vilholi', 'Dagau teli', 'Savex Computers', 'Indial Tools', 'Kuber Petrolum',
        'Shiva associate', 'Gemini', 'Gargi Medical', 'Shree Chatrapati Vidyalay', 'KVIC',
        'Yash Photo Studio', 'HDFC Bank', 'Canara Bank', 'Megatech Computers', 'Ishwari Multipurpose',
        'Hotel Sailila', 'Pragati Padamashree', 'Hi-Tech Traders', 'CA Nikhil Shabara', 'Satyam Sales',
        'Nakshtra Engineering', 'Chetana Engineering', 'Media Shopee', 'Usha Infotech', 'Yash Computers',
        'Aquil Media', 'Ambika Sweets Ashok Nagar', 'Vivo Service Center', 'Drawing Class', 'Om Electric mart',
        'Raj Sports', 'Shree Krushna Enterprises', 'Diamond Traders', 'SR Enterprises', 'Manish Gifts',
        'Tapari', 'Vishwakarama Hardware', 'Madhur sweets', 'DCC Computers', 'Fabrication',
        'Deshmukh Home', 'Deshmukh Kirana', 'Bhonsala College', 'Slidewell A6', 'Slidewell E2',
        'Suyog Collection', 'YCMOU', 'Vaishnavi Mobile', 'Sarvadnya stationery', 'YCMOU Gangapur',
        'Shell Petrol pump', 'Plot', 'Perfect Computer Godown', 'Sushila Hospital', 'Sarthak Hospital',
        'New Suyog Collection', 'PTC ground', 'Mahesh Electronics', 'Subhdra Engineering', 'Jay Mata Carrier'
    ];

    // Merge stored places with initial places
    let storedPlaces = JSON.parse(localStorage.getItem('places')) || [];
    storedPlaces = Array.from(new Set([...storedPlaces, ...initialPlaces])); // Remove duplicates
    localStorage.setItem('places', JSON.stringify(storedPlaces));

    // Display autocomplete results as user types
    placesInput.addEventListener('input', function() {
        const userInput = placesInput.value.toLowerCase().trim();
        autocompleteResults.innerHTML = ''; // Clear previous results
        if (userInput) {
            const filteredPlaces = storedPlaces.filter(place => place.toLowerCase().includes(userInput));
            filteredPlaces.forEach(function(place) {
                const div = document.createElement('div');
                div.textContent = place;
                div.onclick = function() {
                    placesInput.value = place; 
                    autocompleteResults.style.display = 'none'; 
                };
                autocompleteResults.appendChild(div);
            });
            autocompleteResults.style.display = 'block';
        } else {
            autocompleteResults.style.display = 'none';
        }
    });

    document.addEventListener('click', function(event) {
        if (event.target !== placesInput) {
            autocompleteResults.style.display = 'none';
        }
    });

    document.getElementById('inventoryForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const location = placesInput.value.trim();
        const workDone = document.getElementById('workDone').value.trim();
        const timestamp = new Date().toLocaleString('en-US', {
            day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true
        });

        // Save new location to local storage if it's not already there
        if (!storedPlaces.map(p => p.toLowerCase()).includes(location.toLowerCase())) {
            storedPlaces.push(location);
            localStorage.setItem('places', JSON.stringify(storedPlaces));
        }

        sendDataToBackend(timestamp, location, workDone);
        clearForm();
    });
});

function sendDataToBackend(timestamp, location, work) {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbyaxXL6VjvpppZWep6Z-CsN4HNEMMKI65ajvb1mL0uMK0qH4xYklQYdJ17oZ5INylg3Hw/exec';
    fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timestamp, location, work })
    })
    .then(() => {
        alert('Data saved successfully!');
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('Failed to save data.');
    });
}

function clearForm() {
    document.getElementById('workDone').value = '';
    document.getElementById('location').value = '';
}
