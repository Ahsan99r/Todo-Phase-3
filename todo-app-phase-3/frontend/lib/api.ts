export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export async function createTodo(title: string, description?: string) {
  const res = await fetch('/api/todos/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
  return res.json();
}

export async function updateTodo(id: number, updates: any) {
  const res = await fetch(`/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return res.json();
}

export async function deleteTodo(id: number) {
  const res = await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}
