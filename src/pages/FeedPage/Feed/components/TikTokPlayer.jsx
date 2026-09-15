import { useEffect, useRef, useState } from 'react'
import { buildEmbedUrl } from '../utils/tiktokParser.js'
import styles from './TikTokPlayer.module.css'

export default function TikTokPlayer({ videoId, mp4Url, restaurantName }) {
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!mp4Url || !videoRef.current) return

    const el = videoRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: [0, 0.6, 1] }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [mp4Url])

  if (!mp4Url) {
    return (
      <section className={styles.tarjetaVideo} aria-label={`Video de ${restaurantName}`}>
        {!hasError ? (
          <iframe
            key={videoId}
            src={buildEmbedUrl(videoId)}
            className={styles.iframePlayer}
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
            title={`TikTok de ${restaurantName}`}
            onError={() => setHasError(true)}
          />
        ) : (
          <div className={styles.errorState}>
            <p className={styles.errorTitulo}>Video no disponible</p>
            <p className={styles.errorTexto}>
              Es posible que {restaurantName} haya eliminado o restringido este video.
            </p>
          </div>
        )}
        <div className={styles.overlayInfo}>
          <span className={styles.badgeRestaurante}>{restaurantName}</span>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.tarjetaVideo} aria-label={`Video de ${restaurantName}`}>
      <video
        ref={videoRef}
        src={mp4Url}
        className={styles.videoPlayer}
        loop
        playsInline
        controls
        preload="metadata"
        onError={() => setHasError(true)}
      />

      <div className={styles.overlayInfo}>
        <span className={styles.badgeRestaurante}>{restaurantName}</span>
      </div>
    </section>
  )
}