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
  

      
 
   // createFreeAssignedVoiceChart(totalFreeVoice, totalAssignedVoice);

  
      // Add animateValue() function calls here
      document.querySelector('.total-msisdn').textContent = totalMsisdn;
      
      document.querySelector('.total-free-voice').textContent = totalFreeVoice;

  
    } catch (error) {
      console.error('Error fetching MSISDN data:', error);
    }
  })();
  
  
 
  
  function createFreeAssignedVoiceChart(totalFreeVoice, totalAssignedVoice) {
    const chartData = [
      { label: 'Free Voice', value: totalFreeVoice },
      { label: 'Assigned Voice', value: totalAssignedVoice },
    ];
  
    Morris.Donut({
      element: 'free-assigned-voice-chart',
      data: chartData,
      colors: ['#76DDFB', '#00A6FB'],
      resize: true,
      formatter: function (value, data) {
        return value.toLocaleString();
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
  