# Merdian: Currency Intelligence Dashboard

** CPAN 144 - GROUP 4 Project

## Project Team
* **Abeer Rashid** - Architecture, State Management, and Data Calculation
* **Autumn Gun-Munro** - UI/UX Design, Navigation, and Visualization Logic

### 🏛️  Architecture & Logic
* **Core Architecture**: Developed the project structure and Next.js App Router configuration.
* **State Management**: Engineered the `CurrencyContext` using the React Context API to manage global API data and user watchlists.
* **Calculation Engine**: Authored the `calculation.js` utility, implementing pivot-rate logic for cross-currency accuracy.
* **Data Visualization**: Integrated `Recharts` and developed the logic for simulated market trend generation.

### Abeer Rashid and Autumn: UI/UX & Theming
* **Global Design Tokens**: Managed the implementation of semantic CSS variables in `globals.css` to ensure consistent branding across the entire dashboard.
* **Theme Engine Architecture**: [Technical notes on the JavaScript-based theme switcher to be added by Autumn]
* **Responsive Layouts**: Designed the Footer and Navigation components to maintain structural integrity across mobile, tablet, and desktop viewports.
* **Component Styling**: Crafted the modular CSS for the Watchlist cards and the "Dark Mode" aesthetic.

## Project Overview
Meridian is a professional-grade Next.js application designed to provide real-time currency conversion and market trend visualization. The project demonstrates a "Separation of Concerns" architecture, utilizing React's Context API for global state, CSS Modules for responsive design, and Recharts for data visualization.

## Key Features
* **Real-Time Conversion**: Live exchange rates fetched from the Open Exchange Rates API.
* **Intelligent Watchlist**: A personalized dashboard to track specific currency pairs with simulated market trends.
* **Responsive Visualization**: Dynamic Area Charts that adapt to any screen size (Desktop, Tablet, Mobile).
* **Robust Logic**: A custom pivot-based calculation engine to convert between non-USD currencies.

## Technical Architecture
**Central Intelligence & Routing
* **`src/app/layout.js`**: The Root Layout that orchestrates the global UI. It wraps the application in the `CurrencyProvider` and establishes the persistent
Navigation and Footer layers.
* **`src/context/CurrencyContext.js`**: The "Global Brain." Manages API orchestration, the `watchlist` state, and simulated market volatility.
* **`src/utils/calculation.js`**: The mathematical engine handling cross-currency pivot math and locale-aware formatting.

## Data Visualization
* **`src/components/CurrencyChart.js`**: Uses `Recharts` and `ResponsiveContainer` to ensure exchange rate trends look premium on all devices.

## View Components
* **`src/app/watchlist/page.js`**: Route controller for the personalized Watchlist view.

## Styling & Responsiveness
* **`src/app/globals.css`**: Centralized source of truth for design tokens and semantic CSS variables.
* **Responsive Logic**: Features a custom **3-Breakpoint System** across all modules to ensure a seamless experience on mobile (under 700px), tablet (under 1024px), and desktop.

## API & Integration
* **Data Source**: [Open Exchange Rate API](https://open.er-api.com/v6/latest/USD)
* **Base Logic**: All rates are indexed against USD and recalculated using a pivot ratio ($$Rate_{A \to B} = \frac{Rate_{USD \to B}}{Rate_{USD \to A}}$$) for accuracy.

## Folder Structure