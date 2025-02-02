
# Tax Calculator

This is a simple tax calculator for ZPP in NL built with React. It allows users to input their annual income, deduct expenses and select applicable deductions and reductions. The calculator then displays the deductions and reductions based on the selected option and calculates the final tax.

## To run the app

```bash
npm run dev
```

## Project Structure

```text
tax-calculator/
├── public/
│   └── vite.svg              # Vite logo
├── src/
│   ├── assets/
│   │   └── react.svg         # React logo
│   ├── components/
│   │   ├── InputSection.jsx     # Component for inputs (Annual Income, Checkbox, Button)
│   │   └── CalculationBlock.jsx # Component to display deductions and reductions
│   ├── App.jsx               # Main React component
│   ├── App.css               # Styles for the app
│   ├── main.jsx              # Entry point for React
│   └── index.css             # Styles for the index.html
├── index.html                # Main HTML file
├── package.json              # Project dependencies
├── .gitignore                # Files to ignore for Git
└── README.md                 # Project documentation
```

# More information on NL income tax return for entrepreneurs
[belastingdienst](https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/inkomstenbelasting/inkomstenbelasting_voor_ondernemers/winst_uit_onderneming)
[nalog.nl](https://www.nalog.nl/en/)


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh