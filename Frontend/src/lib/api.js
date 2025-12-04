export default function API(token) {
  return {
    get: (p) => fetch(import.meta.env.VITE_API_URL + p, {
      headers: { Authorization: "Bearer " + token }
    }).then(r => r.json())
  };
}
