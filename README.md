## Task Management Application

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

**Features**
- Add tasks with title as required and a short description
- View saved tasks 
- Delete saved tasks

## Local Setup

To run the server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) on browser to see the result.

Page shown can be edited by modifying `app/page.tsx`. The page auto-updates as file is edited.

## Project Structure
```
src/app/
├── page.tsx                    # Main UI page
├── api/
│   └── tasks/                  # API routes
│       └── route.ts            # GET, POST tasks (fetch & add tasks)
│       └── [id]/               
│           └── route.ts        # DELETE tasks (delete tasks by task ID)
├── lib/
│   └── db.ts                   # SQLite database
```

## Tech Stack

**Front end**

Framework: Next.js (App Router) 
Language: TypeScript
Styling: Tailwind CSS

**Back end**

API Routes in Next.js:

**Database**

SQLite

**API Used**

Custom REST API

## Additional Information

Title is a required field for task creation. 
Desc (description) is optional and displayed in italic.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
