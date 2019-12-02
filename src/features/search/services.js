import * as API from './repository'

export function getSearchItem({ keyword, token }) {
  if (keyword == '') {
    return null
  }
  return API.getSearchItem({ keyword, token }).then(function(response) {
    let data = {}
    for (let key in response) {
      if (response.hasOwnProperty(key)) {
        data[key] = response[key].items.map(resp => {
          if (resp.images.length === 0) {
            resp.images = [{ url: '' }]
          }
          return resp
        })
      }
    }
    return data
    // response.albums = response.albums.items.map(function(album) {
    //   return album
    // })
    // response.playlists = response.playlists.items.map(function(playlist) {
    //   return playlist
    // })
    // return response
  })
}
