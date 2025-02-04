import React, { useEffect } from 'react'
import { Flex, Box } from '@grid'
import Link from '@link'
import { getStatic } from '@lib/static'
import colors from '@features/_ui/colors'
import { useMember } from '@lib/auth'

import { inject } from '@lib/store'
export default inject('userStore')(Account)

Account.defaultProps = {
  name: 'Anonymous',
  image: getStatic('/images/dummy-avatar-300x300.jpg'),
}

function Account({ userStore }) {
  const { token } = useMember()

  useEffect(() => {
    if (token !== null && userStore.profile === null) {
      userStore.getUserProfile({ token })
    }
  })

  if (token === null || userStore.profile === null) {
    return null
  }

  // const { image, name } = props
  const { image, name } = userStore.profile

  // console.log(userStore.profile)
  return (
    <div
      css={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
      }}>
      <Flex
        flexWrap="wrap"
        alignItems="center"
        css={{
          width: '185px',
          margin: '0 auto',
          padding: '6px 0',
          borderTop: `1px solid ${colors.background.light}`,
          fontSize: '0.85em',
          fontWeight: 'bold',
          color: colors.link,
        }}>
        <Box px={10}>
          <Link route="account">
            <a>
              <img
                src={image}
                alt={name}
                css={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                }}
              />
            </a>
          </Link>
        </Box>
        <Box>
          <Link route="account">
            <a>{name}</a>
          </Link>
        </Box>
      </Flex>
    </div>
  )
}

// export default Account
