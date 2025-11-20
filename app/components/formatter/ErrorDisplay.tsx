import { AlertCircle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

interface ErrorDisplayProps {
  error: {
    message: string;
    line?: number;
    column?: number;
  };
  onClose?: () => void;
  title?: string;
}

export const ErrorDisplay = ({ error, onClose, title = "Invalid JSON" }: ErrorDisplayProps) => {
  return (
    <div className="px-4 py-2">
      <Alert variant="destructive" className="border-destructive/50 bg-destructive/10 relative pr-14">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          <div className="space-y-1">
            <p>{error.message}</p>
            {error.line && error.column && (
              <p className="text-xs font-mono">
                Error at line {error.line}, column {error.column}
              </p>
            )}
          </div>
        </AlertDescription>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-3 top-3 h-7 w-7 rounded-md hover:bg-red-600/50 text-red-200 hover:text-white transition-colors"
            aria-label="Close error"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </Alert>
    </div>
  );
};
