import React, { useState } from 'react';
import { AthleteVideo } from '../types/sports';
import { X, Play, Pause, RotateCcw, Volume2, ShieldCheck, Clock, Gauge } from 'lucide-react';

interface VideoPlayerModalProps {
  video: AthleteVideo;
  athleteName: string;
  sport: string;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  athleteName,
  sport,
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-white">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-stone-800">
          <div>
            <span className="text-xs font-bold text-lime-400 uppercase tracking-widest">
              Performance Tape · {sport}
            </span>
            <h3 className="text-lg font-black text-white">{video.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative aspect-video bg-black flex flex-col justify-between p-6">
          {/* Top Overlays */}
          <div className="flex justify-between items-start z-10">
            <div className="bg-stone-900/80 backdrop-blur px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Verified Match Footage ({video.recordedAt})</span>
            </div>
            <div className="bg-stone-900/80 backdrop-blur px-3 py-1 rounded text-xs font-mono text-stone-300 border border-white/10">
              Speed: {playbackSpeed}x
            </div>
          </div>

          {/* Central Play/Pause Watermark Effect */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-lime-400/90 hover:bg-lime-400 text-emerald-950 flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
            </button>
          </div>

          {/* Bottom Video Controls & Chapter Bar */}
          <div className="z-10 bg-stone-950/75 backdrop-blur-md rounded-xl p-3 border border-white/10 space-y-2">
            {/* Timeline Progress */}
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden flex cursor-pointer">
              <div
                className="bg-lime-400 h-full transition-all duration-300"
                style={{ width: `${((activeChapter + 1) / video.highlights.length) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-stone-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button
                  onClick={() => setActiveChapter(0)}
                  className="hover:text-white transition-colors cursor-pointer"
                  title="Replay from start"
                >
                  <RotateCcw size={15} />
                </button>
                <span className="font-mono tabular-nums text-stone-400">
                  {video.highlights[activeChapter]?.time || "00:00"} / {video.duration}
                </span>
                <span className="hidden sm:inline text-stone-400">|</span>
                <span className="hidden sm:inline text-lime-400 font-semibold truncate max-w-xs">
                  {video.highlights[activeChapter]?.label}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 0.5 : playbackSpeed === 0.5 ? 1.5 : 1)}
                  className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] font-mono font-semibold transition-colors"
                  title="Toggle slow-motion / speed"
                >
                  {playbackSpeed}x
                </button>
                <Volume2 size={16} className="text-stone-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Chapter Jumps */}
        <div className="p-6 bg-stone-900 border-t border-stone-800">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Clock size={14} /> Highlight Chapters (Click to Jump)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {video.highlights.map((chapter, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveChapter(idx);
                  setIsPlaying(true);
                }}
                className={`p-2.5 rounded-lg text-left text-xs transition-all border flex items-center justify-between cursor-pointer ${
                  activeChapter === idx
                    ? 'bg-stone-800 border-lime-400/50 text-white font-semibold'
                    : 'bg-stone-950/40 border-stone-800 text-stone-300 hover:bg-stone-800/60'
                }`}
              >
                <span className="truncate mr-2">{chapter.label}</span>
                <span className="font-mono text-lime-400 text-[11px] shrink-0 font-medium">
                  {chapter.time}
                </span>
              </button>
            ))}
          </div>

          {video.notes && (
            <p className="text-xs text-stone-400 mt-4 italic bg-stone-950/50 p-3 rounded-lg border border-stone-800">
              Scout note: {video.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
