const apiKey = 'COAH18X8QZ16506W'; // Replace with your Alpha Vantage API Key

function calculateROI() {
    const industry = $("#industry").val();
    const region = $("#region").val();
    const investmentSize = parseFloat($("#investmentSize").val());
    const estimatedPeriod = parseFloat($("#estimatedPeriod").val());

    if (isNaN(investmentSize) || investmentSize <= 0 || isNaN(estimatedPeriod) || estimatedPeriod <= 0) {
        $("#result").html("<p>Please enter valid investment size and estimated period.</p>");
        return;
    }

    // Fetch sector performance data
    fetchSectorPerformance(industry, region).then(roiPercentage => {
        const estimatedROI = (investmentSize * roiPercentage) / 100 * estimatedPeriod;
        const totalReturn = investmentSize + estimatedROI;

        $("#result").html(`
            <p>Estimated ROI for <strong>${industry}</strong> in <strong>${region}</strong>:</p>
            <ul>
                <li>ROI Percentage: <strong>${roiPercentage}%</strong></li>
                <li>Estimated Profit over ${estimatedPeriod} years: <strong>$${estimatedROI.toFixed(2)}</strong></li>
                <li>Total Return after ${estimatedPeriod} years: <strong>$${totalReturn.toFixed(2)}</strong></li>
            </ul>
        `);
    }).catch(error => {
        $("#result").html(`<p>Error fetching data: ${error.message}</p>`);
    });
}

// Fetch sector performance data from Alpha Vantage
async function fetchSectorPerformance(industry, region) {
    const sectorMap = {
        technology: 'Technology',
        agriculture: 'Agriculture',
        realEstate: 'Real Estate',
        healthcare: 'Healthcare',
        finance: 'Finance',
        manufacturing: 'Manufacturing',
        retail: 'Retail',
        energy: 'Energy',
        telecommunications: 'Telecommunications',
        transportation: 'Transportation'
    };

    const sector = sectorMap[industry.toLowerCase()];
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${sector}&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    // Mock ROI percentage between 5% to 20% for demonstration purposes
    const roiPercentage = Math.random() * (20 - 5) + 5; 
    return roiPercentage; // Return a random ROI for demonstration purposes
}

function calculateROI() {
    const industry = $('#industry').val();
    const region = $('#region').val();
    const investmentSize = parseFloat($('#investmentSize').val());
    const estimatedPeriod = parseFloat($('#estimatedPeriod').val());

    // Example ROI percentage based on industry and region
    const roiData = {
        'technology': { 'northAmerica': 0.2, 'southAmerica': 0.15, 'europe': 0.18, 'asia': 0.25, 'africa': 0.12 },
        'agriculture': { 'northAmerica': 0.1, 'southAmerica': 0.2, 'europe': 0.15, 'asia': 0.1, 'africa': 0.3 },
        'realEstate': { 'northAmerica': 0.15, 'southAmerica': 0.1, 'europe': 0.1, 'asia': 0.2, 'africa': 0.25 },
        'healthcare': { 'northAmerica': 0.18, 'southAmerica': 0.1, 'europe': 0.15, 'asia': 0.2, 'africa': 0.12 },
        'finance': { 'northAmerica': 0.22, 'southAmerica': 0.12, 'europe': 0.2, 'asia': 0.18, 'africa': 0.14 },
        'manufacturing': { 'northAmerica': 0.15, 'southAmerica': 0.1, 'europe': 0.12, 'asia': 0.2, 'africa': 0.1 },
        'retail': { 'northAmerica': 0.1, 'southAmerica': 0.15, 'europe': 0.18, 'asia': 0.1, 'africa': 0.2 },
        'energy': { 'northAmerica': 0.12, 'southAmerica': 0.1, 'europe': 0.2, 'asia': 0.3, 'africa': 0.15 },
        'telecommunications': { 'northAmerica': 0.25, 'southAmerica': 0.2, 'europe': 0.18, 'asia': 0.22, 'africa': 0.1 },
        'transportation': { 'northAmerica': 0.2, 'southAmerica': 0.15, 'europe': 0.1, 'asia': 0.25, 'africa': 0.3 }
    };

    const roiPercentage = roiData[industry][region];
    const estimatedROI = investmentSize * roiPercentage * estimatedPeriod;

    // Show result
    $('#result').html(`<h5>Estimated ROI: $${estimatedROI.toFixed(2)}</h5>`);
    $('#constraints').html(getConstraints(region));

    // Prepare chart data
    const labels = ['Investment', 'Estimated ROI'];
    const data = [investmentSize, estimatedROI];

    // Show the chart
    showChart(labels, data);
}

function getConstraints(region) {
    const constraintsData = {
        'northAmerica': 'High competition, regulatory challenges, and market saturation.',
        'southAmerica': 'Economic instability, infrastructure challenges, and political factors.',
        'europe': 'Regulatory complexities, varying consumer preferences, and high operational costs.',
        'asia': 'Rapid growth potential, technological adoption, and high competition.',
        'africa': 'Market opportunities, but challenges include infrastructure and regulatory issues.'
    };

    return `<h5>Constraints in ${region.charAt(0).toUpperCase() + region.slice(1)}:</h5>
            <p>${constraintsData[region]}</p>`;
}

function showChart(labels, data) {
    const ctx = document.getElementById('roiChart').getContext('2d');
    const roiChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Amount ($)',
                data: data,
                backgroundColor: [
                    'rgba(76, 175, 80, 0.7)', // Green for investment
                    'rgba(255, 193, 7, 0.7)' // Yellow for ROI
                ],
                borderColor: [
                    'rgba(76, 175, 80, 1)',
                    'rgba(255, 193, 7, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    $('#roiChart').show(); // Display the chart
}
