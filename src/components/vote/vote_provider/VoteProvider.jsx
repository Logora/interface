import React, { createContext, useState, useEffect } from 'react'
import { useDataProvider } from '@logora/debate.data.data_provider'
import { useAuth } from '@logora/debate.auth.use_auth'
import PropTypes from 'prop-types'

export const VoteContext = createContext()

export const VoteProvider = ({ voteableType, children }) => {
  const api = useDataProvider()
  const { isLoggedIn, currentUser } = useAuth()
  const [votes, setVotes] = useState({})
  const [voteableIds, setVoteableIds] = useState([])

  useEffect(() => {
    if (isLoggedIn && voteableIds && voteableIds.length > 0) {
      getVotes()
    }
  }, [isLoggedIn, voteableIds])

  const getVotes = () => {
    api
      .getList('votes', {
        page: 1,
        per_page: Math.max(1, voteableIds.length),
        user_id: currentUser.id,
        voteable_id: voteableIds.join(','),
        voteable_type: voteableType,
        countless: true
      })
      .then(response => {
        if (response.data.success) {
          const loadedVotes = response.data.data
          let votes = {}
          voteableIds.map(voteId => {
            const voteFound = loadedVotes.find(
              e =>
                e.voteable_id === voteId &&
                e.voteable_type === voteableType
            )
            votes[voteId] = voteFound || null
          })
          setVotes(prevState => ({ ...prevState, ...votes }))
        }
      })
  }

  const addVoteableIds = voteableIds => {
    setVoteableIds(prevIds => [...prevIds, ...voteableIds])
  }

  return (
    <VoteContext.Provider value={{ votes, addVoteableIds }}>
      { children }
    </VoteContext.Provider>
  )
}

VoteProvider.propTypes = {
  /** The type of voteable item */
  voteableType: PropTypes.string.isRequired,
  /** The child components of VoteProvider */
  children: PropTypes.node.isRequired
}

VoteProvider.defaultProps = {
  voteableType: 'default'
}