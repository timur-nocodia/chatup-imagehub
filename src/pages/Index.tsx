import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ModelSelect } from "@/components/chat/ModelSelect";
import { useChatStore } from "@/store/useChatStore";

const Index = () => {
  const { currentChatId, addMessage } = useChatStore();

  const handleSendMessage = (content: string) => {
    if (currentChatId) {
      addMessage(currentChatId, { content, role: 'user' });
      // Here you would typically make an API call to your LLM service
      // and then add the response using addMessage
    }
  };

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file);
    // Implement file upload logic here
  };

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar />
      <div className="flex-1 flex flex-col">
        <div className="h-14 border-b border-border flex items-center px-4">
          <ModelSelect />
        </div>
        <ChatMessages />
        <ChatInput onSendMessage={handleSendMessage} onFileUpload={handleFileUpload} />
      </div>
    </div>
  );
};

export default Index;