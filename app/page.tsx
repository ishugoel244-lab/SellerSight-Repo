"use client";

import { FormEvent, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";

import Header from "@/components/ui/Header";
import { MessageWall } from "@/components/messages/message-wall";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import {
  AI_NAME,
  CLEAR_CHAT_TEXT,
  OWNER_NAME,
  WELCOME_MESSAGE,
} from "@/config";

const PROMPTS = [
  "Compare my ASIN with the top 3 competitors based on reviews.",
  "Summarize the top complaints for this ASIN and their impact.",
  "Tell me what customers love most about my product vs competitors.",
  "Identify hidden opportunities to improve my Amazon listing.",
];

export default function Page() {
  // ✅ New AI SDK v5 useChat signature – no `input` here
  const { messages, sendMessage, status, setMessages } = useChat();

  // ✅ Manage input ourselves
  const [input, setInput] = useState("");

  // derive loading state from status
  const isLoading = status === "submitted" || status === "streaming";

  const formRef = useRef<HTMLFormElement | null>(null);

  const onClearChat = () => setMessages([]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // send the user message to the chat API
    await sendMessage(input);
    setInput("");
  };

  const welcomeText =
    WELCOME_MESSAGE ||
    `Welcome to SellerSight ⚡ An advanced AI system engineered to analyze real customer feedback, uncover hidden performance drivers, and forecast the outcomes of inaction. I evaluate sentiment signals, competitive positioning, issue severity, and trajectory shifts to reveal the most decisive improvement opportunities.`;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-[#f5f7fb] to-[#e7f1ff] text-slate-900">
      {/* Top nav bar with your logo / brand */}
      <Header />

      {/* Main content */}
      <main className="flex-1 flex justify-center px-4 py-8">
        <div className="grid w-full max-w-6xl gap-6 md:grid-cols-[minmax(0,2.3fr)_minmax(260px,1fr)]">
          {/* ========== LEFT: CHAT CARD ========== */}
          <section className="flex flex-col rounded-2xl bg-white/95 shadow-lg border border-slate-100 overflow-hidden">
            {/* Chat header inside card */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 bg-slate-900 text-white">
                  <AvatarFallback className="font-semibold">SS</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-lg font-semibold tracking-tight">
                    Chat with SellerSight
                  </h1>
                  <p className="text-xs text-slate-500">
                    Amazon Review Intelligence for Sellers
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full border-slate-300 px-4 py-1 text-xs font-medium"
                  onClick={onClearChat}
                >
                  {CLEAR_CHAT_TEXT || "Clear chat"}
                </Button>
                <Button
                  type="button"
                  className="rounded-full bg-slate-900 px-4 py-1 text-xs font-medium text-white hover:bg-slate-800"
                  onClick={onClearChat}
                >
                  + New analysis
                </Button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 min-h-[320px] max-h-[65vh] overflow-y-auto bg-slate-50/80 px-6 py-4 space-y-4">
              {/* Welcome bubble when empty */}
              {!messages.length && (
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-white text-sm">
                    SS
                  </div>
                  <Card className="max-w-xl rounded-2xl bg-amber-50 border-amber-100">
                    <CardContent className="px-4 py-3">
                      <p className="text-sm leading-relaxed text-slate-800">
                        {welcomeText}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              <MessageWall
                messages={messages}
                ownerName={OWNER_NAME || "You"}
                aiName={AI_NAME || "SellerSight"}
              />
            </div>

            {/* Input bar */}
            <div className="border-t border-slate-200 bg-white px-4 py-3">
              <form
                ref={formRef}
                onSubmit={onSubmit}
                className="flex items-center gap-3"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask SellerSight about your ASIN’s reviews, complaints, or competitors…"
                  className="flex-1 rounded-full bg-slate-50 border-slate-200 text-sm"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-full px-4 py-2 text-sm font-semibold bg-amber-400 text-slate-900 hover:bg-amber-500 disabled:opacity-60"
                >
                  {isLoading ? "Analyzing…" : "Send"}
                </Button>
              </form>
            </div>
          </section>

          {/* ========== RIGHT: CONTEXT / HELP PANEL ========== */}
          <aside className="flex flex-col gap-4">
            <Card className="bg-white/95 border-slate-100 shadow-md">
              <CardContent className="px-5 py-4">
                <h2 className="text-sm font-semibold mb-2">
                  What SellerSight can do
                </h2>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li>• Break down sentiment across your reviews.</li>
                  <li>• Surface top complaints and risk areas.</li>
                  <li>• Compare your ASIN against key competitors.</li>
                  <li>• Highlight hidden opportunities to improve ranking.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/95 border-slate-100 shadow-md">
              <CardContent className="px-5 py-4">
                <h2 className="text-sm font-semibold mb-2">
                  Try asking SellerSight
                </h2>
                <div className="flex flex-col gap-2">
                  {PROMPTS.map((prompt) => (
                    <div
                      key={prompt}
                      className="text-xs text-slate-700 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                    >
                      {prompt}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-slate-50 border-slate-900 shadow-md">
              <CardContent className="px-5 py-4">
                <p className="text-xs leading-relaxed">
                  Paste a single ASIN, a product URL, or a list of competitors.
                  SellerSight will read the reviews and come back with insights
                  you can act on today.
                </p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
