function calculateTax() {
    const annualIncome = parseFloat(document.getElementById("annual-income").value);

    // Replace this with your actual tax calculation logic
    const deductions = calculateDeductions(annualIncome);
    const taxableIncome = calculateTaxableIncome(annualIncome);
    const taxRate = calculateTaxRate(annualIncome); // Example: 20% tax rate
    const taxBeforeDiscount = taxableIncome * taxRate / 100; // Example: 20% tax rate
    const Heffingskorting = calculateHeffingskorting(annualIncome, taxBeforeDiscount);
    const Arbeidskorting = calculateArbeidskorting(annualIncome);
    const reductions = calculateReductions(annualIncome, taxBeforeDiscount);
    const zvw = calculateZvw(annualIncome);
    const tax = taxBeforeDiscount - reductions + zvw;
    const netIncome = annualIncome - tax; // Example: 20% tax rate


    // Display the result
    document.getElementById("result-tax").textContent = `Tax: ${tax.toFixed(0)}, Tax Rate: ${(tax / annualIncome * 100).toFixed(2)}%`;
    document.getElementById("result-income").textContent = `Net Income: ${netIncome.toFixed(0)}`;

    // Display the calculation steps
    const stepsList = document.getElementById("steps");
    stepsList.innerHTML = "";

    stepsList.appendChild(createStep(`Annual Income: ${annualIncome}, Tax Rate: ${taxRate.toFixed(2)}%`));

    stepsList.appendChild(createStep(`Annual Income - Deductions ( ${deductions.toFixed(0)} ) = Taxable Income: ${taxableIncome.toFixed(0)}`));

    stepsList.appendChild(createStep(`Tax to pay BEFORE discount: ${taxBeforeDiscount.toFixed(0)}`));

    stepsList.appendChild(createStep(`(Tax -) Reductions: (${reductions.toFixed(0)} ): Heffingskorting: ${Heffingskorting.toFixed(0)} Arbeidskorting: ${Arbeidskorting.toFixed(0)}`));
    
    stepsList.appendChild(createStep(`(Tax +) zvw: ${zvw.toFixed(0)}`));

    stepsList.appendChild(createStep(`Tax to pay AFTER discounts and zvw: ${tax.toFixed(0)}`));

    stepsList.appendChild(createStep(`Net Income: ${netIncome.toFixed(0)}, Final Tax Rate: ${(tax / annualIncome * 100).toFixed(2)}%`));
}

function createStep(text) {
    const li = document.createElement("li");
    li.textContent = text;
    return li;
}

function calculateDeductions(annualIncome) {
    // deductions - reduce the amount of annual income that is subject to tax
    zelfstandigenaftrek = 3750 // Private business ownership allowance/Self-employed deduction 2023
    startersaftrek = 2123 // self-employed deduction: You may do so 3 times in the first 5 years after starting your business.
    mkb_winstvrijstelling = (annualIncome - zelfstandigenaftrek - startersaftrek) * 0.1331 // SME profit exemption -  is a percentage of the profit after entrepreneurial deduction from one or more companies
    investeringsaftrek = 0
    RnDTaxCredit = 0
    return zelfstandigenaftrek + startersaftrek + mkb_winstvrijstelling + investeringsaftrek + RnDTaxCredit
}

function calculateTaxableIncome(annualIncome) {
    deductions = calculateDeductions(annualIncome)
    return annualIncome - deductions
}

function calculateZvw(annualIncome) {
    // Calculating the income-dependent contribution pursuant to the Health Care Insurance Act
    Zvw = 0.0543 // for self-employed persons
    return annualIncome * Zvw
}

function calculateTaxRate(annualIncome) {
    if (annualIncome < 75518) {
        return 36.97;
    } else {
        return 49.50;
    }
}

function calculateHeffingskorting(annualIncome, taxToPay) {
    taxableIncome = annualIncome - calculateDeductions(annualIncome)
    
    // heffingskorting - general tax credit
    heffingskorting = 0
    if (taxableIncome < 24813) {
        heffingskorting = 3362
    } else if ((24813 <= taxableIncome) && (taxableIncome < 75518)) {
        heffingskorting = 3362 - 0.147 * (taxToPay - 24812)
    } else if (75518 <= taxableIncome) {
        heffingskorting = 0
    }

    return heffingskorting
}

function calculateArbeidskorting(annualIncome) {
    // arbeidskorting - so-called labor discount
    arbeidskorting = 0
    if (annualIncome < 11491) {
        arbeidskorting = annualIncome * 0.08425;
    } else if ((11491 <= annualIncome) && (annualIncome < 24821)) {
        arbeidskorting = 968 - 0.31433 * (annualIncome - 11490);
    } else if ((24821 <= annualIncome) && (annualIncome < 39958)) {
        arbeidskorting = 5158 - 0.2471 * (annualIncome - 24820);
    } else if ((39958 <= annualIncome) && (annualIncome < 124935)) {
        arbeidskorting = 5532 - 0.6510 * (annualIncome - 39957);
    } else if (annualIncome >= 124935) {
        arbeidskorting = 0;
    }
    return arbeidskorting
}

function calculateReductions(annualIncome, taxToPay) {
    // tax credits - discounts on the amount of tax you have to pay
    heffingskorting = calculateHeffingskorting(annualIncome, taxToPay)
    arbeidskorting = calculateArbeidskorting(annualIncome)
    return heffingskorting + arbeidskorting
}