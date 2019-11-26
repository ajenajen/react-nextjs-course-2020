import * as API from './repository'

export function getNewReleases({ token, limit }) {
  return API.getNewReleases({ token, limit })
}

export function getAlbumById(id, { token }) {
  return API.getAlbumById(id, { token }).then(function(response) {
    response.image = response.images[0].url
    response.subTitle = response.artists
      .map(artist => {
        return artist.name
      })
      .join(',')

    response.title = response.name
    response.bottomLine = [
      'Type : ',
      response.album_type,
      ' ',
      response.total_tracks,
      ' Tracks',
    ]

    response.tracks.items = response.tracks.items.map(function(track) {
      track.durationMs = track.duration_ms
      track.artist = track.artists.map(artist => artist.name).join(',')
      track.album = track.name
      track.previewUrl = track.preview_url

      track.image = response.images[0].url

      return track
    })

    return response
  })
}
