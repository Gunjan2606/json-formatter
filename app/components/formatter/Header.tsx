import { FileJson, Search, Maximize2, Minimize2, History } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onSearch: () => void;
  onToggleSidebar: () => void;
  savedOutputsCount: number;
}

export const Header = ({ isFullscreen, onToggleFullscreen, onSearch, onToggleSidebar, savedOutputsCount }: HeaderProps) => {
  return (
    <header className={`border-b border-border bg-card transition-all duration-300 flex-shrink-0 ${
      isFullscreen ? 'py-1' : ''
    }`}>
      <div className={`transition-all duration-300 ${
        isFullscreen ? 'py-1 px-2' : 'py-2.5 px-4'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!isFullscreen && (
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary to-accent">
                <FileJson className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div>
              <h1 className={`font-bold text-foreground transition-all duration-300 ${
                isFullscreen ? 'text-sm' : 'text-lg'
              }`}>
                JSON Formatter
              </h1>
              {!isFullscreen && (
                <p className="text-xs text-muted-foreground">Fast, accurate, and reliable</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSearch}
              className={isFullscreen ? 'h-7 w-7' : ''}
              title="Search (Cmd/Ctrl+F)"
            >
              <Search className={`${isFullscreen ? 'w-3 h-3' : 'w-4 h-4'}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFullscreen}
              className={isFullscreen ? 'h-7 w-7' : ''}
            >
              {isFullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              onClick={onToggleSidebar}
              className={`${isFullscreen ? 'h-7' : 'h-8'} flex items-center gap-2 px-3`}
              title="Recent Outputs"
            >
              <History className={`${isFullscreen ? 'w-3 h-3' : 'w-4 h-4'}`} />
              {!isFullscreen && (
                <span className="text-sm font-medium">
                  History {savedOutputsCount > 0 && `(${savedOutputsCount})`}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

