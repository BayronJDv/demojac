import { useRef, useState } from 'react'
import './Afiliacion.css'

const API_URL = 'http://localhost:8080/upload'

function crearFormularioVacio() {
  return {
    nombre: '',
    email: '',
    telefono: '',
    habilidades: [],
    experiencia: [],
    educacion: [],
  }
}

const texto = (valor) => (typeof valor === 'string' ? valor : '')

const primerTexto = (objeto, ...claves) => {
  for (const clave of claves) {
    if (typeof objeto?.[clave] === 'string' && objeto[clave] !== '') return objeto[clave]
  }
  return ''
}

function normalizarDatos(json) {
  const datos = crearFormularioVacio()

  if (!json || typeof json !== 'object') return datos

  datos.nombre = texto(json.nombre)
  datos.email = texto(json.email)
  datos.telefono = texto(json.telefono)

  if (Array.isArray(json.habilidades)) {
    datos.habilidades = json.habilidades.filter(
      (item) => typeof item === 'string' && item.trim() !== '',
    )
  }

  if (Array.isArray(json.experiencia)) {
    datos.experiencia = json.experiencia
      .filter((item) => item && typeof item === 'object')
      .map((item) => ({
        puesto: texto(item.puesto),
        empresa: texto(item.empresa),
        fecha_inicio: primerTexto(item, 'fecha_inicio', 'fechaInicio'),
        fecha_fin: primerTexto(item, 'fecha_fin', 'fechaFin'),
      }))
  }

  if (Array.isArray(json.educacion)) {
    datos.educacion = json.educacion
      .filter((item) => item && typeof item === 'object')
      .map((item) => ({
        titulo: texto(item.titulo),
        institucion: texto(item.institucion),
        ano: primerTexto(item, 'ano', 'año', 'anio'),
      }))
  }

  return datos
}

async function extraerDatosCV(archivo) {
  const formData = new FormData()
  formData.append('file', archivo)

  const respuesta = await fetch(API_URL, { method: 'POST', body: formData })
  const cuerpo = await respuesta.json().catch(() => null)

  if (!respuesta.ok || !cuerpo) {
    throw new Error(
      cuerpo?.error || 'No fue posible procesar el PDF. Verifica que sea un CV legible.',
    )
  }

  return normalizarDatos(cuerpo.json)
}

