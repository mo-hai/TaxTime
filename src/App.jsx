import React, { useState } from 'react';
import Calculator from './components/CalculationSection';
import './App.css';
const SpeedInsights = import.meta.env.PROD 
  ? (await import('@vercel/speed-insights/react')).SpeedInsights 
  : () => null;

const Analytics = import.meta.env.PROD 
  ? (await import('@vercel/analytics/react')).Analytics 
  : () => null;

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
    <div cclassName="tax-calculator">
      <h1>Tax Calculator</h1>
      <Calculator />
      {import.meta.env.PROD && <SpeedInsights />}
      {import.meta.env.PROD && <Analytics />}
    </div>
  );
}

export default App;