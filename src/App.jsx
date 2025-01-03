import React, { useState } from 'react';
import InputSection from './components/InputSection';
import CalculationBlock from './components/CalculationBlock';
import './App.css';

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
      <InputSection onCalculate={handleCalculate} />
      <CalculationBlock 
        calculations={calculations} 
        show={showResults}
        isFirstBusiness={isFirstBusiness}
      />
    </div>
  );
}

export default App;