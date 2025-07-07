'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-dark text-white py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-dark font-bold text-lg">🚗</span>
          </div>
          <span className="text-xl font-bold">CarAuto</span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/posts" className="hover:text-primary transition-colors">Blogs</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
        </nav>
        
        <Link href="/subscribe" className="hidden md:block bg-white text-dark px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
          Subscribe
        </Link>
        
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <div className="flex flex-col space-y-2">
            <Link href="/" className="hover:text-primary transition-colors py-2">Home</Link>
            <Link href="/posts" className="hover:text-primary transition-colors py-2">Blogs</Link>
            <Link href="/about" className="hover:text-primary transition-colors py-2">About</Link>
            <Link href="/contact" className="hover:text-primary transition-colors py-2">Contact Us</Link>
            <Link href="/subscribe" className="bg-white text-dark px-4 py-2 rounded-md hover:bg-gray-100 transition-colors mt-2 inline-block">
              Subscribe
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}