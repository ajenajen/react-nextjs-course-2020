import * as API from './repository'

export function getMyPlaylist({ token }) {
  return API.getMyPlaylist({ token })
}

export function getPlaylistById(id, { token }) {
  // return API.getPlaylistById(id, { token })
  return API.getPlaylistById(id, { token }).then(function(response) {
    response.image = response.images[0].url
    response.title = response.owner.display_name
    response.bottomLine = [response.tracks.total, ' Tracks']

    response.tracks.items = response.tracks.items.map(function(item) {
      item.durationMs = item.track.duration_ms
      item.artist = item.track.artists.map(artist => artist.name).join(',')
      item.album = item.track.album.name
      item.name = item.track.name
      item.previewUrl = item.track.preview_url
      item.image = item.track.album.images[0].url

      return item
    })

    return response
  })
}
