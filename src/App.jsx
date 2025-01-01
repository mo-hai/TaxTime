import React, { useState } from 'react';
import InputSection from './components/InputSection';
import './App.css';

function App() {
  const [showResults, setShowResults] = useState(false)
  const [calculations, setCalculations] = useState(null)

  const handleCalculate = (data) => {
    const { income, isFirstBusiness, expenses } = data
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
    const taxableIncome = income - totalExpenses
    
    // Simple tax calculation (you can modify these rates)
    const basicTaxRate = 0.2 // 20%
    const firstBusinessDiscount = isFirstBusiness ? 0.1 : 0 // 10% discount
    
    const basicTax = taxableIncome * basicTaxRate
    const finalTax = basicTax * (1 - firstBusinessDiscount)
    
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
      {/* DeductionBlock and ReductionBlock will go here later */}
    </div>
  )
}

export default App;