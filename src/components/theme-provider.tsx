import * as React from "react";
import {
	ThemeProvider as NextThemesProvider,
	type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
// filepath: c:\Users\chita\Documents\central-stores-react\src\components\theme-provider.tsx
