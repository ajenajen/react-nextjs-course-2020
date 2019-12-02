import React, { useState, useEffect } from 'react'
import { Flex, Box } from '@grid'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import colors from '@features/_ui/colors'

import { inject } from '@lib/store'

export default inject('playerStore')(ControlPanel)

function ButtonControl({ icon, circle = false, active = false, onClick }) {
  const css = {
    background: 'transparent',
    padding: '7px 8px 11px 8px',
    margin: '0 10px',
    width: '34px',
    height: '34px',
    cursor: 'pointer',
    ...(circle === true
      ? { border: `1px solid ${colors.link}`, borderRadius: '50%' }
      : { border: 'none' }),
  }

  return (
    <button onClick={onClick} css={css}>
      <Icon
        icon={icon}
        css={{
          color: active ? 'green' : colors.link,
          width: '10px',
        }}
      />
    </button>
  )
}

function ControlPanel({ playerStore }) {
  // const currentTrack = playerStore.nowPlaying.order
  // const [currentTrack, setCurrentTrack] = useState(playerStore.nowPlaying.order)
  const { playing, order } = playerStore.nowPlaying

  return (
    <Flex>
      <Box>
        <ButtonControl icon="random" active={false} onClick={() => {}} />
      </Box>
      <Box>
        <ButtonControl
          icon="step-backward"
          onClick={() => {
            playerStore.prevTrack(order)
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          icon={playerStore.nowPlaying.playing ? 'pause' : 'play'}
          circle={true}
          onClick={() => {
            playerStore.togglePlay()
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="step-forward"
          onClick={() => {
            playerStore.nextTrack(order)
          }}
        />
      </Box>
      <Box>
        <ButtonControl
          icon="redo-alt"
          active={playerStore.isRepeat}
          onClick={() => {
            playerStore.setRepeat()
          }}
        />
      </Box>
    </Flex>
  )
}

// export default ControlPanel
