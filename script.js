document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('confession-form');
    const confessionInput = document.getElementById('confession');
    const confessionList = document.getElementById('confession-list');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const confessionText = confessionInput.value.trim();
        if (confessionText) {
            const confessionItem = document.createElement('div');
            confessionItem.className = 'confession-item';
            confessionItem.textContent = confessionText;

            confessionList.appendChild(confessionItem);
            confessionInput.value = '';
        }
    });
});
