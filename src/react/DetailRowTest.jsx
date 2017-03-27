/**
 * DetailRowTest
 */
var DetailRowTest = React.createClass({
  propTypes: {
    description: React.PropTypes.string.isRequired,
    item: React.PropTypes.object.isRequired,
    title: React.PropTypes.string.isRequired
  },
  render: function () {
    var item = this.props.item
    return (
      <tr className={this.getStatus(item.vurdering)}>
        <td className="text-center">
          <span className={this.getIcon(item.vurdering)} />
        </td>
        <td>
          <b>{this.props.title}</b>
          <br />
          <small>{this.props.description}</small>
        </td>
        <td>
          {item.svar}
        </td>
        <td className="text-center">
          {item.testverdi === null ? null : (
            <a href={item.testverdi} target="_blank">
              <span className={item.key == 'email' ? 'glyphicon glyphicon-envelope' : 'glyphicon glyphicon-new-window'} />
            </a>
          )}
        </td>
      </tr>
    )
  },
  getIcon: function (status) {
    var classes = 'glyphicon'
    switch (status) {
      case 'yes':
        classes += ' glyphicon-ok-sign'
        break;
      case 'no':
        classes += ' glyphicon-remove-sign'
        break;
      case 'soso':
        classes += ' glyphicon-warning-sign'
        break;
      case 'skip':
        classes += ' glyphicon-question-sign'
        break;
    }
    return classes
  },
  getStatus: function (status) {
    var classes = ''
    switch (status) {
      case 'yes':
        classes = 'success'
        break;
      case 'no':
        classes = 'danger'
        break;
      case 'soso':
        classes = 'warning'
        break;
      case 'skip':
        classes = 'text-muted'
        break;
    }
    return classes
  }
})
