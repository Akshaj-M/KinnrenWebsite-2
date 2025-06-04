import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface PhotoUploadProps {
  familyId: number;
  albumId?: number | null;
  onUploadComplete: () => void;
}

export default function PhotoUpload({ familyId, albumId, onUploadComplete }: PhotoUploadProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadMutation = useMutation({
    mutationFn: async (files: File[]) => {
      const uploads = files.map(async (file, index) => {
        // Simulate file upload - in a real app, you'd upload to a service like Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        
        // For now, we'll use a placeholder image URL
        // In production, replace this with actual file upload logic
        const imageUrl = `https://images.unsplash.com/photo-${Date.now() + index}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600`;
        
        const photoData = {
          title: title || file.name,
          description,
          imageUrl,
          albumId: albumId || undefined,
        };
        
        await apiRequest("POST", `/api/families/${familyId}/photos`, photoData);
        
        // Update progress
        setUploadProgress(((index + 1) / files.length) * 100);
      });
      
      await Promise.all(uploads);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `${selectedFiles.length} photo(s) uploaded successfully!`,
      });
      resetForm();
      onUploadComplete();
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
        title: "Upload Failed",
        description: "Failed to upload photos. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith("image/"));
    
    if (imageFiles.length !== files.length) {
      toast({
        title: "Invalid Files",
        description: "Please select only image files.",
        variant: "destructive",
      });
    }
    
    if (imageFiles.length > 10) {
      toast({
        title: "Too Many Files",
        description: "Please select up to 10 images at a time.",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedFiles(imageFiles);
    
    // Create previews
    const newPreviews = imageFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Clean up preview URL
    URL.revokeObjectURL(previews[index]);
    
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  };

  const resetForm = () => {
    setSelectedFiles([]);
    setPreviews(prev => {
      prev.forEach(url => URL.revokeObjectURL(url));
      return [];
    });
    setTitle("");
    setDescription("");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select some photos to upload.",
        variant: "destructive",
      });
      return;
    }
    
    uploadMutation.mutate(selectedFiles);
  };

  return (
    <div className="space-y-6">
      {/* File Selection */}
      <div>
        <Label htmlFor="photo-upload" className="text-base font-medium">
          Select Photos
        </Label>
        <div 
          className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">Click to select photos or drag and drop</p>
          <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB each</p>
        </div>
        <Input
          ref={fileInputRef}
          id="photo-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Selected Files Preview */}
      {selectedFiles.length > 0 && (
        <div>
          <Label className="text-base font-medium">Selected Photos ({selectedFiles.length})</Label>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-0">
                  <img 
                    src={preview} 
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Photo Details */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="photo-title">Title (Optional)</Label>
          <Input
            id="photo-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Family vacation 2024"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="photo-description">Description (Optional)</Label>
          <Textarea
            id="photo-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell your family about these photos..."
            className="mt-1"
            rows={3}
          />
        </div>
      </div>

      {/* Upload Progress */}
      {uploadMutation.isPending && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Uploading photos...</span>
            <span>{Math.round(uploadProgress)}%</span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button 
          variant="outline" 
          onClick={resetForm}
          disabled={uploadMutation.isPending}
        >
          Clear All
        </Button>
        <Button 
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || uploadMutation.isPending}
          className="bg-primary hover:bg-primary/90"
        >
          {uploadMutation.isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Uploading...
            </>
          ) : (
            <>
              <ImageIcon className="h-4 w-4 mr-2" />
              Upload {selectedFiles.length} Photo{selectedFiles.length !== 1 ? 's' : ''}
            </>
          )}
        </Button>
      </div>

      {/* Info Note */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <p className="flex items-start space-x-2">
          <span>ℹ️</span>
          <span>
            Photos will be shared with all family members. 
            Make sure you have permission to share any photos that include other people.
          </span>
        </p>
      </div>
    </div>
  );
}
