import { DataProvider, ScrollSpyProvider, ThemeProvider } from "@/providers";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <DataProvider>
        <ScrollSpyProvider>{children}</ScrollSpyProvider>
      </DataProvider>
    </ThemeProvider>
  );
};
