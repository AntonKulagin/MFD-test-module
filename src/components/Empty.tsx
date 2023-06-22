import { useSelector } from 'react-redux'
import { completeCount } from 'src/store/taskSlice'

export const Empty = () => {
  const completeCountTasks = useSelector(completeCount)
  return (
    <div className="empty-wrapper">
      {completeCountTasks ? 'Все задачи выполнены.' : 'Вы пока не создали ни одной задачи.'}
      <br />
      Давайте что-нибудь запланируем?
    </div>
  )
}
