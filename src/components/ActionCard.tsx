import type { ReactNode } from 'react'

interface ActionCardProps {
    title: string
    children: ReactNode
}

export default function ActionCard({ title, children }: ActionCardProps) {
    return (
        <article
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--credence-space-4)',
                padding: 'var(--credence-space-6)',
                border: '1px solid var(--credence-border-default)',
                borderRadius: 'var(--credence-radius-xl)',
                background: 'var(--credence-surface-card)',
                color: 'var(--credence-text-primary)',
            }}
        >
            <h2
                style={{
                    fontSize: 'var(--credence-font-size-xl)',
                    lineHeight: 'var(--credence-line-height-tight)',
                    margin: 0,
                }}
            >
                {title}
            </h2>

            <div style={{ display: 'grid', gap: 'var(--credence-space-4)' }}>{children}</div>
        </article>
    )
}
