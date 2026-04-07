import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const {applicants = []} = useSelector(store => store.application || {});
    const statusHangler = async (status, id) => { 
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.patch(`${APPLICATION_API_END_POINT}/status/${id}`, {status: status.toLowerCase()}, {
                withCredentials:true
            });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

  return (
    <div>
      <Table>
        <TableCaption>All applied users.</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className='text-right'>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                applicants && applicants?.map((item) => (

                    <TableRow key={item._id}>
                        <TableCell>{item?.applicant?.fullname}</TableCell>
                        <TableCell>{item?.applicant?.email}</TableCell>
                        <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                        <TableCell className='text-blue-600 cursor-pointer'>{item?.applicant?.profile?.resume ? (<a href={item?.applicant?.profile?.resume} target="_blank"> {item?.applicant?.profile?.resumeOriginalName || "View Resume"} </a>) : (<span className='text-gray-400'>No resume available</span>)}</TableCell>
                        <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                        <TableCell className='float-right cursor-pointer'>
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                </PopoverTrigger>
                                <PopoverContent className='w-32'>        
                                    {
                                        shortlistStatus.map((status, index) => {
                                            return (
                                                <div onClick={() => statusHangler(status.toLowerCase(), item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                    <span>{status}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
        
      </Table>
    </div>
  )
}

export default ApplicantsTable
