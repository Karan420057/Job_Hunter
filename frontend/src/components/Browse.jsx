import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';


const Browse = () => {
  useGetAllJobs();
  const {allJobs} = useSelector(store => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return ()=> {
        dispatch(setSearchQuery(""));
    }
  }, [])

  // return (
  //   <div >
  //     <Navbar />
  //     <div className='max-w-7xl mx-auto my-10 pl-10 pr-10 mb-10'>
  //       <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
  //       <div className='grid grid-cols-3 gap-4'>
  //           {
  //             allJobs.map((job) => {
  //                 return (
  //                     <Job key={job._id} job={job} />
  //                 )
  //             })
  //           }
  //       </div>
  //     </div>
  //     <Footer className='fixed bottom-0' />
  //   </div>
  // )

  return (
  <div className="min-h-screen flex flex-col">
    
    <Navbar />

    {/* Main content grows */}
    <div className="flex-grow max-w-7xl mx-auto my-10 px-10">
      <h1 className="font-bold text-xl my-10">
        Search Results ({allJobs.length})
      </h1>

      {allJobs.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          No jobs found
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {allJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>

    {/* Footer always at bottom */}
    <Footer />
  </div>
);
}

export default Browse
