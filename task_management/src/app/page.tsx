'use client';

import React, { useState, useEffect } from 'react';

type Task = {
  id: number;
  title: string;
  desc?: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch('/api/tasks');
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {

    const trimmedTitle = newTask.trim();

    if (!trimmedTitle) {
      alert('Task title is required.');
      return;
    }

    if (newTask.trim()) {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTask.trim(),
          desc: newDesc,
          completed: false,
        }),
      });

      if (res.ok) {
        const newTaskFromDB: Task = await res.json();
        // setTasks([...tasks, newTaskFromDB]);
        const updatedRes = await fetch('/api/tasks');
        const updatedTasks = await updatedRes.json();
        setTasks(updatedTasks);
        setNewTask('');
        setNewDesc('');
      } else {
        console.error('Failed to add task');
      }
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } else {
      console.error('Failed to delete task');
    }
  };

  return (
    <main className="min-h-screen p-10 font-sans">
      <h1 className="text-3xl font-bold mb-6">My Task List</h1>

      <div className="mb-8 flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="border px-3 py-2 w-full max-w-md"
        />
        <input
          type="text"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          placeholder="Enter short description (optional)"
          className="border px-3 py-2 w-full max-w-md"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>
      <ul className="list-disc pl-6 space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="mb-4 mt-4 flex justify-between items-center max-w-4xl w-full"
          >
            <span className="text-white text-lg">{task.title}</span>
            <span className="text-gray-300 text-lg italic">{task.desc}</span>
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-500 hover:underline text-base font-bold"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
