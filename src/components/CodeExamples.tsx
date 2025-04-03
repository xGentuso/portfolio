"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiPlus, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-javascript";

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
function LiveTodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: true },
    { id: 2, text: "Build Portfolio", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [nextId, setNextId] = useState(3); // Counter for generating IDs

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: nextId, text: newTodo, completed: false }]);
    setNextId(nextId + 1); // Increment the ID counter
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-800/50 rounded-lg w-full max-w-md mx-auto">
      <form onSubmit={addTodo} className="flex gap-2 w-full">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
          className="flex-1 px-4 py-2 bg-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
        >
          <FiPlus />
        </button>
      </form>
      <div className="w-full space-y-2">
        <AnimatePresence>
          {todos.map(todo => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex items-center gap-2 w-full bg-gray-700/30 p-3 rounded-lg group"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  todo.completed ? 'bg-green-500/20 border-green-500/50' : 'border-gray-500'
                }`}
              >
                {todo.completed && <FiCheck className="text-green-500 w-3 h-3" />}
              </button>
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity"
              >
                <FiTrash2 />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Animated Card Component
function LiveAnimatedCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
      <motion.div
        className="w-64 h-96 relative cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className={`absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex flex-col justify-between backface-hidden ${
            isFlipped ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="text-white">
            <h3 className="text-xl font-bold">Ryan Mota</h3>
            <p className="text-sm opacity-80">iOS Developer</p>
          </div>
          <div className="grid grid-cols-4 gap-2 text-white/80 text-xs">
            <span>Swift</span>
            <span>UIKit</span>
            <span>SwiftUI</span>
            <span>Firebase</span>
          </div>
        </div>
        <div
          className={`absolute inset-0 rounded-xl bg-gray-700 p-6 flex flex-col justify-center items-center text-white backface-hidden ${
            !isFlipped ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-center mb-4">Click to flip back</p>
          <div className="space-y-2 text-sm">
            <p>• 3+ years of iOS development</p>
            <p>• Published apps on App Store</p>
            <p>• Expertise in Swift & SwiftUI</p>
          </div>
        </div>
      </motion.div>
      <p className="text-sm text-gray-400 mt-2">Click the card to flip</p>
    </div>
  );
}

const codeExamples = [
  {
    id: "react",
    title: "React Todo List",
    description: "Interactive todo list with animations and state management",
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
    language: "typescript",
    LivePreview: LiveTodoList
  },
  {
    id: "swift",
    title: "Animated Card",
    description: "Interactive card with 3D flip animation",
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
            VStack(alignment: .leading) {
                Text("Ryan Mota")
                    .font(.title)
                    .bold()
                Text("iOS Developer")
                    .foregroundColor(.secondary)
                
                Spacer()
                
                HStack {
                    ForEach(["Swift", "UIKit", "SwiftUI"], id: \\.self) { skill in
                        Text(skill)
                            .font(.caption)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .background(Color.blue.opacity(0.2))
                            .cornerRadius(8)
                    }
                }
            }
            .padding()
            .background(
                LinearGradient(
                    gradient: Gradient(colors: [.blue, .purple]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )
            .cornerRadius(16)
            
            // Back of card
            VStack(spacing: 12) {
                Text("• 3+ years of iOS development")
                Text("• Published apps on App Store")
                Text("• Expertise in Swift & SwiftUI")
            }
            .padding()
            .background(Color(.systemGray5))
            .cornerRadius(16)
            .rotation3DEffect(.degrees(180), axis: (x: 0, y: 1, z: 0))
        }
    }
}`,
    language: "swift",
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
  const activeExample = codeExamples.find(example => example.id === activeTab);

  useEffect(() => {
    Prism.highlightAll();
  }, [activeTab]);

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
              <pre className="p-6 overflow-x-auto">
                <code className={`language-${activeExample?.language}`}>
                  {activeExample?.code}
                </code>
              </pre>
            </div>

            {activeExample?.LivePreview && (
              <div className="mt-6">
                <p className="text-[#6B8AFF] text-sm mb-4">Live Preview</p>
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