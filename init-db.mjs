import { neon } from '@neondatabase/serverless';

async function init() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);
  
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS client_intakes (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL,
        contact_name VARCHAR(255) NOT NULL,
        whatsapp VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        instagram_link VARCHAR(255),
        has_domain BOOLEAN NOT NULL,
        current_domain VARCHAR(255),
        domain_registrar VARCHAR(255),
        desired_domain VARCHAR(255),
        brand_colors TEXT,
        reference_links TEXT,
        materials_link TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log("Table client_intakes created successfully.");
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

init();
