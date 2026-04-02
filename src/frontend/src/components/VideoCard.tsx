import { MoreVertical, Play } from "lucide-react";
import type { MockVideo } from "../data/mockVideos";

interface VideoCardProps {
  video: MockVideo;
  onClick: (video: MockVideo) => void;
  index: number;
}

export function VideoCard({ video, onClick, index }: VideoCardProps) {
  return (
    <button
      type="button"
      data-ocid={`videos.item.${index}`}
      className="group cursor-pointer"
      onClick={() => onClick(video)}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-card mb-3">
        <div
          className={`w-full h-full bg-gradient-to-br ${video.thumbnailGradient} flex items-center justify-center`}
        >
          <div className="w-14 h-14 rounded-full bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </div>
        </div>
        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="flex gap-3">
        {/* Channel avatar */}
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground font-semibold text-sm">
          {video.channelAvatar}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <h3 className="text-[13px] font-semibold text-foreground leading-snug line-clamp-2 flex-1">
              {video.title}
            </h3>
            <button
              type="button"
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
              aria-label="More options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[12px] text-muted-foreground mt-1">
            {video.channel}
          </p>
          <p className="text-[12px] text-muted-foreground">
            {video.views} views · {video.uploadedAt}
          </p>
        </div>
      </div>
    </button>
  );
}
