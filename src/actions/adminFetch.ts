'use server';

import { neon } from '@neondatabase/serverless';

export async function getClientIntakes() {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set.");
    return [];
  }

  const sql = neon(process.env.DATABASE_URL);
  
  try {
    const data = await sql`
      SELECT * FROM client_intakes 
      ORDER BY created_at DESC
    `;
    return data;
  } catch (error) {
    console.error('Error fetching intakes:', error);
    return [];
  }
}
