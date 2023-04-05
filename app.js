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
        position: 'right', // This will move the legend to the left side of the chart
        labels: {
          padding: 20, // Adjust this value to change the padding between the legend and the chart
        },
      },
    },
  };
        
        
 
  const pieChart = new Chart(ctx, {
    type: 'pie',
    data: chartData,
    options: options,
  });
}

document.addEventListener('DOMContentLoaded', function () {
  createPieChart(
    'pieChart',
    ['Category 1', 'Category 2', 'Category 3'],
    [30, 20, 50],
    ['#3333ff', '#ff9900', '#009900']
  );

  createPieChart(
    'pieChart2',
    ['Category A', 'Category B', 'Category C'],
    [40, 30, 30],
    ['#0066ff', '#ff0000', '#009933']
  );
});

// Sample data for the table
const sampleData = [
  { col1: 'A', col2: 2, col3: '2022-04-01' },
  { col1: 'B', col2: 1, col3: '2022-04-02' },
  { col1: 'C', col2: 3, col3: '2022-04-03' },
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
  const column = event.target.innerText.trim(); // Change this line
  const ascending = column === lastSortedColumn ? !lastSortDirection : true;
  const sortedData = sortData(sampleData, column.toLowerCase(), ascending);
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
