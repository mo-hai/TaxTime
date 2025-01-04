
# Tax Calculator

https://tax-time-nl.vercel.app

This is a simple tax calculator built with React. It allows users to input their annual income and select whether its their first year of business or not. The calculator then displays the deductions and reductions based on the selected option.


## Project Structure

```text
tax-calculator/
├── public/
│   ├── index.html            # Main HTML file
│   └── favicon.ico           # Icon for the app
├── src/
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

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh