export const savePayrollName = (payrollName) => {
  localStorage.payrollName = payrollName;
};

export const getPayrollName = () => {
  return localStorage.payrollName;
};
