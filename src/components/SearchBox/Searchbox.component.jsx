import './searchbox.css'

const SearchBox = ({placeholder, onChangeHandler}) => {
  return (
    <input
      className = "searchbox"
      type='search'
      placeholder= {placeholder}
      onChange = {onChangeHandler}

    />
  )
}
export default SearchBox;