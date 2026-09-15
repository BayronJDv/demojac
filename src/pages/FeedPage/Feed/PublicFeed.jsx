import { useEffect, useState } from 'react'
import { supabase } from './lib/supabaseClient.js'
import TikTokPlayer from './components/TikTokPlayer.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import EmptyState from './components/EmptyState.jsx'
import styles from './PublicFeed.module.css'

export default function PublicFeed() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function loadVideos() {
      setLoading(true)
      setError(null)

      const { data, fetchError } = await supabase
        .from('tiktok_videos')
        .select('id, video_id, mp4_url, restaurant_name, created_at')
        .order('created_at', { ascending: false })

      if (!isMounted) return

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setVideos(data ?? [])
      }
      setLoading(false)
    }

    loadVideos()
    return () => { isMounted = false }
  }, [])

  if (loading) return <LoadingSpinner label="Cargando el feed…" />

  if (error) {
    return (
      <EmptyState
        title="No se pudo cargar el feed"
        description={`Ocurrió un error al conectar con la base de datos: ${error}`}
      />
    )
  }

  if (videos.length === 0) {
    return (
      <EmptyState
        title="Aún no hay videos"
        description="Los restaurantes todavía no han publicado contenido. Vuelve pronto."
      />
    )
  }

  return (
    <div className={styles.contenedorFeed}>
      {videos.map((video) => (
        <TikTokPlayer
          key={video.id}
          videoId={video.video_id}
          mp4Url={video.mp4_url}
          restaurantName={video.restaurant_name}
        />
      ))}
    </div>
  )
}