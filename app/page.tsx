"use client";

import { useChat } from "@ai-sdk/react";
import { FormEvent, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { MessageWall } from "@/components/messages/message-wall";
import {
  AI_NAME,
  CLEAR_CHAT_TEXT,
  OWNER_NAME,
  WELCOME_MESSAGE,
} from "@/config";

export default function Page() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat();

  const formRef = useRef<HTMLFormElement | null>(null);

  // optional: clear chat handler
  const onClearChat = () => {
    setMessages([]);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-black text-white">
            <AvatarFallback className="font-bold text-lg">
              SS
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              SellerSight
            </h1>
            <p className="text-sm text-black/60">
              Amazon review intelligence assistant
            </p>
          </div>
        </div>

        <Button
          type="button"
          onClick={onClearChat}
          className="bg-black text-white hover:bg-black/80 rounded-xl px-4 py-2 text-sm font-medium"
        >
          {CLEAR_CHAT_TEXT ?? "Clear chat"}
        </Button>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col px-8 pb-6 gap-4">
        {/* Welcome / Hero card */}
        {!messages.length && (
          <Card className="bg-white/70 backdrop-blur-md border border-white/60 shadow-sm max-w-3xl">
            <CardContent className="py-6 px-6">
              <p className="text-base leading-relaxed text-black">
                Hi — I’m <span className="font-semibold">{AI_NAME ?? "SellerSight"}</span>, your
                AI review intelligence assistant. Paste an Amazon product link or
                ask me to compare your product’s reviews with competitors. I’ll
                break down sentiment, complaints, and opportunities.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Chat messages */}
        <div className="flex-1 min-h-0 mt-2">
          <MessageWall
            messages={messages}
            ownerName={OWNER_NAME ?? "You"}
            aiName={AI_NAME ?? "SellerSight"}
          />
        </div>
      </main>

      {/* INPUT BAR */}
      <footer className="px-8 pb-8 pt-4 bg-white/60 backdrop-blur-md border-t border-white/70">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="flex items-center gap-3 max-w-3xl mx-auto"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask SellerSight anything about your Amazon reviews..."
            className="flex-1 bg-white/80 border border-gray-300 rounded-xl text-sm"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-black/80 disabled:opacity-60"
          >
            {isLoading ? "Thinking..." : "Send"}
          </Button>
        </form>
      </footer>
    </div>
  );
}
