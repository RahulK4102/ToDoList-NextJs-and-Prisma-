import { prisma } from "@/utils/prisma"
import ToDoItems from "@/components/ToDoItems";
import { redirect } from "next/navigation";
import Link from "next/link";
function getTodos(){
  return prisma.toDo.findMany();
}

async function CreateTodo(data:FormData){
  "use server"
  const title = data.get("title")?.valueOf()
  await prisma.toDo.create({data:{title,isCompleted:false}})
  redirect('/')
}
const page = async() => {
  const todo = await getTodos();
  
  return (
    <>
    <div className='w-screen pt-20 flex justify-center flex-col items-center'>
      <span className="text-3xl font-extrabold uppercase">
        To-Do-List
      </span>
    </div>
    <div className='w-screen py-2 flex justify-center gap-2 items-center'>
      <form action={CreateTodo} className="flex gap-2">
        <input type="text" name="title" className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" />
        <button className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" >Add</button>
      </form>
    </div>
    <div className="w-screen py-2 flex justify-center flex-col items-center pr-40 ">
    <ul>
        {todo.map(todo=>(
          <ToDoItems key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
    <Link href="/delete" >Reset</Link>
    </>
  )
}

export default page
