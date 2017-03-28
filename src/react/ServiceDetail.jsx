/**
 * ServiceDetail
 *
 * - Columns
 * - DetailRowItem
 * - DetailRowTest
 * - Loader
 * - Title
 */
var ServiceDetail = React.createClass({
  componentDidMount: function () {
    this.services = [{
      url: 'https://status.geonorge.no/testmonitorApi/forklaring?servicetype=' + this.props.serviceType,
      callback: 'getLabelsDone'
    },{
      url: 'https://status.geonorge.no/testmonitorApi/serviceDetail?servicetype=' + this.props.serviceType + '&uuid=' + this.props.uuid,
      callback: 'getDetailsDone'
    }]
    this.setState({
      loading: true
    }, this.fetchData)
  },
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
  getInitialState: function() {
    return {
      labels: {},
      loading: false,
      serviceIndex: -1,
      tests: [],
      values: {
        eier: '',
        melding: '',
        name: '',
        sjekket: moment().format('YYYY-MM-DD HH:mm:dd'),
        status: '',
        svartid: 0.0,
        uptime: 0.0,
        url: ''
      }
    }
  },
  propTypes: {
    friendlyUrls: React.PropTypes.bool.isRequired,
    serviceType: React.PropTypes.string.isRequired,
    uuid: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div>
        {this.state.loading ? <Loader /> : null}
        <Title friendlyUrls={this.props.friendlyUrls} name={this.state.values.name} serviceType={this.props.serviceType} uuid={this.props.uuid} />
        <div className="row">
          <div className="col-sm-4">
            <table className="table table-fixed">
              <Columns cols={['30%', '70%']}/>
              <tbody>
                <DetailRowItem label="Navn">
                  {this.state.values.name}
                </DetailRowItem>
                <DetailRowItem label="Eier">
                  {this.state.values.eier}
                </DetailRowItem>
                <DetailRowItem label="Svartid">
                  {this.state.values.svartid}
                </DetailRowItem>
                <DetailRowItem label="Sjekket">
                  <time dateTime={this.state.values.sjekket}>
                    {moment(this.state.values.sjekket, 'YYYY-MM-DD HH:mm:ss').fromNow()}
                  </time>
                </DetailRowItem>
                <DetailRowItem label="Oppetid">
                  {this.state.values.uptime + '%'}
                </DetailRowItem>
                <DetailRowItem label="Melding">
                  <span className="break-all-words">
                    {this.state.values.melding}
                  </span>
                </DetailRowItem>
              </tbody>
            </table>
            <hr />
            {this.props.serviceType === 'WMS' && this.state.values.url !== '' ? (
              <a className="thumbnail" href={this.state.values.url} target="_blank">
                <img alt="" src={this.state.values.url} />
              </a>
            ) : null}
          </div>
          <div className="col-sm-8">
            <table className="table table-fixed">
              <Columns cols={['7%', '70%', '16%', '7%']}/>
              <tbody>
                {this.state.tests.map(function (item) {
                  var key = item.key
                  var label = this.state.labels.hasOwnProperty(key) ? this.state.labels[key] : {
                    beskrivelse:'',
                    navn: key
                  }
                  return (
                    <DetailRowTest description={label.beskrivelse} key={key} item={item} title={label.navn} />
                  )
                }, this)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  },
  fetchData: function () {
    var serviceIndex = this.state.serviceIndex + 1
    if (serviceIndex < this.services.length) {
      this.setState({
        serviceIndex: serviceIndex
      }, this.getData)
    } else {
      this.setState({
        loading: false
      })
    }
  },
  getData: function () {
    var apiUrl = this.services[this.state.serviceIndex].url
    var callback = this.services[this.state.serviceIndex].callback
    fetch(apiUrl).then(this.jsonResult).then(this[callback])
  },
  getLabelsDone: function (data) {
    this.setState({
      labels: data
    }, this.fetchData)
  },
  getDetailsDone: function (data) {
    var values = {}
    var tests = []
    var keys = Object.keys(data)
    for (var i = 0, j = keys.length; i < j; i++) {
      var key = keys[i]
      var val = data[key]
      if (val !== null) {
        if (typeof data[key] === 'object') {
          val.key = key
          tests.push(val)
        } else {
          values[key] = val
        }
      }
    }
    var breadcrumb = document.getElementById('breadcrumb-uuid')
    if (breadcrumb) {
      var serviceElement = document.createElement('span')
      serviceElement.appendChild(document.createTextNode(values.name))
      breadcrumb.appendChild(serviceElement)
    }
    this.setState({
      tests: tests,
      values: values
    }, this.fetchData)
  },
  jsonResult: function (response) {
    return response.json()
  }
})
