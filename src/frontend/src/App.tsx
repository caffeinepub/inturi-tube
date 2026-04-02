import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Layout } from "./components/Layout";
import type { MockVideo } from "./data/mockVideos";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { ChannelPage } from "./pages/ChannelPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { MyVideosPage } from "./pages/MyVideosPage";
import { UploadPage } from "./pages/UploadPage";
import { VideoPlayerPage } from "./pages/VideoPlayerPage";

type Page = "home" | "player" | "upload" | "channel" | "myvideos";

export default function App() {
  const { identity, clear, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const principal = identity?.getPrincipal().toString();

  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedVideo, setSelectedVideo] = useState<MockVideo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  function navigate(page: Page) {
    setCurrentPage(page);
    if (page !== "player") setSelectedVideo(null);
  }

  function handleVideoClick(video: MockVideo) {
    setSelectedVideo(video);
    setCurrentPage("player");
  }

  function handleSearch(query: string) {
    setSearchQuery(query);
    setCurrentPage("home");
  }

  // Show loading state while checking identity
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <img
            src="/assets/generated/inturi-logo-transparent.dim_120x120.png"
            alt="Inturi Tube"
            className="w-16 h-16 object-contain animate-pulse"
          />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Gate: show login if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Layout
        currentPage={currentPage === "player" ? "home" : currentPage}
        onNavigate={navigate}
        onSearch={handleSearch}
        onSignOut={clear}
        principal={principal}
      >
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <HomePage
                searchQuery={searchQuery}
                onVideoClick={handleVideoClick}
              />
            </motion.div>
          )}
          {currentPage === "player" && selectedVideo && (
            <motion.div
              key="player"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <VideoPlayerPage
                video={selectedVideo}
                onBack={() => navigate("home")}
                onVideoClick={handleVideoClick}
                principal={principal}
              />
            </motion.div>
          )}
          {currentPage === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <UploadPage onBack={() => navigate("home")} />
            </motion.div>
          )}
          {currentPage === "channel" && (
            <motion.div
              key="channel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChannelPage
                onBack={() => navigate("home")}
                onVideoClick={handleVideoClick}
                principal={principal}
              />
            </motion.div>
          )}
          {currentPage === "myvideos" && (
            <motion.div
              key="myvideos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MyVideosPage
                onBack={() => navigate("home")}
                onVideoClick={handleVideoClick}
                onUpload={() => navigate("upload")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Layout>
      <Toaster />
    </>
  );
}
