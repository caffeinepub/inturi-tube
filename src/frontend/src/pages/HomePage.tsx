import { motion } from "motion/react";
import { VideoCard } from "../components/VideoCard";
import { MOCK_VIDEOS, type MockVideo } from "../data/mockVideos";

interface HomePageProps {
  searchQuery: string;
  onVideoClick: (video: MockVideo) => void;
}

export function HomePage({ searchQuery, onVideoClick }: HomePageProps) {
  const filtered = searchQuery
    ? MOCK_VIDEOS.filter(
        (v) =>
          v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.channel.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : MOCK_VIDEOS;

  return (
    <div data-ocid="home.page" className="p-6">
      {searchQuery && (
        <div className="mb-6">
          <p className="text-muted-foreground text-sm">
            Results for{" "}
            <span className="text-foreground font-medium">"{searchQuery}"</span>{" "}
            — {filtered.length} video{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      )}

      {filtered.length === 0 ? (
        <div
          data-ocid="home.empty_state"
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <span className="text-3xl">🎬</span>
          </div>
          <p className="text-foreground font-semibold mb-1">No videos found</p>
          <p className="text-muted-foreground text-sm">
            Try a different search term
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
            >
              <VideoCard video={video} onClick={onVideoClick} index={i + 1} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
