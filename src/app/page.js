"use client";
import { useContext, useState, useEffect } from 'react'; // added useEffect
import { CurrencyContext } from '../context/CurrencyContext';
import { calculateExchange, formatCurrency } from '../utils/calculation'; // added formatCurrency
import { RefreshCcw, Star } from 'lucide-react'; // added Star
import CurrencyChart from '../components/CurrencyChart';
import styles from './page.module.css';

export default function Home() {
  // pulling chartData and fetchChartData from context too — were missing before
  const { rates, chartData, loading, fetchChartData, addToWatchlist } = useContext(CurrencyContext);

  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('CAD');

  // fetch chart data whenever the user changes the currency pair
  // this was completely missing — without it chartData is always empty
  useEffect(() => {
    if (Object.keys(rates).length > 0) {
      fetchChartData(from, to);
    }
  }, [from, to, rates]);

  if (loading) return <div className="loader">Pulling Live Market Data...</div>;

  const rawResult = calculateExchange(amount, rates[from], rates[to]);
  const displayResult = formatCurrency(rawResult); // formats the number nicely

  return (
    <main className="container">
      <div className="card">
        <h1>Meridian</h1>
        <p>Real-time Global Exchange</p>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} // fixed: was a string before
          className="amount-input"
        />

        <div className="selectors">
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            {Object.keys(rates).map(code => <option key={code} value={code}>{code}</option>)}
          </select>

          {/* swap button now actually works */}
          <RefreshCcw
            size={20}
            color="#f59e0b"
            style={{ cursor: 'pointer' }}
            onClick={() => { setFrom(to); setTo(from); }}
          />

          <select value={to} onChange={(e) => setTo(e.target.value)}>
            {Object.keys(rates).map(code => <option key={code} value={code}>{code}</option>)}
          </select>
        </div>

        <div className="result-display">
          <h2>{displayResult} <span>{to}</span></h2>
          <small>1 {from} = {(rates[to] / rates[from]).toFixed(4)} {to}</small>
        </div>

        {/* chart now has data because fetchChartData runs above */}
        <CurrencyChart data={chartData} />

        {/* watchlist button */}
        <button
          className="watch-btn"
          onClick={() => addToWatchlist(from, to)}
        >
          <Star size={16} /> Add to Watchlist
        </button>

      </div>
    </main>
  );
}