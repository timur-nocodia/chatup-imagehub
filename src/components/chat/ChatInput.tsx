import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Paperclip, ArrowUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  onFileUpload: (file: File) => void;
}

export const ChatInput = ({ onSendMessage, onFileUpload }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement actual recording logic here
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Auto-adjust height
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`; // 200px is approximately 10 lines
  };

  return (
    <div className="w-full px-4">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
        accept=".txt,.pdf,.doc,.docx,.csv,image/*"
      />
      
      <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg">
        <Textarea
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="min-h-[20px] max-h-[200px] resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 overflow-hidden"
          rows={1}
        />
        
        <div className="absolute bottom-2 right-2 flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                Upload File
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={message.trim() ? handleSubmit : toggleRecording}
          >
            {message.trim() ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <Mic className={`w-4 h-4 ${isRecording ? 'text-red-500' : ''}`} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};