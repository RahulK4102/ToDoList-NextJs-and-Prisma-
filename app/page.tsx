import { prisma } from "@/utils/prisma"
import ToDoItems from "@/components/ToDoItems";
import { redirect } from "next/navigation";
function getTodos() {
  return prisma.toDo.findMany();
}

async function CreateTodo(data: FormData) {
  "use server"
  const title = data.get("title")?.valueOf()
  await prisma.toDo.create({ data: { title, isCompleted: true } })
  redirect('/')
}
async function DeleteTodo(data: FormData) {
  "use server"
  const title = data.get("title")?.valueOf()
  await prisma.toDo.deleteMany()
  redirect('/')
}
const page = async () => {
  const todo = await getTodos();

  return (
    <div className="container mx-auto sm:max-w-xm md:max-w-xm lg:max-w-xl xl:max-w-2xl">
      <div className='w-full py-2  mx-auto pt-20 flex justify-center flex-col items-center'>
        <span className="text-3xl font-extrabold uppercase">
          To-Do-List
        </span>
      </div>
      <div className='w-full py-2 flex  mx-auto justify-center gap-2 items-center'>
        <form action={CreateTodo} className="flex gap-2">
          <input type="text" name="title" className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" />
          <button className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" >Add</button>
        </form>
        <form action={DeleteTodo} >
          <button className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100" >Reset</button>
        </form>
      </div>
      <div className="w-full mx-auto py-2 flex justify-center flex-col items-center pr-40 ">
        <ul>
          {todo.map(todo => (
            <ToDoItems key={todo.id} {...todo} />
          ))}
        </ul>
      </div>

    </div>
  )
}

export default page
