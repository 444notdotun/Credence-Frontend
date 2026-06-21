import { useState } from 'react'
import './TrustScore.css'
import Banner from '../components/Banner'
import Disclaimer from '../components/Disclaimer'
import { useToast } from '../components/ToastProvider'
import Badge from '../components/Badge'
import Button from '../components/Button'
import AddressInput from '../components/AddressInput'
import TierLadder from '../components/TierLadder'
import { EmptyState } from '../components/states'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function TrustScore() {
  useDocumentTitle('Trust Score')

  const { addToast } = useToast()
  const { connected, address: walletAddress, connect } = useWallet()
  const [address, setAddress] = useState('')
  const [isAddressValid, setIsAddressValid] = useState(false)

  const handleLookup = () => {
    if (!connected) {
      connect()
      return
    }

    addToast('success', 'Trust score retrieved.')
  }

  const useConnectedAddress = () => {
    if (!walletAddress) return
    setAddress(walletAddress)
  }

  const activity: Array<{ id: number; action: string; date: string; status: 'active' | 'slashed' }> =
    []

  return (
    <div>
      <div className="trustScore__headerRow">
        <h1 className="trustScore__title">Trust Score</h1>
        <Badge variant="gold" label="Gold Tier" className="tier-badge" />
      </div>
      <p id="trust-desc" className="trustScore__description">
        Your reputation score is computed from bond amount, duration, and attestations.
      </p>
      <TierLadder />
      <Banner severity="info">
        Scores update once per epoch. Recent bond changes may not be reflected immediately.
      </Banner>

      {!connected && (
        <Banner
          severity="warning"
          title="Connect wallet required"
          action={{ label: 'Connect wallet', onClick: connect }}
        >
          Connect a wallet to look up your own trust score. You can still type another Stellar
          address for review.
        </Banner>
      )}

      <div className="trustScore__grid">
        <div className="trustScore__card">
          <h2 className="trustScore__cardTitle">Lookup Identity</h2>
          <AddressInput
            id="wallet-address"
            label="Stellar Address"
            value={address}
            onChange={setAddress}
            onValidationChange={setIsAddressValid}
          />
          {connected && walletAddress && (
            <Button
              type="button"
              onClick={useConnectedAddress}
              variant="secondary"
              fullWidth
              className="trustScore__buttonRow"
            >
              Use connected wallet
            </Button>
          )}
          <Button
            type="button"
            onClick={connected ? handleLookup : connect}
            variant="primary"
            fullWidth
            disabled={connected ? !isAddressValid : false}
            className="trustScore__buttonRow"
          >
            {connected ? 'Look up score' : 'Connect wallet to continue'}
          </Button>
        </div>

        <div className="trustScore__card">
          <h2 className="trustScore__cardTitle">Recent Activity</h2>
          {activity.length === 0 ? (
            <EmptyState
              illustration="activity"
              title="No recent activity"
              description="New trust score events will appear here once bonds, attestations, or score updates occur."
            />
          ) : (
            <ul className="trustScore__activityList">
              {activity.map((item, index) => (
                <li
                  key={item.id}
                  className={`trustScore__activityRow${index === activity.length - 1 ? ' trustScore__activityRow--last' : ''}`}
                >
                  <div>
                    <div className="trustScore__activityAction">{item.action}</div>
                    <div className="trustScore__activityDate">{item.date}</div>
                  </div>
                  <Badge variant={item.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Disclaimer
        context="Trust scores are protocol metrics only and do not constitute creditworthiness assessments."
        termsHref="#"
      />
    </div>
  )
}
