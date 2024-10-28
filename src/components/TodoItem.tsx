import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { format } from "date-fns";
import {
  Box,
  Checkbox,
  Text,
  HStack,
  IconButton,
  Badge,
  useColorModeValue,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Todo } from "../store/todoStore";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (updates: Partial<Todo>) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const toast = useToast();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  const priorityColors = {
    low: "blue",
    medium: "yellow",
    high: "red",
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete();
      toast({
        title: "Task deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      p={4}
      bg={bg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      opacity={isDragging ? 0.5 : 1}
      transition="all 0.2s"
      _hover={{ bg: hoverBg }}
      position="relative"
    >
      <HStack spacing={4} align="center" justify="space-between">
        <HStack spacing={4} flex={1}>
          <Box
            cursor="grab"
            {...attributes}
            {...listeners}
            color="gray.500"
            _hover={{ color: "gray.700" }}
          >
            <GripVertical size={20} />
          </Box>

          <Checkbox
            isChecked={todo.completed}
            onChange={onToggle}
            colorScheme="green"
          />

          <Box flex="1">
            <Text
              fontSize="sm"
              fontWeight="medium"
              textDecoration={todo.completed ? "line-through" : "none"}
              color={todo.completed ? "gray.500" : "inherit"}
            >
              {todo.title}
            </Text>
            <HStack spacing={2} mt={1}>
              <Badge colorScheme={priorityColors[todo.priority]}>
                {todo.priority}
              </Badge>
              {todo.dueDate && (
                <Text fontSize="xs" color="gray.500">
                  Due: {format(new Date(todo.dueDate), "MMM d, yyyy")}
                </Text>
              )}
            </HStack>
          </Box>
        </HStack>

        <HStack spacing={2}>
          <IconButton
            icon={<Pencil size={16} />}
            aria-label="Edit task"
            size="sm"
            variant="ghost"
            onClick={() => {
              const newTitle = prompt("Edit task:", todo.title);
              if (newTitle?.trim()) onEdit({ title: newTitle.trim() });
            }}
          />
          <Button
            leftIcon={<Trash2 size={16} />}
            colorScheme="red"
            size="sm"
            variant="ghost"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
}
