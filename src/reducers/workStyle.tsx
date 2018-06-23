import * as CONSTANTS from '../define'

export const workStyle = (state:number = CONSTANTS.WORK_STYLE.REGULAR_EMPLOYEE, action:{type:string | null, workStyle:number}) => {
  switch (action.type) {
    case 'CHANGE_WORK_STYLE':
      return action.workStyle;
    default:
      return state;
  }
};

export default workStyle;
