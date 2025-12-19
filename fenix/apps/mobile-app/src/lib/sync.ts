import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from './database'

// Replace with your actual computer IP for Android Emulator (cannot use localhost)
// e.g., http://192.168.1.5:3000/api/sync
const SYNC_API_URL = 'http://10.0.2.2:3000/api/sync'

export async function sync() {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
      const response = await fetch(`${SYNC_API_URL}?last_pulled_at=${lastPulledAt ?? ''}`)
      if (!response.ok) {
        throw new Error(await response.text())
      }
      const { changes, timestamp } = await response.json()
      return { changes, timestamp }
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      const response = await fetch(SYNC_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes, lastPulledAt }),
      })
      if (!response.ok) {
        throw new Error(await response.text())
      }
    },
    migrationsEnabledAtVersion: 1,
  })
}
