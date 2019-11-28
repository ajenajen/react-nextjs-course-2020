import * as API from './repository'

export function getUserProfile({ token }) {
  return API.getUserProfile({ token }).then(response => {
    response.name = response.display_name
    response.image = response.images[0].url
    return response
  })
}
