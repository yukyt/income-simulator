export const salary = (state:number = 0, action:{type:string | null, price:number}) => {
  switch (action.type) {
    case 'CHANGE_SALARY':
      return action.price;
    default:
      return state;
  }
};

export const sales = (state:number = 0, action:{type:string | null, price:number}) => {
  switch (action.type) {
    case 'CHANGE_SALES':
      return action.price;
    default:
      return state;
  }
};