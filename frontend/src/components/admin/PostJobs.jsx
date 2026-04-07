import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const companyArray = [];

const PostJobs = () => {
    const [input, setInput] = useState({
        title:"",
        description:"",
        requirements:"",
        salary:"",
        location:"",
        jobType:"",
        experience:"",
        vacancy:0,
        companyId:""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {companies} = useSelector(store => store.company);
    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value});
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() == value);
        setInput({...input, companyId:selectedCompany._id});
    };

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }


  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center w-screen my-5'>
        <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>  
            <div className='grid grid-cols-2 gap-2'>
                <div>
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" name="title" id="title" value={input.title} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-o my-1' />
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Input type="text" name="description" id="description" value={input.description} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-o my-1' />
                </div>
                <div>
                    <Label htmlFor="requirements">Requirements</Label>
                    <Input type="text" name="requirements" id="requirements" value={input.requirements} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-o my-1' />
                </div>
                <div>
                    <Label htmlFor="salary">Salary</Label>
                    <Input type="text" name="salary" id="salary" value={input.salary} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-o my-1' />
                </div>
                <div>
                    <Label htmlFor="location">Location</Label>
                    <Input type="text" name="location" id="location" value={input.location} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-o my-1' />
                </div>
                <div>
                    <Label htmlFor="jobType">Job Type</Label>
                    <Input type="text" name="jobType" id="jobType" value={input.jobType} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-o my-1' />
                </div>
                <div>
                    <Label htmlFor="experience">Experience Level</Label>
                    <Input type="text" name="experience" id="experience" value={input.experience} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-o my-1' />
                </div>
                <div>
                    <Label htmlFor="vacancy">No. of Openings</Label>
                    <Input type="number" name="vacancy" id="vacancy" value={input.vacancy} onChange={changeEventHandler} className='focus-visible:ring-offset-0 focus-visible:ring-o my-1' />
                </div>
                {
                    companies.length > 0 && (
                        <Select onValueChange={selectChangeHandler}>
                            <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Select a company" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        companies.map((company) => {
                                            return (
                                                <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                            )
                                        })
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )
                }
            </div>
            {
                loading ? <Button className='w-full my-4'> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please Wait</Button> : <Button type='submit' className='w-full my-4'>Post New Job</Button>
            }
            {
                companies.length == 0 && <p className='text-xs text-red-600 font-bold text-center my-4'>* Please register a company first.</p>
            }
        </form>
      </div>
    </div>
  )
}

export default PostJobs
