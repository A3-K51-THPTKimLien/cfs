const repoOwner = 'a3-k51-thptkimlien';
const repoName = 'confession-website';
const token = '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'; // Secure this token in production!

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('confession-form');
    const confessionInput = document.getElementById('confession');
    const confessionList = document.getElementById('confession-list');

    // Fetch existing confessions
    fetchConfessions();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const confessionText = confessionInput.value.trim();
        if (confessionText) {
            createConfession(confessionText);
            confessionInput.value = '';
        }
    });

    function fetchConfessions() {
        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => {
            confessionList.innerHTML = '';
            data.forEach(issue => {
                const confessionItem = document.createElement('div');
                confessionItem.className = 'confession-item';
                confessionItem.textContent = issue.title;
                confessionList.appendChild(confessionItem);
            });
        });
    }

    function createConfession(text) {
        fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: text,
                body: 'Confession created via GitHub Pages'
            })
        })
        .then(response => response.json())
        .then(() => {
            fetchConfessions(); // Refresh the list
        });
    }
});

