export default function Register() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 border rounded w-80">
        <h1 className="text-xl mb-4">Register</h1>
        <input className="w-full p-2 border mb-2" placeholder="Email" />
        <input className="w-full p-2 border mb-2" placeholder="Password" type="password" />
        <button className="w-full bg-black text-white p-2">Register</button>
      </div>
    </div>
  );
}
