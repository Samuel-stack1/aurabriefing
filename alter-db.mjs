import { neon } from '@neondatabase/serverless';

async function alterDb() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  
  try {
    await sql`
      ALTER TABLE client_intakes 
      ADD COLUMN IF NOT EXISTS target_audience TEXT,
      ADD COLUMN IF NOT EXISTS competitive_advantage TEXT,
      ADD COLUMN IF NOT EXISTS competitors TEXT,
      ADD COLUMN IF NOT EXISTS desired_structure TEXT,
      ADD COLUMN IF NOT EXISTS about_company TEXT;
    `;
    console.log("Table client_intakes altered successfully.");
  } catch (error) {
    console.error("Error altering table:", error);
  }
}

alterDb();
