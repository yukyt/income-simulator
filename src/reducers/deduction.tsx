export const payrollDeduction = (state:number = 0, action:{type:string | null, price:number}) => {
  switch (action.type) {
    case 'CHANGE_SALARY':
      // TODO とりあえず2割固定
      return action.price * 0.2;
    default:
      return state;
  }
};

export const blueReturnDeduction = (state:number = 65, action:{type:string | null, price:number}) => {
  switch (action.type) {
    case 'CHANGE_SALES':
      return state;
    default:
      return state;
  }
};