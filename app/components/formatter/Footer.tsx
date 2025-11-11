interface FooterProps {
  isFullscreen: boolean;
}

export const Footer = ({ isFullscreen }: FooterProps) => {
  if (isFullscreen) return null;
  
  return (
    <footer className="border-t border-border bg-card py-1 px-4 flex-shrink-0">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Built with ❤️ by Pineapple </span>
        </div>       
      </div>
    </footer>
  );
};

