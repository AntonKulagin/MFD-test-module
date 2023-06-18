import { useDispatch, useSelector } from 'react-redux'
import { Empty } from 'src/components/Empty'
import { List } from 'src/components/List'
import { deleteTask, getIsFiltered, tasksSelector, tasksUncompleteSelector, toggleTask } from 'src/store/taskSlice'

export const TaskList = () => {
  const isFiltered = useSelector(getIsFiltered)
  const items = isFiltered ? useSelector(tasksUncompleteSelector) : useSelector(tasksSelector)
  const dispatch = useDispatch()

  const handleDelete = (id: Task['id']) => {
    dispatch(deleteTask(id))
  }

  const handleToggle = (id: Task['id']) => {
    dispatch(toggleTask(id))
  }

  return items.length > 0 ? <List items={items} onDelete={handleDelete} onToggle={handleToggle} /> : <Empty />
}
