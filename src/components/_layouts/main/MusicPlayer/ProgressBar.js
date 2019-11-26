import React from 'react'
import { Flex, Box } from '@grid'

import { inject } from '@lib/store'

export default inject('playerStore')(ProgressBar)

ProgressBar.defaultProps = {
  timeElapsed: '0:00',
  progress: 0.2,
  duration: '0:30',
}

function ProgressBar({ playerStore }) {
  const { timeElapsed, progress, duration } = playerStore.progressBar

  return (
    <Flex
      justifyContent="space-between"
      css={{
        background: 'transparent',
        height: '20px',
        alignItems: 'center',
      }}>
      <Box css={{ fontSize: '0.7em', padding: '10px' }}>{timeElapsed}</Box>
      <Box
        css={{
          flex: 1,
          height: '4px',
          '&:hover input[type="range"]::-webkit-slider-thumb': {
            visibility: 'visible',
          },
        }}>
        <div css={{ position: 'relative' }}>
          <progress
            css={{
              appearance: 'none',
              position: 'absolute',
              width: '100%',
              height: '4px',
              zIndex: '-1',
              '&::-webkit-progress-bar': {
                borderRadius: '5px',
              },
              '&::-webkit-progress-value': {
                borderRadius: '5px',
              },
            }}
            value={progress}
            max={1}
          />
          <input
            css={{
              appearance: 'none',
              position: 'absolute',
              width: '100%',
              height: '4px',
              outline: 'none',
              background: 'transparent',
              '&::-webkit-slider-thumb': {
                visibility: 'hidden',
              },
            }}
            type="range"
            min={0}
            max={1}
            step="any"
            value={progress}
            onClick={() => {}}
            onMouseDown={() => {}}
            onChange={e => playerStore.handleBar(e.target.value)}
            onMouseUp={() => {}}
          />
        </div>
      </Box>
      <Box css={{ fontSize: '0.7em', padding: '10px' }}>{duration}</Box>
    </Flex>
  )
}

// export default ProgressBar
