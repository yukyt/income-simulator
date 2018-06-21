export const payrollDeduction = (state:number = 0, action:{type:string | null, price:number}) => {
  switch (action.type) {
    case 'CHANGE_TOTAL_PAYMENT':
      // TODO とりあえず2割固定
      return action.price * 0.2;
    default:
      return state;
  }
};