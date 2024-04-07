import React from 'react'
import { Link } from 'react-router-dom'

const Home_page = () => {
  return (
    <div className='bg-[#0D1F23] h-screen'>
        <header className="text-gray-600 body-font ">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <Link className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
   
        <span className="ml-3 text-xl text-white"><span className='text-2xl text-green-500 font-medium'>Pay</span>tm</span>
      </Link>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
       
   

      </nav>
      <button className="inline-flex items-center bg-green-500 font-regular text-black  border-0 py-1 px-3 focus:outline-none hover:bg-green-500 rounded text-base mt-4 md:mt-0">
      <Link to="signup" className="mr-5 hover:text-gray-900">Go to Sign up page</Link>
      </button>
    </div>
  </header>

  <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">This is a simple paytm app 

      </h1>
      <p className="mb-8 leading-relaxed text-gray-200">Not a complex architecture just simple tasks like sending money and receving money , you can create your own accont and send money to users that are Already there 
        .I'm making another paytm project with high complexity.</p>
      <div className="flex justify-center">
        <button className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"><Link to="https://3-d-portfolio-liard-one.vercel.app/">My portfolio</Link></button>
        <button className="ml-4 inline-flex text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-500 rounded text-lg"><Link to="https://github.com/Akhilesh-pujar">Git hub</Link></button>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
     
    </div>
  </div>
</section>

    </div>
    
  )
}

export default Home_page