let simChart;
let numberChart;

const chartColors = [
    "rgba(218, 83, 79, 0.8)",     // dark red
    "rgba(84, 153, 199, 0.8)",    // dark blue
    "rgba(240, 194, 66, 0.8)",    // dark yellow
    "rgba(92, 184, 92, 0.8)",     // dark green
    "rgba(162, 81, 182, 0.8)",    // dark purple
    "rgba(240, 123, 65, 0.8)",    // dark orange
  ];
  

function createPieChart(ctx, labels, data, backgroundColors) {
    return new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "right",
          },
          datalabels: {
            color: "#000",
            font: {
              size: 14,
            },
            formatter: function (value, context) {
              return context.chart.data.labels[context.dataIndex];
            },
          },
        },
      },
    });
  }

  function restartChartAnimation(chart) {
    // Set the chart instance's options and update it
    chart.options.animation = {
      duration: 1000,
      onComplete: () => {
        chart.options.animation.duration = 0;
      },
    };
    chart.update();
  }

  function showSimChart() {
    document.getElementById("chart1").style.display = "none";
    document.getElementById("chart2").style.display = "block";
    restartChartAnimation(numberChart);
  }

function showMsisdnChart() {
    document.getElementById("chart1").style.display = "block";
    document.getElementById("chart2").style.display = "none";
    restartChartAnimation(simChart);
  }

  function showBothCharts() {
    document.getElementById("chart1").style.display = "block";
    document.getElementById("chart2").style.display = "block";
  }
