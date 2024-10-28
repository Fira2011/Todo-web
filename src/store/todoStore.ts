import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date;
  priority: Priority;
}

interface TodoStore {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  sortBy: 'priority' | 'dueDate' | 'createdAt';
  addTodo: (title: string, priority: Priority, dueDate?: Date) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  editTodo: (id: string, updates: Partial<Todo>) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  setSortBy: (sort: 'priority' | 'dueDate' | 'createdAt') => void;
  reorderTodos: (todos: Todo[]) => void;
  clearTodos: () => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      filter: 'all',
      sortBy: 'createdAt',
      addTodo: (title, priority, dueDate) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.randomUUID(),
              title,
              completed: false,
              createdAt: new Date(),
              dueDate,
              priority,
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      editTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updates } : todo
          ),
        })),
      setFilter: (filter) => set({ filter }),
      setSortBy: (sortBy) => set({ sortBy }),
      reorderTodos: (todos) => set({ todos }),
      clearTodos: () => set({ todos: [] }),
    }),
    {
      name: 'todo-storage',
    }
  )
);
