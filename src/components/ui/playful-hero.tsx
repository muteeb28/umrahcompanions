"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { UmrahFloatingDock } from "@/components/umrah-floating-dock";

export default function PlayfulHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants = {
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

  const highlightVariants = {
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

  const phoneVariants = {
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

  const chatVariants = {
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

  const imageVariants = {
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

  const buttonVariants = {
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
                Your trusted{" "}
                <span className="relative inline-block transform -rotate-1">
                  <span className="relative z-10 px-2 py-1 text-gray-900">Umrah companion</span>
                  <motion.span
                    className="absolute inset-0 bg-yellow-400 px-2 py-1"
                    variants={highlightVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                  />
                </span>{" "}
                is now available
              </h1>
              <motion.div
                className="w-24 h-1 bg-yellow-400"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              ></motion.div>
            </motion.div>

            <motion.p
              className="text-gray-300 text-lg leading-relaxed max-w-lg"
              variants={textVariants}
            >
              Perform your sacred journey with ease — explore the best Umrah packages, get personalized AI recommendations, compare options, and plan your trip seamlessly.
            </motion.p>

            <motion.p
              className="text-gray-400 text-base leading-relaxed max-w-lg"
              variants={textVariants}
            >
              Explore packages below and choose the one that suits your journey:
            </motion.p>

            <motion.div className="flex gap-4 pt-4" variants={textVariants}>
              <motion.button
                className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                Book Umrah
              </motion.button>
              <motion.button
                className="text-gray-300 font-semibold hover:text-white transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                View packages
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            variants={phoneVariants}
          >
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-80 h-[600px] bg-gray-800 rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-gray-900 rounded-[2.5rem] relative overflow-hidden">
                  {/* Phone Notch */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-800 rounded-full z-10"></div>

                  {/* Chat Interface */}
                  <div className="p-6 pt-12 h-full flex flex-col">
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

                    {/* Chat Messages */}
                    <div className="space-y-4 mb-6">
                      <motion.div
                        className="bg-gray-700 rounded-2xl p-4 max-w-[80%]"
                        custom={0}
                        variants={chatVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                      >
                        <p className="text-sm text-gray-300">
                          Hey, please show me the best Umrah packages
                        </p>
                      </motion.div>
                      <motion.div
                        className="bg-blue-600 rounded-2xl p-4 max-w-[80%] ml-auto"
                        custom={1}
                        variants={chatVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                      >
                        <p className="text-sm text-white">
                          Here are the best Umrah packages for next month
                        </p>
                      </motion.div>
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-2 gap-3 pb-6">
                      <motion.div
                        className="rounded-xl overflow-hidden shadow-lg"
                        custom={0}
                        variants={imageVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                      >
                        <img
                          src="/images/1.jpg"
                          alt="Umrah Package 1"
                          className="w-full h-24 object-cover"
                        />
                      </motion.div>

                      <motion.div
                        className="rounded-xl overflow-hidden shadow-lg"
                        custom={1}
                        variants={imageVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                      >
                        <img
                          src="/images/2.jpg"
                          alt="Umrah Package 2"
                          className="w-full h-24 object-cover"
                        />
                      </motion.div>

                      <motion.div
                        className="rounded-xl overflow-hidden shadow-lg"
                        custom={2}
                        variants={imageVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                      >
                        <img
                          src="/images/3.jpg"
                          alt="Umrah Package 3"
                          className="w-full h-24 object-cover"
                        />
                      </motion.div>

                      <motion.div
                        className="rounded-xl overflow-hidden shadow-lg"
                        custom={3}
                        variants={imageVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                      >
                        <img
                          src="/images/4.jpg"
                          alt="Umrah Package 4"
                          className="w-full h-24 object-cover"
                        />
                      </motion.div>
                    </div>

                    {/* Chat Input */}
                    <div className="mt-auto pt-2 pb-4">
                      <div className="bg-gray-800 rounded-full px-4 py-3 flex items-center gap-3">
                        <span className="text-gray-400 text-sm flex-1">Message...</span>
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                          </svg>
                        </div>
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

      {/* Floating Dock Navigation */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <UmrahFloatingDock />
      </motion.div>
    </section>
  );
}