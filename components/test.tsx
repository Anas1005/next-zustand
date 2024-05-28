'use client'
import React from 'react'
import { useTaskStore, useDerivedCount } from '@/lib/zustand/slices/taskSlice'

export const Test = () =>{
    const count = useTaskStore((state)=>state.count);
    const change = useTaskStore((state)=>state.change)
    const derivedCount = useDerivedCount();
    console.log("Test Re-Rendered...", count, derivedCount)

  return (
    <div onClick = {change}>Testtttttt {count}</div>
  )
}

