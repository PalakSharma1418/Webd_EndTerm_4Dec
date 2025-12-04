export default function Card({ title, children }) {
  return (
    <div className="border p-4 rounded">
      <h3 className="text-lg mb-2">{title}</h3>
      {children}
    </div>
  );
}
