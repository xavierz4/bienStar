import { Model } from '@nozbe/watermelondb'
import { field, date, readonly, text, relation } from '@nozbe/watermelondb/decorators'

export default class Delivery extends Model {
  static table = 'deliveries'

  @text('beneficiary_id') beneficiaryId
  @field('campaign_month') campaignMonth
  @field('status') status
  @field('evidence_photo_path') evidencePhotoPath
  @field('gps_lat') gpsLat
  @field('gps_lng') gpsLng
  @date('delivery_date') deliveryDate
  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
