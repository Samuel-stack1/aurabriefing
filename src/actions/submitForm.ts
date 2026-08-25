'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache';

export async function submitClientIntake(formData: FormData) {
  try {
    // Determine domain values based on hasDomain
    const hasDomain = formData.get('hasDomain') === 'true';
    const currentDomain = hasDomain ? formData.get('currentDomain') as string : null;
    const domainRegistrar = hasDomain ? formData.get('domainRegistrar') as string : null;
    const desiredDomain = !hasDomain ? formData.get('desiredDomain') as string : null;

    const data = {
      companyName: formData.get('companyName') as string,
      contactName: formData.get('contactName') as string,
      whatsapp: formData.get('whatsapp') as string,
      email: formData.get('email') as string,
      instagramLink: formData.get('instagramLink') as string,
      hasDomain,
      currentDomain,
      domainRegistrar,
      desiredDomain,
      targetAudience: formData.get('targetAudience') as string,
      competitiveAdvantage: formData.get('competitiveAdvantage') as string,
      competitors: formData.get('competitors') as string,
      desiredStructure: formData.get('desiredStructure') as string,
      aboutCompany: formData.get('aboutCompany') as string,
      brandColors: formData.get('brandColors') as string,
      referenceLinks: formData.get('referenceLinks') as string,
      materialsLink: formData.getAll('materialsLink').map(link => link.toString().trim()).filter(Boolean).join('\n'),
    };

    // Validation removed - all fields are optional

    // Connect to Neon Database
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL is not set. Data will not be saved to DB.");
      // For demonstration purposes, if no DB URL is provided, we simulate a successful save.
      // return { success: true };
      return { success: false, error: 'A conexão com o banco de dados não está configurada.' };
    }

    const sql = neon(process.env.DATABASE_URL);

    // Insert into DB
    await sql`
      INSERT INTO client_intakes (
        company_name, 
        contact_name, 
        whatsapp, 
        email, 
        instagram_link, 
        has_domain, 
        current_domain, 
        domain_registrar, 
        desired_domain, 
        target_audience,
        competitive_advantage,
        competitors,
        desired_structure,
        about_company,
        brand_colors, 
        reference_links, 
        materials_link
      ) VALUES (
        ${data.companyName}, 
        ${data.contactName}, 
        ${data.whatsapp}, 
        ${data.email}, 
        ${data.instagramLink || null}, 
        ${data.hasDomain}, 
        ${data.currentDomain}, 
        ${data.domainRegistrar}, 
        ${data.desiredDomain}, 
        ${data.targetAudience || null},
        ${data.competitiveAdvantage || null},
        ${data.competitors || null},
        ${data.desiredStructure || null},
        ${data.aboutCompany || null},
        ${data.brandColors || null}, 
        ${data.referenceLinks || null}, 
        ${data.materialsLink}
      )
    `;

    return { success: true };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error: 'Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.' };
  }
}
