import './Categories.css'

const CATEGORIES = [
  'Comercios',
  'Restaurantes',
  'Talleres',
  'Arte',
  'Deportes',
  'Cultura',
  'Tecnología',
  'Servicios',
  'Moda',
  'Música',
]

const listRepetitions = 3

function Categories() {
  return (
    <section className="categories" id="actividades">

      <div className="categories__viewport">
        <ul className="categories__track">
          {Array.from({ length: listRepetitions }, (_, listIndex) => (
            <li
              key={listIndex}
              className="categories__group"
              aria-hidden={listIndex > 0}
            >
              {CATEGORIES.map((category) => (
                <a
                  key={`${listIndex}-${category}`}
                  href="#actividades"
                  tabIndex={listIndex > 0 ? -1 : 0}
                  className="categories__card"
                >
                  {category}
                </a>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Categories
