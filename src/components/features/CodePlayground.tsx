"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlay, FiCode, FiCopy } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: string;
  preview?: () => JSX.Element;
}

const codeExamples: CodeExample[] = [
  {
    title: "React State Management",
    description: "Example of custom hook for state management",
    language: "typescript",
    code: `const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};

// Usage Example
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`,
    preview: () => {
      const [count, setCount] = useState(0);
      return (
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCount(p => p - 1)}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            -
          </button>
          <span className="text-xl">{count}</span>
          <button 
            onClick={() => setCount(p => p + 1)}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            +
          </button>
        </div>
      );
    }
  },
  {
    title: "Swift UI Components",
    description: "Custom SwiftUI view implementation",
    language: "swift",
    code: `struct CustomButton: View {
    let title: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.headline)
                .foregroundColor(.white)
                .padding()
                .background(Color.blue)
                .cornerRadius(10)
        }
    }
}

// Usage Example
struct ContentView: View {
    var body: some View {
        CustomButton(title: "Press Me") {
            print("Button pressed!")
        }
    }
}`
  },
  {
    title: "Node.js API Route",
    description: "Example of a RESTful API endpoint",
    language: "javascript",
    code: `const express = require('express');
const router = express.Router();

router.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(6);
      
    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;`
  }
];

export function CodePlayground() {
  const [activeExample, setActiveExample] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(codeExamples[activeExample].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto">
          {codeExamples.map((example, index) => (
            <button
              key={example.title}
              onClick={() => setActiveExample(index)}
              className={`px-6 py-4 focus:outline-none ${
                activeExample === index
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600 dark:text-gray-300">
            {codeExamples[activeExample].description}
          </p>
          <div className="flex gap-2">
            <button
              onClick={copyCode}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {copied ? "Copied!" : <FiCopy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="relative">
          <SyntaxHighlighter
            language={codeExamples[activeExample].language}
            style={atomDark}
            className="rounded-lg !bg-gray-900"
            customStyle={{
              padding: "1.5rem",
              fontSize: "0.9rem",
              lineHeight: "1.5"
            }}
          >
            {codeExamples[activeExample].code}
          </SyntaxHighlighter>
        </div>

        {codeExamples[activeExample].preview && (
          <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
              Live Preview
            </h4>
            {codeExamples[activeExample].preview()}
          </div>
        )}
      </div>
    </div>
  );
} 