import { Component } from 'react';
import './styles/custom-variables.scss';
import './styles/reset.scss';
import './styles/index.scss';

class App extends Component {
  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
