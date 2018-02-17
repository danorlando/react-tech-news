import { Route } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

var React = require('react')
var Link = require('react-router-dom')
var TimeAgo = require('react-timeago').default
var Button = require('material-ui/Button')

var SettingsStore = require('../store/SettingsStore')
var pluralise = require('../utils/pluralise')
var urlParse = require('url-parse')

var parseHost = function(url) {
  var hostname = (urlParse(url, true)).hostname
  var parts = hostname.split('.').slice(-3)
  if (parts[0] === 'www') {
    parts.shift()
  }
  return parts.join('.')
}
/*
const LinkButton = withRouter(({ history }), item => (
  <button
    type='button'
    onClick={() => { history.push('/user/' ) }}
  >
    CLICK ME
  </button>
)) */
/*
var LinkButton = function(item)  {
  return (
    
    <button
      type="button"
      onClick={() => { this.props.history.push('/user/' + item.by ) }}
    >
      {item.by}
    </button>
  )

}
*/
/**
 * Reusable logic for displaying an item.
 */
var ItemMixin = {
 
  
  /**
   * Render an item's metadata bar.
   */
  renderItemMeta(item, extraContent) {
     

  
    var itemDate = new Date(item.time * 1000)

    if (item.type === 'job') {
      return <div className="Item__meta">
        <TimeAgo date={itemDate} className="Item__time"/>
      </div>
    }

    return <div className="Item__meta">
      <span className="Item__score">
        {item.score} point{pluralise(item.score)}
      </span>{' '}
      <span className="Item__by">
        by <a href={`/user/${item.by}`} > {item.by} </a>
      </span>{' '}
      <TimeAgo date={itemDate} className="Item__time"/>
      {' | '}
      <a href={`/${item.type}/${item.id}`}>
        {item.descendants > 0 ? item.descendants + ' comment' + pluralise(item.descendants) : 'discuss'}
      </a>
      {extraContent}
    </div>
  },

  /**
   * Render an item's title bar.
   */
  renderItemTitle(item) {
    var hasURL = !!item.url
    var title
    if (item.dead) {
      title = '[dead] ' + item.title
    }
    else {
      title = (hasURL ? <a href={item.url}>{item.title}</a>
                      : <Link to={`/${item.type}/${item.id}`}>{item.title}</Link>)
    }
    return <div className="Item__title" style={{fontSize: SettingsStore.titleFontSize}}>
      {title}
      {hasURL && ' '}
      {hasURL && <span className="Item__host">({parseHost(item.url)})</span>}
    </div>
  }
}

module.exports = ItemMixin
