import * as API from './repository'

export function getMyPlaylist({ token }) {
  return API.getMyPlaylist({ token })
}

export function getPlaylistById(id, { token }) {
  // return API.getPlaylistById(id, { token })
  return API.getPlaylistById(id, { token }).then(function(response) {
    response.image = response.images[0].url
    response.title = response.name
    response.subTitle = response.owner.display_name
    response.bottomLine = [response.tracks.total, ' SONGS']

    response.tracks.items = response.tracks.items.map(function(item, key) {
      item.durationMs = item.track.duration_ms
      item.artist = item.track.artists.map(artist => artist.name).join(',')
      item.album = item.track.album.name
      item.name = item.track.name
      item.previewUrl = item.track.preview_url
      item.image = item.track.album.images[0].url
      item.order = key

      return item
    })

    return response
  })
}
