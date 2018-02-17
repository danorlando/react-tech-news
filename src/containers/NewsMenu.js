import React, { Component } from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router-dom'
import { navigationActions } from '../actions/navigationActions';
import Button from 'material-ui/Button';

class NewsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  setTitleBar(title) {
    let side = !this.props.sidebarOpen;
    this.props.dispatch(navigationActions.toggleSidebar(side));
    this.props.dispatch(navigationActions.updateTitleBar(title));
  }

  render() {
    return (
      <div className="bimba">
        <Button onClick={() => this.setTitleBar('News')}>
          <Link to='/news' ><i className="far fa-newspaper" aria-hidden="true"></i> News</Link>
        </Button>
        <Button onClick={() => this.setTitleBar('New')}>
          <Link to="/newest"><i className="far fa-newspaper"></i> Latest</Link>{' | '}
        </Button>
        <Button onClick={() => this.setTitleBar('Comments')}> 
          <Link to="/newcomments"><i className="far fa-newspaper"></i> Comments</Link> {' | '}
        </Button> 
        <Button onClick={() => this.setTitleBar('Show')}>
          <Link to="/show"><i className="far fa-newspaper"></i> Show</Link>{' | '}
        </Button>
        <Button onClick={() => this.setTitleBar('Ask')}> 
          <Link to="/ask"><i className="far fa-newspaper"></i> Ask</Link>{' | '}
        </Button>
        <Button onClick={() => this.setTitleBar('Jobs')}>
          <Link to="/jobs"><i className="far fa-newspaper"></i> Jobs</Link>
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
     breadcrumb: state.navigationReducer.breadcrumb,
     sidebarOpen: state.navigationReducer.sidebarOpen
  };
}

export default connect(mapStateToProps)(NewsMenu); 