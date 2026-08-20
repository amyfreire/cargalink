import { mockApplications } from '@/services/mock-data'
import type { ApplicationWithDriver } from '@/types'
import { sleep } from '@/lib/utils'

/** Applications service — uses mock data until Supabase is configured. */
export async function fetchApplicationsByLoad(loadId: string): Promise<ApplicationWithDriver[]> {
  await sleep(300)
  return mockApplications[loadId] ?? []
}

export async function acceptApplication(loadId: string, applicationId: string): Promise<void> {
  await sleep(400)
  const applications = mockApplications[loadId] ?? []
  for (const application of applications) {
    application.status = application.id === applicationId ? 'accepted' : 'rejected'
  }
}

export async function rejectApplication(loadId: string, applicationId: string): Promise<void> {
  await sleep(300)
  const application = (mockApplications[loadId] ?? []).find((item) => item.id === applicationId)
  if (application) application.status = 'rejected'
}
