import AdminPanel from '../page'

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  return <AdminPanel />
}
