// Ensure the script runs after the DOM is fully loaded
window.onload = function() {
    // Get the context of the canvas element we want to render the chart on
    const ctx = document.getElementById('admin-chart').getContext('2d');

    // Define the chart data
    const data = {
        labels: ['Employed', 'Unemployed'],
        datasets: [{
            label: 'Employee Composition',
            data: [66, 35], // Adjust your data accordingly
            backgroundColor: [
                'rgb(255, 99, 132)', // Color for "Employed"
                'rgb(54, 162, 235)'  // Color for "Unemployed"
            ],
            hoverOffset: 4
        }]
    };

    // Define the chart configuration
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            cutout: '70%', // Adjust this value to control the size of the hole in the middle of the doughnut
            plugins: {
                legend: {
                    display: true, // Show the legend
                    position: 'bottom', // Change position of the legend
                    labels: {
                        // Customize label appearance
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, index) => {
                                return {
                                    text: label,
                                    fillStyle: data.datasets[0].backgroundColor[index],
                                    strokeStyle: 'rgba(0, 0, 0, 0)', // Optional: add a border
                                    lineWidth: 0,
                                    // hidden: !chart.getDatasetMeta(0).data[index].hidden,
                                    index: index
                                };
                            });
                        },
                        usePointStyle: true, // Use point style to make legend items circular
                        padding: 10, // Adjust padding to add space between the labels and the chart
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (context.parsed > 0) {
                                label += ': ' + context.parsed;
                            }
                            return label;
                        }
                    }
                }
            },
            elements: {
                arc: {
                    borderWidth: 0, // Set the border width of the arcs to 0 if you want a cleaner look
                }
            }
        }
    };

    // Initialize the chart
    const myDoughnutChart = new Chart(ctx, config);
};