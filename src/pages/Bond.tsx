import Banner from '../components/Banner'
import Disclaimer from '../components/Disclaimer'
import { useToast } from '../components/ToastProvider'
import Badge from '../components/Badge'
import ActionCard from '../components/ActionCard'

export default function Bond() {
  const { addToast } = useToast()

  const handleCreate = () => {
    addToast('success', 'Bond created successfully.')
  }

  const mockBonds = [
    { id: 1, amount: '500 USDC', status: 'active' },
    { id: 2, amount: '1000 USDC', status: 'locked' },
    { id: 3, amount: '250 USDC', status: 'grace-period' },
  ]

  return (
    <div style={{ display: 'grid', gap: 'var(--credence-space-8)' }}>
      <div style={{ display: 'grid', gap: 'var(--credence-space-3)' }}>
        <h1 style={{ color: 'var(--text-primary)' }}>Bond USDC</h1>
        <p id="bond-desc" style={{ color: 'var(--text-secondary)', maxWidth: '42rem' }}>
          Lock USDC into the Credence contract to build your economic reputation.
        </p>
      </div>
      <Banner severity="info">
        Bonds are locked for a minimum of 30 days. Early withdrawal incurs a slash penalty.
      </Banner>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
          gap: 'var(--credence-space-6)',
          alignItems: 'start',
        }}
      >
        <ActionCard title="Create New Bond">
          <label
            htmlFor="bond-amount"
            style={{
              display: 'block',
              marginBottom: 'var(--credence-space-2)',
              fontWeight: 'var(--credence-font-weight-semibold)',
              color: 'var(--credence-text-secondary)',
            }}
          >
            Amount (USDC)
          </label>
          <input
            id="bond-amount"
            type="number"
            placeholder="0"
            min="0"
            step="1"
            aria-describedby="bond-desc"
            style={{
              width: '100%',
              padding: 'var(--credence-space-3) var(--credence-space-4)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--credence-radius-lg)',
              fontSize: 'var(--credence-font-size-base)',
              margin: 0,
              background: 'var(--bg-page)',
              color: 'var(--text-primary)',
            }}
          />
          <button
            type="button"
            onClick={handleCreate}
            style={{
              width: '100%',
              padding: 'var(--credence-space-3) var(--credence-space-4)',
              background: 'var(--color-primary)',
              color: 'var(--bg-page)',
              border: 'none',
              borderRadius: 'var(--credence-radius-lg)',
              fontWeight: 'var(--credence-font-weight-semibold)',
              cursor: 'pointer',
            }}
          >
            Create bond
          </button>
        </ActionCard>

        <ActionCard title="Active Bonds">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid' }}>
            {mockBonds.map((bond) => (
              <li
                key={bond.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBlock: 'var(--credence-space-3)',
                  borderBottom: bond.id === mockBonds.length ? 'none' : '1px solid var(--border-default)',
                  gap: 'var(--credence-space-4)',
                }}
              >
                <span style={{ fontWeight: 500 }}>{bond.amount}</span>
                <Badge variant={bond.status} />
              </li>
            ))}
          </ul>
        </ActionCard>
      </div>

      <Disclaimer
        context="Bonding USDC locks funds in a non-custodial smart contract. Slashing conditions apply."
        termsHref="#"
      />
    </div>
  )
}
