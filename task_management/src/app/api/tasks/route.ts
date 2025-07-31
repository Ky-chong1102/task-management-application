import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  return new Promise((resolve) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
      if (err) {
        resolve(NextResponse.json({ error: 'Database error' }, { status: 500 }));
      } else {
        resolve(NextResponse.json(rows, { status: 200 }));
      }
    });
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, desc = '', completed = false } = body;

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  return new Promise((resolve) => {
    db.run(
      `INSERT INTO tasks (title, desc, completed) VALUES (?, ?, ?)`,
      [title, desc, completed ? 1 : 0],
      function (err) {
        if (err) {
          resolve(NextResponse.json({ error: 'Failed to insert task' }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ id: this.lastID }, { status: 201 }));
        }
      }
    );
  });
}