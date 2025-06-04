import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import FamilyMemberCard from "@/components/FamilyMemberCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Crown, Plus, TreePine } from "lucide-react";
import type { Family, FamilyMembership, User } from "@shared/schema";

export default function FamilyTree() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [selectedFamilyId, setSelectedFamilyId] = useState<number | null>(null);

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

  // Fetch family members
  const { data: members, isLoading: membersLoading } = useQuery<(FamilyMembership & { user: User })[]>({
    queryKey: ["/api/families", selectedFamilyId, "members"],
    enabled: !!selectedFamilyId,
    retry: false,
  });

  if (isLoading || familiesLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading family tree...</p>
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
              <TreePine className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Family Groups</h2>
              <p className="text-gray-600">
                You need to join a family group to view the family tree.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const selectedFamily = families.find(f => f.id === selectedFamilyId);

  // Group members by relationship type for better organization
  const groupedMembers = members?.reduce((groups, member) => {
    const relationship = member.relationshipType || "other";
    if (!groups[relationship]) {
      groups[relationship] = [];
    }
    groups[relationship].push(member);
    return groups;
  }, {} as Record<string, (FamilyMembership & { user: User })[]>);

  // Define relationship hierarchy for visual organization
  const relationshipOrder = [
    "grandparent", "grandmother", "grandfather",
    "parent", "mother", "father", "spouse", "partner",
    "sibling", "brother", "sister",
    "child", "son", "daughter",
    "grandchild", "grandson", "granddaughter",
    "creator", "other"
  ];

  const getRelationshipDisplayName = (relationship: string) => {
    const names: Record<string, string> = {
      "grandparent": "Grandparents",
      "grandmother": "Grandmothers", 
      "grandfather": "Grandfathers",
      "parent": "Parents",
      "mother": "Mothers",
      "father": "Fathers",
      "spouse": "Spouses",
      "partner": "Partners",
      "sibling": "Siblings",
      "brother": "Brothers",
      "sister": "Sisters",
      "child": "Children",
      "son": "Sons",
      "daughter": "Daughters",
      "grandchild": "Grandchildren",
      "grandson": "Grandsons",
      "granddaughter": "Granddaughters",
      "creator": "Family Creators",
      "other": "Other Family Members"
    };
    return names[relationship] || "Family Members";
  };

  const getRelationshipIcon = (relationship: string) => {
    // Use different colored backgrounds for different relationship types
    const colors: Record<string, string> = {
      "grandparent": "bg-purple-100 text-purple-600",
      "grandmother": "bg-purple-100 text-purple-600",
      "grandfather": "bg-purple-100 text-purple-600",
      "parent": "bg-blue-100 text-blue-600",
      "mother": "bg-blue-100 text-blue-600",
      "father": "bg-blue-100 text-blue-600",
      "spouse": "bg-red-100 text-red-600",
      "partner": "bg-red-100 text-red-600",
      "sibling": "bg-orange-100 text-orange-600",
      "brother": "bg-orange-100 text-orange-600",
      "sister": "bg-orange-100 text-orange-600",
      "child": "bg-green-100 text-green-600",
      "son": "bg-green-100 text-green-600",
      "daughter": "bg-green-100 text-green-600",
      "grandchild": "bg-pink-100 text-pink-600",
      "grandson": "bg-pink-100 text-pink-600",
      "granddaughter": "bg-pink-100 text-pink-600",
      "creator": "bg-amber-100 text-amber-600",
      "other": "bg-gray-100 text-gray-600"
    };
    return colors[relationship] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <TreePine className="h-8 w-8 text-primary" />
              <span>Family Tree</span>
            </h1>
            {selectedFamily && (
              <p className="text-gray-600 mt-1">
                Exploring <Badge variant="secondary">{selectedFamily.name}</Badge> family connections
              </p>
            )}
          </div>
          
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Invite Family Member
          </Button>
        </div>

        {/* Family Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Family Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{members?.length || 0}</div>
                <div className="text-sm text-gray-600">Total Members</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-600">
                  {Object.keys(groupedMembers || {}).length}
                </div>
                <div className="text-sm text-gray-600">Relationship Types</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">
                  {members?.filter(m => m.role === "admin").length || 0}
                </div>
                <div className="text-sm text-gray-600">Family Admins</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-600">
                  {selectedFamily?.createdAt ? 
                    new Date().getFullYear() - new Date(selectedFamily.createdAt).getFullYear() + 1 : 0
                  }
                </div>
                <div className="text-sm text-gray-600">Years Connected</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Family Tree */}
        {membersLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : groupedMembers ? (
          <div className="space-y-8">
            {relationshipOrder
              .filter(relationship => groupedMembers[relationship])
              .map(relationship => (
                <div key={relationship}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getRelationshipIcon(relationship)}`}>
                      <Users className="h-4 w-4" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {getRelationshipDisplayName(relationship)}
                    </h2>
                    <Badge variant="outline">
                      {groupedMembers[relationship].length} member{groupedMembers[relationship].length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedMembers[relationship].map(member => (
                      <FamilyMemberCard key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <TreePine className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Family Members</h3>
              <p className="text-gray-600 mb-6">
                Start building your family tree by inviting your first family members!
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Invite Family Members
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Family Connection Tips */}
        <Card className="mt-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <TreePine className="h-5 w-5 text-primary" />
              <span>Building Your Family Tree</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Tips for Growing Your Tree:</h4>
                <ul className="space-y-1">
                  <li>• Start with immediate family members</li>
                  <li>• Add relationship types to organize connections</li>
                  <li>• Invite extended family to share memories</li>
                  <li>• Use photos to help identify family members</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Privacy & Security:</h4>
                <ul className="space-y-1">
                  <li>• Only invited members can see your family tree</li>
                  <li>• Family information is kept completely private</li>
                  <li>• You control who gets invited to your family</li>
                  <li>• All data is encrypted and secure</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
