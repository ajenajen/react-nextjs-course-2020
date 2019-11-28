import React, { useState } from 'react'
import { Flex, Box } from '@grid'
import { useMember } from '@lib/auth'
import withPage from '@lib/page/withPage'
import SearchResults from './SearchResults'
import NoResult from './NoResult'

import * as SearchService from '@features/search/services'
import { Fetch } from '@lib/api'

SearchPage.defaultProps = {
  data: {
    albums: [
      {
        id: '2Pz8VAMiGc9UW1rrbBRDuO',
        name: 'KILL THIS LOVE',
        images: [
          {
            url:
              'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
          },
        ],
      },
    ],
    playlists: [
      {
        id: '37i9dQZF1DX8kP0ioXjxIA',
        name: 'This Is BLACKPINK',
        images: [
          {
            url:
              'https://pl.scdn.co/images/pl/default/af1eb22fbb48deecfde3b244ffd683a81696a18d',
          },
        ],
      },
    ],
  },
}

function SearchPage({ data }) {
  const { token } = useMember()
  const [keyword, setKeyword] = useState('')

  const keywordChange = function(keyword) {
    setKeyword(keyword.target.value)
  }

  if (token === null) {
    return null
  }

  return (
    <div>
      <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
        <Box width={1}>
          <input
            type="text"
            value={keyword}
            placeholder="Search for artists, albums or playlists..."
            css={{
              padding: '15px 20px',
              borderRadius: '40px',
              border: 'none',
              width: '500px',
            }}
            onChange={keywordChange}
          />
        </Box>
      </Flex>
      <Fetch service={() => SearchService.getSearchItem({ keyword, token })}>
        {({ data }) => {
          console.log(data.albums.length)
          return (
            <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
              {data.albums.length > 0 ? (
                <SearchResults
                  title="Albums"
                  data={data.albums}
                  route="album-detail"
                />
              ) : null}

              {data.playlists.length > 0 ? (
                <SearchResults
                  title="Playlists"
                  data={data.playlists}
                  route="playlist-detail"
                />
              ) : null}

              {data.albums.length == 0 && data.playlists.length == 0 ? (
                <NoResult title="No Result" />
              ) : null}
            </Flex>
          )
        }}
      </Fetch>
    </div>
  )
}

export default withPage({ restricted: true })(SearchPage)
