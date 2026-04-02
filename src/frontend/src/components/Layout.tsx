import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  History,
  Home,
  Library,
  LogOut,
  Menu,
  PlaySquare,
  Search,
  ThumbsUp,
  Upload,
  User,
} from "lucide-react";
import { useState } from "react";
import { SUBSCRIBED_CHANNELS } from "../data/mockVideos";

type Page = "home" | "upload" | "channel" | "myvideos" | "player";

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onSearch: (query: string) => void;
  onSignOut: () => void;
  principal?: string;
}

export function Layout({
  children,
  currentPage,
  onNavigate,
  onSearch,
  onSignOut,
  principal,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navItems = [
    { id: "home" as Page, label: "Home", icon: Home },
    { id: "myvideos" as Page, label: "My Videos", icon: PlaySquare },
    { id: "channel" as Page, label: "Library", icon: Library },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-panel border-b border-border flex items-center px-4 gap-4">
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            data-ocid="nav.toggle"
            onClick={() => setSidebarOpen((o) => !o)}
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            type="button"
            data-ocid="nav.home.link"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/assets/generated/inturi-logo-transparent.dim_120x120.png"
              alt="Inturi Tube"
              className="w-7 h-7 object-contain"
            />
            <span className="font-bold text-base text-foreground hidden sm:block">
              <span className="text-brand-red">INTURI</span> <span>Tube</span>
            </span>
          </button>
        </div>

        {/* Center: search */}
        <div className="flex-1 max-w-xl mx-auto flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="search.input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch(searchQuery)}
              placeholder="Search videos..."
              className="pl-9 bg-input border-border text-foreground placeholder:text-muted-foreground h-9 text-sm"
            />
          </div>
          <Button
            data-ocid="search.submit_button"
            onClick={() => onSearch(searchQuery)}
            size="sm"
            className="bg-secondary hover:bg-accent text-foreground border border-border px-4 h-9"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <Bell className="w-5 h-5" />
          </button>
          <button
            type="button"
            data-ocid="upload.open_modal_button"
            onClick={() => onNavigate("upload")}
            className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Upload video"
          >
            <Upload className="w-5 h-5" />
          </button>
          <button
            type="button"
            data-ocid="channel.link"
            onClick={() => onNavigate("channel")}
            className="w-8 h-8 rounded-full bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-red hover:bg-brand-red/30 transition-colors"
            title={principal || "My Channel"}
          >
            <User className="w-4 h-4" />
          </button>
          <Button
            data-ocid="auth.sign_out.button"
            onClick={onSignOut}
            size="sm"
            variant="outline"
            className="border-brand-cyan/50 text-brand-cyan hover:bg-brand-cyan/10 hover:text-brand-cyan text-xs h-8 px-3 hidden sm:flex"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Body: sidebar + main */}
      <div className="flex pt-14 min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed top-14 left-0 bottom-0 z-40 bg-panel border-r border-border flex flex-col transition-all duration-300 overflow-y-auto ${
            sidebarOpen ? "w-56" : "w-14"
          }`}
        >
          <nav className="flex-1 py-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                type="button"
                key={id}
                data-ocid={`nav.${id}.link`}
                onClick={() => onNavigate(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                  currentPage === id
                    ? "bg-secondary text-foreground font-medium"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{label}</span>}
              </button>
            ))}
            {sidebarOpen && (
              <>
                <button
                  type="button"
                  data-ocid="nav.history.link"
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-colors"
                >
                  <History className="w-5 h-5 flex-shrink-0" />
                  <span>History</span>
                </button>
                <button
                  type="button"
                  data-ocid="nav.liked.link"
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-colors"
                >
                  <ThumbsUp className="w-5 h-5 flex-shrink-0" />
                  <span>Liked Videos</span>
                </button>

                <div className="mt-4 px-3 py-2">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Subscriptions
                  </p>
                  {SUBSCRIBED_CHANNELS.map((ch) => (
                    <button
                      type="button"
                      key={ch.id}
                      data-ocid={`nav.sub.${ch.id}.link`}
                      className="w-full flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                        {ch.avatar}
                      </div>
                      <span className="truncate">{ch.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </nav>
        </aside>

        {/* Main content */}
        <main
          className={`flex-1 min-h-full transition-all duration-300 ${
            sidebarOpen ? "ml-56" : "ml-14"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
