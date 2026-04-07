"use client";
import { useEffect } from "react";
import styles from "./page.module.css";

const themeValues = {
  meridian: {
    "--background": "#0a0a0a",
    "--foreground": "#ededed",
    "--nav-bg": "#1a1a1a",
    "--nav-border": "#2a2a2a",
    "--nav-shadow": "rgba(0, 0, 0, 0.3)",
    "--nav-text-strong": "#f5f5f5",
    "--nav-text-muted": "#a1a1a1",
    "--nav-text-hover": "#ffffff",
    "--nav-text-active": "#ffffff",
    "--card-bg": "#1a1a1a",
    "--card-border": "#2a2a2a",
    "--text-primary": "#f5f5f5",
    "--text-secondary": "#a1a1a1",
    "--text-muted": "#777777",
    "--input-bg": "#121212",
    "--input-border": "#2a2a2a",
    "--input-text": "#ffffff",
    "--button-bg": "#1f1f1f",
    "--button-hover": "#2a2a2a",
    "--button-text": "#ffffff",
  },

  bloodRed: {
    "--background": "#1a0d0d",
    "--foreground": "#f7e9e9",
    "--nav-bg": "#3d1111",
    "--nav-border": "#5c1010",
    "--nav-shadow": "rgba(40, 0, 0, 0.35)",
    "--nav-text-strong": "#fff1f1",
    "--nav-text-muted": "#d7b3b3",
    "--nav-text-hover": "#ffffff",
    "--nav-text-active": "#ffffff",
    "--card-bg": "#2a1111",
    "--card-border": "#5c1010",
    "--text-primary": "#fff1f1",
    "--text-secondary": "#d7b3b3",
    "--text-muted": "#a97d7d",
    "--input-bg": "#1f0c0c",
    "--input-border": "#5c1010",
    "--input-text": "#ffffff",
    "--button-bg": "#5c1010",
    "--button-hover": "#7a1717",
    "--button-text": "#fff5f5",
  },

  nightOceanBlue: {
    "--background": "#0b1520",
    "--foreground": "#e7f1fb",
    "--nav-bg": "#10273d",
    "--nav-border": "#1f4566",
    "--nav-shadow": "rgba(0, 20, 40, 0.35)",
    "--nav-text-strong": "#f0f7ff",
    "--nav-text-muted": "#a9bfd4",
    "--nav-text-hover": "#ffffff",
    "--nav-text-active": "#ffffff",
    "--card-bg": "#10273d",
    "--card-border": "#1f4566",
    "--text-primary": "#f0f7ff",
    "--text-secondary": "#a9bfd4",
    "--text-muted": "#7891a8",
    "--input-bg": "#0d1d2b",
    "--input-border": "#1f4566",
    "--input-text": "#ffffff",
    "--button-bg": "#163552",
    "--button-hover": "#21486d",
    "--button-text": "#eef6ff",
  },

  wealthyGreen: {
    "--background": "#0d1711",
    "--foreground": "#ecf6ef",
    "--nav-bg": "#163222",
    "--nav-border": "#275438",
    "--nav-shadow": "rgba(0, 30, 10, 0.35)",
    "--nav-text-strong": "#f2fbf4",
    "--nav-text-muted": "#b2cbb9",
    "--nav-text-hover": "#ffffff",
    "--nav-text-active": "#ffffff",
    "--card-bg": "#163222",
    "--card-border": "#275438",
    "--text-primary": "#f2fbf4",
    "--text-secondary": "#b2cbb9",
    "--text-muted": "#7f9a87",
    "--input-bg": "#102518",
    "--input-border": "#275438",
    "--input-text": "#ffffff",
    "--button-bg": "#22422d",
    "--button-hover": "#2f5a3e",
    "--button-text": "#f0f9f2",
  },

  officeGrey: {
    "--background": "#f1f1f1",
    "--foreground": "#2a2a2a",
    "--nav-bg": "#d9d9d9",
    "--nav-border": "#bcbcbc",
    "--nav-shadow": "rgba(80, 80, 80, 0.12)",
    "--nav-text-strong": "#2a2a2a",
    "--nav-text-muted": "#5f5f5f",
    "--nav-text-hover": "#111111",
    "--nav-text-active": "#111111",
    "--card-bg": "#e3e3e3",
    "--card-border": "#bcbcbc",
    "--text-primary": "#2a2a2a",
    "--text-secondary": "#555555",
    "--text-muted": "#777777",
    "--input-bg": "#f7f7f7",
    "--input-border": "#bcbcbc",
    "--input-text": "#1f1f1f",
    "--button-bg": "#cfcfcf",
    "--button-hover": "#bdbdbd",
    "--button-text": "#222222",
  },

  prettyInPink: {
    "--background": "#2a1620",
    "--foreground": "#fff7fb",
    "--nav-bg": "#d98cab",
    "--nav-border": "#bf6f91",
    "--nav-shadow": "rgba(80, 20, 40, 0.25)",
    "--nav-text-strong": "#fff7fb",
    "--nav-text-muted": "#ffe2ec",
    "--nav-text-hover": "#ffffff",
    "--nav-text-active": "#ffffff",
    "--card-bg": "#4a2435",
    "--card-border": "#bf6f91",
    "--text-primary": "#fff7fb",
    "--text-secondary": "#f5c7d8",
    "--text-muted": "#d09ab2",
    "--input-bg": "#361927",
    "--input-border": "#bf6f91",
    "--input-text": "#ffffff",
    "--button-bg": "#c87c9b",
    "--button-hover": "#d98cab",
    "--button-text": "#fff7fb",
  },

  perfectPurple: {
    "--background": "#1b1424",
    "--foreground": "#f3edfb",
    "--nav-bg": "#5a3b78",
    "--nav-border": "#7a56a3",
    "--nav-shadow": "rgba(30, 10, 50, 0.3)",
    "--nav-text-strong": "#f8f4ff",
    "--nav-text-muted": "#d6c8ea",
    "--nav-text-hover": "#ffffff",
    "--nav-text-active": "#ffffff",
    "--card-bg": "#2a1f3d",
    "--card-border": "#7a56a3",
    "--text-primary": "#f8f4ff",
    "--text-secondary": "#d6c8ea",
    "--text-muted": "#a694c0",
    "--input-bg": "#21182f",
    "--input-border": "#7a56a3",
    "--input-text": "#ffffff",
    "--button-bg": "#6b4691",
    "--button-hover": "#7a56a3",
    "--button-text": "#f8f4ff",
  },

  midnightBlack: {
    "--background": "#050505",
    "--foreground": "#e5e5e5",
    "--nav-bg": "#0b0b0b",
    "--nav-border": "#1f1f1f",
    "--nav-shadow": "rgba(0, 0, 0, 0.4)",
    "--nav-text-strong": "#f2f2f2",
    "--nav-text-muted": "#9a9a9a",
    "--nav-text-hover": "#ffffff",
    "--nav-text-active": "#ffffff",
    "--card-bg": "#111111",
    "--card-border": "#1f1f1f",
    "--text-primary": "#f2f2f2",
    "--text-secondary": "#b0b0b0",
    "--text-muted": "#7b7b7b",
    "--input-bg": "#0a0a0a",
    "--input-border": "#1f1f1f",
    "--input-text": "#ffffff",
    "--button-bg": "#151515",
    "--button-hover": "#222222",
    "--button-text": "#f2f2f2",
  },

  softLavender: {
    "--background": "#efe9f8",
    "--foreground": "#2a1f3d",
    "--nav-bg": "#c7b8ea",
    "--nav-border": "#a48adf",
    "--nav-shadow": "rgba(90, 70, 120, 0.15)",
    "--nav-text-strong": "#2a1f3d",
    "--nav-text-muted": "#55436f",
    "--nav-text-hover": "#1d132c",
    "--nav-text-active": "#1d132c",
    "--card-bg": "#ddd1f4",
    "--card-border": "#a48adf",
    "--text-primary": "#2a1f3d",
    "--text-secondary": "#55436f",
    "--text-muted": "#7b6b96",
    "--input-bg": "#f7f3fc",
    "--input-border": "#a48adf",
    "--input-text": "#2a1f3d",
    "--button-bg": "#b59ce3",
    "--button-hover": "#a48adf",
    "--button-text": "#2a1f3d",
  },

  iceBlue: {
    "--background": "#eef9ff",
    "--foreground": "#1c2a35",
    "--nav-bg": "#d9f0ff",
    "--nav-border": "#8ecae6",
    "--nav-shadow": "rgba(50, 90, 120, 0.12)",
    "--nav-text-strong": "#1c2a35",
    "--nav-text-muted": "#49606f",
    "--nav-text-hover": "#111c24",
    "--nav-text-active": "#111c24",
    "--card-bg": "#e5f5ff",
    "--card-border": "#8ecae6",
    "--text-primary": "#1c2a35",
    "--text-secondary": "#49606f",
    "--text-muted": "#6e8796",
    "--input-bg": "#f8fdff",
    "--input-border": "#8ecae6",
    "--input-text": "#1c2a35",
    "--button-bg": "#bfe7fb",
    "--button-hover": "#a7dcf5",
    "--button-text": "#1c2a35",
  },

  mutedAmber: {
    "--background": "#1f140b",
    "--foreground": "#f3e7d3",
    "--nav-bg": "#7a4f1d",
    "--nav-border": "#a86a2a",
    "--nav-shadow": "rgba(50, 20, 0, 0.25)",
    "--nav-text-strong": "#fff3de",
    "--nav-text-muted": "#e0c7a0",
    "--nav-text-hover": "#ffffff",
    "--nav-text-active": "#ffffff",
    "--card-bg": "#392313",
    "--card-border": "#a86a2a",
    "--text-primary": "#fff3de",
    "--text-secondary": "#e0c7a0",
    "--text-muted": "#b89768",
    "--input-bg": "#2a1a0e",
    "--input-border": "#a86a2a",
    "--input-text": "#fff3de",
    "--button-bg": "#7a4f1d",
    "--button-hover": "#8f5c22",
    "--button-text": "#fff3de",
  },

  mintGreen: {
    "--background": "#eafcf5",
    "--foreground": "#1f3a34",
    "--nav-bg": "#bff5e1",
    "--nav-border": "#6ee7c8",
    "--nav-shadow": "rgba(40, 100, 80, 0.12)",
    "--nav-text-strong": "#1f3a34",
    "--nav-text-muted": "#486b61",
    "--nav-text-hover": "#122621",
    "--nav-text-active": "#122621",
    "--card-bg": "#d8f8eb",
    "--card-border": "#6ee7c8",
    "--text-primary": "#1f3a34",
    "--text-secondary": "#486b61",
    "--text-muted": "#6a8d84",
    "--input-bg": "#f5fffb",
    "--input-border": "#6ee7c8",
    "--input-text": "#1f3a34",
    "--button-bg": "#9eeed4",
    "--button-hover": "#87e6c8",
    "--button-text": "#1f3a34",
  },
};

