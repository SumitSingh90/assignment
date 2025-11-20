import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("{}");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let options = {
        method,
        headers: { "Content-Type": "application/json" },
      };

      if (method === "POST" || method === "PUT") {
        options.body = JSON.stringify(JSON.parse(body));
      }

      const res = await fetch(url, options);

      const text = await res.text();
      let formatted;

      try {
        formatted = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        formatted = text;
      }

      setResponse(`Status: ${res.status}\n\n${formatted}`);
    } catch (err) {
      setResponse("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>REST Client</h2>

      <form onSubmit={handleSubmit}>
        <label>Request URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter complete API URL"
          style={{ width: "100%", marginBottom: "10px" }}
        />

        <label>Method</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>

        {(method === "POST" || method === "PUT") && (
          <>
            <label>Body (JSON)</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows="5"
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </>
        )}

        <button type="submit">Send Request</button>
      </form>

      <h3 style={{ marginTop: "20px" }}>Response</h3>

      <pre
        style={{
          background: "#f4f4f4",
          padding: "15px",
          borderRadius: "5px",
          minHeight: "200px",
        }}
      >
        {response}
      </pre>
    </div>
  );
}

export default App;
