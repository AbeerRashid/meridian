import { CurrencyProvider } from '../context/CurrencyContext';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        // We wrap the children in the Provider so the UI can see the API data and loading state
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}