import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, Play } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { MOCK_VIDEOS } from "../data/mockVideos";
import type { MockVideo } from "../data/mockVideos";

interface ChannelPageProps {
  onBack: () => void;
  onVideoClick: (video: MockVideo) => void;
  principal?: string;
}

export function ChannelPage({
  onBack,
  onVideoClick,
  principal,
}: ChannelPageProps) {
  const [subscribed, setSubscribed] = useState(false);

  // Show a specific channel -- using "DevOnChain" as example
  const channelVideos = MOCK_VIDEOS.filter((_, i) => i < 3);
  const channelName = "DevOnChain";
  const shortPrincipal = principal
    ? `${principal.slice(0, 8)}...`
    : "Anonymous";

  return (
    <motion.div
      data-ocid="channel.page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=""
    >
      <button
        type="button"
        data-ocid="channel.back.button"
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm m-6 mb-0 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Channel banner */}
      <div className="w-full h-32 bg-gradient-to-r from-blue-900 via-indigo-800 to-cyan-800 relative">
        <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,oklch(1_0_0/0.05)_20px,oklch(1_0_0/0.05)_40px)]" />
      </div>

      {/* Channel info */}
      <div className="px-6 pb-6">
        <div className="flex items-end justify-between -mt-8 mb-6">
          <div className="flex items-end gap-4">
            <div className="w-20 h-20 rounded-full bg-brand-red/20 border-4 border-background flex items-center justify-center text-3xl font-bold text-brand-red">
              D
            </div>
            <div className="mb-1">
              <h1 className="text-xl font-bold text-foreground">
                {channelName}
              </h1>
              <p className="text-muted-foreground text-sm">
                {shortPrincipal} · 98.4K subscribers · {channelVideos.length}{" "}
                videos
              </p>
            </div>
          </div>
          <Button
            data-ocid="channel.subscribe.button"
            onClick={() => setSubscribed((s) => !s)}
            size="sm"
            className={`h-9 px-5 font-semibold text-sm rounded-full ${
              subscribed
                ? "bg-secondary border border-border text-foreground"
                : "bg-foreground text-background hover:bg-foreground/90"
            }`}
          >
            {subscribed ? (
              <span className="flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5" />
                Subscribed
              </span>
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>

        <h2 className="font-semibold text-foreground mb-4">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {channelVideos.map((v, i) => (
            <button
              type="button"
              key={v.id}
              data-ocid={`channel.video.item.${i + 1}`}
              onClick={() => onVideoClick(v)}
              className="text-left group"
            >
              <div
                className={`w-full aspect-video rounded-lg bg-gradient-to-br ${v.thumbnailGradient} flex items-center justify-center mb-2 overflow-hidden`}
              >
                <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
              </div>
              <p className="text-sm font-semibold text-foreground line-clamp-2">
                {v.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {v.views} views · {v.uploadedAt}
              </p>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
