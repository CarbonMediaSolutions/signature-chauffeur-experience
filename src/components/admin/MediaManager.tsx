import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Image as ImageIcon, Video, Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaManagerProps {
  coverImage: string | null;
  galleryUrls: string[];
  videoUrls: string[];
  onCoverImageChange: (url: string | null) => void;
  onGalleryChange: (urls: string[]) => void;
  onVideoChange: (urls: string[]) => void;
  vehicleId?: string;
}

interface UploadProgress {
  [key: string]: number;
}

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 200 * 1024 * 1024; // 200MB

export const MediaManager = ({
  coverImage,
  galleryUrls,
  videoUrls,
  onCoverImageChange,
  onGalleryChange,
  onVideoChange,
  vehicleId = "new",
}: MediaManagerProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const [dragActive, setDragActive] = useState(false);

  const uploadFile = async (file: File, type: "image" | "video"): Promise<string | null> => {
    const maxSize = type === "image" ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;
    
    if (file.size > maxSize) {
      toast({
        title: `File too large`,
        description: `Maximum size for ${type}s is ${type === "image" ? "10MB" : "200MB"}`,
        variant: "destructive",
      });
      return null;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${vehicleId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

    const { error } = await supabase.storage
      .from("vehicle-media")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      setUploadProgress((prev) => {
        const newProgress = { ...prev };
        delete newProgress[file.name];
        return newProgress;
      });
      return null;
    }

    const { data: urlData } = supabase.storage
      .from("vehicle-media")
      .getPublicUrl(fileName);

    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[file.name];
      return newProgress;
    });

    return urlData.publicUrl;
  };

  const handleFiles = async (files: FileList | File[]) => {
    setUploading(true);
    const fileArray = Array.from(files);

    const imageFiles = fileArray.filter((f) => f.type.startsWith("image/"));
    const videoFiles = fileArray.filter((f) => f.type.startsWith("video/"));

    // Upload images
    for (const file of imageFiles) {
      const url = await uploadFile(file, "image");
      if (url) {
        onGalleryChange([...galleryUrls, url]);
      }
    }

    // Upload videos
    for (const file of videoFiles) {
      const url = await uploadFile(file, "video");
      if (url) {
        onVideoChange([...videoUrls, url]);
      }
    }

    setUploading(false);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [galleryUrls, videoUrls]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (url: string) => {
    if (coverImage === url) {
      onCoverImageChange(null);
    }
    onGalleryChange(galleryUrls.filter((u) => u !== url));
  };

  const removeVideo = (url: string) => {
    onVideoChange(videoUrls.filter((u) => u !== url));
  };

  const setCoverImage = (url: string) => {
    onCoverImageChange(url);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-sm p-8 text-center transition-colors",
          dragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-muted-foreground"
        )}
      >
        <input
          type="file"
          id="media-upload"
          multiple
          accept="image/jpeg,image/png,image/webp,video/mp4"
          onChange={handleInputChange}
          className="hidden"
          disabled={uploading}
        />
        <label
          htmlFor="media-upload"
          className="cursor-pointer flex flex-col items-center gap-3"
        >
          {uploading ? (
            <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
          ) : (
            <Upload className="h-10 w-10 text-muted-foreground" />
          )}
          <div>
            <p className="text-sm text-foreground font-medium">
              {uploading ? "Uploading..." : "Drop files here or click to upload"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Images (JPG, PNG, WebP) up to 10MB • Videos (MP4) up to 200MB
            </p>
          </div>
        </label>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([name, progress]) => (
            <div key={name} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground truncate flex-1">
                {name}
              </span>
              <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Images Gallery */}
      {galleryUrls.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              Images ({galleryUrls.length})
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryUrls.map((url) => (
              <div key={url} className="relative group aspect-[4/3]">
                <img
                  src={url}
                  alt="Vehicle"
                  className="w-full h-full object-cover rounded-sm"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8"
                    onClick={() => setCoverImage(url)}
                    title="Set as cover"
                  >
                    <Star
                      className={cn(
                        "h-4 w-4",
                        coverImage === url && "fill-yellow-500 text-yellow-500"
                      )}
                    />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8"
                    onClick={() => removeImage(url)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {coverImage === url && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-yellow-950 text-xs px-2 py-0.5 rounded-sm font-medium">
                    Cover
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos */}
      {videoUrls.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Video className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">
              Videos ({videoUrls.length})
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {videoUrls.map((url) => (
              <div key={url} className="relative group">
                <video
                  src={url}
                  className="w-full aspect-video object-cover rounded-sm"
                  controls
                />
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeVideo(url)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
