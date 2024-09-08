document.getElementById('confession-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const confessionText = document.getElementById('confession-text').value;
    if (confessionText) {
        const confessionBoard = document.getElementById('confession-board');
        
        const confessionDiv = document.createElement('div');
        confessionDiv.className = 'confession';
        confessionDiv.textContent = confessionText;
        
        confessionBoard.appendChild(confessionDiv);
        
        document.getElementById('confession-text').value = '';
    }
});
