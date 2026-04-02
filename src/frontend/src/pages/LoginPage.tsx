import { Button } from "@/components/ui/button";
import { Play, Shield, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export function LoginPage() {
  const { login, isLoggingIn } = useInternetIdentity();

  return (
    <div
      data-ocid="login.page"
      className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Background gradient circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand-red/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-brand-cyan/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-red/3 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <img
              src="/assets/generated/inturi-logo-transparent.dim_120x120.png"
              alt="Inturi Tube"
              className="w-16 h-16 object-contain"
            />
            <div className="text-left">
              <h1 className="text-3xl font-bold">
                <span className="text-brand-red">INTURI</span>
                <span className="text-foreground"> Tube</span>
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">
                Video Platform
              </p>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-muted-foreground text-base leading-relaxed"
          >
            Upload, discover, and share videos — fully decentralized on the
            Internet Computer
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-panel border border-border rounded-xl p-8 shadow-card"
        >
          <h2 className="text-xl font-bold text-foreground text-center mb-2">
            Welcome back
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-8">
            Sign in to access your channel, uploads, and subscriptions
          </p>

          <Button
            data-ocid="login.sign_in.button"
            onClick={login}
            disabled={isLoggingIn}
            className="w-full h-12 bg-brand-cyan/10 hover:bg-brand-cyan/20 border border-brand-cyan text-brand-cyan font-semibold text-sm rounded-lg transition-all hover:shadow-[0_0_20px_oklch(0.71_0.13_210_/_0.3)]"
          >
            {isLoggingIn ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-brand-cyan border-t-transparent animate-spin" />
                Connecting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                SIGN IN with Internet Identity
              </span>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Secure, private, and fully decentralized
          </p>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex justify-center gap-4 mt-8 flex-wrap"
        >
          {[
            { icon: Zap, label: "Fast Uploads" },
            { icon: Users, label: "Subscribe & Follow" },
            { icon: Play, label: "Stream Anywhere" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 text-[12px] text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border border-border"
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
