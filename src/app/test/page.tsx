import React from 'react'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-white mb-4">Website is Working!</h1>
        <p className="text-xl text-gray-300 mb-8">
          The reddot.co.in website is now operational.
        </p>
        <a 
          href="/" 
          className="btn-primary inline-block px-6 py-3 rounded-lg font-semibold"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  )
}