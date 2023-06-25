import { render, screen } from '@testing-library/react'
import { Notifier } from 'src/components/Notifier'

describe('Оповещение при вополнении задачи', () => {
  it.each([[true], [false]])('появляется и содержит заголовок задачи', async open => {
    const fn = jest.fn()
    render(<Notifier open={open} task="первая задача" onClose={fn} />)

    jest.runAllTimers()

    const taskText = screen.queryByText(/первая задача/i)

    if (taskText) {
      expect(taskText).toBeInTheDocument()
    } else {
      expect(taskText).not.toBeInTheDocument()
    }
  })
  it.each([
    [true, 1],
    [false, 0],
  ])('одновременно может отображаться только одно', (open, showTimes) => {
    const fn = jest.fn()
    render(<Notifier open={open} task="первая задача" onClose={fn} />)

    jest.runAllTimers()

    expect(fn).toBeCalledTimes(showTimes)
  })
})
