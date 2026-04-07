import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { setSearchQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'



const Jobs = () => {
  const dispatch = useDispatch();
  const {allJobs, searchQuery} = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useGetAllJobs();

  useEffect(() => {
    dispatch(setSearchQuery(""));
  }, [dispatch])
  
  useEffect(() => {
    // if no filter apply then it will show all jobs
    if (!searchQuery) {
      setFilterJobs(allJobs);
      return;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const salaryRangeMatch = query.match(/(\d+)\s*lpa\s*-\s*(\d+)\s*lpa/);

      const filteredJobs = allJobs.filter((job) => {

         if (salaryRangeMatch) {
          const minSalary = Number(salaryRangeMatch[1]);
          const maxSalary = Number(salaryRangeMatch[2]);

          return job.salary >= minSalary && job.salary <= maxSalary;
        }

        return job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        // job?.details?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job?.description?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job?.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchQuery.toLowerCase());
      })
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchQuery]);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-10 mt-5 mb-10'>
        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterCard />
          </div>
          {
            filterJobs.length <= 0 ? <span>Job not found</span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                    filterJobs.map((job) => (
                      <motion.div initial={{opacity:0, x:100}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-100}} transition={{duration:0.3}} key={job?._id}>
                        <Job job={job} />
                      </motion.div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Jobs
