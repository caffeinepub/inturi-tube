export interface MockVideo {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  views: string;
  uploadedAt: string;
  duration: string;
  thumbnailGradient: string;
  description: string;
  likes: number;
  dislikes: number;
  subscribers: string;
}

export const MOCK_VIDEOS: MockVideo[] = [
  {
    id: "v1",
    title: "Building a Full-Stack App on the Internet Computer in 2026",
    channel: "DevOnChain",
    channelAvatar: "D",
    views: "142K",
    uploadedAt: "3 days ago",
    duration: "18:42",
    thumbnailGradient: "from-blue-900 via-blue-700 to-cyan-500",
    description:
      "In this comprehensive tutorial, we walk through building a full-stack decentralized app on the Internet Computer using Motoko and React. We cover authentication, data persistence, and deployment.",
    likes: 4812,
    dislikes: 94,
    subscribers: "98.4K",
  },
  {
    id: "v2",
    title: "10 Hidden Features in VS Code You Probably Don't Know About",
    channel: "CodeCraft Studio",
    channelAvatar: "C",
    views: "891K",
    uploadedAt: "1 week ago",
    duration: "12:07",
    thumbnailGradient: "from-purple-900 via-purple-700 to-pink-500",
    description:
      "VS Code is packed with powerful features that most developers never discover. Today I'm revealing 10 of the most useful hidden gems that will supercharge your workflow.",
    likes: 28400,
    dislikes: 310,
    subscribers: "1.2M",
  },
  {
    id: "v3",
    title: "React 19 Is Here – Everything You Need to Know",
    channel: "Frontend Focus",
    channelAvatar: "F",
    views: "334K",
    uploadedAt: "5 days ago",
    duration: "24:18",
    thumbnailGradient: "from-cyan-900 via-teal-700 to-emerald-500",
    description:
      "React 19 brings a massive set of improvements including the new compiler, server components stability, and the Actions API. Let's break down everything that changed and how to migrate.",
    likes: 11200,
    dislikes: 180,
    subscribers: "445K",
  },
  {
    id: "v4",
    title: "How I Automated My Entire Morning Routine with AI",
    channel: "Productivity Unlocked",
    channelAvatar: "P",
    views: "2.1M",
    uploadedAt: "2 weeks ago",
    duration: "9:55",
    thumbnailGradient: "from-orange-900 via-orange-700 to-yellow-500",
    description:
      "I spent 3 months building an AI-powered morning routine system using local models and custom scripts. Here's exactly what I built and how you can replicate it.",
    likes: 67300,
    dislikes: 1200,
    subscribers: "3.4M",
  },
  {
    id: "v5",
    title: "Tailwind CSS v4 Deep Dive – What's New and What Changed",
    channel: "CSS Wizards",
    channelAvatar: "W",
    views: "219K",
    uploadedAt: "4 days ago",
    duration: "31:02",
    thumbnailGradient: "from-rose-900 via-rose-700 to-pink-500",
    description:
      "Tailwind CSS v4 is a ground-up rewrite with a brand new engine, OKLCH color system, and zero-configuration setup. This deep dive covers every major change and migration path.",
    likes: 8900,
    dislikes: 95,
    subscribers: "187K",
  },
  {
    id: "v6",
    title: "The State of Web Development in 2026 – Big Predictions",
    channel: "TechPulse Weekly",
    channelAvatar: "T",
    views: "567K",
    uploadedAt: "6 days ago",
    duration: "44:33",
    thumbnailGradient: "from-indigo-900 via-violet-700 to-purple-500",
    description:
      "From AI-assisted coding to WebAssembly going mainstream, 2026 is shaping up to be a transformative year for web development. Here are our biggest predictions and analysis.",
    likes: 19800,
    dislikes: 420,
    subscribers: "892K",
  },
];

export const SUBSCRIBED_CHANNELS = [
  { name: "DevOnChain", avatar: "D", id: "devonchain" },
  { name: "Frontend Focus", avatar: "F", id: "frontendfocus" },
  { name: "CodeCraft Studio", avatar: "C", id: "codecraft" },
  { name: "CSS Wizards", avatar: "W", id: "csswizards" },
  { name: "TechPulse Weekly", avatar: "T", id: "techpulse" },
];
