import { useState } from 'react'
import { useSelector } from 'react-redux'
import { FilterMessage } from 'src/components/FilterMessage'
import { FilterButton } from 'src/components/FilterButton'
import { completeCount, fullCount, uncompleteCount } from 'src/store/taskSlice'

export const Filter = () => {
  const fullCountItems = useSelector(fullCount)
  const completeCountItems = useSelector(completeCount)

  if (!fullCountItems) {
    return null
  }

  return <>{completeCountItems ? <FilterButton /> : <FilterMessage />}</>
}
