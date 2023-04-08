// Create the filter row elements
const msisdnFilterRow = createFilterRow("msisdn");
const simFilterRow = createFilterRow("sim");

document.querySelector(".msisdn-overview").addEventListener("click", () => {
  toggleFilterRow(msisdnFilterRow, ".msisdn-overview");
});

document.querySelector(".sim-overview").addEventListener("click", () => {
  toggleFilterRow(simFilterRow, ".sim-overview");
});

function createFilterRow(type) {
  const filterRow = document.createElement("div");
  filterRow.classList.add("filter-row");

  const statusLabel = document.createElement("label");
  statusLabel.textContent = "Status:";
  filterRow.appendChild(statusLabel);

  const statusSelect = document.createElement("select");
  statusSelect.innerHTML = `
    <option value="all">All</option>
    <option value="free">Free</option>
    <option value="assigned">Assigned</option>
  `;
  filterRow.appendChild(statusSelect);

  const categoryLabel = document.createElement("label");
  categoryLabel.textContent = "Category:";
  filterRow.appendChild(categoryLabel);

  const categorySelect = document.createElement("select");
  if (type === "msisdn") {
    categorySelect.innerHTML = `
      <option value="all">All</option>
      <option value="voice">Voice</option>
      <option value="data">Data</option>
    `;
  } else {
    categorySelect.innerHTML = `
      <option value="all">All</option>
      <option value="p-sim">P-SIM</option>
      <option value="e-sim">E-SIM</option>
    `;
  }
  filterRow.appendChild(categorySelect);

  const filterButton = document.createElement("button");
  filterButton.textContent = "Filter";
  filterRow.appendChild(filterButton);

  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset Filter";
  resetButton.classList.add(type === "msisdn" ? "reset-msisdn-filter" : "reset-sim-filter");
  filterRow.appendChild(resetButton);

  return filterRow;
}

function toggleFilterRow(filterRow, menuSelector) {
  const menu = document.querySelector(menuSelector);
  if (!menu.contains(filterRow)) {
    menu.appendChild(filterRow);
    filterRow.style.height = "0px";
    setTimeout(() => {
      filterRow.style.height = "50px";
    }, 0);
  } else {
    filterRow.style.height = "0px";
    setTimeout(() => {
      menu.removeChild(filterRow);
    }, 300);
  }
}


(async function getMsisdnData() {
    try {
      const response = await fetch(`${window.location.origin}/msisdn-data`);
      const data = await response.json();
      let totalMsisdn = 0;
      let totalFreeVoice = 0;
      let totalAssignedVoice = 0;
  
      data.forEach((row) => {
        totalMsisdn += row['Total amount'];
  
        if (row['Category'] === 'Voice') {
          if (row['Status'] === 'Free') {
            totalFreeVoice += row['Total amount'];
          } else if (row['Status'] === 'Assigned') {
            totalAssignedVoice += row['Total amount'];
          }
        }
      });
  
      const voiceMsisdnData = [
        { label: 'Free Voice', value: totalFreeVoice },
        { label: 'Assigned Voice', value: totalAssignedVoice },
      ];
  
      createVoiceMsisdnChart(voiceMsisdnData);
  
      document.querySelector('.total-msisdn').textContent = totalMsisdn;
  
      (async function getSimCardData() {
        try {
          const response = await fetch(`${window.location.origin}/sim-data`);
  
          const data = await response.json();
          let totalAssignedPSim = 0;
          let totalAssignedESim = 0;
  
          data.forEach((row) => {
            if (row['Category'] === 'P-SIM' && row['Status'] === 'Assigned') {
              totalAssignedPSim += row['Total Amount'];
            } else if (row['Category'] === 'E-SIM' && row['Status'] === 'Assigned') {
              totalAssignedESim += row['Total Amount'];
            }
          });
  
          const totalAssignedSimCards = totalAssignedPSim + totalAssignedESim;
          document.querySelector('.active-sim-cards').textContent = totalAssignedSimCards.toLocaleString();
  
        } catch (error) {
          console.error('Error fetching SIM card data:', error);
        }
      })();
  
    } catch (error) {
      console.error('Error fetching MSISDN data:', error);
    }
  })();
  
  function createVoiceMsisdnChart(data) {
    const labels = data.map(row => row.label);
    const values = data.map(row => row.value);
  
    const chartData = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
          ],
        },
      ],
    };
  
    const ctx = document.getElementById('voice-msisdn-chart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              color: '#3c3c3c',
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.label + ': ' + context.raw.toLocaleString();
              },
            },
          },
        },
      },
    });
  }
  