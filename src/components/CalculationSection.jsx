import React, { useState } from 'react';
import './Calculator.css';

// todo:
// - fix Labor discount (arbeidskorting) - its different from the kvk calculations
// - fix income tax (before any reductions) - its different from the kvk calculations
// - add checkboxes for home and bike/car
// - add links to official sources (kvk, belastingdienst, etc.) at each section
// - add AOW pension age condition to calculations

const OFFICIAL_LINKS = {
  zelfstandigenaftrek_link: "https://business.gov.nl/subsidy/private-business-ownership-allowance/",
  startersaftrek_link: "https://business.gov.nl/subsidy/tax-relief-new-companies/",
  smeExemption_link: "https://business.gov.nl/subsidy/sme-profit-exemption/",
  zvw_link: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/zorgverzekeringswet/",
  generalTaxCredit_link: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/algemene_heffingskorting",
  laborDiscount_link: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/arbeidskorting"
};

const ProfitCalculator = () => {
  const [turnover, setTurnover] = useState('');
  const [expenses, setExpenses] = useState('');
  const [hasZelfstandigenaftrek, setHasZelfstandigenaftrek] = useState(true);
  const [hasStartersRelief, setHasStartersRelief] = useState(true);
  const [hasSmeExemption, setHasSmeExemption] = useState(true);

  const calculateValues = () => {
    const turnoverNum = parseFloat(turnover) || 0;
    const expensesNum = parseFloat(expenses) || 0;

    // 2025 rates
    const zelfstandigenaftrek_amount = 2470;
    const startersRelief_amount = 2123;
    const smeExemption_rate = 0.1270;
    const zvw_rate = 0.0526;
    
    const profitBeforeTax = turnoverNum - expensesNum;
    const businessAllowance = turnoverNum <= 0 ? 0 : hasZelfstandigenaftrek ? zelfstandigenaftrek_amount : 0;
    const startersRelief = turnoverNum <= 0 ? 0 : hasStartersRelief ? startersRelief_amount : 0;
    const afterDeductibles = Math.max(0, profitBeforeTax - businessAllowance - startersRelief);
    const smeExemption = hasSmeExemption ? afterDeductibles * smeExemption_rate : 0;
    const taxableProfit = afterDeductibles - smeExemption;
    
    const taxRate = taxableProfit <= 0 ? 0 : taxableProfit <= 76817 ? 0.3748 : 0.4950;
    const zvw = Math.min(75864 * zvw_rate, taxableProfit * zvw_rate);
    const incomeTax = taxableProfit * taxRate;
    
    // Calculate general tax credit based on income thresholds
    let generalTaxCredit = 0;
    if (taxableProfit <= 0) {
      generalTaxCredit = 0;
    } else if (taxableProfit <= 28406) {
      generalTaxCredit = 3068;
    } else if (taxableProfit <= 76817) {
      generalTaxCredit = Math.max(0, 3068 - (taxableProfit - 28406) * 0.0633);
    }
    
    // Calculate labor discount based on income thresholds
    let laborDiscount = 0;
    if (taxableProfit <= 0) {
        laborDiscount = 0;
    } else if (taxableProfit <= 12169) {
        laborDiscount = taxableProfit * 0.08053;
    } else if (taxableProfit <= 26288) {
        laborDiscount = 980 + (taxableProfit - 12169) * 0.3003;
    } else if (taxableProfit <= 43071) {
        laborDiscount = 5220 + (taxableProfit - 26288) * 0.02258;
    } else if (taxableProfit <= 129078) {
        laborDiscount = 5599 - (taxableProfit - 43071) * 0.0651;
    } else {
        laborDiscount = 0;
    }

    const finalTax = Math.max(incomeTax - generalTaxCredit - laborDiscount + zvw, 0);
    const finalTaxRate = taxableProfit > 0 ? (finalTax / taxableProfit * 100).toFixed(1) : 0;
    const finalProfit = turnoverNum - finalTax;

    return {
      profitBeforeTax,
      businessAllowance,
      startersRelief,
      afterDeductibles,
      smeExemption_rate,
      smeExemption,
      taxableProfit,
      taxRate,
      incomeTax,
      zvw_rate,
      zvw,
      generalTaxCredit,
      laborDiscount,
      finalTax,
      finalTaxRate,
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
      <h2 className="bold">ZZP Tax NL 2025</h2>
      
      <div className="input-group">
        <div className="input-row">
          <label className="input-label">Annual Income (VAT excluded)</label>
          <input
            type="number"
            value={turnover}
            onChange={(e) => setTurnover(e.target.value)}
            className="input-field"
            placeholder="0"
          />
          <span className="hint-text">(Annual box1 income from ZZP)</span>
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

        <div className="input-row checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={hasSmeExemption}
              onChange={(e) => setHasSmeExemption(e.target.checked)}
              className="checkbox-input"
            />
            Right to SME profit exemption (MKB-winstvrijstelling)
          </label>
          <span className="hint-text">
            (you have to be entrepreneur for income tax purposes)
            <a href={OFFICIAL_LINKS.smeExemption_link} target="_blank" rel="noopener noreferrer" className="info-link">ℹ️</a>
          </span>
        </div>

        <div className="input-row checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={hasZelfstandigenaftrek}
              onChange={(e) => setHasZelfstandigenaftrek(e.target.checked)}
              className="checkbox-input"
            />
            Right to Private business ownership allowance (zelfstandigenaftrek)
          </label>
          <span className="hint-text">
            (you have to be entrepreneur for income tax purposes and meet 1225 hours criterion per year)
            <a href={OFFICIAL_LINKS.zelfstandigenaftrek_link} target="_blank" rel="noopener noreferrer" className="info-link">ℹ️</a>
          </span>
        </div>

        <div className="input-row checkbox-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={hasStartersRelief}
              onChange={(e) => setHasStartersRelief(e.target.checked)}
              className="checkbox-input"
            />
            Right to Tax relief for new companies (startersaftrek)
          </label>
          <span className="hint-text">
            (applicable 3 times in first 5 years)
            <a href={OFFICIAL_LINKS.startersaftrek_link} target="_blank" rel="noopener noreferrer" className="info-link">ℹ️</a>
          </span>
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
          <span>SME profit exemption - {values.smeExemption_rate * 100}%</span>
          <span className="negative-value">-{formatCurrency(values.smeExemption)}</span>
        </div>
        <div className="result-row">
          <span>Taxable profit</span>
          <span className="bold">{formatCurrency(values.taxableProfit)}</span>
        </div>
      </div>

      <div className="section">
        <h3 className="bold">Tax Rates</h3>
        <div className="result-row">
          <span>Tax rate</span>
          <span>{(values.taxRate * 100).toFixed(2)}%</span>
        </div>
      </div>

      <div className="section">
        <h3 className="bold">Calculating tax</h3>
        <div className="result-row">
          <span>Income tax</span>
          <span className="bold">{formatCurrency(values.incomeTax)}</span>
        </div>
        <div className="result-row">
          <span>
            <a href={OFFICIAL_LINKS.zvw_link} target="_blank" rel="noopener noreferrer" className="info-link">ℹ️        </a>
            Healthcare insurance premium (Zvw) - {values.zvw_rate * 100}%
          </span>
          <span className="negative-value">+{formatCurrency(values.zvw)}</span>
        </div>
        <div className="result-row">
          <span>
            <a href={OFFICIAL_LINKS.generalTaxCredit_link} target="_blank" rel="noopener noreferrer" className="info-link">ℹ️        </a>
            General tax credit (heffingskorting)
          </span>
          <span className="negative-value">-{formatCurrency(values.generalTaxCredit)}</span>
        </div>
        <div className="result-row">
          <span>
            <a href={OFFICIAL_LINKS.laborDiscount_link} target="_blank" rel="noopener noreferrer" className="info-link">ℹ️        </a>
            Labor discount (arbeidskorting)
          </span>
          <span className="negative-value">-{formatCurrency(values.laborDiscount)}</span>
        </div>
        <div className="result-row">
          <span>Final Income tax</span>
          <span className="bold">{formatCurrency(values.finalTax)}</span>
        </div>
      </div>

      <div className="section">
          <div className="result-row">
            <span className="bold">Profit after taxes</span>
            <span className="bold">{formatCurrency(values.finalProfit)}</span>
          </div>
          <div className="result-row">
            <span>Final tax rate (Belastingdruk)</span>
            <span>{values.finalTaxRate}%</span>
          </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;