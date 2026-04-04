"use client";
import { createContext, useState, useEffect, useCallback } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  // rates: the live exchange rates object, e.g. { USD: 1, CAD: 1.36, EUR: 0.92 }
  const [rates, setRates] = useState({});
  const [chartData, setChartData] = useState([]); // For the historical chart
  const [watchList, setWatchList] = useState([]);
  const [loading, setLoading] = useState(true);

// 1. Fetch live rates once when the app first loads
useEffect(() => {
  const fetchRates = async () => {
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      setRates(data.rates); // Store the live rates for the UI
    } catch (err) {
      console.error("Live Rates Fetch Failed:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchRates();
}, []);

// STEP 2: Fetch 7-day history for whatever pair the user picks
const fetchChartData = useCallback(async (fromCurrency, toCurrency) => {
  try {
    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6-i)); // Get the past 7 days
      return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    });

    const results = await Promise.all(
      dates.map(async(date) => {
        const res = await fetch(`https://open.er-api.com/v6/historical/${date}`);
        const data = await res.json();
        const rate = data.rates[toCurrency] / data.rates[fromCurrency];
        return { date, value: rate };
      })
    );
    
    setChartData(results); // Store the historical data for the chart
  } catch (err) {
    console.error("Chart Data Fetch Failed:", err);
  }
}, []);

// Step 3: Add/remove pairs from the watchlist
const addToWatchList = (fromCurrency, toCurrency) => {
  const pair = `${fromCurrency}/${toCurrency}`;
  if (!watchList.includes(pair)) {
    setWatchList(prev => [...prev, pair]);
  }
};

return (
  <CurrencyContext.Provider value={{ rates, chartData, watchList, loading, fetchChartData, addToWatchList }}>
    {children}
  </CurrencyContext.Provider>
);
};