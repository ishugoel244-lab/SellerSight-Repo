"use client";

import { FormEvent, useRef } from "react";
import { useChat } from "@ai-sdk/react"; // if your repo uses "@ai-sdk/react", change this import path

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
  // useChat typed as any so TS doesn't complain about helpers like `input`
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat() as any;

  const formRef = useRef<HTMLFormElement | null>(null);

  const onClearChat = () => {
    setMessages([]);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !input.trim()) return;
    handleSubmit(e);
  };

  const welcomeText =
    WELCOME_MESSAGE ||
    `Welcome to SellerSight ⚡ An advanced AI system engineered to analyze real customer feedback, uncover hidden performance drivers, and forecast the outcomes of inaction. I evaluate sentiment signals, competitive positioning, issue severity, and trajectory shifts to reveal the most decisive improvement opportunities.`;

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f7fb] text-slate-900">
      {/* Top dark nav with logo + tagline */}
      <Header />

      {/* Full-page chat layout */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-6xl flex flex-col px-6 pt-6 pb-8 gap-4">
          {/* Top chat header strip */}
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

          {/* Main chat panel */}
          <div className="flex-1 flex flex-col rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-slate-50/60">
              {/* Welcome bubble at top if no messages yet */}
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

            {/* Input bar – wide pill like Poe */}
            <div className="border-t border-slate-200 bg-white px-4 py-3">
              <form
                ref={formRef}
                onSubmit={onSubmit}
                className="flex items-center gap-3 rounded-full bg-slate-50 border border-slate-200 px-4 py-2"
              >
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask SellerSight about your ASIN's reviews…"
                  className="flex-1 border-none bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input || !input.trim()}
                  className="h-9 w-9 rounded-full bg-amber-400 text-slate-900 hover:bg-amber-500 disabled:opacity-60 flex items-center justify-center p-0"
                >
                  ↑
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
