var React = require('react')
var Link = require('react-router-dom')

var Paginator = React.createClass({
  _onClick(e) {
    setTimeout(function() { window.scrollTo(0, 0) }, 0)
  },

  render() {
    if (this.props.page === 1 && !this.props.hasNext) { return null }
    return <div className="Paginator">
     
    </div>
  }
})

module.exports = Paginator
