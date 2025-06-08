import api from '../lib/axios'
import type { Skip } from '../types/Skip'

export const getSkips = async (): Promise<Skip[]> => {
  const response = await api.get<Skip[]>('/skips/by-location?postcode=NR32&area=Lowestoft')
  return response.data
}
