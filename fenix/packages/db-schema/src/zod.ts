import { z } from "zod";

export const BeneficiarySchema = z.object({
  id: z.string().uuid().optional(),
  excel_id: z.string().min(1, "ID Excel es requerido"),
  full_name: z.string().min(3, "Nombre completo debe tener al menos 3 caracteres"),
  document_id: z.string().min(5, "Documento inválido"),
  group_type: z.enum(["Gestante", "Lactante", "Niño 1-3", "Niño 4-5"]),
  zone: z.string(),
  center_name: z.string(),
});

export const DeliverySchema = z.object({
  id: z.string().uuid().optional(),
  beneficiary_id: z.string().uuid(),
  campaign_month: z.string().regex(/^[A-Z]+-\d{4}$/, "Formato inválido (Ej: JULIO-2025)"),
  status: z.enum(["pending", "delivered", "synced"]),
  evidence_photo_url: z.string().url().optional(),
  gps_lat: z.number().optional(),
  gps_lng: z.number().optional(),
  delivery_date: z.date().optional(),
});

export type Beneficiary = z.infer<typeof BeneficiarySchema>;
export type Delivery = z.infer<typeof DeliverySchema>;
