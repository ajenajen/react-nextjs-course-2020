import React, { Fragment } from 'react'
import Link from '@link'
import { Flex, Box } from '@grid'

import colors from '@features/_ui/colors'

export default function ResultRow({ title }) {
  return (
    <Fragment>
      <Box width={1}>
        <h1
          css={{
            color: colors.link,
            fontSize: '1.8em',
            padding: '50px 10px 0px',
          }}>
          {title}
        </h1>
      </Box>
    </Fragment>
  )
}
