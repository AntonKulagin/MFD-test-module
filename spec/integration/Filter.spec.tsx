import { App } from 'src/App'
import { render, screen } from '@testing-library/react'
import ue from '@testing-library/user-event'

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
})

describe('Список задач', () => {
  // не содержит выполненные задачи
  // после нажатия на кнопку фильтрации
  it('с включенным фильтром', async () => {
    render(<App />)

    const inputEl = screen.getByRole('textbox')
    const addBtnEl = screen.getByAltText(/Добавить/i)

    await userEvent.clear(inputEl)
    await userEvent.type(inputEl, 'Первый заголовок')
    await userEvent.click(addBtnEl)

    await userEvent.type(inputEl, 'Второй заголовок')
    await userEvent.click(addBtnEl)

    const completedTask = screen.getByRole('checkbox', { name: /первый заголовок/i })
    await userEvent.click(completedTask)

    const unCompletedTask = screen.getByRole('checkbox', { name: /второй заголовок/i })

    const filterButton = screen.getByTestId(/кнопка фильтрации/i)
    await userEvent.click(filterButton)

    expect(completedTask).not.toBeInTheDocument()
    expect(unCompletedTask).toBeInTheDocument()
  })

  // показывает как выполненные, так и не выполненные задачи
  // после повторного нажатия на кнопку фильтрации
  it('с выключенным фильтром', async () => {
    render(<App />)

    const filterButton = screen.getByTestId(/кнопка фильтрации/i)
    await userEvent.click(filterButton)

    const completedTask = screen.getByRole('checkbox', { name: /первый заголовок/i })
    const unCompletedTask = screen.getByRole('checkbox', { name: /второй заголовок/i })

    expect(completedTask).toBeInTheDocument()
    expect(unCompletedTask).toBeInTheDocument()
  })

  // при включенной фильтрации,
  // показать количество выполненных задач,
  // при выключенной, это поле отсутствует
  it('с включенным фильтром показывает количство выполненных задач', async () => {
    render(<App />)

    const filterButton = screen.getByTestId(/кнопка фильтрации/i)
    await userEvent.click(filterButton)

    const quantity = screen.getByTestId(/количество задач/i)

    expect(quantity).toBeInTheDocument()

    await userEvent.click(filterButton)

    expect(quantity).not.toBeInTheDocument()
  })
})