export default function ThemesPage() {
  // Apply saved theme when page opens
  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme && themeValues[savedTheme]) {
      applyTheme(savedTheme);
    }
  }, []);

  // update CSS variables for selected theme
  const applyTheme = (themeName) => {
    const theme = themeValues[themeName];
    if (!theme) return;

    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    localStorage.setItem("selectedTheme", themeName);
  };

  const themes = [
    { name: "Meridian", key: "meridian", className: styles.meridian },
    { name: "Blood Red", key: "bloodRed", className: styles.bloodRed },
    { name: "Night Ocean Blue", key: "nightOceanBlue", className: styles.nightOceanBlue },
    { name: "Wealthy Green", key: "wealthyGreen", className: styles.wealthyGreen },
    { name: "Office Grey", key: "officeGrey", className: styles.officeGrey },
    { name: "Pretty in Pink", key: "prettyInPink", className: styles.prettyInPink },
    { name: "Perfect Purple", key: "perfectPurple", className: styles.perfectPurple },
    { name: "Midnight Black", key: "midnightBlack", className: styles.midnightBlack },
    { name: "Soft Lavender", key: "softLavender", className: styles.softLavender },
    { name: "Ice Blue", key: "iceBlue", className: styles.iceBlue },
    { name: "Muted Amber", key: "mutedAmber", className: styles.mutedAmber },
    { name: "Mint Green", key: "mintGreen", className: styles.mintGreen },
  ];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Choose a Theme</h1>
      <p className={styles.subtitle}>Pick a style for Meridian</p>

      <div className={styles.grid}>
        {themes.map((theme) => (
          <button
            key={theme.name}
            className={`${styles.themeButton} ${theme.className}`}
            onClick={() => applyTheme(theme.key)}
          >
            <span className={styles.colorCircle}></span>
            <span className={styles.buttonText}>{theme.name}</span>
          </button>
        ))}
      </div>
    </main>
  );
}