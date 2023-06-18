import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { completeCount, getIsFiltered, setIsFiltered } from 'src/store/taskSlice'

export const FilterButton = () => {
  const dispatch = useDispatch()
  const isFiltered = useSelector(getIsFiltered)
  const completeCountItems = useSelector(completeCount)

  const [showCompleteTasks, setShowCompleteTasks] = useState(isFiltered)

  useEffect(() => {
    dispatch(setIsFiltered(showCompleteTasks))
  }, [showCompleteTasks])

  const handleClick = () => {
    setShowCompleteTasks(prev => !prev)
  }
  return (
    <div className="filter">
      <button className="filter-button" onClick={handleClick} data-testid="кнопка фильтрации">
        {!showCompleteTasks ? 'Скрыть выполненные задачи' : 'Показать выполненные задачи:'}
      </button>
      {showCompleteTasks && (
        <div className="filter-complete-count" data-testid="количество задач">
          {completeCountItems} шт.
        </div>
      )}
    </div>
  )
}
