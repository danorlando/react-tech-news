/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import navigationActions from '../actions';
import MuiMenuBar from '../components/common/MuiMenuBar';
import Main from './Main';
import NewsMenu from './NewsMenu';
import PersistentDrawer from '../components/common/PersistentDrawer';
import About from './About';
import Feeds from './Feeds';
import {withRouter} from 'react-router-dom';
import Stories from './Stories'
import Updates from './Updates'
import StoryStore from '../store/StoryStore'
import UpdatesStore from '../store/UpdatesStore'
import SettingsStore from '../store/SettingsStore'
import Item from './Item'


const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#111c4a',
      main: '#10234f',
      dark: '#707070',
      contrastText: '#eecf8f',
    },
    secondary: {
      light: '#999999',
      main: '#10234f',
      dark: '#1f1311',
      contrastText: '#FFFFFF',
    },
    color2primary: {
      contrastText: '#FFFFFF'
    },
    appBar: {
      color: 'primary'
    }
  },
});


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showChildren: false,
      showSettings: false
    }
  
    this.onSetSidebarOpen = this.onSetSidebar.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
  }
  

  componentWillMount() {
    SettingsStore.load()
    StoryStore.loadSession()
    UpdatesStore.loadSession()
    if (typeof window === 'undefined') return
    window.addEventListener('beforeunload', this.handleBeforeUnload)
  }

  componentDidMount() {
    // Empty the prebooted HTML and hydrate using live results from Firebase
    this.setState({ prebootHTML: '', showChildren: true })
  }

    /**
   * Give stores a chance to persist data to sessionStorage in case this is a
   * refresh or an external link in the same tab.
   */
  handleBeforeUnload() {
    StoryStore.saveSession()
    UpdatesStore.saveSession()
  }

  toggleSettings(event) {
    event.preventDefault()
    this.setState({showSettings: !this.state.showSettings})
  }

  onSetSidebar() {
    let side = !this.props.sidebarOpen;
    this.props.dispatch(navigationActions.toggleSidebar(side));
  }

  stories(route, type, limit, title) {
    return React.createClass({
      render() {
        return <Stories {...this.props} key={route} route={route} type={type} limit={limit} title={title}/>
      }
    })
   }

  updates(type) {
    return React.createClass({
      render() {
        return <Updates {...this.props} key={type} type={type}/>
      }
    })
  }

  render() {
    var Ask = this.stories('ask', 'askstories', 200, 'Ask')
    var Comments = this.updates('comments')
    var Jobs = this.stories('jobs', 'jobstories', 200, 'Jobs')
    var New = this.stories('newest', 'newstories', 500, 'New Links')
    var Show = this.stories('show', 'showstories', 200, 'Show')
    var Top = this.stories('news', 'topstories', 500)

    var sidebarContent =
      <div>
       <NewsMenu />
      
      </div>;
    return (
    <div>
      <MuiThemeProvider theme={theme}>

        <MuiMenuBar title={this.props.title} showSettings={this.state.showSettings} toggleSettings={this.toggleSettings} onSetSidebar={this.onSetSidebar} />
        
        <PersistentDrawer title={this.props.title} sidebarContent={sidebarContent}>

          <Switch>
            <Route exact path="/" component={Top} />
            <Route path='/news' ccomponent={Top}/>
            <Route path='/About' component={About}/>
            <Route path='/Feeds' component={Feeds}/>
            <Route path="news" component={Top}/>
            <Route path="newest" component={New}/>
            <Route path="show" component={Show}/>
            <Route path="ask" component={Ask}/>
            <Route path="jobs" component={Jobs}/>
            <Route path="item/:id" component={Item}/>
            <Route path="job/:id" component={Item}/>
            <Route path="poll/:id" component={Item}/>
            <Route path="story/:id" component={Item}/>
            <Route
              path="comment/:id"
              getComponent={(location, callback) => {
                require.ensure([], require => {
                  callback(null, require('./PermalinkedComment'))
                }, 'PermalinkedComment')
              }}
            />
            <Route path="newcomments" component={Comments}/>
            <Route
              path="user/:id"
              getComponent={(location, callback) => {
                require.ensure([], require => {
                  callback(null, require('./UserProfile'))
                }, 'UserProfile')
              }}
            />
            <Route
              path="*"
              getComponent={(location, callback) => {
                require.ensure([], require => {
                  callback(null, require('./NotFound'))
                }, 'NotFound')
              }}
            />
          
          </Switch>
          </PersistentDrawer>
        </MuiThemeProvider>
        
      </div>


    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
     title: state.navigationReducer.title,
     sidebarOpen: state.navigationReducer.sidebarOpen,
  };
}

export default withRouter(connect(mapStateToProps)(App));
