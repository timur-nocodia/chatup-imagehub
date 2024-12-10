import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from '@/store/useChatStore';
import { PlusCircle, MessageSquare, Trash2, Edit2, Check, X } from 'lucide-react';

export const ChatSidebar = () => {
  const { chats, createChat, deleteChat, renameChat, setCurrentChat, currentChatId } = useChatStore();
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const handleRename = (chatId: string) => {
    if (newTitle.trim()) {
      renameChat(chatId, newTitle);
      setEditingChatId(null);
      setNewTitle('');
    }
  };

  const startEditing = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId);
    setNewTitle(currentTitle);
  };

  return (
    <div className="w-64 h-screen bg-background border-r border-border p-4 flex flex-col">
      <Button
        onClick={createChat}
        className="w-full mb-4 flex items-center gap-2"
        variant="outline"
      >
        <PlusCircle className="w-4 h-4" />
        New Chat
      </Button>

      <div className="flex-1 overflow-y-auto space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`group flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors ${
              chat.id === currentChatId ? 'bg-accent' : ''
            }`}
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            
            {editingChatId === chat.id ? (
              <div className="flex-1 flex items-center gap-1">
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="h-7 text-sm"
                  autoFocus
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => handleRename(chat.id)}
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={() => setEditingChatId(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <button
                  className="flex-1 text-left truncate text-sm"
                  onClick={() => setCurrentChat(chat.id)}
                >
                  {chat.title}
                </button>
                <div className="hidden group-hover:flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => startEditing(chat.id, chat.title)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => deleteChat(chat.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};