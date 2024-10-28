import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, Filter, SortAsc } from "lucide-react";
import {
  Button,
  Heading,
  HStack,
  Input,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useTodoStore, type Priority } from "../store/todoStore";
import { TodoItem } from "../components/TodoItem";

export default function TodoList() {
  const {
    todos,
    filter,
    sortBy,
    addTodo,
    toggleTodo,
    removeTodo,
    editTodo,
    setFilter,
    setSortBy,
    reorderTodos,
  } = useTodoStore();

  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState<Priority>("medium");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);
      reorderTodos(arrayMove(todos, oldIndex, newIndex));
    }
  };

  return (
    <Stack spacing={8}>
      <Heading>Tasks</Heading>

      <Stack spacing={4}>
        <HStack>
          <Input
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Add a new task..."
            size="md"
          />
          <Select
            value={newTodoPriority}
            onChange={(e) => setNewTodoPriority(e.target.value as Priority)}
            width="auto"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
          <Button
            leftIcon={<Plus size={20} />}
            colorScheme="blue"
            onClick={() => {
              if (newTodoTitle.trim()) {
                addTodo(newTodoTitle.trim(), newTodoPriority);
                setNewTodoTitle("");
              }
            }}
          >
            Add
          </Button>
        </HStack>

        <HStack justify="space-between">
          <HStack>
            <Filter size={20} />
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              width="auto"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </Select>
          </HStack>

          <HStack>
            <SortAsc size={20} />
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              width="auto"
            >
              <option value="createdAt">Created Date</option>
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
            </Select>
          </HStack>
        </HStack>
      </Stack>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={filteredTodos}
          strategy={verticalListSortingStrategy}
        >
          <VStack spacing={2} align="stretch">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => toggleTodo(todo.id)}
                onDelete={() => removeTodo(todo.id)}
                onEdit={(updates) => editTodo(todo.id, updates)}
              />
            ))}
          </VStack>
        </SortableContext>
      </DndContext>

      <Text textAlign="center" fontSize="sm" color="gray.500">
        {todos.length} total tasks • {todos.filter((t) => !t.completed).length}{" "}
        remaining
      </Text>
    </Stack>
  );
}
