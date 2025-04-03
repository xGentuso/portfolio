"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiPlus, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// Add the Counter component that uses our custom hook
const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};

function LiveCounter() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
      <p className="text-xl text-white">Count: {count}</p>
      <div className="flex gap-2">
        <button
          onClick={increment}
          className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
        >
          +
        </button>
        <button
          onClick={decrement}
          className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
        >
          -
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function LiveSwiftButton() {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
      <motion.button
        onClick={handleClick}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg"
        animate={{
          scale: isPressed ? 0.95 : 1
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      >
        Animated Button
      </motion.button>
      <p className="text-sm text-gray-400 mt-2">Click the button to see the animation</p>
    </div>
  );
}

// React Todo List with Animations
const LiveTodoList = () => {
  const [todos, setTodos] = useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [input, setInput] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: crypto.randomUUID(), text: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#1E2330] rounded-xl shadow-xl overflow-hidden">
      <div className="p-6">
        <h3 className="text-gray-400 text-sm font-medium mb-4">Live Preview</h3>
        
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 bg-[#141824] text-gray-100 placeholder-gray-500 px-4 py-2 rounded-lg border border-gray-700/50 focus:outline-none focus:border-blue-500/50 transition-colors"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            Add
          </button>
        </form>

        <div className="space-y-2">
          {todos.map(todo => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="group flex items-center gap-3 p-3 bg-[#141824] rounded-lg border border-gray-700/50"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`flex-shrink-0 w-5 h-5 rounded border-2 ${
                  todo.completed 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'border-gray-600 hover:border-blue-500'
                } transition-colors`}
              >
                {todo.completed && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full h-full text-white p-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                )}
              </button>
              
              <span className={`flex-1 text-sm ${
                todo.completed 
                  ? 'text-gray-500 line-through' 
                  : 'text-gray-200'
              } transition-colors`}>
                {todo.text}
              </span>

              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all"
              >
                <motion.svg
                  whileHover={{ scale: 1.1 }}
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </motion.svg>
              </button>
            </motion.div>
          ))}
          
          {todos.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
              No tasks yet. Add one to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Animated Card Component
function LiveAnimatedCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
      <motion.div
        className="w-64 h-96 relative cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="w-full h-full relative"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div 
            className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-6 text-white flex flex-col items-center justify-center"
            style={{ 
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden"
            }}
          >
            <h3 className="text-2xl font-bold mb-4">Ryan Mota</h3>
            <p className="text-lg mb-2">iOS Developer</p>
            <p className="text-sm opacity-80">Click to flip</p>
          </div>

          <div 
            className="absolute w-full h-full bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl p-6 text-white flex flex-col items-center justify-center"
            style={{ 
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden"
            }}
          >
            <h4 className="text-xl font-semibold mb-4">Experience</h4>
            <ul className="text-sm space-y-2 text-center">
              <li>1 Year iOS Development</li>
              <li>SwiftUI & UIKit</li>
              <li>Core Data & CloudKit</li>
              <li>App Store Publishing</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
      <p className="text-sm text-gray-400">Click the card to flip</p>
    </div>
  );
}

const codeExamples = [
  {
    id: "react",
    title: "React Todo List",
    description: "Interactive todo list with animations and state management",
    language: "typescript",
    code: `function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [nextId, setNextId] = useState(1);

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([
      ...todos,
      { id: nextId, text: newTodo, completed: false }
    ]);
    setNextId(nextId + 1);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
        />
        <button type="submit">Add</button>
      </form>
      
      <AnimatePresence>
        {todos.map(todo => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}`,
    LivePreview: LiveTodoList
  },
  {
    id: "animated",
    title: "Animated Card",
    description: "Interactive card with 3D flip animation",
    language: "swift",
    code: `struct FlipCard: View {
    @State private var isFlipped = false
    
    var body: some View {
        VStack {
            Card()
                .rotation3DEffect(
                    .degrees(isFlipped ? 180 : 0),
                    axis: (x: 0.0, y: 1.0, z: 0.0)
                )
                .animation(.spring())
                .onTapGesture {
                    withAnimation {
                        isFlipped.toggle()
                    }
                }
        }
    }
}

struct Card: View {
    var body: some View {
        ZStack {
            // Front of card
            VStack {
                Text("Ryan Mota")
                    .font(.title)
                    .bold()
                Text("iOS Developer")
                Text("Click to flip")
                    .font(.caption)
                    .opacity(0.8)
            }
            .frame(width: 250, height: 350)
            .background(
                LinearGradient(
                    colors: [.blue, .purple],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )
            .foregroundColor(.white)
            .cornerRadius(20)
            .opacity(isFlipped ? 0 : 1)

            // Back of card
            VStack(spacing: 10) {
                Text("Experience")
                    .font(.title2)
                    .bold()
                VStack(alignment: .leading, spacing: 8) {
                    Text("• 1 Year iOS Development")
                    Text("• SwiftUI & UIKit")
                    Text("• Core Data & CloudKit")
                    Text("• App Store Publishing")
                }
            }
            .frame(width: 250, height: 350)
            .background(
                LinearGradient(
                    colors: [.purple, .blue],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )
            .foregroundColor(.white)
            .cornerRadius(20)
            .rotation3DEffect(.degrees(180), axis: (x: 0, y: 1, z: 0))
            .opacity(isFlipped ? 1 : 0)
        }
    }
}`,
    LivePreview: LiveAnimatedCard
  },
  {
    id: "node",
    title: "Node.js API Route",
    description: "Example of RESTful API endpoint with error handling",
    code: `const express = require('express');
const router = express.Router();

router.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});`,
    language: "javascript"
  }
];

export default function CodeExamples() {
  const [activeTab, setActiveTab] = useState("react");
  const [mounted, setMounted] = useState(false);
  const activeExample = codeExamples.find(example => example.id === activeTab);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full bg-[#0B1120] bg-[radial-gradient(#1D2B44_1px,transparent_1px)] [background-size:24px_24px]">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#151B28] rounded-xl p-6">
          <div className="flex space-x-8">
            {codeExamples.map((example) => (
              <button
                key={example.id}
                onClick={() => setActiveTab(example.id)}
                className={`py-2 text-base transition-colors duration-200 relative ${
                  activeTab === example.id
                    ? "text-[#6B8AFF]"
                    : "text-[#8F9BAB] hover:text-gray-300"
                }`}
              >
                {example.title}
                {activeTab === example.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6B8AFF]" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <span className="text-[#8F9BAB] text-sm">{activeExample?.description}</span>
              <button
                onClick={() => navigator.clipboard.writeText(activeExample?.code || "")}
                className="text-[#8F9BAB] hover:text-white transition-colors"
              >
                <FiCopy className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-4 bg-black rounded-lg overflow-hidden">
              {mounted && (
                <SyntaxHighlighter
                  language={activeExample?.language || 'typescript'}
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    background: 'black'
                  }}
                >
                  {activeExample?.code || ''}
                </SyntaxHighlighter>
              )}
            </div>

            {activeExample?.LivePreview && mounted && (
              <div className="mt-6">
                <div className="flex justify-center mb-4">
                  <span className="text-[#8F9BAB] text-sm px-3 py-1 rounded-md bg-[#1B1F23]">Live Preview</span>
                </div>
                <div className="flex justify-center">
                  <activeExample.LivePreview />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 