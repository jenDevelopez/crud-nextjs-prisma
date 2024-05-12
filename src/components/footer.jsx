import React from 'react'

function Footer() {
  const today = new Date()
  const year = today.getFullYear()
  return (
    <footer className='text-center fixed bottom-1 h-16 mt-4'>&copy {year} jenDevelopez</footer>
  )
}

export default Footer