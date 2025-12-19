import { Platform } from 'react-native'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import { fenixSchema } from '@fenix/db-schema'

import Beneficiary from '../models/Beneficiary'
import Delivery from '../models/Delivery'

const adapter = new SQLiteAdapter({
  schema: fenixSchema,
  // (You might want to comment out this for production)
  // migrations, 
  // dbName: 'fenixdb', 
  jsi: true, // Enable JSI for faster database operations
  onSetUpError: error => {
    console.error("Database setup failed", error)
  }
})

export const database = new Database({
  adapter,
  modelClasses: [
    Beneficiary,
    Delivery,
  ],
})