function Afiliacion() {
  const [paso, setPaso] = useState('subir') // subir | procesando | formulario | exito
  const [archivo, setArchivo] = useState(null)
  const [error, setError] = useState('')
  const [datos, setDatos] = useState(crearFormularioVacio)
  const [habilidadNueva, setHabilidadNueva] = useState('')
  const inputArchivoRef = useRef(null)
  const inputHabilidadRef = useRef(null)

  const seleccionarArchivo = (event) => {
    const seleccionado = event.target.files?.[0]
    event.target.value = ''
    if (!seleccionado) return

    if (seleccionado.type !== 'application/pdf') {
      setError('Por favor selecciona un archivo PDF.')
      return
    }

    setError('')
    setArchivo(seleccionado)
    procesarCV(seleccionado)
  }

  const soltarArchivo = (event) => {
    event.preventDefault()
    const soltado = event.dataTransfer?.files?.[0]
    if (!soltado) return

    if (soltado.type !== 'application/pdf') {
      setError('Por favor selecciona un archivo PDF.')
      return
    }

    setError('')
    setArchivo(soltado)
    procesarCV(soltado)
  }

  const procesarCV = async (pdf) => {
    setPaso('procesando')

    try {
      const extraidos = await extraerDatosCV(pdf)
      setDatos(extraidos)
      setPaso('formulario')
    } catch (motivo) {
      setError(
        motivo instanceof Error && motivo.message
          ? motivo.message
          : 'No fue posible procesar el PDF.',
      )
      setArchivo(null)
      setPaso('subir')
    }
  }

  const actualizarCampo = (campo, valor) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }))
  }

  const agregarHabilidad = () => {
    const texto = habilidadNueva.trim()
    if (texto === '') return
    setDatos((prev) => ({
      ...prev,
      habilidades: prev.habilidades.includes(texto)
        ? prev.habilidades
        : [...prev.habilidades, texto],
    }))
    setHabilidadNueva('')
    inputHabilidadRef.current?.focus()
  }

  const quitarHabilidad = (habilidad) => {
    setDatos((prev) => ({
      ...prev,
      habilidades: prev.habilidades.filter((item) => item !== habilidad),
    }))
  }

  const actualizarLista = (lista, indice, campo, valor) => {
    setDatos((prev) => ({
      ...prev,
      [lista]: prev[lista].map((item, i) =>
        i === indice ? { ...item, [campo]: valor } : item,
      ),
    }))
  }

  const quitarDeLista = (lista, indice) => {
    setDatos((prev) => ({
      ...prev,
      [lista]: prev[lista].filter((_, i) => i !== indice),
    }))
  }

  const registrar = (event) => {
    event.preventDefault()
    setPaso('exito')
  }

  const volverInicio = () => {
    setPaso('subir')
    setArchivo(null)
    setDatos(crearFormularioVacio())
    setError('')
  }

  if (paso === 'exito') {
    return (
      <section className="afiliacion" id="afiliacion">
        <div className="afiliacion__panel afiliacion__panel--exito">
          <div className="afiliacion__exito-icono" aria-hidden="true">✓</div>
          <h1 className="afiliacion__titulo">¡Registro completado!</h1>
          <p className="afiliacion__texto">
            Tu cuenta quedó creada con los datos de tu CV. Te contactaremos
            pronto con más información sobre tu afiliación.
          </p>
          <button type="button" className="afiliacion__boton" onClick={volverInicio}>
            Volver al inicio
          </button>
        </div>
      </section>
    )
  }

  if (paso === 'procesando') {
    return (
      <section className="afiliacion" id="afiliacion">
        <div className="afiliacion__panel">
          <div className="afiliacion__spinner" aria-hidden="true" />
          <h1 className="afiliacion__titulo">Extrayendo datos de tu CV...</h1>
          <p className="afiliacion__texto">
            Estamos leyendo <strong>{archivo?.name ?? 'tu PDF'}</strong> con
            inteligencia artificial. Esto toma solo unos segundos.
          </p>
        </div>
      </section>
    )
  }

  if (paso === 'subir') {
    return (
      <section className="afiliacion" id="afiliacion">
        <div className="afiliacion__panel">
          <h1 className="afiliacion__titulo">
            Únete a <span className="afiliacion__titulo-acento">El Ingenio</span>
          </h1>
          <p className="afiliacion__texto">
            Crea tu cuenta sin escribir nada a mano: sube tu hoja de vida en
            PDF y llenaremos el formulario de registro por ti. Tú solo debes
            revisar que la información esté correcta.
          </p>

          <div
            className="afiliacion__dropzone"
            role="button"
            tabIndex={0}
            aria-label="Subir hoja de vida en PDF"
            onClick={() => inputArchivoRef.current?.click()}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                inputArchivoRef.current?.click()
              }
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={soltarArchivo}
          >
            <span className="afiliacion__dropzone-icono" aria-hidden="true">📄</span>
            <p className="afiliacion__dropzone-titulo">
              Arrastra tu hoja de vida aquí
            </p>
            <p className="afiliacion__dropzone-alternativa">
              o haz clic para elegir un archivo
            </p>
            <span className="afiliacion__dropzone-hint">Solo archivos PDF</span>
          </div>

          <input
            ref={inputArchivoRef}
            type="file"
            accept="application/pdf"
            className="afiliacion__input-archivo"
            onChange={seleccionarArchivo}
          />

          {error && (
            <p className="afiliacion__error" role="alert">
              {error}
            </p>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="afiliacion" id="afiliacion">
      <div className="afiliacion__panel">
        <h1 className="afiliacion__titulo">Revisa tu información</h1>
        <p className="afiliacion__texto">
          Extrajimos los datos de <strong>{archivo?.name ?? 'tu PDF'}</strong>.
          Revisa, corrige lo que necesites y crea tu cuenta.
        </p>

        <form className="afiliacion__form" onSubmit={registrar}>
          <div className="afiliacion__campo">
            <label htmlFor="afiliacion-nombre">Nombre completo</label>
            <input
              id="afiliacion-nombre"
              type="text"
              value={datos.nombre}
              onChange={(event) => actualizarCampo('nombre', event.target.value)}
              placeholder="Tu nombre"
            />
          </div>

          <div className="afiliacion__campo">
            <label htmlFor="afiliacion-email">Correo electrónico</label>
            <input
              id="afiliacion-email"
              type="email"
              value={datos.email}
              onChange={(event) => actualizarCampo('email', event.target.value)}
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div className="afiliacion__campo">
            <label htmlFor="afiliacion-telefono">Teléfono</label>
            <input
              id="afiliacion-telefono"
              type="tel"
              value={datos.telefono}
              onChange={(event) => actualizarCampo('telefono', event.target.value)}
              placeholder="Tu teléfono"
            />
          </div>

          <div className="afiliacion__campo">
            <label htmlFor="afiliacion-habilidad">Habilidades</label>
            {datos.habilidades.length > 0 && (
              <ul className="afiliacion__chips">
                {datos.habilidades.map((habilidad) => (
                  <li key={habilidad} className="afiliacion__chip">
                    {habilidad}
                    <button
                      type="button"
                      className="afiliacion__chip-quitar"
                      aria-label={`Quitar ${habilidad}`}
                      onClick={() => quitarHabilidad(habilidad)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="afiliacion__chips-agregar">
              <input
                ref={inputHabilidadRef}
                id="afiliacion-habilidad"
                type="text"
                value={habilidadNueva}
                onChange={(event) => setHabilidadNueva(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    agregarHabilidad()
                  }
                }}
                placeholder="Agregar una habilidad"
              />
              <button
                type="button"
                className="afiliacion__boton-secundario"
                onClick={agregarHabilidad}
              >
                Agregar
              </button>
            </div>
          </div>

          <fieldset className="afiliacion__lista">
            <legend>Experiencia laboral</legend>
            {datos.experiencia.map((item, indice) => (
              <div key={indice} className="afiliacion__item">
                <div className="afiliacion__item-fila">
                  <input
                    type="text"
                    value={item.puesto}
                    onChange={(event) =>
                      actualizarLista('experiencia', indice, 'puesto', event.target.value)
                    }
                    placeholder="Puesto"
                    aria-label="Puesto"
                  />
                  <input
                    type="text"
                    value={item.empresa}
                    onChange={(event) =>
                      actualizarLista('experiencia', indice, 'empresa', event.target.value)
                    }
                    placeholder="Empresa"
                    aria-label="Empresa"
                  />
                </div>
                <div className="afiliacion__item-fila">
                  <input
                    type="text"
                    value={item.fecha_inicio}
                    onChange={(event) =>
                      actualizarLista('experiencia', indice, 'fecha_inicio', event.target.value)
                    }
                    placeholder="Fecha inicio"
                    aria-label="Fecha de inicio"
                  />
                  <input
                    type="text"
                    value={item.fecha_fin}
                    onChange={(event) =>
                      actualizarLista('experiencia', indice, 'fecha_fin', event.target.value)
                    }
                    placeholder="Fecha fin"
                    aria-label="Fecha de fin"
                  />
                  <button
                    type="button"
                    className="afiliacion__quitar"
                    aria-label="Quitar experiencia"
                    onClick={() => quitarDeLista('experiencia', indice)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="afiliacion__boton-secundario"
              onClick={() =>
                setDatos((prev) => ({
                  ...prev,
                  experiencia: [
                    ...prev.experiencia,
                    { puesto: '', empresa: '', fecha_inicio: '', fecha_fin: '' },
                  ],
                }))
              }
            >
              + Agregar experiencia
            </button>
          </fieldset>

          <fieldset className="afiliacion__lista">
            <legend>Educación</legend>
            {datos.educacion.map((item, indice) => (
              <div key={indice} className="afiliacion__item">
                <div className="afiliacion__item-fila">
                  <input
                    type="text"
                    value={item.titulo}
                    onChange={(event) =>
                      actualizarLista('educacion', indice, 'titulo', event.target.value)
                    }
                    placeholder="Título"
                    aria-label="Título"
                  />
                  <input
                    type="text"
                    value={item.institucion}
                    onChange={(event) =>
                      actualizarLista('educacion', indice, 'institucion', event.target.value)
                    }
                    placeholder="Institución"
                    aria-label="Institución"
                  />
                  <input
                    type="text"
                    value={item.ano}
                    onChange={(event) =>
                      actualizarLista('educacion', indice, 'ano', event.target.value)
                    }
                    placeholder="Año"
                    aria-label="Año"
                  />
                  <button
                    type="button"
                    className="afiliacion__quitar"
                    aria-label="Quitar educación"
                    onClick={() => quitarDeLista('educacion', indice)}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="afiliacion__boton-secundario"
              onClick={() =>
                setDatos((prev) => ({
                  ...prev,
                  educacion: [
                    ...prev.educacion,
                    { titulo: '', institucion: '', ano: '' },
                  ],
                }))
              }
            >
              + Agregar educación
            </button>
          </fieldset>

          <button type="submit" className="afiliacion__boton">
            Crear cuenta
          </button>
        </form>
      </div>
    </section>
  )
}

export default Afiliacion
