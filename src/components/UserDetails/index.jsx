import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    Heading,
    useToast,
  } from '@chakra-ui/react'
  import { useState, useEffect } from 'react'
  import { fetchUserDetails, updateUser } from '../../services/api'
  
  const UserDetails = ({ userId }) => {
    const [user, setUser] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({})
    const toast = useToast()
  
    useEffect(() => {
      const loadUser = async () => {
        if (userId) {
          const data = await fetchUserDetails(userId)
          setUser(data)
          setFormData(data)
        }
      }
      loadUser()
    }, [userId])
  
    const handleUpdate = async () => {
      try {
        const updatedUser = await updateUser(userId, formData)
        setUser(updatedUser)
        setIsEditing(false)
        toast({
          title: 'Profile updated',
          status: 'success',
          duration: 3000,
        })
      } catch (error) {
        toast({
          title: 'Update failed',
          status: 'error',
          duration: 3000,
        })
      }
    }
  
    if (!userId) return <Box p={4}>Select a user to view details</Box>
  
    return (
      <Box p={4}>
        <Heading size="md" mb={4}>User Details</Heading>
        {isEditing ? (
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </FormControl>
            <Button colorScheme="blue" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Stack>
        ) : (
          <Stack spacing={3}>
            <Box>
              <strong>Name:</strong> {user?.firstName} {user?.lastName}
            </Box>
            <Box>
              <strong>Email:</strong> {user?.email}
            </Box>
            <Box>
              <strong>Phone:</strong> {user?.phone}
            </Box>
            <Box>
              <strong>Address:</strong> {user?.address?.address}, {user?.address?.city}
            </Box>
            <Button mt={4} onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </Stack>
        )}
      </Box>
    )
  }
  
  export default UserDetails