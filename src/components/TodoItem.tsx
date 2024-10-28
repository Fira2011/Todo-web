import React from "react";
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
} from "@chakra-ui/react";
import { Todo } from "../store/todoStore";

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (updates: Partial<Todo>) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
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
      <HStack spacing={4}>
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

        <HStack
          spacing={1}
          opacity={0}
          _groupHover={{ opacity: 1 }}
          transition="0.2s"
        >
          <IconButton
            icon={<Pencil size={16} />}
            aria-label="Edit todo"
            size="sm"
            variant="ghost"
            onClick={() => {
              const newTitle = prompt("Edit todo:", todo.title);
              if (newTitle) onEdit({ title: newTitle });
            }}
          />
          <IconButton
            icon={<Trash2 size={16} />}
            aria-label="Delete todo"
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={onDelete}
          />
        </HStack>
      </HStack>
    </Box>
  );
}
