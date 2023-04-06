// Add this function at the beginning of your app.js file
function updateAndRenderChart(chart, data, labels) {
  chart.data.labels = labels;
  chart.data.datasets[0].data = data;
  chart.update();
}

function createPieChart(chartId, labels, data, backgroundColors) {
  const ctx = document.getElementById(chartId).getContext('2d');
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
      },
    ],
  };

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        padding: 10,
      },
    },
  },
  layout: {
    padding: {
      left: 0, // Adjust this value to change the left padding
      right: 350, // Adjust this value to change the right padding
      top: 0,
      bottom: 0
    }
  }
};
        
 
  const pieChart = new Chart(ctx, {
    type: 'pie',
    data: chartData,
    options: options,
  });
  return pieChart; // Add this line to return the created chart
}

document.addEventListener("DOMContentLoaded", function () {
  const pieChart = createPieChart(
    "pieChart",
    ["Category 1", "Category 2", "Category 3"],
    [30, 20, 50],
    ["#3333ff", "#ff9900", "#009900"]
  );

  const pieChart2 = createPieChart(
    "pieChart2",
    ["Category A", "Category B", "Category C"],
    [40, 30, 30],
    ["#0066ff", "#ff0000", "#009933"]
  );
  const msisdnChartData = pieChart.data.datasets[0].data.slice(); // Save the initial data
  const msisdnChartLabels = pieChart.data.labels.slice(); // Save the initial labels
  const simCardChartData = pieChart2.data.datasets[0].data.slice(); // Save the initial data
  const simCardChartLabels = pieChart2.data.labels.slice(); // Save the initial labels

// Sample data for the table
const sampleData = [
  { 'Column 1': 'A', 'Column 2': 2, 'Column 3': '2022-04-01' },
  { 'Column 1': 'B', 'Column 2': 1, 'Column 3': '2022-04-02' },
  { 'Column 1': 'C', 'Column 2': 3, 'Column 3': '2022-04-03' },
  // Add more rows as needed
];

// Function to render table data
function renderTableData(data) {
  const tableBody = document.querySelector('#data-table tbody');
  tableBody.innerHTML = '';

  data.forEach(row => {
    const tr = document.createElement('tr');
    Object.keys(row).forEach(key => {
      const td = document.createElement('td');
      td.textContent = row[key];
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
}

// Function to sort data
function sortData(data, column, ascending) {
  return data.sort((a, b) => {
    if (a[column] < b[column]) return ascending ? -1 : 1;
    if (a[column] > b[column]) return ascending ? 1 : -1;
    return 0;
  });
}

let lastSortedColumn = null;
let lastSortDirection = true;

// Function to handle column click for sorting
function onColumnClick(event) {
  const column = event.target.innerText.trim();
  const ascending = column === lastSortedColumn ? !lastSortDirection : true;
  const sortedData = sortData(sampleData, column, ascending);
  renderTableData(sortedData);
  lastSortedColumn = column;
  lastSortDirection = ascending;
}


// Initialize table and sortable functionality
function initTable() {
  renderTableData(sampleData);

  const tableHeaders = document.querySelectorAll('#data-table th[data-sortable]');
  tableHeaders.forEach(header => {
    header.addEventListener('click', onColumnClick);
  });
}

initTable();

// Add this code at the end of your app.js file

const dashboardLink = document.querySelector("nav ul li:nth-child(1) a");
const msisdnOverviewLink = document.querySelector("nav ul li:nth-child(2) a");
const simCardOverviewLink = document.querySelector("nav ul li:nth-child(3) a");
const schedulerOverviewLink = document.querySelector("nav ul li:nth-child(4) a");

const msisdnChart = document.getElementById("msisdn-chart");
const simCardChart = document.getElementById("sim-card-chart");
const dataTableContainer = document.getElementById("data-table-container");

dashboardLink.addEventListener("click", (e) => {
  e.preventDefault();
  updateAndRenderChart(pieChart, msisdnChartData, msisdnChartLabels);
  updateAndRenderChart(pieChart2, simCardChartData, simCardChartLabels);
  msisdnChart.style.display = "block";
  simCardChart.style.display = "block";
  dataTableContainer.style.display = "block";
});

msisdnOverviewLink.addEventListener("click", (e) => {
  e.preventDefault();
  updateAndRenderChart(pieChart, msisdnChartData, msisdnChartLabels);
  msisdnChart.style.display = "block";
  simCardChart.style.display = "none";
  dataTableContainer.style.display = "none";
});

simCardOverviewLink.addEventListener("click", (e) => {
  e.preventDefault();
  updateAndRenderChart(pieChart2, simCardChartData, simCardChartLabels);
  msisdnChart.style.display = "none";
  simCardChart.style.display = "block";
  dataTableContainer.style.display = "none";
});

schedulerOverviewLink.addEventListener("click", (e) => {
  e.preventDefault();
  msisdnChart.style.display = "none";
  simCardChart.style.display = "none";
  dataTableContainer.style.display = "block";
});
});
