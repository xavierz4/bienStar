import { useState, useEffect } from 'react'
import { database } from '../lib/database'
import { seedDatabase } from '../lib/seed'
import Beneficiary from '../models/Beneficiary'

export const useBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Attempt to seed on mount
    seedDatabase().catch(console.error)

    const subscription = database.get<Beneficiary>('beneficiaries')
      .query()
      .observe()
      .subscribe(data => {
        setBeneficiaries(data)
        setLoading(false)
      })

    return () => subscription.unsubscribe()
  }, [])

  return { beneficiaries, loading }
}
