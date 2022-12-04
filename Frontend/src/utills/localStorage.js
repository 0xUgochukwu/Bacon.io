export const savePayrollName = (payrollName) => {
  localStorage.payrollName = payrollName;
};

export const getPayrollName = () => {
  return localStorage.payrollName;
};

export const saveSavingsName = (savingsName) => {
  localStorage.savingsName = savingsName;
};

export const getSavingsName = () => {
  return localStorage.savingsName;
};
