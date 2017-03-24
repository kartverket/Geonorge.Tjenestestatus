/**
 * ServiceListItem
 */
var ServiceListItem = React.createClass({
  propTypes: {
    friendlyUrls: React.PropTypes.bool.isRequired,
    item: React.PropTypes.object.isRequired,
    serviceType: React.PropTypes.string.isRequired
  },
  render: function() {
    var detailUrl = this.props.friendlyUrls ? (location.pathname + this.props.item.uuid) : (location.pathname + '?type=' + this.props.serviceType + '&uuid=' + this.props.item.uuid)
    return (
      <tr>
        <td className="table-service-row">
          <a href={'https://kartkatalog.geonorge.no/metadata/org/title/' + this.props.item.uuid} target="_blank">
            {this.props.item.service}
          </a>
        </td>
        <td className="table-service-row">
          <span>
            {this.props.item.eier}
          </span>
        </td>
        <td className="table-service-row">
          <div className={this.props.item.status ? 'label label-success' : 'label label-danger'}>
            {this.props.item.svartid}&nbsp;sek
          </div>
        </td>
        <td className="table-service-row">
          <time dateTime={this.props.item.sjekket}>
            {moment(this.props.item.sjekket, 'YYYY-MM-DD HH:mm:ss').fromNow()}
          </time>
        </td>
        <td className="table-service-row text-center">
          <a href={detailUrl}>
            <span className="custom-icon custom-icon-info" />
          </a>
        </td>
      </tr>
    )
  }
})
