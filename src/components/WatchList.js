"use client";
import { useContext, useMemo } from "react";
import { CurrencyContext } from "../context/CurrencyContext";
import { X } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import styles from "../app/watchlist/page.module.css";

export default function WatchList() {
  const { watchlist, rates, removeFromWatchlist } = useContext(CurrencyContext);

  const watchlistData = useMemo(() => {
    return watchlist.map((pair) => {
      const [from, to] = pair.split("/");
      //calculate current exchange rate for this pair
      const baseRate =
        rates[from] && rates[to] ? rates[to] / rates[from] : 0;

      const chartData = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));

        const variation = 1 + (Math.random() - 0.5) * 0.03;
        const value = parseFloat((baseRate * variation).toFixed(4));

        return {
          date: d.toISOString().split("T")[0],
          value,
        };
      });

      return {
        pair,
        from,
        to,
        rate: baseRate.toFixed(4),
        chartData,
      };
    });
  }, [watchlist, rates]);

  //show message if no items are saved in watchlist
  if (watchlist.length === 0) {
    return <p className={styles.empty}>No currencies in your watchlist yet.</p>;
  }

  return (
    <div className={styles.grid}>
      {watchlistData.map((item) => (
        <div key={item.pair} className={styles.card}>
          <div className={styles.cardTop}>
            <h2>{item.pair}</h2>
            <button
              className={styles.removeBtn}
              onClick={() => removeFromWatchlist(item.pair)}
            >
              <X size={16} />
            </button>
          </div>

          <p className={styles.rate}>
            1 {item.from} = {item.rate} {item.to}
          </p>
           
          {/* compact trend chart (same style as main page) */}
          <div className={styles.chartWrap}>
            <div className={styles.chartTitle}>Exchange Rate Trend</div>
            <ResponsiveContainer width="100%" height="85%">
              <AreaChart data={item.chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id={`color-${item.pair.replace("/", "-")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />

                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 9 }}
                  minTickGap={20}
                />

                <YAxis domain={["auto", "auto"]} hide />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  itemStyle={{ color: "#f59e0b" }}
                />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#color-${item.pair.replace("/", "-")})`}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}