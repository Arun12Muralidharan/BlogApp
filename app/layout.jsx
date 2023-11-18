import "./globals.css";

export const metadata = {
  title: "Blog App",
  description: "Full Stack blog App with Authentication by Arun Muralidharan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
