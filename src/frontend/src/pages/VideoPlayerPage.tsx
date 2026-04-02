import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Bell,
  Play,
  Send,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { MOCK_VIDEOS, type MockVideo } from "../data/mockVideos";

interface VideoPlayerPageProps {
  video: MockVideo;
  onBack: () => void;
  onVideoClick: (video: MockVideo) => void;
  principal?: string;
}

interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: "c1",
    author: "Alex Rivera",
    text: "This is exactly what I needed! Thank you for the detailed walkthrough.",
    time: "2 hours ago",
  },
  {
    id: "c2",
    author: "Sam Chen",
    text: "Great content as always. The explanations are super clear.",
    time: "5 hours ago",
  },
  {
    id: "c3",
    author: "Jordan K.",
    text: "Been waiting for this one. Already tried it and works perfectly!",
    time: "1 day ago",
  },
];

export function VideoPlayerPage({
  video,
  onBack,
  onVideoClick,
  principal,
}: VideoPlayerPageProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(video.likes);
  const [subscribed, setSubscribed] = useState(false);
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [commentText, setCommentText] = useState("");
  const [shared, setShared] = useState(false);

  const related = MOCK_VIDEOS.filter((v) => v.id !== video.id).slice(0, 5);

  function handleLike() {
    if (liked) {
      setLiked(false);
      setLikes((n) => n - 1);
    } else {
      setLiked(true);
      if (disliked) setDisliked(false);
      setLikes((n) => n + 1);
    }
  }

  function handleDislike() {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      if (liked) {
        setLiked(false);
        setLikes((n) => n - 1);
      }
    }
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }

  function handleComment() {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: principal ? `${principal.slice(0, 12)}...` : "You",
      text: commentText.trim(),
      time: "just now",
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
  }

  return (
    <motion.div
      data-ocid="player.page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-[1400px]"
    >
      <button
        type="button"
        data-ocid="player.back.button"
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Video player */}
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden mb-4">
            <div
              className={`w-full h-full bg-gradient-to-br ${video.thumbnailGradient} flex items-center justify-center`}
            >
              <div className="w-20 h-20 rounded-full bg-black/30 flex items-center justify-center">
                <Play className="w-10 h-10 text-white fill-white ml-1.5" />
              </div>
            </div>
          </div>

          {/* Title & actions */}
          <h1 className="text-lg font-bold text-foreground mb-3">
            {video.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            {/* Channel info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold">
                {video.channelAvatar}
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">
                  {video.channel}
                </p>
                <p className="text-xs text-muted-foreground">
                  {video.subscribers} subscribers
                </p>
              </div>
              <Button
                data-ocid="player.subscribe.button"
                onClick={() => setSubscribed((s) => !s)}
                size="sm"
                className={`ml-2 h-8 px-4 text-xs font-semibold rounded-full transition-all ${
                  subscribed
                    ? "bg-secondary text-foreground border border-border"
                    : "bg-foreground text-background hover:bg-foreground/90"
                }`}
              >
                {subscribed ? (
                  <span className="flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5" /> Subscribed
                  </span>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>

            {/* Like/dislike/share */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-secondary rounded-full overflow-hidden border border-border">
                <button
                  type="button"
                  data-ocid="player.like.button"
                  onClick={handleLike}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm transition-colors ${
                    liked
                      ? "text-brand-cyan"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${liked ? "fill-brand-cyan" : ""}`}
                  />
                  {likes.toLocaleString()}
                </button>
                <div className="w-px h-5 bg-border" />
                <button
                  type="button"
                  data-ocid="player.dislike.button"
                  onClick={handleDislike}
                  className={`flex items-center px-4 py-2 text-sm transition-colors ${
                    disliked
                      ? "text-brand-red"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ThumbsDown
                    className={`w-4 h-4 ${disliked ? "fill-brand-red" : ""}`}
                  />
                </button>
              </div>

              <Button
                data-ocid="player.share.button"
                onClick={handleShare}
                size="sm"
                variant="outline"
                className="bg-secondary border-border text-foreground hover:bg-accent/10 rounded-full text-xs h-9 px-4"
              >
                <Share2 className="w-4 h-4 mr-1.5" />
                {shared ? "Copied!" : "Share"}
              </Button>
            </div>
          </div>

          <Separator className="bg-border mb-4" />

          {/* Description */}
          <div className="bg-secondary/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">
              <span className="text-foreground font-medium">
                {video.views} views
              </span>
              {" · "}
              {video.uploadedAt}
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {video.description}
            </p>
          </div>

          {/* Comments */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {comments.length} Comments
            </h3>

            {/* Add comment */}
            <div className="flex gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-red text-xs font-bold flex-shrink-0">
                {principal ? principal.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="flex-1">
                <Textarea
                  data-ocid="comment.textarea"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground text-sm resize-none min-h-[80px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey))
                      handleComment();
                  }}
                />
                <div className="flex justify-end mt-2">
                  <Button
                    data-ocid="comment.submit_button"
                    onClick={handleComment}
                    disabled={!commentText.trim()}
                    size="sm"
                    className="bg-brand-cyan/10 hover:bg-brand-cyan/20 border border-brand-cyan text-brand-cyan text-xs h-8"
                  >
                    <Send className="w-3.5 h-3.5 mr-1" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>

            {/* Comment list */}
            <div className="space-y-4">
              {comments.map((c, i) => (
                <div
                  key={c.id}
                  data-ocid={`comment.item.${i + 1}`}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {c.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {c.author}{" "}
                      <span className="font-normal text-muted-foreground">
                        {c.time}
                      </span>
                    </p>
                    <p className="text-sm text-foreground mt-0.5">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <h3 className="font-semibold text-foreground mb-4 text-sm">
            Up Next
          </h3>
          <div className="space-y-3">
            {related.map((v, i) => (
              <button
                type="button"
                key={v.id}
                data-ocid={`related.item.${i + 1}`}
                onClick={() => onVideoClick(v)}
                className="w-full flex gap-3 text-left hover:bg-secondary/60 rounded-lg p-2 transition-colors group"
              >
                <div
                  className={`w-28 aspect-video rounded-md bg-gradient-to-br ${v.thumbnailGradient} flex items-center justify-center flex-shrink-0`}
                >
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-foreground line-clamp-2 leading-snug">
                    {v.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {v.channel}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {v.views} views
                  </p>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
