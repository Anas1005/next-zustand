'use client'

import { Status, useTaskStore } from '@/lib/zustand/slices/taskSlice'
import Task from './task'
import { useEffect, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { memoize } from 'proxy-memoize'



export default function Column({
  title,
  status
}: {
  title: string
  status: Status
}) {

  const filteredTasks = useTaskStore(useShallow(
    (state) => state.tasks.filter(task => task.status === status))
  );
  const { draggedTask, updateTask, dragTask } = useTaskStore(useShallow((state) => ({ draggedTask: state.draggedTask, updateTask: state.updateTask, dragTask: state.dragTask })))


    //  const tasks = useTaskStore(state => state.tasks)
   // const draggedTask = useTaskStore(state => state.draggedTask)
  // const updateTask = useTaskStore(state => state.updateTask)
  // const dragTask = useTaskStore(state => state.dragTask)


  // const filteredTasks = useMemo(
  //   () => tasks.filter(task => task.status === status),
  //   [tasks, status]
  // )
  console.log(status + "Re-Rendered....", filteredTasks);



  

  // useEffect(() => {
  //   useTaskStore.persist.rehydrate()
  // }, [])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTask) return
    updateTask(draggedTask, status)
    dragTask(null)
  }

  return (
    <section className='h-[600px] flex-1'>
      <h2 className='ml-1 font-serif text-2xl font-semibold'>{title}</h2>

      <div
        className='mt-3.5 h-full w-full rounded-xl bg-gray-700/50 p-4'
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <div className='flex flex-col gap-4'>
          {filteredTasks.map(task => (
            <Task key={task.id} {...task} />
          ))}

          {filteredTasks.length === 0 && status === 'TODO' && (
            <div className='mt-8 text-center text-sm text-gray-500'>
              <p>Create a new task</p>
            </div>
          )}

          {filteredTasks.length && filteredTasks.length === 0 && status !== 'TODO' ? (
            <div className='mt-8 text-center text-sm text-gray-500'>
              <p>Drag your tasks here</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
