import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import UserDetails from './components/UserDetails'
import TodoList from './components/TodoList'

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null)

  return (
    <Flex h="100vh">
      <Sidebar
        selectedUserId={selectedUserId}
        onSelectUser={setSelectedUserId}
      />
      <Tabs flex={1} p={4} isLazy>
        <TabList>
          <Tab>User Details</Tab>
          <Tab>Todos</Tab>
        </TabList>

        <TabPanels mt={4}>
          <TabPanel>
            <UserDetails userId={selectedUserId} />
          </TabPanel>
          <TabPanel>
            <TodoList userId={selectedUserId} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default App