import * as React from 'react';
import './App.css';
import Deduction from './containers/Deduction';
import NetPayment from './containers/NetPayment';
import Salary from './containers/Revenue';
import WorkStyle from './containers/WorkStyle';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">所得計算機</h1>
        </header>
        <WorkStyle />
        <Salary />
        <Deduction />
        <NetPayment />
      </div>
    );
  }
}

export default App;
