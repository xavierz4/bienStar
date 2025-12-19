import { database } from './database'
import beneficiariesData from './beneficiaries_seed.json'
import Beneficiary from '../models/Beneficiary'

export async function seedDatabase() {
  const collection = database.get<Beneficiary>('beneficiaries')
  const count = await collection.query().fetchCount()

  if (count === 0) {
    console.log("Seeding database with real data...")
    try {
      await database.write(async () => {
        const batch = beneficiariesData.map(data => 
          collection.prepareCreate(record => {
            record.excelId = data.excelId
            record.fullName = data.fullName
            record.documentId = data.documentId
            record.groupType = data.groupType
            record.zone = data.zone
            record.centerName = data.centerName
          })
        )
        await database.batch(batch)
      })
      console.log("Seeding complete!")
    } catch (e) {
      console.error("Seeding failed", e)
    }
  } else {
    console.log("Database already has data, skipping seed.")
  }
}
