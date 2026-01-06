import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";

interface MediaGalleryProps {
  images: string[];
  videos?: string[];
  vehicleName: string;
}

export const MediaGallery = ({ images, videos = [], vehicleName }: MediaGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"images" | "videos">("images");

  const hasImages = images.length > 0;
  const hasVideos = videos.length > 0;

  if (!hasImages && !hasVideos) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    // Handle various YouTube URL formats
    const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
    const match = url.match(youtubeRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    // Handle Vimeo
    const vimeoRegex = /vimeo\.com\/(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    return url;
  };

  return (
    <div className="mt-12">
      {/* Tabs */}
      {hasImages && hasVideos && (
        <div className="flex gap-6 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("images")}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === "images" 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Gallery
            {activeTab === "images" && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              activeTab === "videos" 
                ? "text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Videos
            {activeTab === "videos" && (
              <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
            )}
          </button>
        </div>
      )}

      {/* Title when only one type */}
      {hasImages && !hasVideos && (
        <h3 className="font-serif text-xl font-medium text-foreground mb-4">
          Gallery
        </h3>
      )}
      {hasVideos && !hasImages && (
        <h3 className="font-serif text-xl font-medium text-foreground mb-4">
          Videos
        </h3>
      )}

      {/* Image Gallery */}
      {(activeTab === "images" || !hasVideos) && hasImages && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="aspect-[4/3] overflow-hidden bg-muted rounded-sm group cursor-pointer"
            >
              <img
                src={image}
                alt={`${vehicleName} - Image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}

      {/* Video Gallery */}
      {(activeTab === "videos" || !hasImages) && hasVideos && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video, index) => (
            <div
              key={index}
              className="aspect-video overflow-hidden bg-muted rounded-sm"
            >
              <iframe
                src={getEmbedUrl(video)}
                title={`${vehicleName} - Video ${index + 1}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-full flex items-center justify-center min-h-[60vh]">
            {/* Close button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Image */}
            <img
              src={images[currentIndex]}
              alt={`${vehicleName} - Image ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain"
            />

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
