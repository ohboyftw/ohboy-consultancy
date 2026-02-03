import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="font-mono text-8xl font-bold text-emerald-500/20 mb-4">
          404
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-slate-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="gradient" asChild>
            <Link href="/">
              <Home size={16} className="mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/#contact">
              <ArrowLeft size={16} className="mr-2" />
              Contact Me
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
