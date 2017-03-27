/**
 * Columns
 */
var Columns = React.createClass({
  propTypes: {
    cols: React.PropTypes.array.isRequired
  },
  render: function () {
    var cols = this.props.cols.map(function (col, index) {
      return (
        <col key={index} width={col} />
      )
    })
    return (
      <colgroup>
        {cols}
      </colgroup>
    )
  }
})
