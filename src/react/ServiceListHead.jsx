/**
 * ServiceListHead
 */
var ServiceListHead = React.createClass({
  propTypes: {
    getSortStatus: React.PropTypes.func.isRequired,
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    setSortStatus: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <th className="table-service-head">
        <a className={this.props.getSortStatus(this.props.name)} href="#" onClick={this.handleItemClick}>
          {this.props.label}
        </a>
      </th>
    )
  },
  handleItemClick: function (event) {
    event.preventDefault()
    this.props.setSortStatus(this.props.name)
  }
})
