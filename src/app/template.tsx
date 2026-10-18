// Remounts on each top-level navigation: page content rises in as the
// transition curtain lifts. Plain CSS keeps this off the JS budget.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
