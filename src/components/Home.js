import React, { useEffect } from 'react';
import '../css/home.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Home(props) {
    const user = {
        "deviceId": "42940546-D218-4ABF-958B-FB87AE0FC10A",
        "reason": "",
        "ssid": "FIS-user",
        "ipGateway": "10.15.180.1",
        "type": 0
    }


    const check_in = async () => {
        var getToken = localStorage.getItem("token")
        const res = await axios.post('https://ddc.fis.vn/fis0/api/checkin_all', user, { headers: { "Authorization": `Bearer ${getToken}` } })
        console.log(res.data);
        if (res.data.message === 'Bạn đã checkin tại công ty hôm nay') {
            toast.warning(res.data.message)
        }
        else if (res.data.message == '-1') {
            toast.warning(res.data.message)
        }
        else {
            toast.success(res.data.message)
            setTimeout(()=>{
                window.location.reload()
            },1000)
        }

        const timeCheckin = res.data.data.checkinTime
        const dataTime = timeCheckin.substring(11, 19)
        localStorage.setItem("timeCheckIn", dataTime)
    }
    const time_checkin = localStorage.getItem('timeCheckIn')
    const check_out = async () => {
        var getToken = localStorage.getItem("token")
        const res = await axios.post('https://ddc.fis.vn/fis0/api/checkout_all', user, { headers: { "Authorization": `Bearer ${getToken}` } })
        if (res.data.resultCode == -1) {
            toast.warning(res.data.message)
        }
        else {
            const timeCheckout = res.data.data.checkinTime
            const dataTime = timeCheckout.substring(11, 19)
            localStorage.setItem("timeCheckout", dataTime)
            toast.success(res.data.message)
            setTimeout(()=>{
                window.location.reload()
            },1000)
        }
    }
    const time_checkout = localStorage.getItem('timeCheckout')

    return (
        <div className='box-check'>
            <div className='time'>
                <p>Time Check in thành công: {time_checkin} </p>
                <p>Time Check out thành công: {time_checkout} </p>
            </div>
            <div className='d-flex justify-content-between '>
                <button type="button" class="btn btn-info text-white" onClick={() => check_in()}>Check in</button>
                <button type="button" class="btn btn-danger text-white" onClick={() => check_out()}>Check out</button>
            </div>
            <div className='qr_code mt-4'>
            </div>
            <div className='info_qr mt-2'>
                <h5>Donate cho tôi &lt;3 !</h5>
            </div>
        </div>
    );
}

export default Home;