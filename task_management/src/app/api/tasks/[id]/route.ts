import { NextResponse } from 'next/server';
import db from '@/lib/db';

// Handle DELETE /api/task/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid task ID' }, { status: 400 });
  }

  return new Promise((resolve) => {
    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (err) {
      if (err) {
        resolve(NextResponse.json({ error: 'Failed to delete task' }, { status: 500 }));
      } else if (this.changes === 0) {
        resolve(NextResponse.json({ error: 'Task not found' }, { status: 404 }));
      } else {
        resolve(NextResponse.json({ message: 'Task deleted successfully' }, { status: 200 }));
      }
    });
  });
}