
export function Card({ children }) {
  return <div className="border rounded-lg shadow p-4 bg-white">{children}</div>;
}
export function CardContent({ children }) {
  return <div>{children}</div>;
}
