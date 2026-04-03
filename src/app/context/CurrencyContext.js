"use client";

import { createContext, useState, useEffect} from "react";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [rates, setRates] = useState("{}");
  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getLiveRates = async () => {
            try {
                const response = await fetch(
                    "https://api.exchangerate-api.com/v4/latest/USD");
                    const data = await response.json();

                    setRates(data.rates);
                    setLoading(false);
                } catch (error) {
                    console.error("Meridian API Error:", error);
                }
            };
        getLiveRates();
    }, []);

  return (
    <CurrencyContext.Provider value={{ rates, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
};
