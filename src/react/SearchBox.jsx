/**
 * SearchBox
 */
var SearchBox = React.createClass({
  getDefaultProps: function () {
    return {
      placeholder: ''
    }
  },
  propTypes: {
    callback: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string.isRequired
  },
  render: function () {
    return (
      <div className="media mt-2">
        <div className="media-body">
          <input className="form-control" onChange={this.changeHandler} placeholder={this.props.placeholder} type="text" value={this.props.value} />
        </div>
        <div className="media-right media-middle pl-0">
          <button className="btn" disabled={this.props.value === ''} onClick={this.clickHandler} type="button">
            <span className={this.props.value === '' ? 'glyphicon glyphicon-search' : 'glyphicon glyphicon-remove'} />
          </button>
        </div>
      </div>
    )
  },
  changeHandler: function (event) {
    this.props.callback(event.target.value)
  },
  clickHandler: function (event) {
    event.preventDefault()
    if (this.props.value !== '') {
      this.props.callback('')
    }
  }
})
