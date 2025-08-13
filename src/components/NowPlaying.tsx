import { useEffect, useMemo, useRef, useState } from "react";

type Track = {
  src: string;
  title: string;
  artist: string;
};

interface NowPlayingProps {
  tracks?: Track[];
  src?: string;
  title?: string;
  artist?: string;
  startIndex?: number;
}

export const NowPlaying = ({ tracks, src, title, artist, startIndex = 0 }: NowPlayingProps) => {
  const playlist: Track[] = useMemo(() => {
    if (tracks && tracks.length > 0) return tracks;
    if (src && title && artist) return [{ src, title, artist }];
    return [];
  }, [tracks, src, title, artist]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(Math.min(startIndex, Math.max(0, playlist.length - 1)));
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const idleTimerRef = useRef<number | null>(null);

  const currentTrack: Track | undefined = playlist[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.75;
    audio.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    if (audio.src !== window.location.origin + currentTrack.src) {
      audio.src = currentTrack.src;
      audio.load();
    }
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => {
      // advance to next, wrap around
      nextTrack();
    };
    
    audio.addEventListener("ended", onEnded);

    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setIsMinimized(y > 140);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      audio.removeEventListener("ended", onEnded);
      window.removeEventListener("scroll", onScroll);
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  const scheduleAutoMinimize = () => {
    if (idleTimerRef.current) {
      window.clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = window.setTimeout(() => {
      setIsMinimized(true);
    }, 3000);
  };

  const handleInteraction = () => {
    setIsMinimized(false);
    scheduleAutoMinimize();
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    handleInteraction();
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    handleInteraction();
    const next = !isMuted;
    audio.muted = next;
    setIsMuted(next);
  };

  const nextTrack = () => {
    if (playlist.length === 0) return;
    handleInteraction();
    setCurrentIndex((i) => (i + 1) % playlist.length);
  };

  const prevTrack = () => {
    if (playlist.length === 0) return;
    handleInteraction();
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);
  };

  if (!currentTrack) return null;

  return (
    <div
      className={"fixed z-50 top-4 left-4 transition-all duration-500 select-none"}
      aria-live="polite"
    >
      {/* Keep audio mounted regardless of minimized state to avoid stopping on scroll */}
      <audio ref={audioRef} preload="auto" className="hidden" />

      {/* Minimized - always mounted, animated show/hide */}
      <div
        className={
          "h-10 w-10 rounded-full glass border border-primary/30 bg-black/40 flex items-center justify-center " +
          "shadow-[0_0_30px_rgba(155,135,245,0.18)] cursor-pointer absolute top-0 left-0 " +
          "transition-all duration-300 ease-out will-change-transform " +
          (isMinimized ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-90 -translate-y-1 pointer-events-none")
        }
        title="Now Playing"
        onClick={handleInteraction}
      >
        <div className="flex items-end gap-0.5 h-3.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={"w-0.5 bg-primary/70 rounded-sm " + (isPlaying ? "eq-bar" : "opacity-50")}
              style={{ height: isPlaying ? 12 : 7, animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
      </div>

      {/* Expanded - always mounted, animated show/hide */}
      <div
        className={
          "group glass rounded-xl border border-primary/20 shadow-[0_0_24px_rgba(155,135,245,0.18)] " +
          "backdrop-blur-xl bg-black/40 overflow-hidden px-2.5 py-1.5 w-[300px] absolute top-0 left-0 " +
          "transition-all duration-300 ease-out will-change-transform " +
          (isMinimized ? "opacity-0 scale-95 translate-y-1 pointer-events-none" : "opacity-100 scale-100 translate-y-0")
        }
        role="region"
        aria-label="Now playing"
        onMouseMove={scheduleAutoMinimize}
        onFocus={scheduleAutoMinimize}
        onClick={scheduleAutoMinimize}
      >
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-25">
          <div className="absolute -inset-20 bg-[radial-gradient(circle_at_20%_20%,rgba(155,135,245,0.22),transparent_40%),radial-gradient(circle_at_80%_50%,rgba(155,135,245,0.12),transparent_45%)]" />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevTrack}
            aria-label="Previous"
            className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 7h2v10H6zM20 7v10l-9-5 9-5z" />
            </svg>
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary transition-colors"
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary">
                <rect x="6" y="5" width="4" height="14" rx="1.5" fill="currentColor" />
                <rect x="14" y="5" width="4" height="14" rx="1.5" fill="currentColor" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary">
                <path d="M8 5v14l10-7-10-7z" fill="currentColor" />
              </svg>
            )}
          </button>

          <button
            onClick={nextTrack}
            aria-label="Next"
            className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 7h2v10h-2zM4 7v10l9-5-9-5z" />
            </svg>
          </button>

          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-2">
              <div className="truncate text-left">
                <div className="text-xs font-medium gradient-text leading-tight truncate">{currentTrack.title}</div>
                <div className="text-[11px] text-white/60 leading-tight truncate">{currentTrack.artist}</div>
              </div>
              <div className="flex items-end gap-0.5 h-3 ml-auto">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={"w-0.5 bg-primary/70 rounded-sm " + (isPlaying ? "eq-bar" : "opacity-50")}
                    style={{ height: isPlaying ? 10 : 6, animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary transition-colors"
          >
            {isMuted ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12l3-3-1.5-1.5-3 3-3-3L10.5 9l3 3-3 3 1.5 1.5 3-3 3 3 1.5-1.5-3-3z" />
                <path d="M5 9h3l4-3v12l-4-3H5z" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 9h3l4-3v12l-4-3H5z" />
                <path d="M16 7a5 5 0 010 10" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;


