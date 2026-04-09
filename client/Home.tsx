// Ejemplo rápido de lógica para tu componente de chat
const [input, setInput] = useState("");
const [response, setResponse] = useState("");

const askIA = async () => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input })
  });
  const data = await res.json();
  setResponse(data.reply);
};