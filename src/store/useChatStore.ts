import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
}

interface ChatStore {
  chats: Chat[];
  currentChatId: string | null;
  selectedModel: string;
  createChat: () => void;
  deleteChat: (id: string) => void;
  renameChat: (id: string, newTitle: string) => void;
  setCurrentChat: (id: string) => void;
  addMessage: (chatId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setSelectedModel: (model: string) => void;
}

// Create a dummy chat with messages
const dummyChat: Chat = {
  id: '1',
  title: 'Welcome Chat',
  messages: [
    {
      id: '1',
      content: "Hello! How can I help you today?",
      role: 'assistant',
      timestamp: Date.now() - 1000,
    },
    {
      id: '2',
      content: "I'd like to learn about artificial intelligence.",
      role: 'user',
      timestamp: Date.now() - 500,
    },
    {
      id: '3',
      content: "That's a great topic! AI is a fascinating field that encompasses machine learning, neural networks, and natural language processing. What specific aspect would you like to explore?",
      role: 'assistant',
      timestamp: Date.now(),
    },
  ],
  createdAt: Date.now() - 2000,
};

export const useChatStore = create<ChatStore>((set) => ({
  chats: [dummyChat],
  currentChatId: '1',
  selectedModel: 'gpt-4',
  
  createChat: () => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
    };
    
    set((state) => ({
      chats: [newChat, ...state.chats],
      currentChatId: newChat.id,
    }));
  },
  
  deleteChat: (id) => {
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== id),
      currentChatId: state.currentChatId === id ? null : state.currentChatId,
    }));
  },
  
  renameChat: (id, newTitle) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === id ? { ...chat, title: newTitle } : chat
      ),
    }));
  },
  
  setCurrentChat: (id) => {
    set({ currentChatId: id });
  },
  
  addMessage: (chatId, message) => {
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      ...message,
      timestamp: Date.now(),
    };
    
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      ),
    }));
  },
  
  setSelectedModel: (model) => {
    set({ selectedModel: model });
  },
}));