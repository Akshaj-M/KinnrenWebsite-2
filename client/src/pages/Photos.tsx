import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/Navigation";
import PhotoUpload from "@/components/PhotoUpload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Images, Plus, FolderOpen } from "lucide-react";
import type { Family, Photo, Album, User } from "@shared/schema";

export default function Photos() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFamilyId, setSelectedFamilyId] = useState<number | null>(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

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

  // Fetch family photos
  const { data: photos, isLoading: photosLoading } = useQuery<(Photo & { uploadedBy: User })[]>({
    queryKey: ["/api/families", selectedFamilyId, "photos"],
    enabled: !!selectedFamilyId,
    retry: false,
  });

  // Fetch family albums
  const { data: albums, isLoading: albumsLoading } = useQuery<Album[]>({
    queryKey: ["/api/families", selectedFamilyId, "albums"],
    enabled: !!selectedFamilyId,
    retry: false,
  });

  // Create album mutation
  const createAlbumMutation = useMutation({
    mutationFn: async (name: string) => {
      if (!selectedFamilyId) throw new Error("No family selected");
      await apiRequest("POST", `/api/families/${selectedFamilyId}/albums`, { name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/families", selectedFamilyId, "albums"] });
      toast({
        title: "Success",
        description: "Album created successfully!",
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
        description: "Failed to create album. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCreateAlbum = () => {
    const name = prompt("Enter album name:");
    if (name?.trim()) {
      createAlbumMutation.mutate(name.trim());
    }
  };

  const handlePhotoUploaded = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/families", selectedFamilyId, "photos"] });
    setShowUploadDialog(false);
  };

  if (isLoading || familiesLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading photos...</p>
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
              <Images className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Family Groups</h2>
              <p className="text-gray-600">
                You need to join a family group to share photos.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const selectedFamily = families.find(f => f.id === selectedFamilyId);
  const filteredPhotos = selectedAlbumId 
    ? photos?.filter(photo => photo.albumId === selectedAlbumId)
    : photos;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <Images className="h-8 w-8 text-primary" />
              <span>Family Photos</span>
            </h1>
            {selectedFamily && (
              <p className="text-gray-600 mt-1">
                Viewing photos from <Badge variant="secondary">{selectedFamily.name}</Badge>
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button onClick={handleCreateAlbum} variant="outline">
              <FolderOpen className="h-4 w-4 mr-2" />
              New Album
            </Button>
            <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Photos
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Photos</DialogTitle>
                </DialogHeader>
                <PhotoUpload 
                  familyId={selectedFamilyId!}
                  albumId={selectedAlbumId}
                  onUploadComplete={handlePhotoUploaded}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Albums Section */}
        {albums && albums.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Albums</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <button
                onClick={() => setSelectedAlbumId(null)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedAlbumId === null
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Images className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">All Photos</p>
                <p className="text-xs text-gray-500">{photos?.length || 0} photos</p>
              </button>
              
              {albums.map((album) => (
                <button
                  key={album.id}
                  onClick={() => setSelectedAlbumId(album.id)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    selectedAlbumId === album.id
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <FolderOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium truncate">{album.name}</p>
                  <p className="text-xs text-gray-500">
                    {photos?.filter(p => p.albumId === album.id).length || 0} photos
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Photos Grid */}
        {photosLoading || albumsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : filteredPhotos && filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title || "Family photo"}
                    className="w-full aspect-square object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  />
                  {photo.title && (
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-900 truncate">{photo.title}</p>
                      <p className="text-xs text-gray-500">
                        By {photo.uploadedBy.firstName} {photo.uploadedBy.lastName}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Images className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {selectedAlbumId ? "No photos in this album" : "No photos yet"}
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedAlbumId 
                  ? "This album is empty. Upload some photos to get started!"
                  : "Start sharing memories by uploading your first photos!"
                }
              </p>
              <Button 
                onClick={() => setShowUploadDialog(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
