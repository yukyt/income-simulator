
export const totalPayment = (state:number = 0, action:{type:string | null, price:number}) => {
  switch (action.type) {
    case 'CHANGE_TOTAL_PAYMENT':
      return action.price;
    default:
      return state;
  }
};