"use client";

import { FormEvent, useRef } from "react";
import { useChat } from "ai/react"; // or "@ai-sdk/react" – keep whatever you already use

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

export default function Page() {
  // keep your original hook API, but relax TS with `as any`
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat() as any;

  const formRef = useRef<HTMLFormElement | null>(null);

  const onClearChat = () => setMessages([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input?.trim()) return;
    handleSubmit(e);
  };

  const welcomeText =
    WELCOME_MESSAGE ||
    `Welcome to SellerSight ⚡ An advanced AI system engineered to analyze real customer feedback, uncover hidden performance drivers, and forecast the outcomes of inaction. I evaluate sentiment signals, competitive positioning, issue severity, and trajectory shifts to reveal the most decisive improvement opportunities.`;

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f7fb] text-slate-900">
      {/* Top dark nav with logo */}
      <Header />

      {/* Main full-page chat layout */}
      <main className="flex-1 flex flex-col items-center">
        {/* Top chat header bar (not a floating card) */}
        <div className="w-full max-w-6xl px-6 pt-6 pb-2">
          <div className="flex items-center justify-between rounded-2xl bg-white shadow-sm border border-slate-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 bg-slate-900 text-white">
                <AvatarFallback className="font-semibold">SS</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-semibold">Chat with SellerSight</h1>
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
                + New Analysis
              </Button>
            </div>
          </div>
        </div>

        {/* Messages area – full width under the header, NOT a centered bubble */}
        <div className="w-full max-w-6xl flex-1 flex flex-col px-6 pb-4">
          <div className="flex-1 rounded-2xl bg-white shadow-sm border border-slate-200 px-6 py-4 overflow-y-auto">
            {/* Welcome bubble at top */}
            {!messages.length && (
              <div className="mb-4 flex gap-3">
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

          {/* Big pill input bar like Poe, sitting below the chat box */}
          <div className="mt-4 pb-4">
            <form
              ref={formRef}
              onSubmit={onSubmit}
              className="flex items-center gap-3 rounded-full bg-white shadow-sm border border-slate-300 px-4 py-2"
            >
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask SellerSight about your ASIN's reviews…"
                className="flex-1 border-none bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                type="submit"
                disabled={isLoading || !input?.trim()}
                className="h-9 w-9 rounded-full bg-amber-400 text-slate-900 hover:bg-amber-500 disabled:opacity-60 flex items-center justify-center p-0"
              >
                ↑
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
