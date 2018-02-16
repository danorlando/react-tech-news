/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import NewsDirectoryPage from './News/NewsDirectoryPage';
import IssuePage from './News/IssuePage';
import LoginPage from './LoginPage';
import { connect } from 'react-redux';
import Sidebar from 'react-sidebar';
import NewsMenu from './NewsMenu';
import PeopleMenu from './PeopleMenu';
import EmployeeDirectoryPage from './People/EmployeeDirectoryPage';
import EmployeePage from './People/EmployeePage';
import { navigationActions } from '../actions/navigationActions';
import TargetsPage from './Targets/TargetsPage';
import TargetsMenu from './TargetsMenu';
import NameQuiz from './People/NameQuiz'
import TitleQuiz from './People/TitleQuiz'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import MuiMenuBar from '../components/common/MuiMenuBar';


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
  
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen() {
    let side = !this.props.sidebarOpen;
    this.props.dispatch(navigationActions.toggleSidebar(side));
  }
  render() {
    var sidebarContent =
      <div>
        <div className="sideitem">
              <NewsMenu/>
            </div>
        <div className="sideitem">
            <PeopleMenu/>
          </div>
        <div className="sideitem">
            <TargetsMenu/>
        </div>
      </div>;
    return (
    <div>
      <MuiThemeProvider theme={theme}>
      <div style={{visibility: (this.props.loggedIn) ? 'visible' : 'hidden'}}> 
        <MuiMenuBar breadcrumb={this.props.breadcrumb} onSetSidebar={this.onSetSidebarOpen} />
      </div>
      <Sidebar style={{zIndex: 100}}sidebarClassName="sidebar" sidebar={sidebarContent}
              open={this.props.sidebarOpen}
              onSetOpen={this.onSetSidebarOpen}>
        
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path='/login' component={LoginPage}/>
          <Route path='/News/All' component={NewsDirectoryPage}/>
          <Route path='/newspaper/:pub/:year/:month/:day' component={IssuePage}/>
          <Route path='/newspaper/:pub/:year/:month/:day/news/:pageID' component={IssuePage}/>
          <Route path='/News_Current' component={IssuePage}/>
          <Route path='/People/All' component={EmployeeDirectoryPage}/>
          <Route path='/People/:name' component={EmployeePage}/>
          <Route path='/NameQuiz' component={NameQuiz} />
          <Route path='/TitleQuiz' component={TitleQuiz} />
          <Route path='/Targets/Production/All/Current/Year' component={TargetsPage}/>
        </Switch>
        </Sidebar>
        </MuiThemeProvider>
        
      </div>


    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
     loggedIn: state.authReducer.loggedIn,
     breadcrumb: state.navigationReducer.breadcrumb,
     sidebarOpen: state.navigationReducer.sidebarOpen,
  };
}

export default connect(mapStateToProps)(App);
