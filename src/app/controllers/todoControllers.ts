import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findTodos = async () => {
  const todos = await prisma.todos.findMany({
    select: {
      title: true,
      id: true,
      completed: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return todos;
};

export const findTodo = async (id: string) => {
  const todo = await prisma.todos.findUnique({
    where: {
      id: id,
    },
  });

  if (!todo) {
    return;
  }

  return todo;
};

export const createTodo = async (title: string) => {
  const todoExist = await prisma.todos.findFirst({
    where: {
      title: title,
    },
  });

  if (todoExist) {
    return;
  }

  const todo = await prisma.todos.create({
    data: {
      title: title,
    },
  });

  return todo;
};

export const updateTodo = async (
  id: string,
  completed: boolean,
  title: string
) => {
  const todoExist = await prisma.todos.findUnique({
    where: {
      id: id,
    },
  });

  if (!todoExist) {
    return;
  }

  const todo = await prisma.todos.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      completed: completed,
    },
  });

  return todo;
};

export const deleteTodo = async (id: string) => {
  const todoExist = await prisma.todos.findUnique({
    where: {
      id: id,
    },
  });

  if (!todoExist) {
    return;
  }

  await prisma.todos.delete({
    where: {
      id: id,
    },
  });

  return true;
};
