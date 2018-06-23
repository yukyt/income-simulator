export const WORK_STYLE = {
  REGULAR_EMPLOYEE: 1,
  SELF_EMPLOYEE: 2,
  MULTI: 3,
};

export const WORK_STYLE_NAME = new Map([
  [WORK_STYLE.REGULAR_EMPLOYEE, '社員'],
  [WORK_STYLE.SELF_EMPLOYEE, '個人事業主'],
  [WORK_STYLE.MULTI, '両方'],
]);