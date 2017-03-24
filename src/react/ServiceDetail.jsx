/**
 * ServiceDetail
 *
 * - DetailRowItem
 * - DetailRowTest
 * - Loader
 * - Title
 */
var ServiceDetail = React.createClass({
  componentDidMount: function () {
    this.setState({
      loading: true
    }, this.getItem)
  },
  getInitialState: function() {
    return {
      loading: false,
      tests: [],
      values: {
        eier: '',
        melding: '',
        name: '',
        sjekket: '1970-01-01 00:00:00',
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
        <Title name={this.state.values.name} uuid={this.props.uuid} />
        <div className="row">
          <div className="col-sm-4">
            <table className="table table-fixed">
              <colgroup>
                <col width="30%" />
                <col width="70%" />
              </colgroup>
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
              <colgroup>
                <col width="7%" />
                <col width="70%" />
                <col width="16%" />
                <col width="7%" />
              </colgroup>
              <tbody>
                {this.state.tests.map(function (item) {
                  return (
                    <DetailRowTest key={item.key} item={item} />
                  )
                }, this)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  },
  getItem: function () {
    var apiUrl = 'https://status.geonorge.no/testmonitorApi/serviceDetail?servicetype=' + this.props.serviceType + '&uuid=' + this.props.uuid
    fetch(apiUrl).then(this.jsonResult).then(this.getItemDone)
  },
  getItemDone: function (data) {
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
      loading: false,
      tests: tests,
      values: values
    })
  },
  jsonResult: function (response) {
    return response.json()
  }
})
