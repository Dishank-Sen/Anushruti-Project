import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Anushruti · Your learning garden',
  description:
    'Visual-first maths and science for Classes 1–5. Learn at your own pace, with no sound needed.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
