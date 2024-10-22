"use client"


import { Button } from '@/components/ui/button'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'

import {  HomeIcon, ListIcon, User } from 'lucide-react'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { ReactNode } from 'react'
import { BiBowlRice } from 'react-icons/bi'
import { RiEmotionHappyLine } from 'react-icons/ri'

export default function DashboardTopNav({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <header className="flex h-14 lg:h-[55px] items-center gap-4 border-b px-3">
        <Dialog>
          <SheetTrigger className="min-[1024px]:hidden p-2 transition">
            <ListIcon />
            <Link href="/dashboard">
              <span className="sr-only">Home</span>
            </Link>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <Link href="/">
                <SheetTitle>MoodMates</SheetTitle>
              </Link>
            </SheetHeader>
            <div className="flex flex-col space-y-3 mt-[1rem]">
              <DialogClose asChild>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    <HomeIcon className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/EatingHabits">
                  <Button variant="outline" className="w-full">
                    <BiBowlRice className="mr-2 h-4 w-4" />
                    Eating Habits
                  </Button>
                </Link>
              </DialogClose>
              <DialogClose asChild>
                <Link href="/dashboard/EmotionTracker">
                  <Button variant="outline" className="w-full">
                    <RiEmotionHappyLine className="mr-2 h-4 w-4" />
                    Emotion Tracker
                  </Button>
                </Link>
              </DialogClose>
              <Separator className="my-3" />
              <DialogClose asChild>
                <Link href="/account">
                  <Button variant="outline" className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </Button>
                </Link>
              </DialogClose>
            </div>
          </SheetContent>
        </Dialog>
        <div className="flex justify-center items-center gap-2 ml-auto mr-6">
        <DropdownMenu >
  <DropdownMenuTrigger className='rounded-xl'><User className='m-2'/></DropdownMenuTrigger>
  <DropdownMenuContent className='bg-gray-300 rounded-xl'>
    
    <DropdownMenuItem><Button variant='link' ><Link href='/account'>Account</Link></Button></DropdownMenuItem>
    <DropdownMenuItem><Button variant='link' className=' text-red-500 font-semibold'  onClick={() => signOut({ callbackUrl: '/' })}>Log Out</Button></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        </div>
      </header>
      {children}
    </div>
  )
}