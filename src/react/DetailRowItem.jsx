/**
 * DetailRowItem
 */
var DetailRowItem = React.createClass({
  propTypes: {
    children: React.PropTypes.node.isRequired,
    label: React.PropTypes.string.isRequired
  },
  render: function () {
    return (
      <tr>
        <th>
          {this.props.label}
        </th>
        <td>
          {this.props.children}
        </td>
      </tr>
    )
  }
})
