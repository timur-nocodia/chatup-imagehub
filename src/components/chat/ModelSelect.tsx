import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChatStore } from '@/store/useChatStore';
import { ChevronDown } from 'lucide-react';

const models = [
  { 
    id: 'gpt-4', 
    name: 'GPT-4o',
    description: 'Great for most tasks'
  },
  { 
    id: 'gpt-4-vision', 
    name: 'GPT-4o with canvas',
    description: 'Collaborate on writing and code',
    badge: 'BETA'
  },
  { 
    id: 'claude-3', 
    name: '01',
    description: 'Uses advanced reasoning'
  },
  { 
    id: 'claude-3-mini', 
    name: '01-mini',
    description: 'Faster at reasoning'
  },
];

export const ModelSelect = () => {
  const { selectedModel, setSelectedModel } = useChatStore();

  return (
    <Select defaultValue="gpt-4" value={selectedModel} onValueChange={setSelectedModel}>
      <SelectTrigger className="w-[180px] border-none focus:ring-0 focus:ring-offset-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="w-[320px]">
        {models.map((model) => (
          <SelectItem 
            key={model.id} 
            value={model.id}
            className={`flex flex-col items-start py-3 ${
              selectedModel === model.id ? 'bg-accent' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{model.name}</span>
              {model.badge && selectedModel !== model.id && (
                <span className="px-2 py-0.5 text-xs bg-muted rounded-full">
                  {model.badge}
                </span>
              )}
            </div>
            {selectedModel !== model.id && (
              <span className="text-sm text-muted-foreground">
                {model.description}
              </span>
            )}
          </SelectItem>
        ))}
        <SelectItem value="more" className="border-t">
          <span className="font-medium">More models</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};