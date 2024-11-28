import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-LK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const numberToWords = (num) => {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const convertLessThanThousand = (n) => {
    if (n === 0) return "";

    if (n < 10) return ones[n];

    if (n < 20) return teens[n - 10];

    if (n < 100) {
      return (
        tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "")
      );
    }

    return (
      ones[Math.floor(n / 100)] +
      " Hundred" +
      (n % 100 !== 0 ? " " + convertLessThanThousand(n % 100) : "")
    );
  };

  if (num === 0) return "Zero";

  const parts = [];
  if (num >= 1000) {
    parts.push(convertLessThanThousand(Math.floor(num / 1000)) + " Thousand");
    num %= 1000;
  }

  if (num > 0) {
    if (parts.length > 0) parts.push("");
    parts.push(convertLessThanThousand(num));
  }

  return parts.join(" ");
};

const SalarySlip = () => {
  // Sample employee data
  const employeeData = {
    name: "T W K D A Dayarathna",
    empNo: "177",
    designation: "Head of IT",
    phone: "94 78 600 4040",
    accountNo: "8006616706",
    bankBranch: "Commercial Bank - Matara",
    basicSalary: 70000.0,
    fixedAllowances: 10000.0,
    fuelCommission: 0,
    epf: 5600,
    advances: 0,
    loanRepayments: 0,
  };

  const grossPay =
    employeeData.basicSalary +
    employeeData.fixedAllowances +
    employeeData.fuelCommission;
  const totalDeductions =
    employeeData.epf + employeeData.advances + employeeData.loanRepayments;
  const netPay = grossPay - totalDeductions;

  const currentDate = new Date();
  const payDate = "31/10/2024";
  const payPeriod = "Oct 2024";

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white">
      <div className="border border-gray-300 p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-start">
            <img
              src="https://dunhinda.lk/assets/img/logo-mobile.png"
              alt="Logo"
              className="h-16 mr-4"
            />
            <div>
              <h1 className="text-lg font-bold">
                Dunhinda Agro International (Pvt) Ltd
              </h1>
              <p className="text-sm">
                Level 12, East Tower, World Trade Centre, Co 01.
              </p>
              <p className="text-sm">Tel: +94 112 337 886</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">SALARY SHEET</h2>
          </div>
        </div>

        {/* Employee Information */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <h3 className="font-bold">EMPLOYEE INFORMATION</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-gray-600">Name</p>
              <p>: {employeeData.name}</p>
              <p className="text-gray-600">Employee Number</p>
              <p>: {employeeData.empNo}</p>
              <p className="text-gray-600">Designation</p>
              <p>: {employeeData.designation}</p>
              <p className="text-gray-600">Phone</p>
              <p>: {employeeData.phone}</p>
              <p className="text-gray-600">Account Number</p>
              <p>: {employeeData.accountNo}</p>
              <p className="text-gray-600">Bank and Branch</p>
              <p>: {employeeData.bankBranch}</p>
            </div>
          </div>
          <div className="text-center p-4">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <p className="font-bold">PAY DATE</p>
              <p className="font-bold">PAY TYPE</p>
              <p className="font-bold">PERIOD</p>
              <p>{payDate}</p>
              <p>Monthly</p>
              <p>{payPeriod}</p>
            </div>
          </div>
        </div>

        {/* Salary Details */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">SALARY PARTICULARS</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-2 text-sm">
              <p>Basic Salary</p>
              <p className="text-right">
                {formatCurrency(employeeData.basicSalary)}
              </p>
              <p>Fixed Allowances</p>
              <p className="text-right">
                {formatCurrency(employeeData.fixedAllowances)}
              </p>
              <p>Fuel and Sales Commissions</p>
              <p className="text-right">
                {formatCurrency(employeeData.fuelCommission)}
              </p>
              <div className="col-span-2 border-t border-gray-300 mt-2 pt-2">
                <div className="flex justify-between font-bold">
                  <p>GROSS PAY</p>
                  <p>{formatCurrency(grossPay)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deductions */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Deductions</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-2 text-sm">
              <p>EPF 8%</p>
              <p className="text-right">{formatCurrency(employeeData.epf)}</p>
              <p>Salary Advances</p>
              <p className="text-right">
                {formatCurrency(employeeData.advances)}
              </p>
              <p>Loan Repayments/No Pay</p>
              <p className="text-right">
                {formatCurrency(employeeData.loanRepayments)}
              </p>
              <div className="col-span-2 border-t border-gray-300 mt-2 pt-2">
                <div className="flex justify-between font-bold">
                  <p>TOTAL DEDUCTIONS</p>
                  <p>{formatCurrency(totalDeductions)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Net Pay */}
        <div className="mb-6">
          <div className="flex justify-between font-bold text-lg border-t border-b border-gray-300 py-2">
            <p>NET PAY</p>
            <p>{formatCurrency(netPay)} LKR</p>
          </div>
          <p className="text-sm mt-2">
            AMOUNT IN WORDS: Rupees {numberToWords(Math.floor(netPay))} & Cents{" "}
            {numberToWords(Math.round((netPay % 1) * 100))} Only.
          </p>
        </div>

        {/* Leave Summary */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">LEAVE SUMMARY</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>Absent Dates:</p>
            <p>Sick/Medical Leaves:</p>
            <p>Leave Balance C/F:</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8">
          <div className="grid grid-cols-2 gap-8 text-center">
            <div>
              <div className="border-t border-gray-300 mt-8 pt-2">
                <p className="text-sm">HR/Payroll Department</p>
              </div>
            </div>
            <div>
              <div className="border-t border-gray-300 mt-8 pt-2">
                <p className="text-sm">Employee Signature & Date</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-center mt-4 text-gray-600">
          All matters related to salary and other benefits are strictly
          confidential.
        </p>
      </div>
    </div>
  );
};

export default SalarySlip;
