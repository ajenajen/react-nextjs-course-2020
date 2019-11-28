import { fetchAPI } from '@lib/api'

export function getUserProfile({ token }) {
  return fetchAPI({
    path: `/me`,
    token,
  })
}
