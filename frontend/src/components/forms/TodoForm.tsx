"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { Todo } from "@/data/types/todo";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "@/data/actions/todo-actions";

export default function TodoForm() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const loadedTodos = await fetchTodos();
        setTodos(loadedTodos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    loadTodos();
  }, []);

  const handleAdd = async () => {
    if (!newTodo.trim()) return;

    try {
      await createTodo({ text: newTodo, completed: false });
      setNewTodo("");
      const updatedTodos = await fetchTodos();
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  const handleToggle = async (documentId: string, completed: boolean) => {
    try {
      await updateTodo(documentId, !completed);
      const updatedTodos = await fetchTodos();
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDelete = async (documentId: string) => {
    try {
      await deleteTodo(documentId);
      const updatedTodos = await fetchTodos();
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center text-white bg-gray-900 dark:bg-gray-200 rounded-t-xl py-2">
          Todo List
        </h2>

        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Add a new task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button
            onClick={handleAdd}
            className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-200  dark:hover:bg-gray-100 cursor-pointer"
          >
            Add Todo
          </Button>
        </div>

        <ul className="mt-4 space-y-2">
          {todos.map((todo) => (
            <li key={todo.documentId} className="flex items-center gap-2">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() =>
                  handleToggle(todo.documentId, todo.completed)
                }
                className="cursor-pointer"
              />
              <span
                className={`flex-1 ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(todo.documentId)}
                className="cursor-pointer"
              >
                🗑️
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
