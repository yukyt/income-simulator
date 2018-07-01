// 経費
export const expense = (state:number = 0, action:{type:string | null, price:number}) => {
  switch (action.type) {
    case 'CHANGE_EXPENSE':
      return action.price;
    default:
      return state;
  }
};

// 給与所得控除 平成29年度版
export const payrollDeduction = (state:number = 0, action:{type:string | null, price:number}) => {
  switch (action.type) {
    case 'CHANGE_SALARY':
      if (action.price <= 650000) {
        return action.price;
      } else if (action.price <= 1800000) {
        return action.price * 0.4;
      } else if (action.price <= 3600000) {
        return action.price * 0.3 + 180000;
      } else if (action.price <= 6600000) {
        return action.price * 0.2 + 540000;
      } else if (action.price <= 10000000) {
        return action.price * 0.1 + 1200000;
      } else {
        return 2200000;
      }
    default:
      return state;
  }
};

// 青色申告控除
export const blueReturnDeduction = (state:number = 0, action:{type:string | null, price:number}) => {
  switch (action.type) {
    case 'CHANGE_SALES':
      if (action.price <= 650000) {
        return action.price;
      }
      return 650000;
    default:
      return state;
  }
};
