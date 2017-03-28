/**
 * ServiceList
 *
 * - Loader
 * - SearchBox
 * - ServiceListHead
 * - ServiceListItem
 */
var ServiceList = React.createClass({
  componentDidUpdate: function (prevProps, prevState) {
    var loadingPrev = prevState.loading
    var loadingNext = this.state.loading
    if (loadingPrev != loadingNext) {
      var display = ''
      if (loadingPrev == false && loadingNext == true) {
        display = 'block'
      }
      if (loadingPrev == true && loadingNext == false) {
        display = 'none'
      }
      var backdrop = document.getElementById('backdrop')
      if (backdrop) {
        backdrop.style.display = display
      }
    }
  },
  componentDidMount: function () {
    this.setState({
      loading: true
    }, this.getItems)
  },
  getInitialState: function () {
    return {
      items: [],
      loading: false,
      search: '',
      sort: 'service'
    }
  },
  propTypes: {
    friendlyUrls: React.PropTypes.bool.isRequired,
    serviceType: React.PropTypes.string.isRequired
  },
  render: function() {
    var items = this.state.items.length == 0 ? [] : this.state.items.slice(0).filter(this.filterItems).sort(this.compareItems)
    var rows = items.length == 0 ? (
      <tr>
        <td className="table-service-row" colSpan="5">
          {this.state.loading ? 'Laster inn tjenester...' : 'Finner ingen tjenester...'}
        </td>
      </tr>
    ) : items.map(function (item) {
      return (
        <ServiceListItem friendlyUrls={this.props.friendlyUrls} item={item} key={item.uuid} serviceType={this.props.serviceType} />
      )
    }, this)
    return (
      <div>
        {this.state.loading ? <Loader /> : null}
        <div className="row mt-5">
          <div className="col-sm-4 col-md-offset-8">
            <SearchBox callback={this.updateSearch} placeholder={'Søk på ' + this.props.serviceType + '-tjenester'} value={this.state.search} />
          </div>
        </div>
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
  updateSearch: function (value) {
    var pattern = new RegExp('^([0-9a-zæøå]+)?$', 'i')
    if (pattern.test(value)) {
      this.setState({
        search: value
      })
    }
  },
  filterItems: function (item) {
    var search = this.state.search.toLowerCase()
    var isHit = true
    if (search !== '') {
      isHit = false
      if (item.service.toLowerCase().indexOf(search) !== -1) {
        isHit = true
      }
      if (item.eier.toLowerCase().indexOf(search) !== -1) {
        isHit = true
      }
    }
    return isHit
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
