import { fetchFilteredSchedulerData } from './data.js';

const properties = ['header1', 'header2', 'header3'];


    $.each(properties, function(i, val) {
  
      var orderClass = '';
  
      $("#" + val).click(function(e) {
        e.preventDefault();
        $('.filter__link.filter__link--active').not(this).removeClass('filter__link--active');
        $(this).toggleClass('filter__link--active');
        $('.filter__link').removeClass('asc desc');
  
        if (orderClass == 'desc' || orderClass == '') {
          $(this).addClass('asc');
          orderClass = 'asc';
        } else {
          $(this).addClass('desc');
          orderClass = 'desc';
        }
  
        var parent = $(this).closest('.header__item');
        var index = $(".header__item").index(parent);
        var $table = $('.table-content');
        var rows = $table.find('.table-row').get();
        var isSelected = $(this).hasClass('filter__link--active');
        var isNumber = $(this).hasClass('filter__link--number');
  
        rows.sort(function(a, b) {
  
          var x = $(a).find('.table-data').eq(index).text();
          var y = $(b).find('.table-data').eq(index).text();
  
          if (isNumber == true) {
  
            if (isSelected) {
              return x - y;
            } else {
              return y - x;
            }
  
          } else {
  
            if (isSelected) {
              if (x < y) return -1;
              if (x > y) return 1;
              return 0;
            } else {
              if (x > y) return -1;
              if (x < y) return 1;
              return 0;
            }
          }
        });
  
        $.each(rows, function(index, row) {
          $table.append(row);
        });
  
        return false;
      });
  
    });

  
  function showTable() {
    document.getElementById("chart-container").style.display = "none";
    document.getElementById("table-container").style.display = "block";
    initTable();
  }
  
  function renderDataTable(data) {
    const container = document.getElementById("data-table-container");
    const table = document.createElement("table");
    table.classList.add("data-table");
  
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Status", "Total Amount"];
  
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
  
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    const tbody = document.createElement("tbody");
  
    data.forEach((rowData) => {
      const row = document.createElement("tr");
  
      headers.forEach((header) => {
        const td = document.createElement("td");
        td.textContent = rowData[header];
        row.appendChild(td);
      });
  
      tbody.appendChild(row);
    });
  
    table.appendChild(tbody);
    container.innerHTML = "";
    container.appendChild(table);
  }
  

  

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

  async function initialize() {
    // Add the event listener for the "Filter" button
    document.getElementById('filter-scheduler-overview').addEventListener('click', updateSchedulerTable);
  
    // Update the scheduler table when the page loads
    await updateSchedulerTable();
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    await initialize();
  });
  