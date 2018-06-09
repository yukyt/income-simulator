import * as React from 'react';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">所得計算機</h1>
        </header>
        TODO: 労働形態選択フォーム<br />
        TODO: 収入入力フォーム<br />
        TODO: 支出表示<br />
        TODO: 所得表示<br />
      </div>
    );
  }
}

export default App;
