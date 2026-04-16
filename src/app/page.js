"use client";
import { useContext, useState, useEffect } from 'react'; // added useEffect
import { CurrencyContext } from '../context/CurrencyContext';
import { calculateExchange, formatCurrency } from '../utils/calculation'; // added formatCurrency
import { RefreshCcw, Star } from 'lucide-react'; // added Star
import CurrencyChart from '../components/CurrencyChart';
import styles from './page.module.css';

export default function Home() {
  // pulling chartData and fetchChartData from context too — were missing before
  // added watchlist so we can check if current pair is already saved
  const { rates, chartData, loading, fetchChartData, addToWatchlist, watchlist } = useContext(CurrencyContext);

  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('CAD');

  // check if current selected pair is already in watchlist
  const isInWatchlist = watchlist.includes(`${from}/${to}`);

  // fetch chart data whenever the user changes the currency pair
  // this was completely missing — without it chartData is always empty
  useEffect(() => {
    if (Object.keys(rates).length > 0) {
      fetchChartData(from, to);
    } else {
      console.warn("Rates not loaded yet, cannot fetch chart data");
    }
  }, [from, to, fetchChartData, rates]); // re-run when from/to changes or when rates first load

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

        {/* watchlist button - now star changes depending on watchlist status */}
        <button
          className="watch-btn"
          onClick={() => addToWatchlist(from, to)}
        >
          <Star
            size={16}
            fill={isInWatchlist ? "#b4b4b4" : "none"}
            stroke="#ffffff"
          />
          {isInWatchlist ? "Added to Watch List" : "Add to Watch List"}
        </button>

      </div>
    </main>
  );
}