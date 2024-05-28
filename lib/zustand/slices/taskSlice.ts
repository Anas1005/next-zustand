import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { useShallow } from 'zustand/react/shallow'
import { persist } from 'zustand/middleware'

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE'

export type Task = {
  id: string
  title: string
  description?: string
  status: Status
}

export type State = {
  tasks: Task[],
  draggedTask: string | null,
  count: number,
  derived: number
}

export type Actions = {
  addTask: (title: string, description?: string) => void
  dragTask: (id: string | null) => void
  removeTask: (title: string) => void
  updateTask: (title: string, status: Status) => void
  change: () => void
}

export const useTaskStore = create<State & Actions>()(
  // persist(
  set => ({
    tasks: [],
    draggedTask: null,
    count: 0,
    derived: 0,
    addTask: (title: string, description?: string) =>
      set(state => ({
        tasks: [
          ...state.tasks,
          { id: uuid(), title, description, status: 'TODO' }
        ]
      })),
    dragTask: (id: string | null) => set({ draggedTask: id }),
    removeTask: (id: string) =>
      set(state => ({
        tasks: state.tasks.filter(task => task.id !== id)
      })),
    updateTask: (id: string, status: Status) =>
      set(state => ({
        tasks: state.tasks.map(task =>
          task.id === id ? { ...task, status } : task
        ),
        // count: state.count + 1
      })),
    change: () => {
      set(state => ({
        count: state.count + 1
      }))

    }
  }),
  //   { name: 'task-store', skipHydration: true }
  // )
)

export const useDerivedCount = () => useTaskStore((state) => state.count * 2);
// export const useDescList = () => useTaskStore(useShallow(
//     (state) => state.tasks.map((task) => ({ id: task.id, description: task.description }))));
