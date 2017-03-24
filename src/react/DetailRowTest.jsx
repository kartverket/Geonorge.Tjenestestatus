/**
 * DetailRowTest
 */
var DetailRowTest = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },
  render: function () {
    var item = this.props.item
    var legend = LEGENDS.hasOwnProperty(item.key) ? LEGENDS[item.key] : {
      title: item.key,
      description: '...'
    }
    return (
      <tr className={this.getStatus(item.vurdering)}>
        <td className="text-center">
          <span className={this.getIcon(item.vurdering)} />
        </td>
        <td>
          <b>{legend.title}</b>
          <br />
          <small>{legend.description}</small>
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
