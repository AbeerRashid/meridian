import { CurrencyProvider } from '../context/CurrencyContext';
import { Navbar } from '../components/Navbar';
import "./globals.css";

export const metadata = {
  title: 'Meridian - Real-time Global Exchange',
  description: 'Real-time Global Currency Exchange.',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       {/* We wrap the children in the Provider so the UI can see the API data and loading state `rates` and `loading` */}
        <CurrencyProvider>
        <Navbar />
          <main>
            {children}
          </main>
        </CurrencyProvider>
      </body>
    </html>
  );
}