"use client";

import { useState, FormEvent } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

export default function Page() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const [input, setInput] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!input.trim()) return;

    await sendMessage({ text: input });
    setInput("");
  }

  return (
    <main>
      {/* your messages UI */}
      {messages.map(message => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts
            .filter(p => p.type === "text")
            .map((p, i) => (
              <span key={i}>{p.text}</span>
            ))}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={status !== "ready"}
          placeholder="Ask SellerSight…"
        />
        <button type="submit" disabled={status !== "ready"}>
          Send
        </button>
      </form>
    </main>
  );
}
