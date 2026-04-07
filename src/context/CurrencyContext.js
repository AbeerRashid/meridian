"use client";
import { createContext, useState, useEffect, useCallback } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  // rates: the live exchange rates object, e.g. { USD: 1, CAD: 1.36, EUR: 0.92 }
  const [rates, setRates] = useState({});
  const [chartData, setChartData] = useState([]); // 7-day trend data for the chart
  const [watchlist, setWatchlist] = useState([]); // user's saved pairs
  const [loading, setLoading] = useState(true);

  // STEP 1: fetch live rates once when the app first loads
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await res.json();
        setRates(data.rates); // store the whole rates object
      } catch (err) {
        console.error("Live Rates Fetch Failed:", err);
      } finally {
        setLoading(false); // always stop spinner whether fetch worked or not
      }
    };
    fetchRates();
  }, []);

  // STEP 2: generate 7-day simulated chart data from the live rate
  // the free plan of open.er-api does not support historical endpoints
  // so we use the live rate and add small random variations to simulate market movement
  const fetchChartData = useCallback((fromCurrency, toCurrency) => {

    // guard: don't run if rates haven't loaded yet
    if (!rates[fromCurrency] || !rates[toCurrency]) return;

    // calculate the current live rate for this pair
    const baseRate = rates[toCurrency] / rates[fromCurrency];

    // build 7 data points, one per day going back 6 days to today
    const data = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i)); // 6 days ago → 5 → 4 → ... → today
      const date = d.toISOString().split('T')[0]; // format: YYYY-MM-DD

      // apply a small random variation of ±1.5% to simulate market movement
      const variation = 1 + (Math.random() - 0.5) * 0.03;
      const value = parseFloat((baseRate * variation).toFixed(4));

      return { date, value };
    });

    setChartData(data); // store the 7 points for CurrencyChart to read
  }, [rates]); // re-creates when rates updates so baseRate is always fresh

  // STEP 3: watchlist helpers
  const addToWatchlist = (from, to) => {
    const pair = `${from}/${to}`; // e.g. "USD/CAD"
    // only add if not already saved — prevents duplicates
    if (!watchlist.includes(pair)) {
      setWatchlist(prev => [...prev, pair]);
    }
  };

  const removeFromWatchlist = (pair) => {
    // keep everything except the pair being removed
    setWatchlist(prev => prev.filter(p => p !== pair));
  };

  return (
    <CurrencyContext.Provider value={{
      rates,               // live exchange rates object
      chartData,           // 7-day simulated trend data
      watchlist,           // user's saved pairs
      loading,             // is the app still fetching?
      fetchChartData,      // call this when the currency pair changes
      addToWatchlist,      // call this when user hits the star button
      removeFromWatchlist, // call this when user hits X on a watchlist item
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};