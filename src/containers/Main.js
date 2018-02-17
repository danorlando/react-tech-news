import React, {Component} from 'react';
import StoryStore from '../store/StoryStore'
import UpdatesStore from '../store/UpdatesStore'
import SettingsStore from '../store/SettingsStore'


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      prebootHTML: this.props.params.prebootHTML,
      showChildren: false
    }
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

  toggleSettings(e) {
    e.preventDefault()
    this.setState({showSettings: !this.state.showSettings})
  }


  render() {

    return (

    <div className="App__content">
      <div dangerouslySetInnerHTML={{ __html: this.state.prebootHTML }}/>
      {this.state.showChildren ? this.props.children : ''}
    </div>
    )
  }
}

export default Main;