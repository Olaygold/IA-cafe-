document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('airtimeForm');
    const networkSelect = document.getElementById('network');
    const responseDiv = document.getElementById('response');

    // Fetch available networks from the proxy server
    fetch('https://ia-cafe.onrender.com/proxy/network')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                data.networks.forEach(network => {
                    const option = document.createElement('option');
                    option.value = network.id;
                    option.textContent = network.name;
                    networkSelect.appendChild(option);
                });
            } else {
                responseDiv.textContent = 'Failed to load networks.';
            }
        })
        .catch(error => {
            responseDiv.textContent = 'Error fetching networks.';
            console.error(error);
        });

    // Handle form submission
    form.addEventListener('submit', event => {
        event.preventDefault();

        const network = networkSelect.value;
        const amount = document.getElementById('amount').value;
        const phone = document.getElementById('phone').value;
        const airtimeType = document.getElementById('airtimeType').value;

        const payload = {
            network: network,
            amount: amount,
            mobile_number: phone,
            Ported_number: true,
            airtime_type: airtimeType
        };

        fetch('https://your-render-backend-url.onrender.com/proxy/topup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    responseDiv.textContent = `Airtime purchase successful! Transaction ID: ${data.transaction_id}`;
                } else {
                    responseDiv.textContent = `Error: ${data.message}`;
                }
            })
            .catch(error => {
                responseDiv.textContent = 'An error occurred while processing your request.';
                console.error(error);
            });
    });
});
