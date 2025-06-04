import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/Navigation";
import FamilyMemberCard from "@/components/FamilyMemberCard";
import EventCard from "@/components/EventCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Shield, MessageCircle, Calendar, Images, Users, Heart, Plus } from "lucide-react";
import type { Family, Post, User, FamilyMembership, Event, Photo } from "@shared/schema";

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFamilyId, setSelectedFamilyId] = useState<number | null>(null);
  const [newPostContent, setNewPostContent] = useState("");

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

  // Fetch family posts
  const { data: posts, isLoading: postsLoading } = useQuery<(Post & { author: User; reactions: any[]; comments: any[] })[]>({
    queryKey: ["/api/families", selectedFamilyId, "posts"],
    enabled: !!selectedFamilyId,
    retry: false,
  });

  // Fetch family members
  const { data: members } = useQuery<(FamilyMembership & { user: User })[]>({
    queryKey: ["/api/families", selectedFamilyId, "members"],
    enabled: !!selectedFamilyId,
    retry: false,
  });

  // Fetch family events
  const { data: events } = useQuery<(Event & { createdBy: User })[]>({
    queryKey: ["/api/families", selectedFamilyId, "events"],
    enabled: !!selectedFamilyId,
    retry: false,
  });

  // Fetch family photos
  const { data: photos } = useQuery<(Photo & { uploadedBy: User })[]>({
    queryKey: ["/api/families", selectedFamilyId, "photos"],
    enabled: !!selectedFamilyId,
    retry: false,
  });

  // Create post mutation
  const createPostMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!selectedFamilyId) throw new Error("No family selected");
      await apiRequest("POST", `/api/families/${selectedFamilyId}/posts`, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/families", selectedFamilyId, "posts"] });
      setNewPostContent("");
      toast({
        title: "Success",
        description: "Post created successfully!",
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
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Toggle post reaction mutation
  const toggleReactionMutation = useMutation({
    mutationFn: async (postId: number) => {
      await apiRequest("POST", `/api/posts/${postId}/react`, { reactionType: "like" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/families", selectedFamilyId, "posts"] });
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
    },
  });

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    createPostMutation.mutate(newPostContent);
  };

  const handleLikePost = (postId: number) => {
    toggleReactionMutation.mutate(postId);
  };

  if (isLoading || familiesLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your family network...</p>
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
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to FamilyConnect!</h2>
              <p className="text-gray-600 mb-6">
                You haven't joined any family networks yet. Create your first family group to start connecting with your loved ones.
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Create Family Group
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const selectedFamily = families.find(f => f.id === selectedFamilyId);
  const recentPhotos = photos?.slice(0, 6) || [];
  const upcomingEvents = events?.filter(e => new Date(e.startDate) > new Date()).slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <Users className="h-6 w-6 text-primary" />
                <span>Family Updates</span>
                {selectedFamily && (
                  <Badge variant="secondary">{selectedFamily.name}</Badge>
                )}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span>Private Family Only</span>
              </div>
            </div>

            {/* Create Post */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={user?.profileImageUrl || ""} />
                    <AvatarFallback>
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <Textarea
                      placeholder="Share something with your family..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="resize-none"
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleCreatePost}
                        disabled={!newPostContent.trim() || createPostMutation.isPending}
                        className="bg-primary hover:bg-primary/90"
                      >
                        {createPostMutation.isPending ? "Posting..." : "Share"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            {postsLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="animate-pulse space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                            <div className="h-3 bg-gray-200 rounded w-16"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                          <AvatarImage src={post.author.profileImageUrl || ""} />
                          <AvatarFallback>
                            {post.author.firstName?.[0]}{post.author.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {post.author.firstName} {post.author.lastName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(post.createdAt!).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-800 mb-4">{post.content}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-6">
                          <button 
                            onClick={() => handleLikePost(post.id)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
                          >
                            <Heart className="h-4 w-4" />
                            <span>{post.reactions.length}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments.length}</span>
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-600">Be the first to share something with your family!</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Family Tree Quick View */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Family Members</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {members && members.length > 0 ? (
                  <div className="space-y-3">
                    {members.slice(0, 5).map((member) => (
                      <FamilyMemberCard key={member.id} member={member} />
                    ))}
                    {members.length > 5 && (
                      <Button variant="ghost" className="w-full text-primary hover:text-primary/80">
                        View All Members ({members.length})
                      </Button>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No family members found</p>
                )}
              </CardContent>
            </Card>

            {/* Recent Photos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Images className="h-5 w-5 text-primary" />
                  <span>Recent Photos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentPhotos.length > 0 ? (
                  <>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {recentPhotos.map((photo) => (
                        <img
                          key={photo.id}
                          src={photo.imageUrl}
                          alt={photo.title || "Family photo"}
                          className="rounded-lg aspect-square object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full text-primary hover:text-primary/80">
                      View All Photos
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Images className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No photos yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} compact />
                    ))}
                    <Button variant="ghost" className="w-full text-primary hover:text-primary/80">
                      View All Events
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No upcoming events</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Privacy Status */}
            <Card className="bg-gradient-to-br from-emerald-50/10 to-primary/10 border-emerald-200/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="h-6 w-6 text-emerald-600" />
                  <h3 className="font-semibold text-gray-900">Privacy Protected</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Your family content is completely private and secure. Only invited family members can see your posts and photos.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-emerald-600">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    <span>End-to-end encryption</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-600">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    <span>Invitation-only access</span>
                  </div>
                  <div className="flex items-center space-x-2 text-emerald-600">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    <span>No third-party sharing</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
