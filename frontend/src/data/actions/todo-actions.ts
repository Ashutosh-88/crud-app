"use server";
import { mutateData } from "@/data/services/mutate-data";
import { getAuthToken } from "@/data/services/get-token";
import { getStrapiURL } from "@/lib/utils";

import { Todo } from "../types/todo";
import { getUserMeLoader } from "../services/get-user-me-loader";

const STRAPI_URL = getStrapiURL();

export const fetchTodos = async (): Promise<Todo[]> => {
  const token = await getAuthToken();
  if (!token) throw new Error("No auth token found");

  const url = new URL("/api/todos", STRAPI_URL);
  url.searchParams.append("populate", "users_permissions_user");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.data.map((item: any) => ({
    id: item.id,
    documentId: item.documentId,
    text: item.text,
    completed: item.completed,
  }));
};

export const createTodo = async (todo: Omit<Todo, "id" | "documentId">) => {
  const token = await getAuthToken();
  if (!token) throw new Error("No auth token found");

  // Get current user ID
  const url = new URL("/api/users/me", STRAPI_URL);

  const userResponse = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const userData = await userResponse.json();
  const userId = userData.id;
  console.log("====================");
  console.log(userData);
  console.log("====================");
  console.log(userId);
  console.log("====================");

  if (!userId) throw new Error("Could not get user ID");

  const response = await mutateData("POST", "/api/todos", {
    data: {
      ...todo,
      // users_permissions_user: userId,
    },
  });

  return response.data;
};

export const updateTodo = async (documentId: string, completed: boolean) => {
  await mutateData("PUT", `/api/todos/${documentId}`, {
    data: { completed },
  });
};

export const deleteTodo = async (documentId: string) => {
  await mutateData("DELETE", `/api/todos/${documentId}`);
};
