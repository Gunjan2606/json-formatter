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
  // Make low-level parser errors more readable for humans
  const rawMessage = error.message || "";
  const friendlyMessage = rawMessage.replace(/ in JSON at position .*$/i, "");

  return (
    <div className="px-4 py-2">
      <Alert
        variant="destructive"
        className="border-destructive/50 bg-destructive/10 flex items-start gap-3 pr-3"
      >
        <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <AlertTitle className="flex items-start justify-between gap-2">
            <span>{title}</span>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-6 w-6 rounded-md hover:bg-red-600/30 text-red-200 hover:text-white transition-colors flex items-center justify-center flex-shrink-0"
                aria-label="Close error"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </AlertTitle>
          <AlertDescription>
            <div className="space-y-1 pt-1">
              <p>{friendlyMessage || rawMessage}</p>
              {error.line && error.column && (
                <p className="text-xs font-mono">
                  Error at line {error.line}, column {error.column}
                </p>
              )}
            </div>
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};
