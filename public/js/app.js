import { fetchFilteredSchedulerData } from './data.js';
import { fetchSimData, fetchNumberData, consolidateData } from './data.js';





document.addEventListener("DOMContentLoaded", async () => {
  const simData = await fetchSimData();
  const numberData = await fetchNumberData();

  const consolidatedSimData = consolidateData(simData);
  const consolidatedNumberData = consolidateData(numberData);

  const simChartCtx = document.getElementById("simChart").getContext("2d");
  const simLabels = consolidatedSimData.map((item) => item.Status);
  const simAmounts = consolidatedSimData.map((item) => item["Total Amount"]);
  simChart = createPieChart(simChartCtx, simLabels, simAmounts, chartColors);

  // Number Chart
  const numberChartCtx = document.getElementById("msisdnChart").getContext("2d");
  const numberLabels = consolidatedNumberData.map((item) => item.Status);
  const numberAmounts = consolidatedNumberData.map((item) => item["Total Amount"]);
  numberChart = createPieChart(numberChartCtx, numberLabels, numberAmounts, chartColors);


});


function populateSchedulerTable(data) {
  const table = document.getElementById("scheduler-overview-table");
  table.innerHTML = `
      <tr>
          <th>Name of the Task</th>
          <th>What is Done</th>
          <th>Scheduler Started</th>
          <th>Scheduler Completed</th>
          <th>Time in MS</th>
          <th>Scheduler ran for</th>
          <th>Message</th>
          <th>Error</th>
          <th>Run Every</th>
          <th>Runs</th>
      </tr>
  `;

  for (const row of data) {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
          <td>${row["Name of the Task"]}</td>
          <td>${row["What is Done"]}</td>
          <td>${row["Scheduler Started"]}</td>
          <td>${row["Scheduler Completed"]}</td>
          <td>${row["Time in MS"]}</td>
          <td>${row["Scheduler ran for"]}</td>
          <td>${row["Message"]}</td>
          <td>${row["Error"]}</td>
          <td>${row["Run Every"]}</td>
          <td>${row["Runs"]}</td>
      `;
      table.appendChild(newRow);
  }
}

// Your other functions here

async function updateSchedulerTable() {
  const data = await fetchFilteredSchedulerData();
  populateSchedulerTable(data);
}


