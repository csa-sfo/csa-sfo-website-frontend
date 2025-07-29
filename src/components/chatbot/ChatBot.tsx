
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, MessageCircle, X, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm CSA Bot, your Cloud Security Alliance assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showZoomOut, setShowZoomOut] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setShowZoomOut(true);
      const timer = setTimeout(() => setShowZoomOut(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response with typing effect
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '',
        sender: 'bot',
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Simulate typing effect
      let currentText = '';
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < botResponse.length) {
          currentText += botResponse[index];
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessage.id 
                ? { ...msg, text: currentText }
                : msg
            )
          );
          index++;
        } else {
          clearInterval(typingInterval);
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessage.id 
                ? { ...msg, isTyping: false }
                : msg
            )
          );
        }
      }, 30);
    }, 1000);
  };

  const getBotResponse = (input: string): string => {
    const responses = [
      "I'm here to help with Cloud Security Alliance questions! What would you like to know about our events, membership, or cloud security resources?",
      "Great question! Our next event is coming up soon. Would you like more information about registration?",
      "Cloud security is our specialty! I can help you with information about best practices, upcoming training, or connecting with our community.",
      "Thanks for your interest in CSA! Feel free to ask about our certification programs, local chapter events, or how to get involved.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96">
      {/* Zoom out mascot effect - starts from toggle button position */}
      {showZoomOut && (
        <div className="absolute bottom-0 right-0 z-60 pointer-events-none">
          <div className="h-24 w-24 rounded-full bg-white/95 border-4 border-csa-blue flex items-center justify-center animate-zoom-out-to-header">
            <img 
              src="/lovable-uploads/6c9d0416-c5cd-4552-baee-a4aaf7ed03e5.png" 
              alt="CSA Bot" 
              className="h-16 w-16 object-contain"
            />
          </div>
        </div>
      )}
      
      <Card className={cn(
        "shadow-2xl border-4 border-csa-blue bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden",
        isOpen ? "animate-slide-in-right" : ""
      )}>
        <CardHeader className="bg-gradient-to-r from-csa-blue/90 to-csa-navy/90 backdrop-blur-md text-white p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-white/30 bg-white/10 backdrop-blur-sm">
                  <AvatarImage 
                    src="/lovable-uploads/6c9d0416-c5cd-4552-baee-a4aaf7ed03e5.png" 
                    alt="CSA Bot" 
                    className="h-12 w-12 object-contain"
                  />
                  <AvatarFallback className="bg-csa-accent/80 text-white backdrop-blur-sm">CSA</AvatarFallback>
                </Avatar>
                {/* Subtle pulse effect */}
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse opacity-30"></div>
              </div>
              <div>
                <CardTitle className="text-lg">CSA Bot</CardTitle>
                <Badge variant="secondary" className="bg-green-500/30 text-green-100 text-xs backdrop-blur-sm border border-green-400/20">
                  Online
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="text-white hover:bg-white/10 backdrop-blur-sm h-8 w-8 p-0"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="text-white hover:bg-white/10 backdrop-blur-sm h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 bg-white/5 backdrop-blur-xl">
          <ScrollArea className="h-80 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-2 text-sm backdrop-blur-sm",
                      message.sender === 'user'
                        ? "bg-csa-blue/90 text-white border border-csa-blue/30"
                        : "bg-white/20 text-gray-800 border border-white/30"
                    )}
                  >
                    {message.text}
                    {message.isTyping && (
                      <span className="inline-block w-2 h-4 bg-current animate-pulse ml-1">|</span>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/20 text-gray-800 border border-white/30 backdrop-blur-sm rounded-2xl px-4 py-2 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-csa-blue rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-csa-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-csa-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 rounded-full bg-white/10 backdrop-blur-sm border-white/20 focus:border-csa-blue/50 text-gray-800 placeholder:text-gray-600"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-csa-accent/90 hover:bg-csa-accent backdrop-blur-sm text-white rounded-full h-10 w-10 p-0 border border-csa-accent/30"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;
