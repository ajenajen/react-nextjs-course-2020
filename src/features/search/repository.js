import { fetchAPI } from '@lib/api'

export function getSearchItem({
  token,
  keyword = '1975',
  type = 'album,playlist,artist',
  limit = 6,
}) {
  return fetchAPI({
    path: `/search`,
    token,
    params: { q: keyword, type: type, limit: limit },
  })
}
