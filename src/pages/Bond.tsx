import Banner from '../components/Banner'
import Disclaimer from '../components/Disclaimer'
import Badge from '../components/Badge'
import ActionCard from '../components/ActionCard'
import CreateBondFlow from '../components/CreateBondFlow'

export default function Bond() {
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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
          gap: 'var(--credence-space-6)',
          alignItems: 'start',
        }}
      >
        <ActionCard title="Create New Bond">
          <CreateBondFlow />
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
                  borderBottom:
                    bond.id === mockBonds.length ? 'none' : '1px solid var(--border-default)',
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
    </div>
  )
}

