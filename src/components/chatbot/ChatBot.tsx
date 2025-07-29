
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
    <div className="fixed bottom-24 right-4 z-50 w-80 sm:w-96">
      <Card className={cn(
        "shadow-2xl border border-border bg-background/95 backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-300",
        isOpen ? "animate-scale-in opacity-100" : "animate-scale-out opacity-0"
      )}>
        <CardHeader className="bg-primary/5 border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarImage 
                    src="/lovable-uploads/6c9d0416-c5cd-4552-baee-a4aaf7ed03e5.png" 
                    alt="CSA Bot" 
                    className="h-10 w-10 object-contain"
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">CSA</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
              </div>
              <div>
                <CardTitle className="text-base">CSA Assistant</CardTitle>
                <p className="text-xs text-muted-foreground">Online • Typically replies instantly</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="h-8 w-8 p-0 hover:bg-destructive/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
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
                      "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                      message.sender === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
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
                  <div className="bg-muted text-muted-foreground rounded-2xl px-4 py-2 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="rounded-full h-10 w-10 p-0"
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
