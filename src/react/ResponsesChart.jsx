/**
 * ResponsesChart
 */
var ResponsesChart = React.createClass({
  componentDidMount: function () {
    this.ctx = this.refs.hasOwnProperty('chart') ? this.refs.chart.getContext('2d') : null
  },
  componentDidUpdate: function (prevProps, prevState) {
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
      this.drawGraph()
    }
  },
  propTypes: {
    data: React.PropTypes.array.isRequired,
    label: React.PropTypes.string.isRequired
  },
  render: function () {
    return (
      <canvas ref="chart" style={{height: '400px', width: '100%'}}>
        Canvas not supported...
      </canvas>
    )
  },
  drawGraph: function () {
    if (this.ctx !== null) {
      var dataPoints = this.props.data.map(function (dataPoint) {
        return {
          x: new Date(dataPoint.timestamp),
          y: parseFloat(dataPoint.svartid),
        };
      });
      var dataPointsLast = dataPoints.length - 1;
      var chart = new Chart(this.ctx, {
        type: 'line',
        data: {
          datasets: [{
            borderColor: '#3867c8',
            borderWidth: 1,
            data: dataPoints,
            fill: false,
            hitRadius: 5,
            label: this.props.label,
            pointRadius: 0
          },{
            borderColor: '#fe5000',
            borderWidth: 1,
            data: [{
              x: dataPoints[0].x,
              y: 4
            },{
              x: dataPoints[dataPointsLast].x,
              y: 4
            }],
            fill: false,
            label: 'Geodatalovens krav',
            pointRadius: 0
          }]
        },
        options: {
          scales: {
            xAxes: [{
              ticks: {
                fontFamily: 'sans-serif',
                fontSize: 11
              },
              time: {
                displayFormats: {
                  minute: 'HH:mm'
                },
                unit: 'minute',
                unitStepSize: 60
              },
              type: 'time'
            }],
            yAxes: [{
              ticks: {
                callback: function (value) {
                  return value + ' sek';
                },
                fontFamily: 'sans-serif',
                fontSize: 11,
                min: -1,
                suggestedMax: 5
              }
            }]
          },
          tooltips: {
            backgroundColor: '#fe5000',
            callbacks: {
              footer: function (tooltipItem) {
                return tooltipItem[0].yLabel == -1 ? 'Ingen respons...' : 'Svartid: ' + tooltipItem[0].yLabel + ' sekunder';
              },
              label: function () {
                return '';
              },
              title: function (tooltipItem) {
                return moment(tooltipItem[0].xLabel).format('LLL');
              }
            },
            footerFontFamily: 'sans-serif',
            footerFontStyle: 'normal',
            titleFontFamily: 'sans-serif',
            titleFontStyle: 'normal',
            titleMarginBottom: 0
          }
        }
      });
    }
  }
})
