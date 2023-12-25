import Providers from "./components/Providers";
import { AuthProvider } from "./Providers";
import NavBar from "./components/NavBar";
import "./globals.css";

export const metadata = {
  title: "Blog App",
  description: "Full Stack blog App with Authentication by Arun Muralidharan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>
            <NavBar />
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
