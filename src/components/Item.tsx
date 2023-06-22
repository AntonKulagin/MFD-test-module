import { useSelector } from 'react-redux'
import { DeleteButton } from './DeleteButton'
import { uncompleteCount } from 'src/store/taskSlice'

type Props = Task & {
  onDelete: (id: Task['id']) => void
  onToggle: (id: Task['id']) => void
}

export const Item = (props: Props) => {
  const uncompleteCountTasks = useSelector(uncompleteCount)

  const testControlHeader = props.header
  if (!testControlHeader.length || testControlHeader.length > 32) {
    return null
  }

  const handleToggle = (id: string, done: boolean) => {
    if (uncompleteCountTasks >= 10 && done) {
      return
    }
    props.onToggle(id)
  }

  return (
    <li className="item-wrapper">
      <input
        type="checkbox"
        disabled={uncompleteCountTasks >= 10 && props.done}
        id={props.id}
        defaultChecked={props.done}
        onChange={() => handleToggle(props.id, props.done)}
      />
      <label htmlFor={props.id} onClick={() => handleToggle(props.id, props.done)}>
        {props.done ? <s>{props.header}</s> : props.header}
      </label>
      <DeleteButton disabled={!props.done} onClick={() => props.onDelete(props.id)} />
    </li>
  )
}
