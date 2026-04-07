import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType:"Location",
        array:["DelhiNCR", "Bangalore", "Hyderabad", "Jaipur", "Mumbai", "Noida"]
    },
    {
        filterType:"Industry",
        array:["Full Stack Developer", "Backend Developer", "Data Analytics", "Graphics Designer", "DevOps Engineer", "AI/ML"]
    },
    {
        filterType:"Salary",
        array:["10LPA-20LPA", "20LPA-30LPA", "30LPA-40LPA", "40LPA-50LPA", "Above50LPA"]
    }
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  }
  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className='w-full bg-white p-3 rounded-md h-[88vh] overflow-y-auto'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />

      {
        filterData.map((data, index) => (
          <div key={index}>
            <h1 className='font-bold text-lg mt-3'>{data.filterType}</h1>

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index} - ${idx}`
                  return (
                    <div key={idx} className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </RadioGroup>

          </div>
        ))
      }
    </div>
  )
}

export default FilterCard
