import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle2, Film, ImageIcon, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

interface UploadPageProps {
  onBack: () => void;
}

export function UploadPage({ onBack }: UploadPageProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const videoRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLInputElement>(null);

  function handleVideoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setVideoFile(f);
  }

  function handleThumbnailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setThumbnailFile(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setThumbnailPreview(url);
    } else {
      setThumbnailPreview(null);
    }
  }

  async function handleSubmit() {
    if (!title.trim() || !videoFile) return;
    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    for (let p = 0; p <= 100; p += 10) {
      await new Promise((r) => setTimeout(r, 150));
      setProgress(p);
    }

    setUploading(false);
    setDone(true);
  }

  if (done) {
    return (
      <motion.div
        data-ocid="upload.success_state"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 max-w-lg mx-auto mt-20 text-center"
      >
        <CheckCircle2 className="w-16 h-16 text-brand-cyan mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Upload Successful!
        </h2>
        <p className="text-muted-foreground mb-6">
          Your video <strong className="text-foreground">"{title}"</strong> has
          been uploaded.
        </p>
        <Button
          data-ocid="upload.back.button"
          onClick={onBack}
          className="bg-brand-cyan/10 hover:bg-brand-cyan/20 border border-brand-cyan text-brand-cyan"
        >
          Back to Home
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      data-ocid="upload.page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-2xl"
    >
      <button
        type="button"
        data-ocid="upload.back_nav.button"
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h1 className="text-2xl font-bold text-foreground mb-6">Upload Video</h1>

      <div className="space-y-6">
        {/* Video upload */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">
            Video File *
          </Label>
          <label
            data-ocid="upload.dropzone"
            htmlFor="video-file-input"
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              videoFile
                ? "border-brand-cyan/50 bg-brand-cyan/5"
                : "border-border hover:border-border/80 hover:bg-secondary/30"
            }`}
          >
            <input
              ref={videoRef}
              id="video-file-input"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoChange}
            />
            <Film
              className={`w-10 h-10 mb-3 ${videoFile ? "text-brand-cyan" : "text-muted-foreground"}`}
            />
            {videoFile ? (
              <>
                <p className="font-semibold text-foreground text-sm">
                  {videoFile.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </>
            ) : (
              <>
                <p className="font-medium text-foreground text-sm">
                  Drop your video here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  MP4, MOV, AVI, WebM supported
                </p>
              </>
            )}
          </label>
        </div>

        {/* Thumbnail */}
        <div>
          <Label className="text-sm font-medium text-foreground mb-2 block">
            Thumbnail Image
          </Label>
          <label
            data-ocid="upload.thumbnail.dropzone"
            htmlFor="thumb-file-input"
            className={`border-2 border-dashed rounded-xl p-6 flex items-center gap-4 cursor-pointer transition-colors ${
              thumbnailPreview
                ? "border-brand-cyan/50 bg-brand-cyan/5"
                : "border-border hover:border-border/80 hover:bg-secondary/30"
            }`}
          >
            <input
              ref={thumbRef}
              id="thumb-file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnailChange}
            />
            {thumbnailPreview ? (
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="w-32 aspect-video object-cover rounded-lg"
              />
            ) : (
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            )}
            <div>
              <p className="font-medium text-foreground text-sm">
                {thumbnailFile ? thumbnailFile.name : "Upload thumbnail"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {thumbnailFile ? "Click to change" : "PNG, JPG, WEBP supported"}
              </p>
            </div>
          </label>
        </div>

        {/* Title */}
        <div>
          <Label
            htmlFor="video-title"
            className="text-sm font-medium text-foreground mb-2 block"
          >
            Title *
          </Label>
          <Input
            id="video-title"
            data-ocid="upload.title.input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title..."
            className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            maxLength={100}
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {title.length}/100
          </p>
        </div>

        {/* Description */}
        <div>
          <Label
            htmlFor="video-desc"
            className="text-sm font-medium text-foreground mb-2 block"
          >
            Description
          </Label>
          <Textarea
            id="video-desc"
            data-ocid="upload.description.textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your video..."
            className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none min-h-[120px]"
            maxLength={2000}
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {description.length}/2000
          </p>
        </div>

        {/* Upload progress */}
        {uploading && (
          <div data-ocid="upload.loading_state" className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Submit */}
        <Button
          data-ocid="upload.submit_button"
          onClick={handleSubmit}
          disabled={!title.trim() || !videoFile || uploading}
          className="w-full h-11 bg-brand-red hover:bg-brand-red/90 text-white font-semibold disabled:opacity-50"
        >
          {uploading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Uploading {progress}%
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Video
            </span>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
