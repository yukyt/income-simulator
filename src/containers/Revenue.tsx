import * as React from 'react';
import Salary from '../components/Salary';
import Sales from '../components/Sales';

const Revenue = ({
  }) => (
  <section>
    <Salary />
    <Sales />
  </section>
);


// const Revenue = (connect(mapStateToProps, mapDispatchToProps)(Salary));
export default Revenue;
