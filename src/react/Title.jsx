/**
 * Title
 */
var Title = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    uuid: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="row service-title">
        <div className="col-sm-12">
          <h3>
            Tjenestenavn:&nbsp;{this.props.name}&nbsp;
          </h3>
          <a href=".">
            <span className="glyphicon glyphicon-remove" />
          </a>
        </div>
        <div className="col-sm-12">
          <span className="last-changed-date no-padding">
            UUID: {this.props.uuid}
          </span>
        </div>
        <div className="col-sm-12">
          <span className="separator-md" />
        </div>
      </div>
    )
  }
})
