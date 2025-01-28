import {
    Box,
    Input,
    List,
    ListItem,
    Button,
    Spinner,
    Heading,
  } from '@chakra-ui/react'
  import { useState, useEffect } from 'react'
  import { fetchUsers } from '../../services/api'
  
  const Sidebar = ({ onSelectUser, selectedUserId }) => {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
  
    useEffect(() => {
      const timerId = setTimeout(() => {
        setDebouncedSearch(searchTerm)
      }, 500)
  
      return () => clearTimeout(timerId)
    }, [searchTerm])
  
    useEffect(() => {
      setPage(1)
      setUsers([])
    }, [debouncedSearch])
  
    const loadUsers = async () => {
      setLoading(true)
      try {
        const data = await fetchUsers(page, debouncedSearch)
        setUsers(prev => 
          page === 1 ? data.users : [...prev, ...data.users]
        )
        setHasMore(data.total > page * 10)
      } finally {
        setLoading(false)
      }
    }
  
    useEffect(() => {
      loadUsers()
    }, [page, debouncedSearch])
  
    return (
      <Box w="300px" borderRight="1px" borderColor="gray.200" p={4}>
        <Heading size="md" mb={4}>Users</Heading>
        <Input
          placeholder="Search users..."
          mb={4}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <List spacing={3}>
          {users.map(user => (
            <ListItem
              key={user.id}
              p={2}
              borderRadius="md"
              bg={selectedUserId === user.id ? 'blue.50' : 'transparent'}
              _hover={{ bg: 'gray.100' }}
              cursor="pointer"
              onClick={() => onSelectUser(user.id)}
            >
              {user.firstName} {user.lastName}
            </ListItem>
          ))}
        </List>
        {hasMore && (
          <Button
            mt={4}
            w="full"
            onClick={() => setPage(p => p + 1)}
            isLoading={loading}
            isDisabled={loading}
          >
            Load More
          </Button>
        )}
      </Box>
    )
  }
  
  export default Sidebar