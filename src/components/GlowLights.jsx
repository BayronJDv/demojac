import './GlowLights.css'

const LIGHTS = [
  { className: 'glow-lights__light glow-lights__light--1', size: 420, top: '-8%', left: '8%', duration: '18s' },
  { className: 'glow-lights__light glow-lights__light--2', size: 300, top: '30%', left: '72%', duration: '22s' },
  { className: 'glow-lights__light glow-lights__light--3', size: 460, top: '58%', left: '18%', duration: '26s' },
  { className: 'glow-lights__light glow-lights__light--4', size: 260, top: '12%', left: '45%', duration: '16s' },
]

function GlowLights() {
  return (
    <div className="glow-lights" aria-hidden="true">
      {LIGHTS.map(({ className, size, top, left, duration }) => (
        <span
          key={className}
          className={className}
          style={{ width: size, height: size, top, left, animationDuration: duration }}
        />
      ))}
    </div>
  )
}

export default GlowLights
