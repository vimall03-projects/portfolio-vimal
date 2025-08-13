import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center p-8 rounded-lg border border-border/50 bg-secondary/40 backdrop-blur">
        <h1 className="heading text-6xl gradient-text mb-4">404</h1>
        <p className="text-base md:text-lg text-muted-foreground mb-6">This page drifted into the void.</p>
        <a href="/" className="inline-block bg-accent/20 hover:bg-accent/30 text-accent-foreground px-6 py-3 rounded-full transition-all duration-300">
          Take me home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
