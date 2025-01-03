import React, { useState } from 'react';
import './Calculator.css';

const ProfitCalculator = () => {
  const [turnover, setTurnover] = useState('');
  const [expenses, setExpenses] = useState('');

  const calculateValues = () => {
    const turnoverNum = parseFloat(turnover) || 0;
    const expensesNum = parseFloat(expenses) || 0;
    
    const profitBeforeTax = turnoverNum - expensesNum;
    const businessAllowance = Math.min(profitBeforeTax * 0.14, 5030);
    const startersRelief = Math.min(profitBeforeTax * 0.10, 2123);
    const afterDeductibles = profitBeforeTax - businessAllowance - startersRelief;
    const smeExemption = afterDeductibles * 0.14;
    const taxableProfit = afterDeductibles - smeExemption;
    
    const incomeTax = taxableProfit * 0.3693;
    const levyReduction = Math.min(incomeTax * 0.40, 3070);
    const taxCredit = Math.min(incomeTax * 0.60, 4907);
    const finalTax = Math.max(incomeTax - levyReduction - taxCredit, 0);
    const finalProfit = taxableProfit - finalTax;

    return {
      profitBeforeTax,
      businessAllowance,
      startersRelief,
      afterDeductibles,
      smeExemption,
      taxableProfit,
      incomeTax,
      levyReduction,
      taxCredit,
      finalTax,
      finalProfit
    };
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('nl-NL', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const values = calculateValues();

  return (
    <div className="profit-calculator">
      <h2 className="bold">ZZP Tax NL</h2>
      
      <div className="input-group">
        <div className="input-row">
          <label className="input-label">Turnover (VAT excluded)</label>
          <input
            type="number"
            value={turnover}
            onChange={(e) => setTurnover(e.target.value)}
            className="input-field"
            placeholder="0"
          />
          <span className="hint-text">(Annual box1 income)</span>
        </div>
        
        <div className="input-row">
          <label className="input-label">Expenses</label>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            className="input-field"
            placeholder="0"
          />
          <span className="hint-text">(depreciation, insurances, accountants, purchases, etc.)</span>
        </div>
      </div>

      <div className="section">
        <h3 className="bold">Calculating deductibles</h3>
        <div className="result-row">
          <span>Profit before taxes</span>
          <span className="bold">{formatCurrency(values.profitBeforeTax)}</span>
        </div>
        <div className="result-row">
          <span>Private business ownership allowance (zelfstandigenaftrek)</span>
          <span className="negative-value">-{formatCurrency(values.businessAllowance)}</span>
        </div>
        <div className="result-row">
          <span>Tax relief for new companies (startersaftrek)</span>
          <span className="negative-value">-{formatCurrency(values.startersRelief)}</span>
        </div>
        <div className="result-row">
          <span>Total left after deductibles</span>
          <span className="bold">{formatCurrency(values.afterDeductibles)}</span>
        </div>
        <div className="result-row">
          <span>SME profit exemption (14%)</span>
          <span className="negative-value">-{formatCurrency(values.smeExemption)}</span>
        </div>
        <div className="result-row">
          <span>Taxable profit</span>
          <span className="bold">{formatCurrency(values.taxableProfit)}</span>
        </div>
      </div>

      <div className="section">
        <h3 className="bold">Calculating tax</h3>
        <div className="result-row">
          <span>Income tax and healthcare insurance premium (Zvw)</span>
          <span>{formatCurrency(values.incomeTax)}</span>
        </div>
        <div className="result-row">
          <span>General levy reduction (heffingskorting)</span>
          <span className="negative-value">-{formatCurrency(values.levyReduction)}</span>
        </div>
        <div className="result-row">
          <span>General tax credit (arbeidskorting)</span>
          <span className="negative-value">-{formatCurrency(values.taxCredit)}</span>
        </div>
        <div className="result-row">
          <span>Income tax due</span>
          <span className="bold">{formatCurrency(values.finalTax)}</span>
        </div>
      </div>

      <div className="section">
        <div className="result-row">
          <span className="bold">Profit after taxes</span>
          <span className="bold">{formatCurrency(values.finalProfit)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;