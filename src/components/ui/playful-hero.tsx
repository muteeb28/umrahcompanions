"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PlayfulHero() {
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const highlightVariants: Variants = {
    hidden: {
      opacity: 0,
      scaleX: 0,
      originX: 0,
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        delay: 0.5,
      },
    },
  };

  const phoneVariants: Variants = {
    hidden: { opacity: 0, x: 100, rotateY: 20 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  };

  const chatVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 1 + i * 0.3,
      },
    }),
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.6, rotateZ: -10 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 200,
        delay: 1.8 + i * 0.1,
      },
    }),
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <FollowerPointerCard
      title={
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="TravelBare" className="w-6 h-6 rounded-full object-cover" />
          <p className="text-white font-medium text-xs">TravelBare</p>
        </div>
      }
    >
      <section className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
        {/* Background Animation */}
        <motion.div
          className="absolute inset-0 opacity-20"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-blue-600/10" />
        </motion.div>

        <motion.div
          className="container mx-auto px-6 lg:px-8 h-screen flex items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div className="space-y-4" variants={textVariants}>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Ask anything about{" "}
                  <span className="relative inline-block transform -rotate-1">
                    <span className="relative z-10 px-2 py-1 text-gray-900">Hajj and Umrah</span>
                    <motion.span
                      className="absolute inset-0 bg-yellow-400 px-2 py-1"
                      variants={highlightVariants}
                      initial="hidden"
                      animate={isVisible ? "visible" : "hidden"}
                    />
                  </span>
                </h1>
                <motion.div
                  className="w-24 h-1 bg-yellow-400"
                  initial={{ width: 0 }}
                  animate={{ width: 96 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                ></motion.div>
              </motion.div>

              <motion.p
                className="text-gray-300 text-lg leading-relaxed max-w-lg mb-8"
                variants={textVariants}
              >
                Prepare for your sacred journey with clarity and peace. Our AI-assisted guide helps answer your Hajj and Umrah questions, offers step-by-step guidance, and shares essential tips—so you can focus fully on your ibadah while we support you with knowledge and care.
              </motion.p>

              <motion.div variants={textVariants}>
                <PlaceholdersAndVanishInput
                  placeholders={[
                    "How to perform Umrah?",
                    "What are the requirements for Hajj?",
                    "Best time to visit Makkah and Madinah?",
                    "How to apply for an Umrah visa?",
                    "What are the steps for Ihram?",
                    "How to find the best Umrah packages?",
                  ]}
                  onChange={(e) => setInputValue(e.target.value)}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!inputValue.trim() || isLoading) return;

                    const userMessage = { role: "user", content: inputValue };
                    setMessages((prev: { role: string; content: string }[]) => [...prev, userMessage]);
                    setInputValue("");
                    setIsLoading(true);

                    try {
                      const response = await fetch("/api/chat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ message: inputValue }),
                      });
                      const data = await response.json();
                      if (data.response) {
                        setMessages((prev: { role: string; content: string }[]) => [...prev, { role: "assistant", content: data.response }]);
                      }
                    } catch (error) {
                      console.error("Chat error:", error);
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                />
              </motion.div>
            </div>

            {/* Right Content - Phone Mockup */}
            <motion.div
              className="relative flex justify-center lg:justify-end"
              variants={phoneVariants}
            >
              <div className="relative">
                {/* Phone Frame */}
                <div className="w-[380px] h-[780px] bg-gray-800 rounded-[3.5rem] p-3 shadow-2xl border-4 border-gray-700/50">
                  <div className="w-full h-full bg-gray-900 rounded-[3rem] relative overflow-hidden flex flex-col">
                    {/* Phone Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-gray-800 rounded-b-3xl z-20"></div>

                    {/* Chat Interface */}
                    <div className="p-6 pt-12 flex-1 flex flex-col relative">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                          <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                        </div>
                        <div className="text-white text-xs font-medium">9:41</div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-2 border border-white/50 rounded-sm">
                            <div className="w-3 h-1 bg-white rounded-sm"></div>
                          </div>
                        </div>
                      </div>

                      {/* Chat Header */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">U</span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold text-sm">Umrah Assistant</h3>
                          <p className="text-gray-400 text-xs">Online</p>
                        </div>
                      </div>

                      <div
                        ref={scrollRef}
                        className="max-h-[420px] overflow-y-auto no-scrollbar scroll-smooth p-1"
                      >
                        <div className="space-y-4 pb-32">
                          {messages.length === 0 ? (
                            <motion.div
                              className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 max-w-[85%]"
                              custom={0}
                              variants={chatVariants}
                              initial="hidden"
                              animate={isVisible ? "visible" : "hidden"}
                            >
                              <p className="text-sm text-gray-300 leading-relaxed">
                                Salaam! I&apos;m your Umrah Assistant. How can I help you today?
                              </p>
                            </motion.div>
                          ) : (
                            messages.map((msg: { role: string; content: string }, idx: number) => (
                              <motion.div
                                key={idx}
                                className={`${msg.role === "user"
                                  ? "bg-gray-800 border border-gray-700/50 ml-auto"
                                  : "bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/20"
                                  } rounded-2xl p-4 max-w-[90%] shadow-md`}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                              >
                                {msg.role === "assistant" ? (
                                  <div className="prose prose-sm prose-invert max-w-none text-white text-sm leading-relaxed">
                                    <ReactMarkdown
                                      remarkPlugins={[remarkGfm]}
                                      components={{
                                        strong: ({ children }) => <span className="font-bold text-yellow-300">{children}</span>,
                                        em: ({ children }) => <span className="italic text-blue-200">{children}</span>,
                                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                                        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                                        li: ({ children }) => <li className="text-sm">{children}</li>,
                                        h1: ({ children }) => <h1 className="text-lg font-bold text-yellow-300 mb-2">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-base font-bold text-yellow-300 mb-2">{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-sm font-bold text-yellow-300 mb-1">{children}</h3>,
                                        a: ({ href, children }) => (
                                          <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-yellow-300 underline hover:text-yellow-200 cursor-pointer transition-colors"
                                          >
                                            {children}
                                          </a>
                                        ),
                                      }}
                                    >
                                      {msg.content}
                                    </ReactMarkdown>
                                  </div>
                                ) : (
                                  <p className="text-sm leading-relaxed text-gray-300">
                                    {msg.content}
                                  </p>
                                )}
                              </motion.div>
                            ))
                          )}
                          {isLoading && (
                            <motion.div
                              className="bg-blue-600/90 rounded-2xl p-4 w-20 shadow-lg ml-6"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <div className="flex gap-1 justify-center">
                                <motion.span
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                                  className="w-1.5 h-1.5 bg-white rounded-full"
                                />
                                <motion.span
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                  className="w-1.5 h-1.5 bg-white rounded-full"
                                />
                                <motion.span
                                  animate={{ opacity: [0.3, 1, 0.3] }}
                                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                  className="w-1.5 h-1.5 bg-white rounded-full"
                                />
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Removed Image Grid */}

                      {/* Chat Input Mockup */}
                      <div className="mt-auto pt-4 pb-2">
                        <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-2xl px-5 py-4 flex items-center gap-3 shadow-inner">
                          <span className="text-gray-500 text-sm flex-1 truncate">
                            {inputValue ? `Typing: ${inputValue}...` : "Message..."}
                          </span>
                          <motion.div
                            className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-blue-500/20 rounded-[3rem] blur-xl -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

      </section >
    </FollowerPointerCard >
  );
}