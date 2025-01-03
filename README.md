# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

tax-calculator/
├── public/
│   ├── index.html            # Main HTML file
│   └── favicon.ico           # Icon for the app
├── src/
│   ├── components/
│   │   ├── InputSection.jsx  # Component for inputs (Annual Income, Checkbox, Button)
│   │   ├── DeductionBlock.jsx # Component to display deductions
│   │   └── ReductionBlock.jsx # Component to display reductions
│   ├── App.jsx               # Main React component
│   ├── App.css               # Styles for the app
│   └── index.js              # Entry point for React
├── package.json              # Project dependencies
├── .gitignore                # Files to ignore for Git
└── README.md                 # Project documentation