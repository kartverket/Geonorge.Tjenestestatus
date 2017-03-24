/**
 * ServiceList
 *
 * - Loader
 * - ServiceListHead
 * - ServiceListItem
 */
var ServiceList = React.createClass({
  componentDidMount: function () {
    this.setState({
      loading: true
    }, this.getItems)
  },
  getInitialState: function () {
    return {
      items: [],
      loading: false,
      sort: 'service'
    }
  },
  propTypes: {
    friendlyUrls: React.PropTypes.bool.isRequired,
    serviceType: React.PropTypes.string.isRequired
  },
  render: function() {
    var items = this.state.items.length == 0 ? [] : this.state.items.slice(0).sort(this.compareItems)
    var rows = items.length == 0 ? (
      <tr>
        <td className="table-service-row" colSpan="5">Laster inn tjenester...</td>
      </tr>
    ) : items.map(function (item) {
      return (
        <ServiceListItem friendlyUrls={this.props.friendlyUrls} item={item} key={item.uuid} serviceType={this.props.serviceType} />
      )
    }, this)
    return (
      <div>
        {this.state.loading ? <Loader /> : null}
        <table className="table table-service">
          <colgroup>
            <col width="30%" />
            <col width="30%" />
            <col width="15%" />
            <col width="20%" />
            <col width="5%" />
          </colgroup>
          <thead>
            <tr>
              <ServiceListHead getSortStatus={this.getSortStatus} label="Navn" name="service" setSortStatus={this.setSortStatus} />
              <ServiceListHead getSortStatus={this.getSortStatus} label="Eier" name="eier" setSortStatus={this.setSortStatus} />
              <ServiceListHead getSortStatus={this.getSortStatus} label="Status" name="status" setSortStatus={this.setSortStatus} />
              <ServiceListHead getSortStatus={this.getSortStatus} label="Sist sjekket" name="sjekket" setSortStatus={this.setSortStatus} />
              <th className="table-service-head text-center">
                <span>Vis info</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  },
  getItems: function () {
    var apiUrl = 'https://status.geonorge.no/testmonitorApi/serviceList?servicetype=' + this.props.serviceType
    fetch(apiUrl).then(this.jsonResult).then(this.getItemsDone)
  },
  getItemsDone: function (data) {
    this.setState({
      items: data,
      loading: false
    })
  },
  jsonResult: function (response) {
    return response.json()
  },
  getSortStatus: function (name) {
    var index = this.state.sort.indexOf(name)
    return index === -1 ? '' : ['asc', 'desc'][index]
  },
  setSortStatus: function (name) {
    var sort = this.state.sort == name ? '-' + name : name
    this.setState({
      sort: sort
    })
  },
  compareItems: function (a, b) {
    var direction = 0
    var match = this.state.sort.match(/^(\-)?([a-z]+)$/)
    if (match) {
      var key = match[2]
      var value = match[1] === undefined ? -1 : 1
      if (a[key] < b[key]) {
        direction = value
      }
      if (a[key] > b[key]) {
        direction = value * -1
      }
    }
    return direction
  }
})
