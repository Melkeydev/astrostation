import * as React from 'react'
import { IoCloseSharp, IoReloadSharp } from 'react-icons/io5'
import { AiOutlineReload } from 'react-icons/ai'

interface CardProps {
  title: string;
  toggleFunction: Function;
  reloadFunction: React.MouseEventHandler<SVGElement>;
  children: React.ReactNode
}


export const Card = ({ title, toggleFunction, reloadFunction, children }: CardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white/[.96] dark:border-gray-700 dark:bg-gray-800/[.96] dark:text-gray-300 sm:w-96">
      <div className="handle flex cursor-move items-center justify-between p-1">
        <p className="py-2 font-bold">{title}</p>
        <IoCloseSharp
          className="cursor-pointer rounded bg-gray-800 dark:bg-gray-300 dark:text-gray-800 text-gray-100 hover:bg-gray-900"
          onClick={() => toggleFunction(false)}
        />
      </div>

      <div className="handle flex flex-col w-full cursor-move p-2">

        {children}
      </div>
      <div className="flex w-full justify-end pb-2 pr-2 pl-2 text-base">
        <AiOutlineReload
          onClick={reloadFunction} />
      </div>
    </div>
  )
}

interface LoaderCardProps {
  title: string;
  toggleFunction: Function;
  reloadFunction: React.MouseEventHandler<SVGElement>;
}


export const LoaderCard = ({ title, toggleFunction, reloadFunction }: LoaderCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white/[.96] dark:border-gray-700 dark:bg-gray-800/[.96] dark:text-gray-300 sm:w-96">
      <div className="handle flex cursor-move items-center justify-between p-1">
        <p className="py-2 font-bold">{title}</p>
        <IoCloseSharp
          className="cursor-pointer rounded bg-gray-800 dark:bg-gray-300 dark:text-gray-800 text-gray-100 hover:bg-gray-900"
          onClick={() => toggleFunction(false)}
        />
      </div>

      <div className="handle flex flex-col items-center justify-center w-full h-32 cursor-move p-2">

        <IoReloadSharp className="w-12 h-auto animate-spin" />
      </div>
      <div className="flex w-full justify-end pb-2 pr-2 pl-2 text-base">
        <AiOutlineReload
          onClick={reloadFunction} />
      </div>
    </div>
  )
}




