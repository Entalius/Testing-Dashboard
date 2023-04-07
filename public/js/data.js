export async function fetchSimData() {
    const response = await fetch("/sim_data");
    const data = await response.json();
    return data;
  }
  
 export async function fetchNumberData() {
    const response = await fetch("/number_data");
    const data = await response.json();
    return data;
  }
  
  async function fetchAndRenderFilteredSchedulerData() {
    try {
      const schedulerData = await fetchFilteredSchedulerData();
  
      const table = document.getElementById('scheduler-overview-table');
      table.innerHTML = '';
  
      schedulerData.forEach((row) => {
        const newRow = table.insertRow(-1);
  
        for (const key in row) {
          const cell = newRow.insertCell(-1);
          cell.textContent = row[key];
        }
      });
    } catch (error) {
      console.error('Error fetching filtered scheduler data:', error);
    }
  }

  export async function fetchFilteredSchedulerData() {
    try {
      const startDate = document.getElementById("start-date").value;
      const endDate = document.getElementById("end-date").value;
  
      const queryParams = new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
      });
  
      const response = await fetch(`/filtered_scheduler_data?${queryParams}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching filtered scheduler data:", error);
      return []; // Add this line to return an empty array when there's an error
    }
  }
  
  


export function consolidateData(data) {
  const consolidatedData = data.reduce((accumulator, item) => {
    const index = accumulator.findIndex(
      (existingItem) => existingItem.Status === item.Status
    );

    if (index !== -1) {
      accumulator[index]["Total Amount"] += item["Total Amount"];
    } else {
      accumulator.push(item);
    }

    return accumulator;
  }, []);

  return consolidatedData;
}

function populateDropdowns(consolidatedData, dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    consolidatedData.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.Status;
      option.text = item.Status;
      dropdown.add(option);
    });
  }
