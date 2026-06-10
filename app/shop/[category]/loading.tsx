import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

function SkeletonPulse({ className }: { className?: string }) {
  return <div className={`bg-hairline rounded-full animate-pulse ${className ?? ""}`} />;
}

export default function CategoryLoading() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <SkeletonPulse className="h-2.5 w-10" />
            <span className="text-hairline text-[12px]">/</span>
            <SkeletonPulse className="h-2.5 w-12" />
            <span className="text-hairline text-[12px]">/</span>
            <SkeletonPulse className="h-2.5 w-20" />
          </div>
        </div>

        {/* Category header */}
        <div className="max-w-[1280px] mx-auto px-6 py-12 border-b border-hairline">
          <SkeletonPulse className="h-3 w-28 mb-4" />
          <div className="bg-hairline rounded-[8px] animate-pulse h-12 w-56 mb-3" />
          <SkeletonPulse className="h-4 w-72" />
        </div>

        {/* Filter chips */}
        <div className="max-w-[1280px] mx-auto px-6 pt-8 pb-5 flex gap-2">
          {[56, 72, 64, 80, 60].map((w, i) => (
            <div
              key={i}
              className="h-7 bg-hairline rounded-full animate-pulse"
              style={{ width: w }}
            />
          ))}
        </div>

        {/* Brand heading */}
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-hairline animate-pulse">
            <div className="h-9 w-32 bg-hairline rounded-[8px]" />
            <div className="h-3 w-16 bg-hairline/60 rounded-full" />
          </div>
          {/* Product grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-hairline rounded-[16px] mb-3" />
                <div className="h-3 bg-hairline rounded-full mb-2" style={{ width: "70%" }} />
                <div className="h-3 bg-hairline/50 rounded-full mb-2" style={{ width: "50%" }} />
                <div className="h-3.5 bg-hairline rounded-full" style={{ width: "35%" }} />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
