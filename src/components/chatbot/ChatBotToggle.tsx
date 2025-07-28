
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChatBotToggleProps {
  onClick: () => void;
  hasNewMessages?: boolean;
}

const ChatBotToggle: React.FC<ChatBotToggleProps> = ({ onClick, hasNewMessages = false }) => {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Button
        onClick={onClick}
        size="lg"
        className="bg-white/95 hover:bg-white text-gray-700 hover:text-csa-blue rounded-full h-20 w-20 p-0 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out relative overflow-hidden backdrop-blur-md border-4 border-csa-blue hover:border-csa-navy transform hover:scale-105 animate-bounce"
        style={{
          animationDuration: '2s',
          animationIterationCount: 'infinite',
          animationDelay: '1s'
        }}
      >
        <div className="relative flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-110">
          <img 
            src="/lovable-uploads/6c9d0416-c5cd-4552-baee-a4aaf7ed03e5.png" 
            alt="CSA Bot" 
            className="h-14 w-14 object-contain transition-transform duration-300 ease-in-out hover:scale-110 drop-shadow-lg"
          />
        </div>
        
        {/* Animated pulse ring */}
        <div className="absolute inset-0 rounded-full border-2 border-csa-blue/30 animate-ping"></div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-csa-blue/10 to-csa-accent/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        
        {hasNewMessages && (
          <Badge className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-csa-accent/90 text-white text-xs rounded-full flex items-center justify-center backdrop-blur-sm border border-csa-accent/30 animate-pulse">
            !
          </Badge>
        )}
      </Button>
    </div>
  );
};

export default ChatBotToggle;
