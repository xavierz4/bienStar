import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const fenixSchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'beneficiaries',
      columns: [
        { name: 'excel_id', type: 'string', isIndexed: true },
        { name: 'full_name', type: 'string' },
        { name: 'document_id', type: 'string' },
        { name: 'group_type', type: 'string' },
        { name: 'zone', type: 'string' },
        { name: 'center_name', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
    tableSchema({
      name: 'deliveries',
      columns: [
        { name: 'beneficiary_id', type: 'string', isIndexed: true },
        { name: 'campaign_month', type: 'string' },
        { name: 'status', type: 'string' }, -- 'pending', 'delivered'
        { name: 'evidence_photo_path', type: 'string', isOptional: true }, -- Local path before sync
        { name: 'gps_lat', type: 'number', isOptional: true },
        { name: 'gps_lng', type: 'number', isOptional: true },
        { name: 'delivery_date', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ]
    }),
  ]
})
