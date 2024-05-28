'use client'
import React from 'react';
import { useShallow } from 'zustand/react/shallow'; // Import useShallow
import { useTaskStore } from '@/lib/zustand/slices/taskSlice';
import { memoize } from 'proxy-memoize';
import Desc from './desc';

export const Descriptions = () => {
  const descList = useTaskStore(memoize((state) => {
    // console.log("Memoized selector function called");
    return state.tasks.map((task) => ({ id: task.id, description: task.description }));
  }));

  console.log("Desc Re-Rendered", descList);
  return (
    <section className='h-[600px] flex-1'>
      <div className='mt-3.5 h-full w-full rounded-xl bg-gray-700/50 p-4'>
        <div className='flex flex-col gap-4'>
          {
            descList.map((task) => <Desc key={task.id} id={task.id} description={task.description} />)
          }
        </div>
      </div>
    </section>
  );
};
