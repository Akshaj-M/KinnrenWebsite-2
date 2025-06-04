import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Check, X, Clock4 } from "lucide-react";
import type { Event, User } from "@shared/schema";

interface EventCardProps {
  event: Event & { createdBy: User };
  compact?: boolean;
  isPast?: boolean;
}

export default function EventCard({ event, compact = false, isPast = false }: EventCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rsvpStatus, setRsvpStatus] = useState<string>("pending");

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getRsvpMutation = useMutation({
    mutationFn: async (status: string) => {
      await apiRequest("POST", `/api/events/${event.id}/rsvp`, { status });
    },
    onSuccess: (_, status) => {
      setRsvpStatus(status);
      queryClient.invalidateQueries({ queryKey: ["/api/events", event.id, "rsvps"] });
      toast({
        title: "RSVP Updated",
        description: `You are ${status} for this event.`,
      });
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
        description: "Failed to update RSVP. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRsvp = (status: string) => {
    getRsvpMutation.mutate(status);
  };

  const isUpcoming = new Date(event.startDate) > new Date();
  const eventDate = new Date(event.startDate);
  const isToday = eventDate.toDateString() === new Date().toDateString();
  const isTomorrow = eventDate.toDateString() === new Date(Date.now() + 86400000).toDateString();

  if (compact) {
    return (
      <div className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate">{event.title}</h4>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formatDate(event.startDate)}
              </span>
              {event.location && (
                <span className="flex items-center truncate">
                  <MapPin className="h-3 w-3 mr-1" />
                  {event.location}
                </span>
              )}
            </div>
            {isToday && (
              <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                Today
              </Badge>
            )}
            {isTomorrow && (
              <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-800">
                Tomorrow
              </Badge>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={`family-card ${isPast ? "opacity-75" : ""} ${isToday ? "ring-2 ring-primary" : ""}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl text-gray-900 mb-1">{event.title}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Avatar className="h-6 w-6">
                <AvatarImage src={event.createdBy.profileImageUrl || ""} />
                <AvatarFallback className="text-xs">
                  {event.createdBy.firstName?.[0]}{event.createdBy.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <span>Organized by {event.createdBy.firstName} {event.createdBy.lastName}</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            {isToday && (
              <Badge className="bg-green-100 text-green-800 mb-2">Today</Badge>
            )}
            {isTomorrow && (
              <Badge className="bg-blue-100 text-blue-800 mb-2">Tomorrow</Badge>
            )}
            {isPast && (
              <Badge variant="secondary" className="bg-gray-100 text-gray-600 mb-2">
                Past Event
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {event.description && (
          <p className="text-gray-600">{event.description}</p>
        )}

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">{formatDate(event.startDate)}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span>
              {formatTime(event.startDate)}
              {event.endDate && ` - ${formatTime(event.endDate)}`}
            </span>
          </div>
          
          {event.location && (
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {isUpcoming && !isPast && (
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Your RSVP:</span>
              <div className="flex items-center space-x-1">
                {rsvpStatus === "attending" && (
                  <Badge className="bg-green-100 text-green-800">
                    <Check className="h-3 w-3 mr-1" />
                    Attending
                  </Badge>
                )}
                {rsvpStatus === "not_attending" && (
                  <Badge className="bg-red-100 text-red-800">
                    <X className="h-3 w-3 mr-1" />
                    Not Attending
                  </Badge>
                )}
                {rsvpStatus === "pending" && (
                  <Badge variant="outline" className="border-gray-300">
                    <Clock4 className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={rsvpStatus === "attending" ? "default" : "outline"}
                size="sm"
                onClick={() => handleRsvp("attending")}
                disabled={getRsvpMutation.isPending}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="h-3 w-3 mr-1" />
                Attending
              </Button>
              <Button
                variant={rsvpStatus === "not_attending" ? "default" : "outline"}
                size="sm"
                onClick={() => handleRsvp("not_attending")}
                disabled={getRsvpMutation.isPending}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                <X className="h-3 w-3 mr-1" />
                Can't Make It
              </Button>
            </div>
          </div>
        )}

        {isPast && (
          <div className="pt-4 border-t">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Users className="h-4 w-4" />
              <span>This event has ended</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
