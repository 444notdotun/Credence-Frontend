import { ReactNode } from 'react'

interface ErrorStateProps {
  type?: 'network' | 'backend' | 'validation' | 'generic'
  title?: string
  message?: string
  action?: {
    label: string
    onClick: () => void
  }
  icon?: ReactNode
}

export default function ErrorState({
  type = 'generic',
  title,
  message,
  action,
  icon,
}: ErrorStateProps) {
  const errorPanelStyle = {
    textAlign: 'center',
    padding: 'var(--credence-space-8) var(--credence-space-6)',
    maxWidth: '28rem',
    margin: '0 auto',
    border: '1px solid var(--credence-color-danger-surface-strong)',
    borderRadius: 'var(--credence-radius-xl)',
    background: 'var(--credence-color-danger-surface)',
  } as const

  const errorIconStyle = {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--credence-radius-full)',
    background: 'var(--credence-color-danger-surface-strong)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto var(--credence-space-4)',
    fontSize: '1.5rem',
  } as const

  const errorTitleStyle = {
    fontSize: 'var(--credence-font-size-base)',
    fontWeight: 'var(--credence-font-weight-semibold)',
    color: 'var(--credence-color-danger-text)',
    marginBottom: 'var(--credence-space-2)',
  } as const

  const errorConfig = {
    network: {
      title: 'Connection issue',
      message: 'Unable to connect to the network. Check your internet connection and try again.',
      emoji: 'ðŸŒ',
    },
    backend: {
      title: 'Service unavailable',
      message: 'Our service is temporarily unavailable. Please try again in a few moments.',
      emoji: 'âš ï¸',
    },
    validation: {
      title: 'Invalid input',
      message: 'Please check your input and try again.',
      emoji: 'âŒ',
    },
    generic: {
      title: 'Something went wrong',
      message: 'An unexpected error occurred. Please try again.',
      emoji: 'âš ï¸',
    },
  }

  const config = errorConfig[type]

  return (
    <div style={errorPanelStyle}>
      <div style={errorIconStyle}>{icon || config.emoji}</div>
      <h3 style={errorTitleStyle}>{title || config.title}</h3>
      <p
        style={{
          color: 'var(--credence-color-danger-text-muted)',
          fontSize: 'var(--credence-font-size-sm)',
          lineHeight: 'var(--credence-line-height-base)',
          marginBottom: action ? 'var(--credence-space-6)' : '0',
        }}
      >
        {message || config.message}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          style={{
            padding: '0.625rem var(--credence-space-5)',
            background: 'var(--credence-color-danger-action)',
            color: 'var(--credence-color-white)',
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
