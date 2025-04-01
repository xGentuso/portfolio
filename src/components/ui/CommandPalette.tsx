"use client";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { FiSearch, FiCommand } from "react-icons/fi";

interface Command {
  id: string;
  name: string;
  shortcut?: string;
  section: string;
  perform: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    
    // Small delay to allow dialog to close
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        
        // Dispatch a custom event that the page component can listen for
        document.dispatchEvent(
          new CustomEvent("command-palette-navigation", { 
            detail: { sectionId: id } 
          })
        );
      }
    }, 100);
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  const commands: Command[] = [
    {
      id: "home",
      name: "Go to Home",
      shortcut: "G H",
      section: "Navigation",
      perform: () => scrollToSection("hero"),
    },
    {
      id: "about",
      name: "Go to About",
      shortcut: "G A",
      section: "Navigation",
      perform: () => scrollToSection("about"),
    },
    {
      id: "skills",
      name: "Go to Skills",
      shortcut: "G S",
      section: "Navigation",
      perform: () => scrollToSection("skills"),
    },
    {
      id: "projects",
      name: "Go to Projects",
      shortcut: "G P",
      section: "Navigation",
      perform: () => scrollToSection("projects"),
    },
    {
      id: "contact",
      name: "Go to Contact",
      shortcut: "G C",
      section: "Navigation",
      perform: () => scrollToSection("contact"),
    },
    {
      id: "theme",
      name: "Toggle Theme",
      shortcut: "⌘ T",
      section: "Appearance",
      perform: () => document.dispatchEvent(new Event("toggle-theme")),
    },
    {
      id: "github",
      name: "View GitHub Profile",
      shortcut: "⌘ G",
      section: "External",
      perform: () => window.open("https://github.com/xGentuso", "_blank"),
    },
    {
      id: "linkedin",
      name: "View LinkedIn Profile",
      shortcut: "⌘ L",
      section: "External",
      perform: () => window.open("https://linkedin.com/in/ryancodes/", "_blank"),
    },
  ];

  const filteredCommands = query === ""
    ? commands
    : commands.filter((command) =>
        command.name.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        aria-label="Open command palette"
      >
        <FiCommand className="w-6 h-6" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto p-4 pt-[25vh]" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl ring-1 ring-black/5 divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden">
              <Combobox
                onChange={(command: Command) => {
                  command.perform();
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center px-4">
                  <FiSearch className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <Combobox.Input
                    onChange={(event) => setQuery(event.target.value)}
                    className="w-full h-12 bg-transparent border-0 focus:ring-0 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Search commands..."
                  />
                </div>

                {filteredCommands.length > 0 && (
                  <Combobox.Options static className="max-h-96 overflow-y-auto py-4 text-sm">
                    {filteredCommands.map((command) => (
                      <Combobox.Option key={command.id} value={command}>
                        {({ active }) => (
                          <div
                            className={`px-4 py-2 space-x-1 ${
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-800 dark:text-gray-200"
                            }`}
                          >
                            <span>{command.name}</span>
                            {command.shortcut && (
                              <span
                                className={`float-right text-xs ${
                                  active
                                    ? "text-indigo-200"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                {command.shortcut}
                              </span>
                            )}
                          </div>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {filteredCommands.length === 0 && (
                  <p className="p-4 text-sm text-gray-500 dark:text-gray-400">
                    No commands found.
                  </p>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
} 