document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('currency-form');
    const resultDiv = document.getElementById('result');
    const sourceCurrencySelect = document.getElementById('source-currency');
    const targetCurrencySelect = document.getElementById('target-currency');

    // Function to convert currency
    async function convertCurrency() {
        const sourceCurrency = sourceCurrencySelect.value;
        const targetCurrency = targetCurrencySelect.value;
        const amount = parseFloat(document.getElementById('amount').value);

        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch exchange rates');
            }

            const exchangeRate = data.rates[targetCurrency];
            if (!exchangeRate) {
                throw new Error('Exchange rate not available');
            }

            const convertedAmount = amount * exchangeRate;

            resultDiv.innerHTML = `
                <p>${amount.toFixed(2)} ${sourceCurrency} = ${convertedAmount.toFixed(2)} ${targetCurrency}</p>
                <p>Exchange Rate: 1 ${sourceCurrency} = ${exchangeRate.toFixed(4)} ${targetCurrency}</p>
            `;
        } catch (error) {
            console.error('Error:', error.message);
            resultDiv.innerHTML = '<p>Error: Failed to convert currency. Please try again later.</p>';
        }
    }

    // Event listener for form submission
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        await convertCurrency();
    });

    // Event listener for source currency change
    sourceCurrencySelect.addEventListener('change', async function() {
        await convertCurrency();
    });

    // Event listener for target currency change
    targetCurrencySelect.addEventListener('change', async function() {
        await convertCurrency();
    });

    // Initial currency conversion when the page loads
    convertCurrency();
});