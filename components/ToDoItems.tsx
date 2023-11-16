type TodoItemsProps={
    id: string
    title: string
    complete?: boolean
}

const ToDoItems = ({id,title,complete}:TodoItemsProps) => {
  return (
    <li
    className="flex gap-1 items-center">
        <input id={id} type="checkbox" className="cursor-pointer peer" />
        <label htmlFor={id} className="cursor-pointer peer-checked:line-through" >
            {title}
        </label>
    </li>
  )
}

export default ToDoItems
