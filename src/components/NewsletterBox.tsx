import React from 'react'

const NewsletterBox = () => {

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <div className=' text-center'>
        <p className=' text-2xl font-medium text-gray-800'>Subcribe now & get 20% off</p>
        <p className=' text-gray-400 mt-3'>
            Be the first to know about new arrivals, look books, sales & promos!
        </p>
        <form onSubmit={onSubmitHandler} action="" className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className=' w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email address' />
            <button className=' bg-black text-white px-10 py-5'>Subscribe</button>
        </form>
    </div>
  )
}

export default NewsletterBox