import {
    Box,
    Input,
    Button,
    List,
    ListItem,
    IconButton,
    HStack,
    useToast,
    Heading,
  } from '@chakra-ui/react'
  import { DeleteIcon } from '@chakra-ui/icons'
  import { useState, useEffect } from 'react'
  import { fetchTodos, addTodo, deleteTodo } from '../../services/api'
  
  const TodoList = ({ userId }) => {
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')
    const toast = useToast()
  
    const loadTodos = async () => {
      if (userId) {
        const data = await fetchTodos(userId)
        setTodos(data)
      }
    }
  
    useEffect(() => {
      loadTodos()
    }, [userId])
  
    const handleAdd = async () => {
      if (!newTodo.trim()) return
      try {
        const todo = await addTodo(userId, newTodo)
        setTodos([...todos, todo])
        setNewTodo('')
        toast({
          title: 'Todo added',
          status: 'success',
          duration: 2000,
        })
      } catch (error) {
        toast({
          title: 'Failed to add todo',
          status: 'error',
          duration: 2000,
        })
      }
    }
  
    const handleDelete = async (id) => {
      try {
        await deleteTodo(id)
        setTodos(todos.filter(todo => todo.id !== id))
        toast({
          title: 'Todo deleted',
          status: 'success',
          duration: 2000,
        })
      } catch (error) {
        toast({
          title: 'Failed to delete todo',
          status: 'error',
          duration: 2000,
        })
      }
    }
  
    return (
      <Box p={4}>
        <Heading size="md" mb={4}>Todos</Heading>
        <HStack mb={4}>
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo"
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
          <Button onClick={handleAdd} colorScheme="blue">
            Add
          </Button>
        </HStack>
        <List spacing={3}>
          {todos.map(todo => (
            <ListItem key={todo.id} p={2} borderRadius="md" bg="white">
              <HStack justify="space-between">
                <Box>{todo.todo}</Box>
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Delete todo"
                  onClick={() => handleDelete(todo.id)}
                  size="sm"
                  variant="ghost"
                />
              </HStack>
            </ListItem>
          ))}
        </List>
      </Box>
    )
  }
  
  export default TodoList