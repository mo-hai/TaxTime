import React, { useState } from 'react';
import './Calculator.css';

// todo:
// - add toggles for calculations of deductions and reductions so only the result is seen
// - check Labor discount (arbeidskorting) - there some differences with kvk calculator
// - fix SME exemption The maximum rate for deduction is 36,93%
// - fix zvw calculation - there some differences with kvk calculator when incoome 1000 - I think it should be always aplicable no matter what are deductables
// - add WBSO R&D tax credit - rnd_link
// - add checkboxes for home and bike/car
// - add AOW pension age condition to calculations


const OFFICIAL_LINKS = {
  zelfstandigenaftrek_link: "https://business.gov.nl/subsidy/private-business-ownership-allowance/",
  startersaftrek_link: "https://business.gov.nl/subsidy/tax-relief-new-companies/",
  smeExemption_link: "https://business.gov.nl/subsidy/sme-profit-exemption/",
  rnd_link: "https://business.gov.nl/subsidy/wbso/",
  zvw_link: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/werk_en_inkomen/zorgverzekeringswet/",
  generalTaxCredit_link: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/algemene_heffingskorting/algemene_heffingskorting",
  laborDiscount_link: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/heffingskortingen/arbeidskorting/arbeidskorting"
};

const YEAR_RATES = {
  2024: {
    zelfstandigenaftrek_amount: 3750,
    startersRelief_amount: 2123,
    smeExemption_rate: 0.1331,
    zvw_rate: 0.0532,
    lower_income_tax_rate: 0.3697,
    middle_income_tax_rate: 0.4950,
    upper_income_tax_rate: 0.4950,
    lower_income_threshold: 75518,
    higher_income_threshold: 75518,
    generalTaxCredit_threshold_1: 24813,
    generalTaxCredit_threshold_2: 75518,
    generalTaxCredit_rate: 0.063,
    generalTaxCredit_amount: 3362,
    laborDiscount_threshold_1: 11491,
    laborDiscount_threshold_2: 24821,
    laborDiscount_threshold_3: 39958,
    laborDiscount_threshold_4: 124935,
    laborDiscount_rate_1: 0.08425,
    laborDiscount_rate_2: 0.31433,
    laborDiscount_rate_3: 0.02471,
    laborDiscount_rate_4: 0.0651,
    laborDiscount_amount_2: 968,
    laborDiscount_amount_3: 5158,
    laborDiscount_amount_4: 5532,

  },
  2025: {
    zelfstandigenaftrek_amount: 2470,
    startersRelief_amount: 2123,
    smeExemption_rate: 0.1270,
    zvw_rate: 0.0526,
    lower_income_tax_rate: 0.3582,
    middle_income_tax_rate: 0.3748,
    upper_income_tax_rate: 0.4950,
    lower_income_threshold: 38441,
    higher_income_threshold: 76817,
    generalTaxCredit_threshold_1: 28406,
    generalTaxCredit_threshold_2: 76817,
    generalTaxCredit_rate: 0.06337,
    generalTaxCredit_amount: 3068,
    laborDiscount_threshold_1: 12169,
    laborDiscount_threshold_2: 26288,
    laborDiscount_threshold_3: 43071,
    laborDiscount_threshold_4: 129078,
    laborDiscount_rate_1: 0.08053,
    laborDiscount_rate_2: 0.3003,
    laborDiscount_rate_3: 0.02258,
    laborDiscount_rate_4: 0.0651,
    laborDiscount_amount_2: 980,
    laborDiscount_amount_3: 5220,
    laborDiscount_amount_4: 5599,
  }
};

