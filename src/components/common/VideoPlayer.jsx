import { useRef, useState } from 'react'
import { RefreshCw } from 'lucide-react'

function VideoPlayer({ src, title }) {
  const videoRef = useRef(null)
  const [status, setStatus] = useState('idle')

  function retry() {
    setStatus('idle')
    videoRef.current?.load()
  }

  return (
    <div className="relative mt-8 aspect-video w-full overflow-hidden border border-[color:var(--border)] bg-neutral-950">
      <video
        ref={videoRef}
        aria-label={title}
        className="h-full w-full object-contain"
        controls
        playsInline
        preload="metadata"
        src={src}
        onCanPlay={() => setStatus('ready')}
        onError={() => setStatus('error')}
        onPlaying={() => setStatus('ready')}
        onStalled={() => setStatus('buffering')}
        onWaiting={() => setStatus('buffering')}
      >
        Ваш браузер не поддерживает воспроизведение видео.
      </video>

      {status === 'buffering' && (
        <div
          aria-live="polite"
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/35"
        >
          <span className="size-9 animate-spin rounded-full border-2 border-white/35 border-t-white" />
          <span className="sr-only">Буферизация видео</span>
        </div>
      )}

      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-neutral-950 px-5 text-center text-white">
          <p className="text-sm">Не удалось загрузить видео</p>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 border border-white/30 px-4 text-sm font-medium transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={retry}
          >
            <RefreshCw aria-hidden="true" className="size-4" />
            Повторить
          </button>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer
