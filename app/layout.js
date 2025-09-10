import '../styles/globals.css';

export const metadata = {
  title: 'Sheeni – The Cleaning Genie',
  description: 'Uber-style cleaner booking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