const ProfitCalculator = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [turnover, setTurnover] = useState('');
  const [expenses, setExpenses] = useState('');
  const [hasZelfstandigenaftrek, setHasZelfstandigenaftrek] = useState(true);
  const [hasStartersRelief, setHasStartersRelief] = useState(true);
  const [hasSmeExemption, setHasSmeExemption] = useState(true);

  const calculateValues = () => {
    
    const turnoverNum = parseFloat(turnover) || 0;
    const expensesNum = parseFloat(expenses) || 0;

    const {
      zelfstandigenaftrek_amount,
      startersRelief_amount,
      smeExemption_rate,
      zvw_rate,
      lower_income_tax_rate,
      middle_income_tax_rate,
      upper_income_tax_rate,
      lower_income_threshold,
      higher_income_threshold,
      generalTaxCredit_threshold_1,
      generalTaxCredit_threshold_2,
      generalTaxCredit_rate,
      generalTaxCredit_amount,
      laborDiscount_threshold_1,
      laborDiscount_threshold_2,
      laborDiscount_threshold_3,
      laborDiscount_threshold_4,
      laborDiscount_rate_1,
      laborDiscount_rate_2,
      laborDiscount_rate_3,
      laborDiscount_rate_4,
      laborDiscount_amount_2,
      laborDiscount_amount_3,
      laborDiscount_amount_4,
    } = YEAR_RATES[selectedYear];
    
    const profitBeforeTax = turnoverNum - expensesNum;
    const businessAllowance = turnoverNum <= 0 ? 0 : hasZelfstandigenaftrek ? zelfstandigenaftrek_amount : 0;
    const startersRelief = turnoverNum <= 0 ? 0 : hasStartersRelief ? startersRelief_amount : 0;
    const afterDeductibles = Math.max(0, profitBeforeTax - businessAllowance - startersRelief);
    const smeExemption = hasSmeExemption ? afterDeductibles * smeExemption_rate : 0;
    const taxableProfit = afterDeductibles - smeExemption;
    
    const taxRate = taxableProfit <= 0 ? 0 : taxableProfit <= lower_income_threshold ? lower_income_tax_rate : taxableProfit <= higher_income_threshold ? middle_income_tax_rate : upper_income_tax_rate;
    const zvw = Math.min(75864 * zvw_rate, taxableProfit * zvw_rate);
    const incomeTax = taxableProfit * taxRate;
    
    // Calculate general tax credit based on income thresholds
    let generalTaxCredit = 0;
    if (taxableProfit <= 0) {
      generalTaxCredit = 0;
    } else if (taxableProfit <= generalTaxCredit_threshold_1) {
      generalTaxCredit = generalTaxCredit_amount;
    } else if (taxableProfit <= generalTaxCredit_threshold_2) {
      generalTaxCredit = Math.max(0, generalTaxCredit_amount - (taxableProfit - generalTaxCredit_threshold_1) * generalTaxCredit_rate);
    }
    
    // Calculate labor discount based on income thresholds
    let laborDiscount = 0;
    if (taxableProfit <= 0) {
        laborDiscount = 0;
    } else if (taxableProfit <= laborDiscount_threshold_1) {
        laborDiscount = taxableProfit * laborDiscount_rate_1;
    } else if (taxableProfit <= laborDiscount_threshold_2) {
        laborDiscount = laborDiscount_amount_2 + (taxableProfit - laborDiscount_threshold_1) * laborDiscount_rate_2;
    } else if (taxableProfit <= laborDiscount_threshold_3) {
        laborDiscount = laborDiscount_amount_3 + (taxableProfit - laborDiscount_threshold_2) * laborDiscount_rate_3;
    } else if (taxableProfit <= laborDiscount_threshold_4) {
        laborDiscount = laborDiscount_amount_4 - (taxableProfit - laborDiscount_threshold_3) * laborDiscount_rate_4;
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
      <h2 className="bold">ZZP Tax NL {selectedYear}</h2>
      
      <div className="input-group">
        <div className="input-row">
          <label className="input-label">Tax Year</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="input-field"
          >
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
          </select>
        </div>
        
        <div className="input-row">
          <label className="input-label">Annual Income (VAT excluded)</label>
          <input
            type="number"
            value={turnover}
            onChange={(e) => setTurnover(e.target.value)}
            className="input-field"
            placeholder="0"
          />
          <span className="hint-text">(annual box1 income from ZZP)</span>
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
          <span>SME profit exemption - {(values.smeExemption_rate * 100).toFixed(2)}%</span>
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
            Healthcare insurance premium (Zvw) - {(values.zvw_rate * 100).toFixed(2)}%
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
          <h3 className="bold">Final results</h3>
          <div className="result-row">
            <span>Final tax rate (Belastingdruk)</span>
            <span>{values.finalTaxRate}%</span>
          </div>
          <div className="result-row">
            <span>Final tax</span>
            <span>{formatCurrency(values.finalTax)}</span>
          </div>
          <div className="result-row">
            <span className="bold">Profit after taxes</span>
            <span className="bold">{formatCurrency(values.finalProfit)}</span>
          </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;