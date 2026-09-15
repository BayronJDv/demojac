/**
 * Obtiene la URL directa del MP4 de un video de TikTok usando la API pública de TikWM.
 * @param {string} videoId - ID numérico del video de TikTok.
 * @returns {Promise<string>} URL directa del MP4.
 */
export async function fetchDirectMp4Url(videoId) {
  const endpoint = `https://www.tikwm.com/api/?url=${videoId}&hd=1`

  const res = await fetch(endpoint)
  if (!res.ok) {
    throw new Error(`TikWM respondió con ${res.status}`)
  }

  const json = await res.json()

  // Estructura de respuesta: { code: 0, data: { play: "...", ... } }
  if (json.code !== 0 || !json.data?.play) {
    throw new Error('TikWM no devolvió una URL de video válida.')
  }

  return json.data.play
}