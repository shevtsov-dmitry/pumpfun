import { useRef, useState } from 'react'
import { useEffect } from 'react'
import ProgressBar from './ProgressBar'

function App() {
    const HOST = 'http://localhost:8080'
    const [urls, setUrls] = useState({
        telegram: 'https://t.me',
        twitter: 'https://x.com',
        CA: 'jipxcFEhSzlXCH_PLACEHOLDER_fWSKnFEWjfwfw',
    })
    const audioRef = useRef()

    useEffect(() => {
        async function fetchUrls() {
            const req = await fetch(HOST + '/urls/list')
            const res = await req.json()
            setUrls(res)
        }
        fetchUrls()
    }, [])

    const socialMediaIconStyle =
        'w-[100%] brightness-[90%] hover:brightness-125 hover:contrast-150 h-[100%]  max-[1700px]:w-[90%] max-laptop:scale-75 max-[1000px]:w-[80%]'

    return (
        <div className="h-full w-full bg-[#1b1d28]">
            <div className="flex justify-center">
                <audio
                    className="absolute mt-[2%] rounded"
                    ref={audioRef}
                    controls
                    autoPlay
                >
                    <source src="audio/arab-song.m4a" type="audio/x-m4a" />
                </audio>
            </div>
            <img className="w-full" src="images/bg1.jpg" />
            <div className="mx-5 my-2 flex items-center justify-between font-sans text-5xl font-bold">
                <img src="images/haram-icon.png" />
                <p className="text-white max-laptop:text-[2rem]">{urls.CA}</p>
                <img src="images/haram-icon.png" />
            </div>
            <div className="h-fit w-fit">
                <div className="items-ceneter absolute mt-[4.4%] flex h-fit w-full justify-center">
                    <img
                        className="w-[38.4%]"
                        src="images/dog-with-poster.png"
                    />
                    <div className="absolute mr-[18%] flex h-[98.5%] w-full flex-col items-center justify-end gap-4 max-[1700px]:mt-[10px] max-laptop:mt-[20px] max-laptop:gap-2 max-[1000px]:gap-0">
                        <a href={`${urls.telegram}`}>
                            <img
                                className={`${socialMediaIconStyle}`}
                                src="images/icon-telegram.png"
                            />
                        </a>
                        <a href={`${urls.twitter}`}>
                            <img
                                className={`${socialMediaIconStyle}`}
                                src="images/icon-twitter.png"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <img className="w-full" src="images/bg2.jpg" />
            <div className="mx-5 my-2 flex items-center justify-center font-sans text-5xl font-bold">
                <img className="opacity-0" src="images/haram-icon.png" />
                <div className="absolute w-1/2">
                    <ProgressBar />
                </div>
            </div>
            <img className="w-full" src="images/bg3.jpg" />
        </div>
    )
}

export default App
