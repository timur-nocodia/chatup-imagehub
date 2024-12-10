import { useChatStore, ChatMessage } from '@/store/useChatStore';

export const ChatMessages = () => {
  const { chats, currentChatId } = useChatStore();
  const currentChat = chats.find((chat) => chat.id === currentChatId);

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
          <div
            className={`max-w-[80%] p-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted'
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};