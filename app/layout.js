import '../styles/globals.css';
export const metadata = { title: 'Sheeni – The Cleaning Genie', description: 'Uber-style cleaner booking' };
export default function RootLayout({ children }) {
  return (<html lang="en"><body>{children}</body></html>);
}
