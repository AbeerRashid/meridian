"use client";
import { useContext, useState } from 'react';
import { CurrencyContext } from '../context/CurrencyContext'; // Role 3 Data
import { calculateExchange } from '../utils/calculation'; // Role 2 Math
import { RefreshCcw } from 'lucide-react'; // A nice icon for the UI
import styles from './page.module.css'; // Some basic styling

export default function Home() {
  const {
    rates, chartData, loading, fetchChartData, addToWatchList} = useContext(CurrencyContext);
  }
  // Grab the live prices from our "Global Brain"
  const { rates, loading } = useContext(CurrencyContext);

  // Create "States" to track what the user types and selects
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('CAD');

  //Show a loading screen if the API is still fetching
  if (loading) return <div className="loader">Pulling Live Market Data...</div>;

  // Run the math logic using the data we fetched
  const result = calculateExchange(amount, rates[from], rates[to]);

  return (
    <main className="container">
      <div className="card">
        <h1>Meridian</h1>
        <p>Real-time Global Exchange</p>

        {/* Input box for the amount */}
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          className="amount-input"
        />

        <div className="selectors">
          {/* Dropdown for 'From' Currency */}
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            {Object.keys(rates).map(code => <option key={code}>{code}</option>)}
          </select>

          <RefreshCcw size={20} color="#f59e0b" />

          {/* Dropdown for 'To' Currency */}
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            {Object.keys(rates).map(code => <option key={code}>{code}</option>)}
          </select>
        </div>

        {/* The big result display */}
        <div className="result-display">
          <h2>{result} <span>{to}</span></h2>
          <small>1 {from} = {(rates[to] / rates[from]).toFixed(4)} {to}</small>
        </div>
      </div>
    </main>
  );
}