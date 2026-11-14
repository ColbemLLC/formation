import { GooLoader } from "@/packages/ui/goo-loader";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-background">
      <GooLoader />
    </div>
  );
}