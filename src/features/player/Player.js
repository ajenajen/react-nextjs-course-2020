import React from 'react'
import ReactPlayer from 'react-player'

// import PlayerStore from '@features/player/store'

import { inject } from '@lib/store'

export default inject('playerStore')(Player)

function Player({ playerStore }) {
  // const playerStore = new PlayerStore()
  const { url, playing } = playerStore.nowPlaying

  return (
    <ReactPlayer
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={0.8}
      muted={false}
      onProgress={data => playerStore.updateProgressBar(data)}
      onSeek={data => {
        console.log('onSeek' + data)
      }}
      onEnded={() => {
        console.log('onEnded')
      }}
    />
  )
}

// export default Player
