import { get } from '~/api'
import type { PageResponse } from '~/api'

export const fetchCompanyInfo = (params: any) => get<PageResponse<any>>('/company/info', params)
