import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, User } from "lucide-react";
import type { FamilyMembership, User as UserType } from "@shared/schema";

interface FamilyMemberCardProps {
  member: FamilyMembership & { user: UserType };
  compact?: boolean;
}

export default function FamilyMemberCard({ member, compact = false }: FamilyMemberCardProps) {
  const { user, role, relationshipType } = member;
  
  const getRelationshipColor = (relationship?: string) => {
    switch (relationship?.toLowerCase()) {
      case "parent":
      case "mother":
      case "father":
        return "bg-blue-100 text-blue-800";
      case "child":
      case "son":
      case "daughter":
        return "bg-green-100 text-green-800";
      case "grandparent":
      case "grandmother":
      case "grandfather":
        return "bg-purple-100 text-purple-800";
      case "grandchild":
      case "grandson":
      case "granddaughter":
        return "bg-pink-100 text-pink-800";
      case "sibling":
      case "brother":
      case "sister":
        return "bg-orange-100 text-orange-800";
      case "spouse":
      case "partner":
        return "bg-red-100 text-red-800";
      case "creator":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.profileImageUrl || ""} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {user.firstName?.[0]}{user.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user.firstName} {user.lastName}
          </p>
          <div className="flex items-center space-x-2">
            {role === "admin" && (
              <Crown className="h-3 w-3 text-amber-500" />
            )}
            {relationshipType && (
              <Badge variant="secondary" className={`text-xs ${getRelationshipColor(relationshipType)}`}>
                {relationshipType}
              </Badge>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="family-card">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.profileImageUrl || ""} />
            <AvatarFallback className="bg-primary/10 text-primary text-lg">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {user.firstName} {user.lastName}
              </h3>
              {role === "admin" && (
                <Crown className="h-4 w-4 text-amber-500" title="Family Admin" />
              )}
            </div>
            
            {user.email && (
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            )}
            
            <div className="flex items-center space-x-2 mt-2">
              {relationshipType && (
                <Badge variant="secondary" className={getRelationshipColor(relationshipType)}>
                  {relationshipType}
                </Badge>
              )}
              
              {role === "admin" && (
                <Badge variant="outline" className="text-amber-600 border-amber-300">
                  Admin
                </Badge>
              )}
            </div>
            
            {member.joinedAt && (
              <p className="text-xs text-gray-400 mt-2">
                Joined {new Date(member.joinedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
