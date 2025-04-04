"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiUser, FiCpu, FiCode, FiTerminal, FiBox, FiImage, FiTrash2 } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type AIMode = 'chat' | 'image';

export default function AIChat() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<AIMode>('chat');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      if (mode === 'chat') {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to get response');
        }

        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      } else {
        // Image generation
        const response = await fetch('/api/image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: userMessage }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate image');
        }

        setGeneratedImage(data.imageUrl);
        setMessages(prev => [...prev, { role: 'assistant', content: 'Image generated successfully!' }]);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* AI Services Info Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Deep Infra Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border transition-all cursor-pointer ${mode === 'chat' ? 'border-blue-500/50 scale-[1.02]' : 'border-blue-500/20 hover:border-blue-500/30'}`}
          onClick={() => setMode('chat')}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <FiCpu className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-white">Deep Infra AI</h4>
              <p className="text-gray-400">Llama-2-70b LLM</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
              <FiCode className="text-blue-400" />
              <span className="text-sm text-gray-300">Code</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
              <FiTerminal className="text-purple-400" />
              <span className="text-sm text-gray-300">Chat</span>
            </div>
          </div>
        </motion.div>

        {/* Hugging Face Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-6 border transition-all cursor-pointer ${mode === 'image' ? 'border-emerald-500/50 scale-[1.02]' : 'border-emerald-500/20 hover:border-emerald-500/30'}`}
          onClick={() => setMode('image')}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <FiImage className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-white">Hugging Face</h4>
              <p className="text-gray-400">Stable Diffusion XL</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
              <FiImage className="text-emerald-400" />
              <span className="text-sm text-gray-300">Generate</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg p-2">
              <FiBox className="text-teal-400" />
              <span className="text-sm text-gray-300">HD Art</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chat/Image Interface */}
      <div className="bg-[#151B28]/80 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mode === 'chat' ? (
              <FiCpu className="text-blue-400" />
            ) : (
              <FiImage className="text-emerald-400" />
            )}
            <h3 className="text-lg font-semibold text-white">
              {mode === 'chat' ? 'AI Assistant' : 'Image Generation'}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setMessages([]);
                setGeneratedImage(null);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                messages.length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-700/50'
              }`}
              disabled={messages.length === 0}
            >
              <FiTrash2 className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">New Chat</span>
            </button>
            <span className={`px-2 py-1 rounded-full text-xs ${
              mode === 'chat' 
                ? 'bg-blue-500/20 text-blue-400'
                : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {mode === 'chat' ? 'Llama-2-70b' : 'SDXL'}
            </span>
          </div>
        </div>

        <div className="h-[400px] overflow-y-auto p-4 space-y-4" id="chat-messages">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 py-8"
            >
              {mode === 'chat' ? (
                <>
                  <FiCpu className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                  <p>Ask me anything about programming, technology, or software development!</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <button
                      onClick={() => setInput("How can I optimize React performance?")}
                      className="text-xs bg-gray-800/50 px-3 py-1 rounded-full text-gray-300 hover:bg-gray-700/50 transition-colors"
                    >
                      "How can I optimize React performance?"
                    </button>
                    <button
                      onClick={() => setInput("Explain async/await in JavaScript")}
                      className="text-xs bg-gray-800/50 px-3 py-1 rounded-full text-gray-300 hover:bg-gray-700/50 transition-colors"
                    >
                      "Explain async/await in JavaScript"
                    </button>
                    <button
                      onClick={() => setInput("Best practices for API design")}
                      className="text-xs bg-gray-800/50 px-3 py-1 rounded-full text-gray-300 hover:bg-gray-700/50 transition-colors"
                    >
                      "Best practices for API design"
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <FiImage className="w-8 h-8 mx-auto mb-4 text-emerald-400" />
                  <p>Describe the image you'd like to generate!</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <button
                      onClick={() => setInput("A futuristic tech workspace")}
                      className="text-xs bg-gray-800/50 px-3 py-1 rounded-full text-gray-300 hover:bg-gray-700/50 transition-colors"
                    >
                      "A futuristic tech workspace"
                    </button>
                    <button
                      onClick={() => setInput("Abstract code visualization")}
                      className="text-xs bg-gray-800/50 px-3 py-1 rounded-full text-gray-300 hover:bg-gray-700/50 transition-colors"
                    >
                      "Abstract code visualization"
                    </button>
                    <button
                      onClick={() => setInput("Modern UI design concept")}
                      className="text-xs bg-gray-800/50 px-3 py-1 rounded-full text-gray-300 hover:bg-gray-700/50 transition-colors"
                    >
                      "Modern UI design concept"
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          )}
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${
                message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className={`p-2 rounded-full ${
                message.role === 'assistant' 
                  ? mode === 'chat' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-purple-500/20 text-purple-400'
              }`}>
                {message.role === 'assistant' 
                  ? mode === 'chat' ? <FiCpu /> : <FiImage />
                  : <FiUser />
                }
              </div>
              <div className={`flex-1 p-4 rounded-xl prose prose-invert max-w-none ${
                message.role === 'assistant'
                  ? 'bg-gray-800/50 text-gray-200'
                  : mode === 'chat' ? 'bg-blue-500/10 text-gray-200' : 'bg-emerald-500/10 text-gray-200'
              }`}>
                {message.role === 'assistant' ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  message.content
                )}
                {mode === 'image' && message.role === 'assistant' && generatedImage && (
                  <img 
                    src={generatedImage} 
                    alt="Generated" 
                    className="mt-4 rounded-lg w-full max-w-md mx-auto"
                  />
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className={`p-2 rounded-full ${
                mode === 'chat' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {mode === 'chat' ? <FiCpu /> : <FiImage />}
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 rounded-xl p-4">
                <div className="animate-pulse">
                  {mode === 'chat' ? 'AI is thinking' : 'Generating image'}
                </div>
                <div className="flex gap-1">
                  <div className={`w-1 h-1 rounded-full ${
                    mode === 'chat' ? 'bg-blue-400' : 'bg-emerald-400'
                  } animate-bounce`} style={{ animationDelay: '0ms' }} />
                  <div className={`w-1 h-1 rounded-full ${
                    mode === 'chat' ? 'bg-blue-400' : 'bg-emerald-400'
                  } animate-bounce`} style={{ animationDelay: '150ms' }} />
                  <div className={`w-1 h-1 rounded-full ${
                    mode === 'chat' ? 'bg-blue-400' : 'bg-emerald-400'
                  } animate-bounce`} style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700/50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'chat' 
                ? "Ask about programming, technology, or software development..."
                : "Describe the image you want to generate..."
              }
              className="flex-1 bg-gray-800/50 text-white placeholder-gray-400 px-4 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-blue-500/50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 bg-gradient-to-r ${
                mode === 'chat'
                  ? 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                  : 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
              } text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium`}
            >
              <span>{mode === 'chat' ? 'Send' : 'Generate'}</span>
              <FiSend className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 