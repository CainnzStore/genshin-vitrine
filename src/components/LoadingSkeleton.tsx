"use client"

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-fade-in">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass rounded-xl p-5 animate-pulse">
          <div className="flex gap-4">
            <div className="w-[120px] h-[120px] rounded-lg bg-slate-800/50 shimmer" />
            <div className="flex-1 space-y-3">
              <div className="flex justify-between">
                <div className="w-32 h-6 rounded-lg bg-slate-800/50 shimmer" />
                <div className="w-24 h-6 rounded-lg bg-slate-800/50 shimmer" />
              </div>
              <div className="w-48 h-4 rounded-lg bg-slate-800/50 shimmer" />
              <div className="flex gap-2">
                <div className="w-16 h-6 rounded-full bg-slate-800/50 shimmer" />
                <div className="w-16 h-6 rounded-full bg-slate-800/50 shimmer" />
              </div>
              <div className="flex gap-4 pt-2">
                <div className="w-20 h-4 rounded bg-slate-800/50 shimmer" />
                <div className="w-20 h-4 rounded bg-slate-800/50 shimmer" />
                <div className="w-20 h-4 rounded bg-slate-800/50 shimmer" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
