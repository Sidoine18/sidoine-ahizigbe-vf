import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

const VISITOR_KEY = "sa-visitor-id";

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

const WELCOME: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Bonjour 👋 Je suis l'assistant de Sidoine. Une question sur le froid, la climatisation, un projet web ou un devis ?",
    },
  ],
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [visitorId, setVisitorId] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisitorId(getVisitorId());
  }, []);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
      }),
    [visitorId],
  );

  const { messages, sendMessage, status } = useChat({
    id: "assistant-sidoine",
    messages: [WELCOME],
    transport,
    onError: () => toast.error("L'assistant est momentanément indisponible."),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, busy]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    void sendMessage({ text });
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant IA"}
        className="fixed bottom-5 right-5 z-[60] grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 glow-ring"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="glass-card fixed bottom-24 right-4 z-[60] flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
                <Bot className="size-4" />
              </span>
              <div>
                <p className="font-display text-sm font-semibold">Assistant de Sidoine</p>
                <p className="text-xs text-muted-foreground">Réponses en temps réel</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => {
                const text = m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                if (!text) return null;
                return (
                  <div
                    key={m.id}
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${
                      m.role === "user"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    {text}
                  </div>
                );
              })}
              {status === "submitted" && (
                <div className="w-fit rounded-2xl bg-secondary px-4 py-3">
                  <span className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 animate-pulse rounded-full bg-muted-foreground"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                </div>
              )}
            </div>

            <form onSubmit={submit} className="flex items-center gap-2 border-t border-border p-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre question…"
                className="w-full rounded-full border border-input bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={busy}
                aria-label="Envoyer"
                className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
