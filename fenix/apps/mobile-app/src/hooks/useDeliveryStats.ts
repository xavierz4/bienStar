import { useState, useEffect } from 'react'
import { database } from '../lib/database'
import Delivery from '../models/Delivery'

export const useDeliveryStats = () => {
  const [stats, setStats] = useState({ completed: 0, total: 0 })

  useEffect(() => {
    const subscription = database.get<Delivery>('deliveries')
      .query()
      .observe()
      .subscribe(deliveries => {
        const completed = deliveries.filter(d => d.status === 'completed').length
        setStats({ completed, total: deliveries.length })
      })

    return () => subscription.unsubscribe()
  }, [])

  return stats
}
