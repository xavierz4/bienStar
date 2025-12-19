import { Model } from '@nozbe/watermelondb'
import { field, date, readonly } from '@nozbe/watermelondb/decorators'

export default class Beneficiary extends Model {
  static table = 'beneficiaries'

  @field('excel_id') excelId
  @field('full_name') fullName
  @field('document_id') documentId
  @field('group_type') groupType
  @field('zone') zone
  @field('center_name') centerName
  @readonly @date('created_at') createdAt
  @readonly @date('updated_at') updatedAt
}
