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
    ticksHeight: React.PropTypes.number.isRequired,
    ticksVertical: React.PropTypes.number.isRequired,
    ticksWidth: React.PropTypes.number.isRequired
  },
  render: function () {
    return (
      <canvas ref="chart" style={{width: '100%'}}>
        Canvas not supported...
      </canvas>
    )
  },
  drawGraph: function () {
    if (this.ctx !== null) {
      var paddingBottom = 29.5
      var paddingLeft = 40.5
      var paddingRight = 19.5
      var paddingTop = 20.5

      var total = this.props.data.length
      var canvasWidth = this.refs.chart.clientWidth
      var step = (canvasWidth - paddingLeft - paddingRight) / total
      var baseline = this.props.ticksHeight * this.props.ticksVertical + paddingTop
      var canvasHeight = baseline + paddingBottom

      this.ctx.canvas.width  = canvasWidth
      this.ctx.canvas.height = canvasHeight
      this.ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      for (var i = 0; i <= this.props.ticksVertical; i++) {
        var _y = i * this.props.ticksHeight + paddingTop
        this.drawText((this.props.ticksVertical - i).toString() + 'sek', paddingLeft - 5, _y, (i == 4 ? '#FF0000' : '#333333'), '12px Arial', 'end', 'middle')
        var _c = '#CCCCCC'
        var _d = [5, 5]
        switch (i) {
          case 4:
            _c = '#FF0000'
            break;
          case this.props.ticksVertical:
            _c = '#333333'
            _d = []
        }
        this.drawLine(paddingLeft, _y, (canvasWidth - paddingRight), _y, _c, _d)
      }

      var tickZ = (canvasWidth - paddingLeft - paddingRight) / total
      var tickStep = Math.floor(this.props.ticksWidth / tickZ)
      for (var tickX = total - 1; tickX >= 0; tickX -= tickStep) {
        var _x = paddingLeft + tickZ * tickX
        var txt = this.props.data[tickX].timestamp.substr(11, 5)
        this.drawText(txt, _x, baseline + 10, '#333333', '12px Arial', 'center', 'top')
        this.drawLine(_x, baseline + 10, _x, baseline, '#333333')
        this.drawLine(_x, baseline, _x, paddingTop, '#CCCCCC', [5, 5])
      }

      this.ctx.beginPath()
      for (var dataIndex = 0; dataIndex < total; dataIndex++) {
        var data = this.props.data[dataIndex]
        var stepX = (dataIndex * step) + paddingLeft
        var stepY = baseline - (data.svartid * this.props.ticksHeight)
        if (dataIndex == 0) {
          this.ctx.moveTo(stepX, stepY)
        }
        this.ctx.lineTo(stepX, stepY)
      }
      this.ctx.setLineDash([])
      this.ctx.strokeStyle = '#000000'
      this.ctx.stroke()
    }
  },
  drawText: function (txt, x, y, color, font, align, baseline) {
    if (this.ctx !== null) {
      this.ctx.font = font
      this.ctx.textAlign = align
      this.ctx.textBaseline = baseline
      this.ctx.fillStyle = color
      this.ctx.fillText(txt, x, y)
    }
  },
  drawLine: function (x0, y0, x1, y1, color, lineDash) {
    if (lineDash === undefined) {
      lineDash = []
    }
    if (this.ctx !== null) {
      this.ctx.beginPath()
      this.ctx.moveTo(x0, y0)
      this.ctx.lineTo(x1, y1)
      this.ctx.strokeStyle = color
      this.ctx.setLineDash(lineDash)
      this.ctx.stroke()
    }
  }
})
