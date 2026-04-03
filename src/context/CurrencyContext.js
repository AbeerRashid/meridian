"use client";
import { createContext, useState, useEffect } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [rates, setRates] = useState({});
  const [chartData, setChartData] = useState({ week: [], month: [], year: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllHistory = async () => {
      try {
        // 1. Get Current Rates
        const liveRes = await fetch('https://open.er-api.com/v6/latest/USD');
        const liveData = await liveRes.json();
        setRates(liveData.rates);

        const today = new Date();

        // Helper function to get a specific date string (YYYY-MM-DD)
        const getStr = (date) => date.toISOString().split('T')[0];

        // Setup the timeframes
        // WEEK: Last 7 days
        const weekDates = Array.from({length: 7}, (_, i) => {
          const d = new Date(); d.setDate(today.getDate() - i); return getStr(d);
        });

        // MONTH: Last 4 weeks (simplified to 4 data points to save API calls)
        const monthDates = Array.from({length: 4}, (_, i) => {
          const d = new Date(); d.setDate(today.getDate() - (i * 7)); return getStr(d);
        });

        // YEAR: Last 12 months (1st of every month)
        const yearDates = Array.from({length: 12}, (_, i) => {
          const d = new Date(); d.setMonth(today.getMonth() - i); d.setDate(1); return getStr(d);
        });

        // The Fetcher Function (Reusable)
        const fetchHistory = async (dateArray) => {
          return Promise.all(dateArray.map(async (date) => {
            const res = await fetch(`https://open.er-api.com/v6/historical/${date}`);
            const data = await res.json();
            return { date, value: data.rates['CAD'] }; // Tracking CAD vs USD
          }));
        };

        // Run all fetches
        const [w, m, y] = await Promise.all([
          fetchHistory(weekDates),
          fetchHistory(monthDates),
          fetchHistory(yearDates)
        ]);

        setChartData({ 
          week: w.reverse(), 
          month: m.reverse(), 
          year: y.reverse() 
        });
        setLoading(false);

      } catch (err) {
        console.error("History Fetch Failed:", err);
        setLoading(false);
      }
    };
    fetchAllHistory();
  }, []);

  return (
    <CurrencyContext.Provider value={{ rates, chartData, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
};