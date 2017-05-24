/**
 * ProgressBar
 */
var ProgressBar = React.createClass({
  getDefaultProps: function () {
    return {
      baseClass: 'muted',
      iconClass: 'star'
    }
  },
  propTypes: {
    baseClass: React.PropTypes.string,
    iconClass: React.PropTypes.string,
    total: React.PropTypes.number.isRequired,
    value: React.PropTypes.number.isRequired
  },
  render: function() {
    var percent = this.props.total == 0 ? '0%' : (this.props.value / this.props.total * 100).toFixed(2) + '%'
    return (
      <div>
        <div className={'text-' + this.props.baseClass}>
          <span className={'glyphicon glyphicon-' + this.props.iconClass + ' mx-1'} />
          <b>{this.props.value} / {this.props.total} - {percent}</b>
        </div>
        <div className="progress progress-status mb-0">
          <div className={'progress-bar progress-bar-' + this.props.baseClass} role="progressbar" style={{width: percent}}>
            <span className="sr-only">
              {percent}
            </span>
          </div>
        </div>
      </div>
    )
  }
})
