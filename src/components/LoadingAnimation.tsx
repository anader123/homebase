import React from "react";

const SkeletonCard = ({ withBorder = true }: { withBorder?: boolean }) => (
  <div
    className={`w-full bg-darkgray p-6 rounded-md flex justify-center items-center ${
      withBorder ? "border-2 border-gray-700" : ""
    }`}
  >
    <div className="animate-pulse flex flex-col items-center gap-6 w-full mt-4">
      <div className="rounded-md bg-slate-700 h-60 w-full"></div>
      <div className="space-y-6 py-1 w-full">
        <div className="h-2 bg-slate-700 rounded"></div>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-700 rounded col-span-2"></div>
            <div className="h-2 bg-slate-700 rounded col-span-1"></div>
          </div>
          <div className="h-2 bg-slate-700 rounded"></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-700 rounded col-span-2"></div>
          <div className="h-2 bg-slate-700 rounded col-span-1"></div>
        </div>
      </div>
    </div>
  </div>
);

const LoadingAnimation = ({ isBig }: { isBig?: boolean }) => {
  return isBig ? (
    <div className="w-full h-full bg-darkgray p-6 rounded-md flex flex-col mt-5 sm:mt-0 sm:flex-row justify-around border-2 border-gray-700 gap-6 sm:gap-12">
      <SkeletonCard withBorder={false} />
      <SkeletonCard withBorder={false} />
      <SkeletonCard withBorder={false} />
    </div>
  ) : (
    <SkeletonCard />
  );
};

export default LoadingAnimation;
