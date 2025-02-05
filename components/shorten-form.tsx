'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function ShortenForm() {
     const [url, setUrl] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(url)
    }
  return (
    <form className="mb-4" onSubmit={handleSubmit}>
    <div className='space-y-4'>
      <Input className='h-12' 
      type='url' 
      placeholder='Enter URL to shorten' 
      required 
      value={url }
      onChange={(e) => setUrl(e.target.value)}
      /> 
      <Button className='w-full p-2' type='submit'>Shorten URL</Button>
    </div>
    </form>
  )
}
