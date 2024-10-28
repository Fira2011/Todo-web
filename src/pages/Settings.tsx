import {
  Box,
  Button,
  Heading,
  Stack,
  Switch,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useTodoStore } from "../store/todoStore";

export default function Settings() {
  const { colorMode, toggleColorMode } = useColorMode();
  const clearTodos = useTodoStore((state) => ({
    clearTodos: () => state.reorderTodos([]),
  })).clearTodos;

  return (
    <Box>
      <Heading mb={8}>Settings</Heading>

      <Stack spacing={6}>
        <VStack align="start" spacing={4}>
          <Box>
            <Text fontWeight="medium" mb={2}>
              Appearance
            </Text>
            <Stack direction="row" align="center">
              <Switch
                isChecked={colorMode === "dark"}
                onChange={toggleColorMode}
              />
              <Text>Dark Mode</Text>
            </Stack>
          </Box>

          <Box>
            <Text fontWeight="medium" mb={2}>
              Data Management
            </Text>
            <Button
              colorScheme="red"
              variant="outline"
              size="sm"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to clear all todos? This action cannot be undone."
                  )
                ) {
                  clearTodos();
                }
              }}
            >
              Clear All Todos
            </Button>
          </Box>
        </VStack>
      </Stack>
    </Box>
  );
}
