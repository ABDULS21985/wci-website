import type { ReactNode } from "react";

// This root layout is required by Next.js but next-intl will handle
// the actual HTML structure in [locale]/layout.tsx
// We just need to pass through children here
type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
