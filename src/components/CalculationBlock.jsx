const CalculationBlock = ({ calculations, show, isFirstBusiness }) => {
  if (!show || !calculations) return null;

  return (
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
        {isFirstBusiness && (
          <p>First Business Discount (10%): ${calculations.basicTax * 0.1}</p>
        )}
        <p>Final Tax: ${calculations.finalTax}</p>
      </div>

      <div className="final-results">
        <h2>Final Results</h2>
        <p>Net Income: ${calculations.netIncome}</p>
        <p>Final Tax: ${calculations.finalTax}</p>
      </div>
    </div>
  );
};

export default CalculationBlock; 