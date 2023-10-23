import './index.css'

const TagItem = props => {
  const {eachItem, onSelectTag, activeTagId} = props
  const onClickTagName = () => {
    onSelectTag(eachItem)
  }

  const className = activeTagId === eachItem.optionId ? 'btn' : ''
  return (
    <li className="tag-item">
      <button
        type="button"
        className={`tag-button ${className}`}
        onClick={onClickTagName}
      >
        {eachItem.displayText}
      </button>
    </li>
  )
}

export default TagItem
