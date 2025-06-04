import { useEffect, useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/Navigation";
import ChatMessage from "@/components/ChatMessage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, Users, Image as ImageIcon } from "lucide-react";
import type { Family, ChatMessage as ChatMessageType, User } from "@shared/schema";

export default function Chat() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFamilyId, setSelectedFamilyId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Fetch user's families
  const { data: families, isLoading: familiesLoading } = useQuery<Family[]>({
    queryKey: ["/api/families"],
    retry: false,
  });

  // Set default family
  useEffect(() => {
    if (families && families.length > 0 && !selectedFamilyId) {
      setSelectedFamilyId(families[0].id);
    }
  }, [families, selectedFamilyId]);

  // Fetch family messages
  const { data: messages, isLoading: messagesLoading } = useQuery<(ChatMessageType & { sender: User })[]>({
    queryKey: ["/api/families", selectedFamilyId, "messages"],
    enabled: !!selectedFamilyId,
    retry: false,
    refetchInterval: 3000, // Refetch every 3 seconds for real-time feel
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!selectedFamilyId) throw new Error("No family selected");
      await apiRequest("POST", `/api/families/${selectedFamilyId}/messages`, { 
        content,
        messageType: "text"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/families", selectedFamilyId, "messages"] });
      setNewMessage("");
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessageMutation.mutate(newMessage.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  if (isLoading || familiesLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading chat...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!families || families.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="p-12 text-center">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Family Groups</h2>
              <p className="text-gray-600">
                You need to join a family group to start chatting.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const selectedFamily = families.find(f => f.id === selectedFamilyId);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <MessageCircle className="h-8 w-8 text-primary" />
              <span>Family Chat</span>
            </h1>
            {selectedFamily && (
              <p className="text-gray-600 mt-1">
                Chatting with <Badge variant="secondary">{selectedFamily.name}</Badge>
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">
              {messages ? `${new Set(messages.map(m => m.senderId)).size} active` : ""}
            </span>
          </div>
        </div>

        <Card className="h-[calc(100vh-16rem)]">
          {/* Messages Area */}
          <CardContent className="flex flex-col h-full p-0">
            <div className="flex-1 overflow-y-auto p-6 space-y-1">
              {messagesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading messages...</p>
                  </div>
                </div>
              ) : messages && messages.length > 0 ? (
                <>
                  {/* Reverse messages to show newest at bottom */}
                  {[...messages].reverse().map((message, index, reversedMessages) => {
                    const isOwn = message.senderId === user?.id;
                    const previousMessage = reversedMessages[index - 1];
                    const showAvatar = !previousMessage || previousMessage.senderId !== message.senderId;
                    
                    return (
                      <ChatMessage
                        key={message.id}
                        message={message}
                        isOwn={isOwn}
                        showAvatar={showAvatar}
                      />
                    );
                  })}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Start the Conversation</h3>
                    <p className="text-gray-600">
                      Be the first to send a message to your family!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
                <div className="flex-1">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={sendMessageMutation.isPending}
                    className="resize-none rounded-xl border-gray-300 focus:border-primary"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    disabled={sendMessageMutation.isPending}
                  >
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={!newMessage.trim() || sendMessageMutation.isPending}
                    className="rounded-xl bg-primary hover:bg-primary/90"
                  >
                    {sendMessageMutation.isPending ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Chat Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
            <span>🔒</span>
            <span>Your family conversations are private and secure</span>
          </p>
        </div>
      </div>
    </div>
  );
}
