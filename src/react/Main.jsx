/**
 * Main
 */
var Main = React.createClass({
  getDefaultProps: function () {
    return {
      services: []
    }
  },
  propTypes: {
    services: React.PropTypes.array
  },
  render: function() {
    var items = this.props.services.map(function (service) {
      var friendlyUrls = location.href.indexOf('localhost') === -1 && location.href.indexOf('index.html') === -1 ? true : false
      var serviceUrl = friendlyUrls ? '/' + service + '/' : '/?type=' + service
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
