import React, { useEffect } from 'react'
import { Flex, Box } from '@grid'
import Link from '@link'
import { getStatic } from '@lib/static'
import colors from '@features/_ui/colors'

import withPage from '@lib/page/withPage'
import { useMember } from '@lib/auth'
import { signOut } from '@features/_auth'

import { inject } from '@lib/store'

export default inject('userStore')(withPage({ restricted: true })(AccountPage))

AccountPage.defaultProps = {
  name: 'Anonymous',
  image: getStatic('/images/dummy-avatar-300x300.jpg'),
}

function AccountPage({ userStore }) {
  const { token, isAuthenticated } = useMember()

  useEffect(() => {
    if (token !== null && userStore.profile === null) {
      userStore.getUserProfile({ token })
    }
  })

  if (token === null || userStore.profile === null) {
    return null
  }

  const { image, name } = userStore.profile
  // const { image, name } = props

  if (!isAuthenticated) {
    return null
  }

  return (
    <Flex
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      css={{
        color: colors.link,
      }}>
      <Box width={(1, 1 / 3)} p={30}>
        <img
          src={image}
          alt={name}
          css={{
            width: '200px',
            height: '200px',
            margin: '0 auto',
            borderRadius: '50%',
          }}
        />
        <Box width={1} mt={20} textAlign="center">
          <h1 css={{ fontSize: '24px' }}>{name}</h1>
        </Box>
        <Box width={1} my={30} textAlign="center">
          <button
            css={{
              minWidth: '200px',
              background: 'rgba(24,24,24,.7)',
              color: '#fff',
              padding: '6px',
              border: '2px solid #fff',
              borderRadius: '30px',
              transition: 'all 0.3s',
              '&:hover': {
                background: '#fff',
                color: '#000',
              },
            }}
            onClick={() => signOut()}>
            Log out
          </button>
        </Box>
      </Box>
    </Flex>
  )
}

// export default withPage({ restricted: true })(AccountPage)
