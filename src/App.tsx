import { Routes, Route, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import Navigation from "./components/Navigation";
import TodoList from "./pages/TodoList";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";



export default function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box minH="100vh" py={12}>
      <Container maxW="3xl">
        <Flex justify="space-between" align="center" mb={8}>
          <Navigation />
          <IconButton
            icon={colorMode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            onClick={toggleColorMode}
            aria-label="Toggle color mode"
            variant="ghost"
          />
        </Flex>

        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Container>
    </Box>
  );
}
