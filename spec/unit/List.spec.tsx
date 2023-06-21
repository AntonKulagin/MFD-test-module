import { render, screen } from '@testing-library/react'
import { List } from 'src/components/List'
import * as taskSiceSelektors from '../../src/store/taskSlice'
import { JestStoreProvider } from '../utils/JestStoreProvider'

it('отображение списка задач', () => {
  const onDelete = jest.fn()
  const onToggle = jest.fn()
  const spied = jest.spyOn(taskSiceSelektors, 'uncompleteCount').mockReturnValue(2)

  const items: Task[] = [
    {
      id: '1',
      header: 'купить хлеб',
      done: false,
    },
    {
      id: '2',
      header: 'купить молоко',
      done: false,
    },
    {
      id: '3',
      header: 'выгулять собаку',
      done: true,
    },
  ]
  const { rerender, asFragment } = render(<List items={items} onDelete={onDelete} onToggle={onToggle} />, {
    wrapper: JestStoreProvider,
  })
  const firstRender = asFragment()

  items.pop()

  rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />)
  const secondRender = asFragment()

  expect(firstRender).toMatchDiffSnapshot(secondRender)
})

it('Список содержит не больше 10 невыполненных задач', () => {
  const onDelete = jest.fn()
  const onToggle = jest.fn()
  const spied = jest.spyOn(taskSiceSelektors, 'uncompleteCount').mockReturnValue(10)

  const items: Task[] = [
    {
      id: '1',
      header: 'Сходить за ряженкой',
      done: false,
    },
    {
      id: '2',
      header: 'Перебрать двигатель',
      done: false,
    },
    {
      id: '3',
      header: 'Поделиться радостью',
      done: false,
    },
    {
      id: '4',
      header: 'Изучить тайны вселенной',
      done: false,
    },
    {
      id: '5',
      header: 'Разобрать свой внутренний мир',
      done: false,
    },
    {
      id: '6',
      header: 'Почесать пятку',
      done: false,
    },
    {
      id: '7',
      header: 'Причесать подмышки',
      done: false,
    },
    {
      id: '8',
      header: 'Побрить кота',
      done: false,
    },
    {
      id: '9',
      header: 'Спуститься к центру Земли',
      done: false,
    },
    {
      id: '10',
      header: 'Поплавать в Марианской впадине',
      done: false,
    },
    {
      id: '11',
      header: 'Завести будильник на 6:30',
      done: true,
    },
  ]

  render(<List items={items} onDelete={onDelete} onToggle={onToggle} />, {
    wrapper: JestStoreProvider,
  })

  const unCompleteCheckbox = screen.getByRole('checkbox', {
    name: /Поплавать в Марианской впадине/i,
  })
  const completeCheckbox = screen.getByRole('checkbox', {
    name: /Завести будильник на 6:30/i,
  })

  expect(unCompleteCheckbox).toBeEnabled()
  expect(completeCheckbox).toBeDisabled()
})
