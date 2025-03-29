import React from 'react';
import { FaGithub } from 'react-icons/fa';
import Calculator from './components/CalculationSection';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './App.css';

console.log({
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD
});

function App() {
  return (
    <div className="tax-calculator">
      <h1>Tax Calculator</h1>
      <Calculator />
      <footer className="footer">
        <div className="disclaimer">
          <p>⚠️ This calculator provides approximate tax estimates only and should not be used as definitive tax advice. 
          Please consult with a tax professional for accurate calculations and advice specific to your situation.</p>
        </div>
        <a 
          href="https://github.com/mo-hai/TaxTime" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          <FaGithub />
        </a>
      </footer>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;