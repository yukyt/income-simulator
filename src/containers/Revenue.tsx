import * as React from 'react';
import { connect } from 'react-redux';
import Salary from '../components/Salary';
import Sales from '../components/Sales';
import * as CONSTANTS from '../define';

interface IProps {
  workStyle: number
}

class Revenue extends React.Component<IProps, {}> {
  public render() {
    return (
      <section>
        <div style={{ display: this.props.workStyle !== CONSTANTS.WORK_STYLE.SELF_EMPLOYEE ? '' : 'none' }}>
          <Salary />
        </div>
        <div style={{ display: this.props.workStyle !== CONSTANTS.WORK_STYLE.REGULAR_EMPLOYEE ? '' : 'none' }}>
          <Sales />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state:any) => ({
  workStyle: state.workStyle,
});

export default connect(mapStateToProps)(Revenue);
