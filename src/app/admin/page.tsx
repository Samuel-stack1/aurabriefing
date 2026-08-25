import { cookies } from 'next/headers';
import LoginView from './LoginView';
import DashboardView from './DashboardView';
import { getClientIntakes } from '@/actions/adminFetch';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (session?.value === 'authenticated') {
    const intakes = await getClientIntakes();
    return <DashboardView intakes={intakes} />;
  }

  return <LoginView />;
}
