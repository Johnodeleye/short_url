'use client'
import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface ShortenFormProps {
  handleUrlShortened: () => void;
}
export default function ShortenForm({ handleUrlShortened }: ShortenFormProps) {
     const [url, setUrl] = useState<string>('')
     const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)

        try {
          const response = await fetch('/api/shorten', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              url
            })
          });
          await response.json();
          alert('Success: your link has been shortened')
          
          setUrl('');
          handleUrlShortened();
         

        } catch (error) {
          console.error('Error shortening URL:', error);
        } finally {
          setIsLoading(false)
        }

        console.log(url)
    }
  return (
    <form className="mb-4 px-6" onSubmit={handleSubmit}>
    <div className='space-y-4'>
      <Input className='h-12' 
      type='url' 
      placeholder='Enter URL to shorten' 
      required 
      value={url }
      onChange={(e) => setUrl(e.target.value)}
      /> 
      <Button className='w-full p-2' type='submit' disabled={isLoading}>{isLoading ? 'Shortening...' : 'Shorten Url'}</Button>
    </div>
    </form>
  )
}
