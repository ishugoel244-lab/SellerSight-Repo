"use client";

import { FormEvent, useRef } from "react";
import { useChat } from "@ai-sdk/react";

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
    if (!input.trim()) return;
    handleSubmit(e);
  };

  const welcomeText =
    WELCOME_MESSAGE ||
    `Welcome to SellerSight ⚡ We analyze review data to uncover opportunities and weaknesses.`;

  return (
    <div className="flex min-h-screen flex-col bg-[#f6f7fb] text-slate-900">

      {/* 🔹 Top bar directly included, not imported */}
      <div className="w-full flex justify-between items-center bg-[#212836] text-white px-6 py-3">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <img src="/logo.png" alt="SellerSight Logo" className="h-7 w-auto" />
          SellerSight
        </div>
        <p className="text-sm text-amber-300">
          Amazon Review Intelligence for Sellers
        </p>
      </div>

      {/* Chat Page */}
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-6xl flex flex-col px-6 pt-6 pb-8 gap-4">

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
                onClick={onClearChat
