import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
} from "@chakra-ui/react";
import { useTodoStore } from "../store/todoStore";

export default function Stats() {
  const { todos } = useTodoStore();

  const totalTasks = todos.length;
  const completedTasks = todos.filter((t) => t.completed).length;
  const completionRate = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  const priorityCount = todos.reduce((acc, todo) => {
    acc[todo.priority] = (acc[todo.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Box>
      <Heading mb={8}>Statistics</Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <Stat>
          <StatLabel>Total Tasks</StatLabel>
          <StatNumber>{totalTasks}</StatNumber>
          <StatHelpText>All time</StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Completion Rate</StatLabel>
          <StatNumber>{completionRate.toFixed(1)}%</StatNumber>
          <Progress
            value={completionRate}
            colorScheme="green"
            size="sm"
            mt={2}
          />
        </Stat>

        <Stat>
          <StatLabel>High Priority Tasks</StatLabel>
          <StatNumber>{priorityCount.high || 0}</StatNumber>
          <StatHelpText>Tasks requiring immediate attention</StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Completed Tasks</StatLabel>
          <StatNumber>{completedTasks}</StatNumber>
          <StatHelpText>Well done!</StatHelpText>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}
