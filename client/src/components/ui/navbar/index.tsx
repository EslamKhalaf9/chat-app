import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="h-[10vh] flex w-full fixed bg-foreground text-background">
      <div className="w-full h-full flex justify-center items-center">
        <p className="font-bold text-2xl">
          <Link href="/">Chat App</Link>
        </p>
      </div>
    </nav>
  )
}

export default Navbar