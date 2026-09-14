import configPromise from '@payload-config'
import { getPayload } from 'payload'

/**
 * Get a Payload instance for server-side data fetching.
 * Uses Local API (in-process, no HTTP round-trip) per architecture.md §3.
 */
export async function getPayloadClient() {
  return getPayload({ config: configPromise })
}
