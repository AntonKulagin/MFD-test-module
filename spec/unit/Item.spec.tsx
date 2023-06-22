import { render, screen } from '@testing-library/react'
import { Item } from 'src/components/Item'
import * as taskSliceSelectors from 'src/store/taskSlice'
import { JestStoreProvider } from '../utils/JestStoreProvider'

describe('Элемент списка задач', () => {
  it('название не должно быть больше 32 символов', () => {
    const onDelete = jest.fn()
    const onToggle = jest.fn()
    const spied = jest.spyOn(taskSliceSelectors, 'uncompleteCount').mockReturnValue(1)
    const item: Task = {
      id: '1111',
      header: 'Название задачи больше 32 символов ',
      done: false,
    }

    render(<Item {...item} key={item.id} onDelete={onDelete} onToggle={onToggle} />, {
      wrapper: JestStoreProvider,
    })

    const itemLabel = screen.queryByLabelText(/название задачи/i)

    expect(itemLabel).not.toBeInTheDocument()
  })
  it('название не должно быть пустым', () => {
    const onDelete = jest.fn()
    const onToggle = jest.fn()
    const spied = jest.spyOn(taskSliceSelectors, 'uncompleteCount').mockReturnValue(1)
    const item: Task = {
      id: '1111',
      header: '',
      done: false,
    }

    render(<Item {...item} key={item.id} onDelete={onDelete} onToggle={onToggle} />, {
      wrapper: JestStoreProvider,
    })

    const itemLabel = screen.queryByLabelText('')

    expect(itemLabel).not.toBeInTheDocument()
  })
  it('нельзя удалять невыполненные задачи', () => {
    const onDelete = jest.fn()
    const onToggle = jest.fn()
    const spied = jest.spyOn(taskSliceSelectors, 'uncompleteCount').mockReturnValue(1)
    const item: Task = {
      id: '1111',
      header: 'невыполненная задача',
      done: false,
    }

    render(<Item {...item} key={item.id} onDelete={onDelete} onToggle={onToggle} />, {
      wrapper: JestStoreProvider,
    })

    const liElement = screen.getByRole('listitem')

    const itemButton = screen.getByRole('button')

    expect(liElement).toMatchSnapshot()
    expect(itemButton).toBeDisabled()
  })
})
