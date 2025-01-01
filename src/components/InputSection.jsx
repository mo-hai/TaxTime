import { useState } from 'react'

const InputSection = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    annualIncome: '',
    isFirstBusiness: false,
    expenses: []
  })
  const [newExpense, setNewExpense] = useState('')

  const handleAddExpense = () => {
    if (newExpense.trim()) {
      setFormData({
        ...formData,
        expenses: [...formData.expenses, { id: Date.now(), amount: Number(newExpense) }]
      })
      setNewExpense('')
    }
  }

  const handleCalculateClick = () => {
    onCalculate({
      income: Number(formData.annualIncome),
      isFirstBusiness: formData.isFirstBusiness,
      expenses: formData.expenses
    })
  }

  return (
    <section className="input-section">
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

      <button className="calculate-btn" onClick={handleCalculateClick}>
        Calculate
      </button>
    </section>
  )
}

export default InputSection