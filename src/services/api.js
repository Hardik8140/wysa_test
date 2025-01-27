import axios from 'axios'

const BASE_URL = 'https://dummyjson.com'

export const fetchUsers = async (page = 1, search = '') => {
  const limit = 10
  const skip = (page - 1) * limit
  const response = await axios.get(
    `${BASE_URL}/users/search?q=${search}&limit=${limit}&skip=${skip}`
  )
  return response.data
}

export const fetchUserDetails = async (userId) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}`)
  return response.data
}

export const fetchTodos = async (userId) => {
  const response = await axios.get(`${BASE_URL}/todos/user/${userId}`)
  return response.data.todos
}

export const addTodo = async (userId, text) => {
  const response = await axios.post(`${BASE_URL}/todos/add`, {
    userId,
    todo: text,
    completed: false,
  })
  return response.data
}

export const deleteTodo = async (todoId) => {
  const response = await axios.delete(`${BASE_URL}/todos/${todoId}`)
  return response.data
}

export const updateUser = async (userId, data) => {
  const response = await axios.put(`${BASE_URL}/users/${userId}`, data)
  return response.data
}