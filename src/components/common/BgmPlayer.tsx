import { useBgmStore } from '../../store/useBgmStore';

interface BgmPlayerProps {
  trackId: string;
  title?: string;
}

const BgmPlayer = ({ trackId, title = 'AI BGM' }: BgmPlayerProps) => {
  const currentTrack = useBgmStore((state) => state.currentTrack);
  const isPlaying = useBgmStore((state) => state.isPlaying);
  const volume = useBgmStore((state) => state.volume);
  const play = useBgmStore((state) => state.play);
  const pause = useBgmStore((state) => state.pause);
  const stop = useBgmStore((state) => state.stop);
  const setVolume = useBgmStore((state) => state.setVolume);

  const isCurrentTrack = currentTrack === trackId;
  const canStop = isCurrentTrack && (isPlaying || currentTrack !== null);

  const handlePlayPause = () => {
    if (isCurrentTrack && isPlaying) {
      pause();
      return;
    }
    play(trackId);
  };

  return (
    <section className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-xs text-gray-500">
          {isCurrentTrack ? (isPlaying ? '재생 중' : '일시정지') : '대기 중'}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePlayPause}
          className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          {isCurrentTrack && isPlaying ? '일시정지' : '재생'}
        </button>
        <button
          type="button"
          onClick={stop}
          disabled={!canStop}
          className="px-3 py-1.5 rounded-md border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          정지
        </button>
      </div>

      <label className="block text-sm text-gray-700">
        볼륨: {Math.round(volume * 100)}%
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full mt-1"
        />
      </label>
    </section>
  );
};

export default BgmPlayer;
