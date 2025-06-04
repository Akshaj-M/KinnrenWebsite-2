import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import type { ChatMessage as ChatMessageType, User } from "@shared/schema";

interface ChatMessageProps {
  message: ChatMessageType & { sender: User };
  isOwn: boolean;
  showAvatar?: boolean;
}

export default function ChatMessage({ message, isOwn, showAvatar = true }: ChatMessageProps) {
  const formatTime = (date: string | Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <div className={`flex items-end space-x-2 mb-4 ${isOwn ? "flex-row-reverse space-x-reverse" : ""}`}>
      {showAvatar && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={message.sender.profileImageUrl || ""} />
          <AvatarFallback className="text-xs bg-primary/10 text-primary">
            {message.sender.firstName?.[0]}{message.sender.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-xs lg:max-w-md ${showAvatar ? "" : "ml-10"}`}>
        {!isOwn && showAvatar && (
          <div className="text-xs text-gray-500 mb-1 px-1">
            {message.sender.firstName} {message.sender.lastName}
          </div>
        )}
        
        <div
          className={`chat-message ${
            isOwn 
              ? "own bg-primary text-primary-foreground" 
              : "other bg-muted text-muted-foreground"
          } px-4 py-2 rounded-2xl break-words`}
        >
          {message.messageType === "photo" ? (
            <div className="space-y-2">
              <img 
                src={message.content} 
                alt="Shared photo" 
                className="rounded-lg max-w-full h-auto"
              />
            </div>
          ) : (
            <p className="text-sm">{message.content}</p>
          )}
        </div>
        
        <div className={`text-xs text-gray-400 mt-1 px-1 ${isOwn ? "text-right" : ""}`}>
          {formatTime(message.createdAt!)}
        </div>
      </div>
    </div>
  );
}
