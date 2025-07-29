
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ChatBotToggleProps {
  onClick: () => void;
  hasNewMessages?: boolean;
}

const ChatBotToggle: React.FC<ChatBotToggleProps> = ({ onClick, hasNewMessages = false }) => {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={onClick}
        className="group relative w-16 h-16 bg-primary hover:bg-primary/90 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-110 animate-bounce"
        style={{ animationDuration: '2s' }}
        aria-label="Open chat assistant"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></div>
        
        {/* Main content */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <MessageCircle className="w-8 h-8 text-primary-foreground" />
        </div>

        {/* New messages badge */}
        {hasNewMessages && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center animate-pulse">
            <span className="text-xs text-destructive-foreground font-bold">!</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatBotToggle;
