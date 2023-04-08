(async function getMsisdnData() {
    try {
      const response = await fetch('/msisdn-data');
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
  

      
      createTotalMsisdnChart(totalMsisdn);
      createFreeAssignedVoiceChart(totalFreeVoice, totalAssignedVoice);
  
      // Add animateValue() function calls here
      document.querySelector('.total-msisdn').textContent = totalMsisdn;
      
      document.querySelector('.total-free-voice').textContent = totalFreeVoice;

  
    } catch (error) {
      console.error('Error fetching MSISDN data:', error);
    }
  })();
  
  
  function createTotalMsisdnChart(totalMsisdn) {
    const ctx = document.getElementById('total-msisdn-chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [''],
        datasets: [
          {
            data: [totalMsisdn],
            backgroundColor: '#4e73df',
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        tooltips: {
          enabled: false,
        },
        onAnimationComplete: function () {
          const ctx = this.ctx;
          ctx.font = this.scale.font;
          ctx.fillStyle = this.scale.textColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
  
          this.datasets.forEach(function (dataset) {
            dataset.bars.forEach(function (bar) {
              ctx.fillText(bar.value, bar.x, bar.y - 5);
            });
          });
        },
      },
    });
  }
  
  
  function createFreeAssignedVoiceChart(totalFreeVoice, totalAssignedVoice) {
    const ctx = document.getElementById('free-assigned-voice-chart').getContext('2d');
  
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Free Voice', 'Assigned Voice'],
        datasets: [
          {
            data: [totalFreeVoice, totalAssignedVoice],
            backgroundColor: ['#76DDFB', '#00A6FB'],
            borderWidth: 5,
            borderColor: '#ffffff',
          },
        ],
      },
      options: {
        cutoutPercentage: 90,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: true,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          titleFontColor: '#000',
          bodyFontColor: '#000',
          borderWidth: 1,
          borderColor: '#000',
          xPadding: 15,
          yPadding: 10,
          displayColors: false,
          caretSize: 10,
        },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
      },
    });
  }
  
  
  
  function animateValue(id, start, end, duration) {
    const range = end - start;
    const minTimer = 50;
    let current = start;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = Math.max(stepTime, minTimer);
    const obj = document.querySelector(id);
  
    const updateValue = () => {
      obj.textContent = current;
      if (current === end) {
        clearInterval(interval);
      }
    };
  
    const interval = setInterval(() => {
      current += 1;
      updateValue();
    }, timer);
  }
  


  function createMsisdnStatusChart(data) {
    const labels = data.map(row => row.Status);
    const values = data.map(row => row['Total amount']);
  
    const chartData = {
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#E7E9ED',
          ],
        },
      ],
    };
  
    const ctx = document.getElementById('msisdnStatusChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: chartData,
    });
  }
  