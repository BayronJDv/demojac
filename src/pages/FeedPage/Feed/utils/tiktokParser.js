/**
 * Utilidades para validar y extraer el video_id de una URL de TikTok.
 *
 * Formatos soportados directamente (contienen el ID numérico en la URL):
 *   https://www.tiktok.com/@usuario/video/7123456789012345678
 *   https://www.tiktok.com/@usuario/video/7123456789012345678?query=params
 *   www.tiktok.com/@usuario/video/7123456789012345678
 *
 * NO soportados sin un paso extra de resolución de redirección (requeriría backend):
 *   https://vm.tiktok.com/XXXXXXX/
 *   https://vt.tiktok.com/XXXXXXX/
 * Estos son enlaces acortados que redirigen al formato largo; como la app es
 * 100% client-side, se le pide al usuario que pegue el enlace completo
 * (se puede obtener abriendo el enlace corto en el navegador y copiando la URL resultante).
 */

const FULL_URL_REGEX = /tiktok\.com\/@[\w.-]+\/video\/(\d+)/i

export class InvalidTikTokUrlError extends Error {
  constructor(message) {
    super(message)
    this.name = 'InvalidTikTokUrlError'
  }
}

/**
 * Extrae el video_id numérico de una URL de TikTok.
 * @param {string} rawUrl - URL pegada por el usuario.
 * @returns {string} video_id
 * @throws {InvalidTikTokUrlError} si la URL no tiene un formato reconocible.
 */
export function extractTikTokVideoId(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') {
    throw new InvalidTikTokUrlError('Debes ingresar una URL de TikTok.')
  }

  const trimmed = rawUrl.trim()

  if (/vm\.tiktok\.com|vt\.tiktok\.com/i.test(trimmed)) {
    throw new InvalidTikTokUrlError(
      'Los enlaces cortos (vm.tiktok.com / vt.tiktok.com) no son compatibles. ' +
      'Abre el enlace en tu navegador y pega la URL completa (con "/video/…").'
    )
  }

  const match = trimmed.match(FULL_URL_REGEX)
  if (!match) {
    throw new InvalidTikTokUrlError(
      'La URL no parece ser un enlace válido de video de TikTok. ' +
      'Debe tener el formato: tiktok.com/@usuario/video/1234567890'
    )
  }

  return match[1]
}

/**
 * Devuelve true/false sin lanzar excepción — útil para validación en vivo de formularios.
 */
export function isValidTikTokUrl(rawUrl) {
  try {
    extractTikTokVideoId(rawUrl)
    return true
  } catch {
    return false
  }
}

/**
 * Construye la URL del reproductor embebido oficial de TikTok a partir del video_id.
 *
 * Parámetros relevantes de la Embed Player API v1:
 *   autoplay=1     → intenta reproducir al cargar
 *   loop=1         → repite el video
 *   controls=1     → muestra controles nativos (play/pause/volumen)
 *   rel=0          → sin videos relacionados
 *   music_info=0   → oculta info de música
 *   description=0  → oculta descripción
 *   progress_bar=1 → barra de progreso (útil con loop)
 *   play_button=1  → botón de play por si el usuario pausa
 *   volume_control=1 → control de volumen para que el usuario pueda activar audio
 */
export function buildEmbedUrl(videoId) {
  const params = new URLSearchParams({
    autoplay: '1',
    loop: '1',
    controls: '1',
    rel: '0',
    music_info: '0',
    description: '0',
    progress_bar: '1',
    play_button: '1',
    volume_control: '1',
    muted: '0',
  })

  return `https://www.tiktok.com/player/v1/${videoId}?${params.toString()}`
}
