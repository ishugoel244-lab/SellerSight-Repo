"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { ArrowUp, Loader2, Plus, Square } from "lucide-react";
import { MessageWall } from "@/components/messages/message-wall";
import { ChatHeader, ChatHeaderBlock } from "@/app/parts/chat-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UIMessage } from "ai";
import { useEffect, useState, useRef } from "react";
import { AI_NAME, CLEAR_CHAT_TEXT, OWNER_NAME, WELCOME_MESSAGE } from "@/config";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/ui/Header";   // 👈 NEW HEADER IMPORT


// Schema
const formSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty.")
    .max(2000, "Message must be at most 2000 characters."),
});

// Welcome message builder
const makeWelcomeMessage = (): UIMessage => ({
  id: `welcome-${Date.now()}`,
  role: "assistant",
  parts: [{ type: "text", text: WELCOME_MESSAGE }],
});

export default function Chat() {
  const [isClient, setIsClient] = useState(false);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const welcomeMessageShownRef = useRef<boolean>(false);

  const { messages, sendMessage, status, stop, setMessages } = useChat();

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (isClient && !welcomeMessageShownRef.current) {
      setMessages([makeWelcomeMessage()]);
      welcomeMessageShownRef.current = true;
    }
  }, [isClient, setMessages]);

  const handleDurationChange = (key: string, duration: number) => {
    setDurations((prev) => ({ ...prev, [key]: duration }));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: "" },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    sendMessage({ text: data.message });
    form.reset();
  }

  function clearChat() {
    setMessages([makeWelcomeMessage()]);
    setDurations({});
    toast.success("Chat cleared");
  }

  return (
    <div className="flex h-screen flex-col bg-[#F7F7F7] text-[#0F1111] font-sans">
      {/* NEW Amazon style top header */}
      <Header />

      <main className="flex-1 overflow-auto w-full flex justify-center">
        <div className="flex flex-col w-full max-w-5xl bg-white shadow-sm border border-gray-200 rounded-2xl mt-4 mb-32 mx-4 overflow-hidden">

          {/* Chat title row */}
          <div className="flex items-center justify-between border-b px-6 py-4 bg-white shadow-sm">
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src="/sellersight-logo.png" />
                <AvatarFallback>SS</AvatarFallback>
              </Avatar>
              <p className="font-semibold tracking-tight">Chat with {AI_NAME}</p>
            </div>
            <Button variant="outline" size="sm" onClick={clearChat} className="flex items-center gap-1">
              <Plus className="size-4" />
              {CLEAR_CHAT_TEXT}
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <MessageWall
              messages={messages}
              status={status}
              durations={durations}
              onDurationChange={handleDurationChange}
            />
            {status === "submitted" && (
              <div className="flex justify-start max-w-3xl w-full">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="border-t border-gray-200 bg-white p-4">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="message"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="sr-only">Message</FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Ask SellerSight about your ASIN's reviews…"
                          className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm focus:ring-2 focus:ring-[#FF9900] focus:outline-none"
                          disabled={status === "streaming"}
                          autoComplete="off"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              form.handleSubmit(onSubmit)();
                            }
                          }}
                        />

                        {(status === "ready" || status === "error") && (
                          <Button
                            type="submit"
                            disabled={!field.value.trim()}
                            size="icon"
                            className="absolute right-2 top-2 bg-[#FF9900] hover:bg-[#e68a00] text-black rounded-full"
                          >
                            <ArrowUp className="size-4" />
                          </Button>
                        )}

                        {(status === "streaming" || status === "submitted") && (
                          <Button size="icon" onClick={() => stop()}
                            className="absolute right-2 top-2 bg-gray-200 text-black rounded-full">
                            <Square className="size-4" />
                          </Button>
                        )}
                      </div>
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </div>
        </div>
      </main>

      <footer className="text-center py-2 text-sm text-gray-600">
        © {new Date().getFullYear()} {OWNER_NAME} — Built with SellerSight
      </footer>
    </div>
  );
}
