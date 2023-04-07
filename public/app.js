// Add this function to fetch data and create the pie chart
async function createSimCardPieChart(statusFilter = 'all', categoryFilter = 'all') {
  try {
    const response = await fetch('/api/sim-card-data');
    const data = await response.json();

    const filteredData = data.filter(
      (row) =>
        (statusFilter === 'all' || row.Status === statusFilter) &&
        (categoryFilter === 'all' || row.Category === categoryFilter)
    );

    const labels = [];
    const chartData = [];

    filteredData.forEach((row) => {
      const index = labels.indexOf(row.Status);
      if (index === -1) {
        labels.push(row.Status);
        chartData.push(row['Total Amount']);
      } else {
        chartData[index] += row['Total Amount'];
      }
    });

    const ctx = document.getElementById('sim-card-pie-chart').getContext('2d');

    const dataConfig = {
      labels: labels,
      datasets: [
        {
          data: chartData,
          backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796', '#A3A3A3'],
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: false, // Add this line to hide the legends
        },
        datalabels: {
          color: '#000',
          formatter: function (value, context) {
            const status = context.chart.data.labels[context.dataIndex];
            return status + ': ' + value;
          },
        },
      },
    };
    
    new Chart(ctx, {
      type: 'pie',
      data: dataConfig,
      options: options,
    });
  } catch (err) {
    console.error('Error creating sim card pie chart:', err);
  }
}

async function applyFilters() {
  const statusFilter = document.getElementById('status-filter').value;
  const categoryFilter = document.getElementById('category-filter').value;
  await createSimCardPieChart(statusFilter, categoryFilter);
}

// Call createSimCardPieChart() when the page loads
document.addEventListener('DOMContentLoaded', async function () {
  await createSimCardPieChart();
});

document.getElementById('status-filter').addEventListener('change', applyFilters);
document.getElementById('category-filter').addEventListener('change', applyFilters);

document.addEventListener("DOMContentLoaded", function () {
  const dashboardLink = document.querySelector("nav ul li:nth-child(1) a");
  const msisdnOverviewLink = document.querySelector("nav ul li:nth-child(2) a");
  const simCardOverviewLink = document.querySelector("nav ul li:nth-child(3) a");
  const schedulerOverviewLink = document.querySelector("nav ul li:nth-child(4) a");

  const msisdnChart = document.getElementById("msisdn-chart");
  const simCardChart = document.getElementById("sim-card-chart-container");
  const dataTableContainer = document.getElementById("data-table-container");

  dashboardLink.addEventListener("click", (e) => {
    e.preventDefault();
    msisdnChart.style.display = "block";
    simCardChart.style.display = "block";
    dataTableContainer.style.display = "block";
    document.getElementById('filter-container').style.display = 'none'; // Add this line
  });

  msisdnOverviewLink.addEventListener("click", (e) => {
    e.preventDefault();
    msisdnChart.style.display = "block";
    simCardChart.style.display = "none";
    dataTableContainer.style.display = "none";
    document.getElementById('filter-container').style.display = 'none'; // Add this line
  });

  simCardOverviewLink.addEventListener('click', async function (e) {
    e.preventDefault();
    msisdnChart.style.display = 'none';
    simCardChart.style.display = 'block';
    dataTableContainer.style.display = 'none';
    document.getElementById('filter-container').style.display = 'block';// Add this line
    document.getElementById('filter-container').style.display = 'block'; // Update this line
    await createSimCardPieChart(); // Add this line
  });
  schedulerOverviewLink.addEventListener("click", (e) => {
    e.preventDefault();
    msisdnChart.style.display = "none";
    simCardChart.style.display = "none";
    dataTableContainer.style.display = "block";
    document.getElementById('filter-container').style.display = 'none'; // Add this line
  });
});

