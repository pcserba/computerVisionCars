function chartByCountry (byCountry) {

let chartStatus = Chart.getChart("myChart"); // <canvas> id
if (chartStatus != undefined) {
  chartStatus.destroy();
}

const MS =byCountry.map(({MS:actualValue})=>actualValue);
const r = byCountry.map(({countVIN:actualValue})=>actualValue);
const ctx = document.getElementById('myChart');
const myChart1 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: MS,
        datasets: [{
            data: r,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
	,x: {
          ticks: {
                autoSkip: true,
                maxRotation: 0,
                minRotation: 0,
		fontSize: 5           
		}
          }
      }

	,plugins: {
            title: {
                display: true,
                text: 'Registration of '+ byCountry[0].Mh +' '+ byCountry[0].Cn_short +' in ' + byCountry[0].year
            }
            ,legend: {
                display: false,
 	  }}
     }	
})
};


function chartByYear (byYear) {

let chartStatus = Chart.getChart("myChart"); // <canvas> id
if (chartStatus != undefined) {
  chartStatus.destroy();
}
const year =byYear.map(({year:actualValue})=>actualValue);
const r = byYear.map(({countVIN:actualValue})=>actualValue);
const ctx = document.getElementById('myChart');
const myChart1 = new Chart(ctx, {
    type: 'line',
    data: {
        labels: year,
        datasets: [{
            data: r,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
	,x: {
          ticks: {
                autoSkip: true,
                maxRotation: 0,
                minRotation: 0,
		fontSize: 5           
		}
          }
      }

	,plugins: {
            title: {
                display: true,
                text: 'Registration of '+ byYear[0].Mh +' '+ byYear[0].Cn_short +' in Europe by year'
            }
            ,legend: {
                display: false,
 	  }}
     }	
});

}


function chartByManufacturer (byManufacturer) {

let chartStatus = Chart.getChart("myChart"); // <canvas> id
if (chartStatus != undefined) {
  chartStatus.destroy();
}
const year =byManufacturer.map(({year:actualValue})=>actualValue);
const avgEWLTP = byManufacturer.map(({avgEWLTP:actualValue})=>actualValue);
const ctx = document.getElementById('myChart');
const myChart1 = new Chart(ctx, {
    type: 'line',
    data: {
        labels: year,
        datasets: [{
            data: avgEWLTP,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
	,x: {
          ticks: {
                autoSkip: true,
                maxRotation: 0,
                minRotation: 0,
		fontSize: 5           
		}
          }
      }

	,plugins: {
            title: {
                display: true,
                text: 'Average Ewltp  of '+ byManufacturer[0].Mh + ' in Europe by year'
            }
            ,legend: {
                display: false,
 	  }}
     }	
});

}


