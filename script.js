const scriptURL = 'https://script.google.com/macros/s/AKfycbxptW7o5lVFYruhuS4bB-sXPMZmDGMaBtsmrBkKz7CY/exec';

function doGet(e) {
  var response = ContentService.createTextOutput(JSON.stringify({ message: 'Hello World' }));
  response.setMimeType(ContentService.MimeType.JSON);
  
  // Set CORS headers
  response.setHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  
  return response;
}

document.getElementById('confession-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const confession = document.getElementById('confession').value;

    fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'confession': confession })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            loadConfessions();
            document.getElementById('confession').value = '';
        } else {
            alert('Failed to submit confession.');
        }
    })
    .catch(error => console.error('Error!', error.message));
});

function loadConfessions() {
    fetch(scriptURL + '?confessions')
        .then(response => response.json())
        .then(data => {
            const confessionsList = document.getElementById('confessions-list');
            confessionsList.innerHTML = '';
            data.forEach(confession => {
                const div = document.createElement('div');
                div.className = 'confession-item';
                div.textContent = confession;
                confessionsList.appendChild(div);
            });
        })
        .catch(error => console.error('Error fetching confessions:', error));
}

// Load confessions when the page loads
loadConfessions();
