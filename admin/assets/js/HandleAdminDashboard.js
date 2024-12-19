/**
 * JavaScript class for fetching and displaying dashboard information and generating a chart.
 * 
 * Author: [Carino, Mark]
 */
// To fetch the information from the php file
document.addEventListener("DOMContentLoaded", () => {
    fetch("../controller/GetDashboardInformation.php")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            document.querySelector("#totalMembers").textContent = data.total_members;
            document.querySelector("#totalApplicants").textContent = data.total_applicants;
            document.querySelector("#totalJobOpportunity").textContent = data.total_job_opportunity;
            document.querySelector("#totalEvents").textContent = data.total_events;
            document.querySelector("#totalNews").textContent = data.total_news;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});

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
                                    index: index
                                };
                            });
                        },
                        usePointStyle: true, // Use point style to make legend items circular
                        padding: 20, // Adjust padding to add space between the labels and the chart
                        font: {
                            size: 16 // Set the font size for the legend labels here
                        }

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

// Total Members page
document.getElementById('totalMembersCard').addEventListener('click', function() {
    window.location.href = '../view/account.php';
});
document.getElementById('totalApplicantsCard').addEventListener('click', function() {
    window.location.href = '../view/UserRequest.php';
});
document.getElementById('jobOppsAvailableCard').addEventListener('click', function() {
    window.location.href = '../view/jobOpportunities.php';
});
document.getElementById('numOfEventsCard').addEventListener('click', function() {
    window.location.href = '../view/adminEvent.php';
});
document.getElementById('addedNewsCard').addEventListener('click', function() {
    window.location.href = '../view/news.php';
});
