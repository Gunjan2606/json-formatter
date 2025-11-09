import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface ErrorDisplayProps {
  error: {
    message: string;
    line?: number;
    column?: number;
  };
}

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  return (
    <div className="px-4 py-2">
      <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Invalid JSON</AlertTitle>
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
      </Alert>
    </div>
  );
};
