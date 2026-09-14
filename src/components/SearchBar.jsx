import { useId, useState } from 'react'
import lupa from '../assets/logos/lupa.svg'
import './SearchBar.css'

function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('')
  const searchId = useId()

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit?.(value)
  }

  return (
    <form
      className="search-bar"
      role="search"
      onSubmit={handleSubmit}
      aria-label="Buscador"
    >
      <label htmlFor={searchId} className="visually-hidden">
        Buscar
      </label>
      <img src={lupa} alt="" className="search-bar__icon" />
      <input
        id={searchId}
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="search-bar__input"
      />
    </form>
  )
}

export default SearchBar
