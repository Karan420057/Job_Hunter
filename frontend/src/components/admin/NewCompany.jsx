import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { setLoading } from '@/redux/authSlice'

const NewCompany = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [logoFile, setLogoFile] = useState(null);     // new state for logo file
    const dispatch = useDispatch();
    const {loading} = useSelector(store => store.auth);

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            alert("Company name is required.");
            return;
        }
        try {
            dispatch(setLoading(true));
            const formData = new FormData();
            formData.append("companyName", companyName);
            formData.append("file", logoFile);

            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, formData, {   // add {companyName} in place of formData
                headers:{
                    // 'Content-Type':'application/json'
                    "Content-Type": "multipart/form-data",
                },
                withCredentials:true
            });
            if(res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto'>
        <div className='my-15'>
            <h1 className='font-bold text-2xl'>Your Company Name</h1>
            <p className='text-gray-500'>What would you like to give your company name? You can change it later.</p>
        </div>

        <div>
            <Label htmlFor="companyName">Company Name</Label>
            <Input type="text" className='my-2'  id="companyName" placeholder="JobHunt, Microsoft, etc." onChange={(e) => setCompanyName(e.target.value)} />
        </div>

        <div className='my-10'>
            <Label htmlFor="companyLogo">Company Logo</Label>
            <Input type="file" className='my-2' id={"companyLogo"} accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} /> {/* new file input */}
        </div>

        <div className='flex items-center gap-2 my-10'>
            <Button variant='outline' onClick={() => navigate("/admin/companies")}>Cancel</Button>
            {
                loading ? <Button className='my-4'> <Loader2  className='mr-2 h-4 w-4 animate-spin'/> Please Wait</Button> : <Button type='submit' className='my-4' onClick={registerNewCompany}>Continue</Button>
            }
        </div>
      </div>
    </div>
  )
}

export default NewCompany
