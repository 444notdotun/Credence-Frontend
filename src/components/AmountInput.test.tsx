import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import AmountInput, { formatUSDC, normalizeUSDC, sanitizeUSDCInput } from './AmountInput'

function ControlledAmountInput({
  balance = 2500,
  presets = [100, 500, 1000],
}: {
  balance?: number
  presets?: number[]
}) {
  const [value, setValue] = useState('')

  return (
    <AmountInput
      aria-label="Bond amount"
      balance={balance}
      onChange={setValue}
      presets={presets}
      value={value}
    />
  )
}

describe('USDC amount helpers', () => {
  it.each([
    ['1,234.567', '1234.56'],
    ['abc$12.3x4', '12.34'],
    ['007', '7'],
    ['000', '0'],
    ['0.5', '0.5'],
    ['1.2.3', '1.2'],
    ['..', '0.'],
  ])('sanitizeUSDCInput(%s) -> %s', (input, expected) => {
    expect(sanitizeUSDCInput(input)).toBe(expected)
  })

  it.each([
    ['', ''],
    ['1,234.567', '1234.57'],
    ['-5', '0.00'],
    ['Infinity', ''],
    ['abc', ''],
    ['0.5', '0.50'],
  ])('normalizeUSDC(%s) -> %s', (input, expected) => {
    expect(normalizeUSDC(input)).toBe(expected)
  })

  it.each([
    ['', ''],
    ['1234.5', '1,234.50'],
    ['100', '100.00'],
    ['abc', 'abc'],
  ])('formatUSDC(%s) -> %s', (input, expected) => {
    expect(formatUSDC(input)).toBe(expected)
  })
})

describe('AmountInput interactions', () => {
  it('sanitizes typed input and normalizes on blur', async () => {
    const user = userEvent.setup()
    render(<ControlledAmountInput />)

    const input = screen.getByRole('textbox', { name: /bond amount/i })
    await user.type(input, 'abc001,234.567')
    expect(input).toHaveValue('1234.56')

    await user.tab()
    expect(input).toHaveValue('1,234.56')
  })

  it('sets the max amount from the available balance', async () => {
    const user = userEvent.setup()
    render(<ControlledAmountInput balance={42.5} />)

    await user.click(screen.getByRole('button', { name: /set max amount/i }))

    expect(screen.getByRole('textbox', { name: /bond amount/i })).toHaveValue('42.50')
  })

  it('disables presets above balance and keeps available presets active', () => {
    render(<ControlledAmountInput balance={75} presets={[25, 100]} />)

    expect(screen.getByRole('button', { name: /set amount to 25 usdc/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /set amount to 100 usdc/i })).toBeDisabled()
  })

  it('disables max when the balance is not positive', () => {
    render(<ControlledAmountInput balance={0} />)

    expect(screen.getByRole('button', { name: /set max amount/i })).toBeDisabled()
  })
})
