function calculateTax() {
    const annualIncome = parseFloat(document.getElementById("annual-revenue").value);

    // Replace this with your actual tax calculation logic
    const tax = annualIncome * 0.2; // Example: 20% tax rate

    // Display the result
    document.getElementById("result").textContent = `Tax: ${tax.toFixed(2)}`;

    // Display the calculation steps
    const stepsList = document.getElementById("steps");
    stepsList.innerHTML = "";
    stepsList.appendChild(createStep("Annual Revenue:", annualIncome.toFixed(2)));
    stepsList.appendChild(createStep("Tax Rate:", "20%"));
    stepsList.appendChild(createStep("Tax:", tax.toFixed(2)));
}

function createStep(label, value) {
    const li = document.createElement("li");
    li.textContent = `${label} ${value}`;
    return li;
}