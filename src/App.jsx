import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    annualIncome: '',
    isFirstBusiness: false,
    expenses: []
  });
  
  const [newExpense, setNewExpense] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [calculations, setCalculations] = useState(null);

  const handleAddExpense = () => {
    if (newExpense.trim()) {
      setFormData({
        ...formData,
        expenses: [...formData.expenses, { id: Date.now(), amount: Number(newExpense) }]
      });
      setNewExpense('');
    }
  };

  const calculateTax = () => {
    const income = Number(formData.annualIncome);
    const totalExpenses = formData.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const taxableIncome = income - totalExpenses;
    
    // Simple tax calculation (you can modify these rates)
    const basicTaxRate = 0.2; // 20%
    const firstBusinessDiscount = formData.isFirstBusiness ? 0.1 : 0; // 10% discount
    
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
      
      <div className="input-section">
        <div className="input-group">
          <label>Annual Income:</label>
          <input
            type="number"
            value={formData.annualIncome}
            onChange={(e) => setFormData({...formData, annualIncome: e.target.value})}
          />
        </div>

        <div className="input-group">
          <label>
            <input
              type="checkbox"
              checked={formData.isFirstBusiness}
              onChange={(e) => setFormData({...formData, isFirstBusiness: e.target.checked})}
            />
            First Business
          </label>
        </div>

        <div className="input-group">
          <label>Add Expense:</label>
          <input
            type="number"
            value={newExpense}
            onChange={(e) => setNewExpense(e.target.value)}
          />
          <button onClick={handleAddExpense}>Add</button>
        </div>

        {formData.expenses.length > 0 && (
          <div className="expenses-list">
            <h3>Expenses:</h3>
            <ul>
              {formData.expenses.map((expense) => (
                <li key={expense.id}>${expense.amount}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="calculate-btn" onClick={calculateTax}>Calculate</button>
      </div>

      {showResults && calculations && (
        <div className="results-section">
          <div className="calculation-block">
            <h2>Deductions</h2>
            <p>Annual Income: ${calculations.income}</p>
            <p>Total Deductions: ${calculations.totalExpenses}</p>
            <p>Taxable Income: ${calculations.taxableIncome}</p>
          </div>

          <div className="calculation-block">
            <h2>Tax Calculation</h2>
            <p>Basic Tax (20%): ${calculations.basicTax}</p>
            {formData.isFirstBusiness && (
              <p>First Business Discount (10%): ${calculations.basicTax * 0.1}</p>
            )}
            <p>Final Tax: ${calculations.finalTax}</p>
          </div>

          <div className="final-results">
            <h2>Final Results</h2>
            <p>Net Income: ${calculations.netIncome}</p>
            <p>Final Tax: ${calculations.netIncome}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 