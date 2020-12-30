(function($) {
  'use strict';
  $.fn.andSelf = function() {
    return this.addBack.apply(this, arguments);
  }
  $(function() {
    // Remove pro banner on close
    document.querySelector('#bannerClose').addEventListener('click',function() {
      document.querySelector('#proBanner').classList.add('d-none');
    });
    
    if ($('#unique-visitors-chart').length) {
      var lineChartCanvas = $("#unique-visitors-chart").get(0).getContext("2d");
      var uniqueVisitorData = {
        labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
        datasets: [
          {
            label: 'Support',
            data: [100, 95, 110, 85, 100, 105, 100, 90, 85, 100, 105, 98, 92, 101, 98, 80, 90, 92, 100, 80, 105, 108, 108, 112, 100, 115],
            backgroundColor: 'rgba(26, 174, 121, 0.3)',
            borderColor: [
              '#1aae79'
            ],
            borderWidth: 3,
            fill: true
          }
        ]
      };
      var uniqueVisitorOptions = {
        maintainAspectRatio:false,
        scales: {
          yAxes: [{
            display: false,
            ticks: {
              beginAtZero: true,
              stepsize:50,
          }
          }],
          xAxes: [{
            display: false
          }]
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0
          }
        },
        stepsize: 1
      };
      var lineChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: uniqueVisitorData,
        options: uniqueVisitorOptions
      });
    }
    if ($('#refund-chart').length) {
      var lineChartCanvas = $("#refund-chart").get(0).getContext("2d");
      var refundData = {
        labels: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
        datasets: [
          {
            label: 'Support',
            data: [100, 80, 90, 85, 100, 80, 100, 110],
            backgroundColor: 'rgba(4, 114, 237, 0.42)',
            borderColor: [
              '#0472ed'
            ],
            borderWidth: 3,
            fill: true
          }
        ]
      };
      var refundOptions = {
        maintainAspectRatio:false,
        scales: {
          yAxes: [{
            display: false,
            ticks: {
              beginAtZero: true
          }
          }],
          xAxes: [{
            display: false
          }]
        },
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: .1
          }
        },
        stepsize: 1
      };
      var lineChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: refundData,
        options: refundOptions
      });
    }
    if ($('#visit-conversion-chart').length) {
      var lineChartCanvas = $("#visit-conversion-chart").get(0).getContext("2d");
      var visitData = {
        labels: ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "110", "120", "130", "140", "150", "160", "170", "180", "190", "200", "210", "220", "230", "240", "250", "260"],
        datasets: [
          {
            label: 'visit',
            data: [100, 100, 100, 85, 85, 85, 100, 90, 85, 110, 110, 110, 60, 60, 60, 60, 90, 90, 90, 80, 105, 105, 105, 110, 110, 110],
            backgroundColor: 'rgba(255, 218, 69, 0.3)',
            borderColor: [
              '#ffda45'
            ],
            borderWidth: 3,
            fill: true
          },
          {
            label: 'sales',
            data: [70, 70, 70, 55, 55, 55, 70, 60, 55, 80, 80, 80, 30, 30, 30, 30, 60, 60, 60, 50, 85, 85, 85, 80, 80, 80],
            backgroundColor: 'rgba(	4, 114, 237 , 0.6)',
            borderColor: [
              '#0472ed'
            ],
            borderWidth: 3,
            fill: true
          }
        ]
      };
      var visitOptions = {
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 100,
              stepValue: 5,
              max: 150
            }
          }],
          xAxes: [{
            display: true,
            gridLines: {
              display:false,
            } 
          }]
        },
        legend: {
          display: false
        },
        legendCallback: function(chart) {
          var text = []; 
          text.push('<ul>'); 
          for (var i = 0; i < chart.data.datasets.length; i++) { 
              text.push('<li class="text-small"><span class="legend-dots" style="background:' + 
                         chart.data.datasets[i].borderColor + 
                         '"></span>'); 
              if (chart.data.datasets[i].label) { 
                  text.push(chart.data.datasets[i].label); 
              } 
              text.push('</li>'); 
          } 
          text.push('</ul>'); 
          return text.join('');
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0
          }
        },
      };
      var lineChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: visitData,
        options: visitOptions
      });
      $("#visit-conversion-chart-legend").html(lineChart.generateLegend());
    }

    if ($('#traffic-source-chart').length) {
      var lineChartCanvas = $("#traffic-source-chart").get(0).getContext("2d");
      var trafficSourceData = {
        labels: ["10", "20", "30", "40", "50", "60", "70"],
        datasets: [
          {
            label: 'Organic',
            data: [0, 200, 150, 125, 225, 200, 175],
            backgroundColor: 'rgba(255, 218, 69, 0.3)',
            borderColor: [
              '#d83c31'
            ],
            borderWidth: 3,
            fill: false
          },
          {
            label: 'Direct',
            data: [20, 50, 90, 205, 155, 180, 295],
            backgroundColor: 'rgba(	4, 114, 237 , 0.6)',
            borderColor: [
              '#1aae79'
            ],
            borderWidth: 3,
            fill: false
          },
          {
            label: 'Refferal',
            data: [75, 100, 250, 275, 355, 300, 255],
            backgroundColor: 'rgba(	4, 114, 237 , 0.6)',
            borderColor: [
              '#6658e9'
            ],
            borderWidth: 3,
            fill: false
          }
        ]
      };
      var trafficSourceOptions = {
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 100,
              stepValue: 5,
              max: 400
          }
          }],
          xAxes: [{
            display: true,
            gridLines: {
              display:false,
            }
          }]
        },
        legend: {
          display: false
        },
        legendCallback: function(chart) {
          var text = []; 
          text.push('<ul>'); 
          for (var i = 0; i < chart.data.datasets.length; i++) { 
              text.push('<li class="text-small"><span class="legend-dots" style="background:' + 
                         chart.data.datasets[i].borderColor + 
                         '"></span>'); 
              if (chart.data.datasets[i].label) { 
                  text.push(chart.data.datasets[i].label); 
              } 
              text.push('</li>'); 
          } 
          text.push('</ul>'); 
          return text.join('');
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0
          }
        },
        stepsize: 1
      };
      var lineChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: trafficSourceData,
        options: trafficSourceOptions
      });
      $("#traffic-source-chart-legend").html(lineChart.generateLegend());
    }
    if ($('.notes').length) {
      $('.notes').owlCarousel({
        loop: true,
        margin: 10,
        items: 1,
        nav: true,
        autoplay: true,
        dots:false,
        autoplayTimeout: 5500,
        navText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"]
      });
    }

    if ($("#doughnutChart").length) {
      var ctx = document.getElementById('doughnutChart').getContext("2d");

      var Blue = '#7152d3';

      var grey = '#c2b1f9';

      var trafficChartData = {
        datasets: [{
          data: [80, 20],
          backgroundColor: [
            Blue,
            grey
          ],
          hoverBackgroundColor: [
            Blue,grey
          ],
          borderColor: [
            Blue,grey
          ]
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'New',
          'Returning'
        ]
      };
      var trafficChartOptions = {
        responsive: true,
        cutoutPercentage: 60,
        animation: {
          animateScale: true,
          animateRotate: true
        },
        legend: false,
      };
      var trafficChartCanvas = $("#doughnutChart").get(0).getContext("2d");
      var trafficChart = new Chart(trafficChartCanvas, {
        type: 'doughnut',
        data: trafficChartData,
        options: trafficChartOptions
      });
    }

    if ($('#order-download-chart').length) {
      Chart.defaults.global.legend.labels.usePointStyle = true;
      var gradientBlue = ctx.createLinearGradient(0, 0, 0, 181);
      gradientBlue.addColorStop(0, 'rgba(241, 242, 243, .5)');
      gradientBlue.addColorStop(1, 'rgba(212, 232, 255, .5)');

      var gradientGreen = ctx.createLinearGradient(0, 0, 0, 181);
      gradientGreen.addColorStop(0, 'rgba(255, 255, 255, .5)');
      gradientGreen.addColorStop(1, 'rgba(140, 214, 188, .5)');

      var lineChartCanvas = $("#order-download-chart").get(0).getContext("2d");
      var orderDownloadData = {
        labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
        datasets: [
          {
            label: 'Order',
            data: [1300, 1250, 1500, 1150, 1300, 1350, 1300, 1200, 1150, 1300, 1350, 1280, 1220, 1310, 1280, 1100, 1200, 1220, 1300, 1100, 1350, 1380, 1380, 1420, 1300, 1450],
            backgroundColor: gradientBlue,
            borderColor: [
              '#0472ed'
            ],
            borderWidth: 3,
            fill: true
          },
          {
            label: 'Downloads',
            data: [700, 650, 800, 550, 700, 850, 700, 600, 550, 700, 850, 680, 620, 710, 680, 500, 600, 620, 700, 500, 850, 780,780, 820, 700,950],
            backgroundColor: gradientGreen,
            borderColor: [
              '#19ad79'
            ],
            borderWidth: 3,
            fill: true
          }
        ]
      };
      var orderDownloadOptions = {
        maintainAspectRatio:false,
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              stepsize:500,
              max: 1600,
              callback: function(value, index, values) {
                return '$' + value;
              }
            },

            gridLines: {
              display:true,
            }
          }],
          xAxes: [{
            display: true,
            gridLines: {
              display:false,
            }
          }]
        },
        legend: {
          display: false
        },
        legendCallback: function(chart) {
          var text = []; 
          text.push('<ul>'); 
          for (var i = 0; i < chart.data.datasets.length; i++) { 
              text.push('<li class="text-small"><span class="legend-dots" style="background:' + 
                         chart.data.datasets[i].borderColor + 
                         '"></span>'); 
              if (chart.data.datasets[i].label) { 
                  text.push(chart.data.datasets[i].label); 
              } 
              text.push('</li>'); 
          } 
          text.push('</ul>'); 
          return text.join('');
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0
          }
        }
      };
      var lineChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: orderDownloadData,
        options: orderDownloadOptions
      });

      $("#order-download-chart-legend").html(lineChart.generateLegend());
    }
    if ($('#order-download-chart-dark').length) {
      Chart.defaults.global.legend.labels.usePointStyle = true;
      var gradientBlue = ctx.createLinearGradient(0, 0, 0, 181);
      gradientBlue.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradientBlue.addColorStop(1, 'rgba(212, 232, 255, .5)');

      var gradientGreen = ctx.createLinearGradient(0, 0, 0, 181);
      gradientGreen.addColorStop(0, 'rgba(19, 22, 51, 1)');
      gradientGreen.addColorStop(1, 'rgba(0, 214, 188, 1)');

      var lineChartCanvas = $("#order-download-chart-dark").get(0).getContext("2d");
      var orderDownloadData = {
        labels: ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
        datasets: [
          {
            label: 'Order',
            data: [1300, 1250, 1500, 1150, 1300, 1350, 1300, 1200, 1150, 1300, 1350, 1280, 1220, 1310, 1280, 1100, 1200, 1220, 1300, 1100, 1350, 1380, 1380, 1420, 1300, 1450],
            backgroundColor: gradientBlue,
            borderColor: [
              '#0472ed'
            ],
            borderWidth: 3,
            fill: true
          },
          {
            label: 'Downloads',
            data: [700, 650, 800, 550, 700, 850, 700, 600, 550, 700, 850, 680, 620, 710, 680, 500, 600, 620, 700, 500, 850, 780,780, 820, 700,950],
            backgroundColor: gradientGreen,
            borderColor: [
              '#19ad79'
            ],
            borderWidth: 3,
            fill: true
          }
        ]
      };
      var orderDownloadOptions = {
        maintainAspectRatio:false,
        scales: {
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
              stepsize:500,
              max: 1600,
              callback: function(value, index, values) {
                return '$' + value;
              }
            },

            gridLines: {
              display:true,
            }
          }],
          xAxes: [{
            display: true,
            gridLines: {
              display:false,
            }
          }]
        },
        legend: {
          display: false
        },
        legendCallback: function(chart) {
          var text = []; 
          text.push('<ul>'); 
          for (var i = 0; i < chart.data.datasets.length; i++) { 
              text.push('<li class="text-small"><span class="legend-dots" style="background:' + 
                         chart.data.datasets[i].borderColor + 
                         '"></span>'); 
              if (chart.data.datasets[i].label) { 
                  text.push(chart.data.datasets[i].label); 
              } 
              text.push('</li>'); 
          } 
          text.push('</ul>'); 
          return text.join('');
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0
          }
        }
      };
      var lineChart = new Chart(lineChartCanvas, {
        type: 'line',
        data: orderDownloadData,
        options: orderDownloadOptions
      });

      $("#order-download-chart-dark-legend").html(lineChart.generateLegend());
    }

  });
})(jQuery);