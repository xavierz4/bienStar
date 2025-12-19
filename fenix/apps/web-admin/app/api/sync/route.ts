import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// WatermelonDB Sync Protocol Endpoint
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lastPulledAt = searchParams.get('last_pulled_at');

  // TODO: Implement Pull Logic
  // 1. Query 'beneficiaries' and 'deliveries' where updated_at > lastPulledAt
  // 2. Format as { changes: { beneficiaries: { created: [], updated: [], deleted: [] } ... }, timestamp: now }
  
  return NextResponse.json({
    changes: {
      beneficiaries: { created: [], updated: [], deleted: [] },
      deliveries: { created: [], updated: [], deleted: [] },
    },
    timestamp: Date.now(),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { changes, lastPulledAt } = body;

  console.log("Recibiendo cambios del móvil:", JSON.stringify(changes, null, 2));

  // TODO: Implement Push Logic
  // 1. Iterate over changes.deliveries.created
  // 2. Insert into Supabase 'deliveries' table
  // 3. Handle image upload if photo path is present (via separate storage upload flow usually, but logical link here)

  if (changes.deliveries?.created) {
      for (const delivery of changes.deliveries.created) {
          // Mocking insertion
          console.log("Insertando delivery en Supabase:", delivery.id);
          // await supabase.from('deliveries').insert({ ...mapFields(delivery) })
      }
  }

  return NextResponse.json({ status: 'ok' });
}
