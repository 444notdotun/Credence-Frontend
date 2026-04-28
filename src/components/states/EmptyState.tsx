import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }
  illustration?: 'bond' | 'trust' | 'dispute' | 'attestation' | 'activity'
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  illustration,
}: EmptyStateProps) {
  const getIllustration = () => {
    const iconStyle = {
      width: '64px',
      height: '64px',
      borderRadius: 'var(--credence-radius-full)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto var(--credence-space-4)',
      fontSize: '2rem',
    }

    const illustrations = {
      bond: { bg: 'var(--credence-color-platinum-surface)', emoji: 'ðŸ”’' },
      trust: { bg: 'var(--credence-color-trust-surface)', emoji: 'â­' },
      dispute: { bg: 'var(--credence-color-danger-surface-strong)', emoji: 'âš–ï¸' },
      attestation: { bg: 'var(--credence-color-attestation-surface)', emoji: 'âœ“' },
      activity: { bg: 'var(--credence-color-bronze-surface)', emoji: 'ðŸ“Š' },
    }

    const config = illustration ? illustrations[illustration] : null

    if (icon) {
      return <div style={iconStyle}>{icon}</div>
    }

    if (config) {
      return <div style={{ ...iconStyle, background: config.bg }}>{config.emoji}</div>
    }

    return null
  }

  return (
    <div
      style={{
        textAlign: 'center',
        padding: 'var(--credence-space-12) var(--credence-space-6)',
        maxWidth: '28rem',
        margin: '0 auto',
      }}
    >
      {getIllustration()}
      <h3
        style={{
          fontSize: 'var(--credence-font-size-lg)',
          fontWeight: 'var(--credence-font-weight-semibold)',
          color: 'var(--credence-text-primary)',
          marginBottom: 'var(--credence-space-2)',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: 'var(--credence-text-secondary)',
          fontSize: 'var(--credence-font-size-sm)',
          lineHeight: 'var(--credence-line-height-base)',
          marginBottom: action ? 'var(--credence-space-6)' : '0',
        }}
      >
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            padding: 'var(--credence-space-3) var(--credence-space-6)',
            background:
              action.variant === 'secondary'
                ? 'var(--credence-border-default)'
                : 'var(--credence-color-primary-soft)',
            color:
              action.variant === 'secondary'
                ? 'var(--credence-text-primary)'
                : 'var(--credence-color-white)',
            border: 'none',
            borderRadius: 'var(--credence-radius-lg)',
            fontWeight: 'var(--credence-font-weight-semibold)',
            cursor: 'pointer',
            fontSize: 'var(--credence-font-size-sm)',
          }}
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
