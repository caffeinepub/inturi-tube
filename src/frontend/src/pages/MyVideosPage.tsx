import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Trash2, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { MOCK_VIDEOS, type MockVideo } from "../data/mockVideos";

interface MyVideosPageProps {
  onBack: () => void;
  onVideoClick: (video: MockVideo) => void;
  onUpload: () => void;
}

export function MyVideosPage({
  onBack,
  onVideoClick,
  onUpload,
}: MyVideosPageProps) {
  const [videos, setVideos] = useState<MockVideo[]>(MOCK_VIDEOS.slice(0, 3));

  function handleDelete(id: string) {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  }

  return (
    <motion.div
      data-ocid="myvideos.page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <button
        type="button"
        data-ocid="myvideos.back.button"
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">My Videos</h1>
        <Button
          data-ocid="myvideos.upload.button"
          onClick={onUpload}
          size="sm"
          className="bg-brand-red hover:bg-brand-red/90 text-white"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload New
        </Button>
      </div>

      {videos.length === 0 ? (
        <div
          data-ocid="myvideos.empty_state"
          className="flex flex-col items-center py-24 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
            <Play className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-foreground font-semibold mb-1">No videos yet</p>
          <p className="text-muted-foreground text-sm mb-4">
            Start uploading to grow your channel
          </p>
          <Button
            data-ocid="myvideos.upload_first.button"
            onClick={onUpload}
            className="bg-brand-cyan/10 border border-brand-cyan text-brand-cyan hover:bg-brand-cyan/20"
          >
            Upload Your First Video
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {videos.map((v, i) => (
            <motion.div
              key={v.id}
              data-ocid={`myvideos.item.${i + 1}`}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 bg-card rounded-lg p-3 border border-border hover:border-border/80 group"
            >
              <button
                type="button"
                onClick={() => onVideoClick(v)}
                className={`w-32 aspect-video rounded-md bg-gradient-to-br ${v.thumbnailGradient} flex items-center justify-center flex-shrink-0`}
              >
                <Play className="w-5 h-5 text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm line-clamp-1">
                  {v.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {v.views} views · {v.uploadedAt}
                </p>
                <p className="text-xs text-muted-foreground">{v.duration}</p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    data-ocid={`myvideos.delete_button.${i + 1}`}
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-popover border-border">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-foreground">
                      Delete Video?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                      This will permanently delete{" "}
                      <strong className="text-foreground">"{v.title}"</strong>.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      data-ocid={`myvideos.delete_cancel.${i + 1}`}
                      className="bg-secondary border-border text-foreground hover:bg-secondary/80"
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      data-ocid={`myvideos.delete_confirm.${i + 1}`}
                      onClick={() => handleDelete(v.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
