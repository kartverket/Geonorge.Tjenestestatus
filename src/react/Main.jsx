/**
 * Main
 */
var Main = React.createClass({
  getDefaultProps: function () {
    return {
      friendlyUrls: false,
      services: []
    }
  },
  propTypes: {
    friendlyUrls: React.PropTypes.bool,
    services: React.PropTypes.array
  },
  render: function() {
    var items = this.props.services.map(function (service) {
      var serviceUrl = this.props.friendlyUrls ? '/' + service + '/' : '/?type=' + service
      return (
        <li key={service}>
          <a href={serviceUrl}>
            {service.toUpperCase()}
          </a>
        </li>
      )
    }, this)
    return (
      <ul>
        {items}
      </ul>
    )
  }
})
