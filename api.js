const API = "http://192.168.1.203:3000/tasks";

export const getTasks = async () => {
  const res = await fetch(API);
  return await res.json();
};

export const getTask = async (idTask) => {
  const res = await fetch(`${API}/${idTask}`);
  return await res.json();
};

export const saveTask = async (newTask) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(newTask),
  });
  return await res.json();
};

export const deleteTask = async (idTask) => {
  return await fetch(`${API}/${idTask}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
};

export const updateTask = async (taskId, updatedTask) => {
  return await fetch(`${API}/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(updatedTask),
  });
};