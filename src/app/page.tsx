import { ThemeProvider } from "@/components/theme-provider";
import Dashboard from "./pages/Dashboard";

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Dashboard />
    </ThemeProvider>
  );
}
