import React, { useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'

// import PlayerStore from '@features/player/store'

import { inject } from '@lib/store'

export default inject('playerStore')(Player)

function Player({ playerStore }) {
  // const playerStore = new PlayerStore()
  const { url, playing } = playerStore.nowPlaying
  const { volume } = playerStore
  const playerInst = useRef(null)

  useEffect(() => {
    playerStore.setPlayerInst(playerInst.current)
  }, [])

  return (
    <ReactPlayer
      ref={playerInst}
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={volume.level}
      muted={volume.muted}
      onProgress={data => playerStore.updateProgressBar(data)}
      onEnded={() => {
        console.log('onEnded')
      }}
    />
  )
}

// export default Player
