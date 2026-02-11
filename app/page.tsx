import { Suspense } from "react";
import Index from "./pages/Index";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Index />
    </Suspense>
  );
}

