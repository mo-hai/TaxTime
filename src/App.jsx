import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import Calculator from './components/CalculationSection';
import './App.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

console.log({
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD
});

function App() {
  const [showResults, setShowResults] = useState(false);
  const [calculations, setCalculations] = useState(null);
  const [isFirstBusiness, setIsFirstBusiness] = useState(false);

  const handleCalculate = (data) => {
    const { income, isFirstBusiness, expenses } = data;
    setIsFirstBusiness(isFirstBusiness);
    
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const taxableIncome = income - totalExpenses;
    
    const basicTaxRate = 0.2; // 20%
    const firstBusinessDiscount = isFirstBusiness ? 0.1 : 0; // 10% discount
    
    const basicTax = taxableIncome * basicTaxRate;
    const finalTax = basicTax * (1 - firstBusinessDiscount);
    
    setCalculations({
      income,
      totalExpenses,
      taxableIncome,
      basicTax,
      finalTax,
      netIncome: income - finalTax
    });
    
    setShowResults(true);
  };

  return (
    <div className="tax-calculator">
      <h1>Tax Calculator</h1>
      <Calculator />
      <footer className="footer">
        <div className="disclaimer">
          <p>⚠️ This calculator provides approximate tax estimates only and should not be used as definitive tax advice. 
          Please consult with a tax professional for accurate calculations and advice specific to your situation.</p>
        </div>
        <a 
          href="https://github.com/mo-hai/TaxTime" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          <FaGithub />
        </a>
      </footer>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;