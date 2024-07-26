import { useState } from 'react'
import { useEffect } from 'react'

function App() {
    const HOST = 'http://localhost:8080'
    const [urls, setUrls] = useState({
        telegram: 'https://t.me',
        twitter: 'https://x.com',
        CA: 'jipxcFEhSzlXCH_PLACEHOLDER_fWSKnFEWjfwfw',
    })

    useEffect(() => {
        async function fetchUrls() {
            const req = await fetch(HOST + '/urls/list')
            const res = await req.json()
            setUrls(res)
        }
        fetchUrls()
    }, [])

    return (
        <div className="h-full w-full bg-black">
            <img src="images/bg1.jpg" />
            <div className="mx-5 my-2 flex items-center justify-between font-sans text-5xl font-bold">
                <img src="images/haram-icon.png" />
                <p className="text-white">{urls.CA}</p>
                <img src="images/haram-icon.png" />
            </div>
            <div className="h-fit w-fit">
                <img src="images/bg2.jpg" />
            </div>
            <div className="mx-5 my-2 flex items-center justify-between font-sans text-5xl font-bold">
                <img className="opacity-0" src="images/haram-icon.png" />
            </div>
            <img src="images/bg3.jpg" />
            {/* <audio controls autoPlay> */}
            {/*     <source src="audio/arab-song.m4a" type="audio/x-m4a" /> */}
            {/* </audio> */}
        </div>
    )
}

export default App
