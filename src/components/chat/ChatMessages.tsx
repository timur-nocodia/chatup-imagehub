import { useChatStore, ChatMessage } from '@/store/useChatStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Copy, ThumbsUp, ThumbsDown, Redo } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ChatMessages = () => {
  const { chats, currentChatId } = useChatStore();
  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    console.log('Message copied:', content);
  };

  const handleAction = (action: 'like' | 'dislike' | 'redo', messageId: string) => {
    console.log(`Message ${action}d:`, messageId);
  };

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Select or create a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {currentChat.messages.map((message: ChatMessage) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div className="flex gap-3 max-w-[80%]">
            {message.role === 'assistant' && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col gap-2">
              <div
                className={`p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-chat-light dark:bg-chat-dark text-foreground'
                    : 'text-foreground'
                }`}
              >
                {message.content}
              </div>
              {message.role === 'assistant' && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleCopy(message.content)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleAction('like', message.id)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleAction('dislike', message.id)}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleAction('redo', message.id)}
                  >
                    <Redo className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            {message.role === 'user' && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};