import { useEffect, useRef, useState } from 'react'
import { SideArrows } from './SideArrows.jsx'
import { useSelector } from 'react-redux'

function App() {
    const mainDivRef = useRef()
    const slideShowRef = useRef()
    const [screenWidth, setScreenWidth] = useState(0)
    const slideShowAnimationState = useSelector(
        (state) => state.slideShowAnimation
    )
    const [urls, setUrls] = useState({
        dex: "https://dex.com",
        twitter: "https://twitter.com",
        telegram: "https://web.telegram.com",
        token: "5LxsSvNDwNmCNPX3a8GVVhp8oUP35KHywWnr8jAvpump",
    })

    useEffect(() => {
        async function fetchUrls() {
            const req = await fetch("https://dogpd.com:8080/list/urls")
            const res = await req.json()
            setUrls(res.data)
        }
        fetchUrls()
    }, []);

    const SLIDE_SHOW_INTERVAL_MS = 3000

    useEffect(() => {
        if (!mainDivRef) {
            return
        }

        const screenSizeInPx = mainDivRef.current.offsetWidth
        setScreenWidth(screenSizeInPx)

        let slideShowScrollingInterval
        if (slideShowAnimationState.isPlaying) {
            slideShowScrollingInterval = setInterval(() => {
                if (slideShowRef.current) {
                    slideShowRef.current.scrollLeft += screenSizeInPx
                }
            }, SLIDE_SHOW_INTERVAL_MS)
        }

        return () => {
            if (slideShowScrollingInterval) {
                clearInterval(slideShowScrollingInterval)
            }
        }
    }, [slideShowAnimationState, mainDivRef])

    function Footer() {
        return (
            <footer
                className={
                    'flex flex-col items-center justify-center gap-5 bg-[#004592] py-[1.5%] max-laptop:gap-3 max-mobile:gap-1'
                }
            >
                <h1
                    className={
                        'font-circ-bold text-8xl max-laptop:text-7xl max-mobile:mt-2 max-mobile:text-[1rem]'
                    }
                >
                    IN CASE OF ANY EMERGENCIES
                </h1>
                <ul id={'icons'} className={'flex gap-7 max-mobile:gap-3'}>
                    <a href={urls.dex}>
                        <img
                            className={'footer-icon'}
                            src={'images/icon-dex.png'}
                            alt={'icon-dex'}
                        />
                    </a>
                    <a href={urls.telegram}>
                        <img
                            className={'footer-icon'}
                            src={'images/icon-tground.png'}
                            alt={'icon-tground'}
                        />
                    </a>
                    <a href={urls.twitter}>
                        <img
                            className={'footer-icon'}
                            src={'images/icon-x.png'}
                            alt={'icon-twitter'}
                        />
                    </a>
                </ul>
            </footer>
        )
    }

    function Header() {
        return (
            <header className={'flex w-full items-center justify-around py-2'}>
                <h1 className={'header-text'}>PREVENT RUGS</h1>
                <img
                    src={'/images/logo.png'}
                    className={'max-mobile:w-[40px]'}
                    alt={'logo'}
                />
                <h1 className={'header-text'}>PREVENT SCAM</h1>
            </header>
        )
    }

    function NeedAssistance() {
        return (
            <div
                className={
                    'flex flex-col items-center justify-center bg-[#003793] p-[5%]'
                }
            >
                <h1
                    className={
                        'mb-5 font-circ-bold text-8xl max-laptop:text-[4.25rem] max-mobile:mb-1 max-mobile:text-2xl'
                    }
                >
                    IF YOU NEED ASSISTANCE:
                </h1>
                <h1
                    className={
                        'overflow-hidden font-circ-book text-6xl max-laptop:text-5xl max-mobile:text-[0.5rem]'
                    }
                >
                    {urls.token}
                </h1>
            </div>
        )
    }

    function OurMission() {
        return (
            <div className={'h-fit w-fit'}>
                <div className={'flex h-fit items-center justify-center'}></div>
                <div
                    id={'our-mission-text-holder'}
                    className={'absolute ml-[3%] mt-[12.5%] max-laptop:mt-[9%] z-50'}
                >
                    <h1
                        className={
                            'mb-5 font-circ-bold text-9xl max-laptop:text-8xl max-mobile:mb-2 max-mobile:text-3xl'
                        }
                    >
                        OUR MISSION:
                    </h1>
                    <ul className={'flex flex-col gap-6 max-mobile:gap-3'}>
                        <li className={'our-mission-li'}>
                            • To protect degens
                        </li>
                        <li className={'our-mission-li'}>
                            • To serve the pumpfun
                        </li>
                        <li className={'our-mission-li'}>• To pump Solana</li>
                        <li className={'our-mission-li'}>
                            • To be always here
                        </li>
                    </ul>
                </div>
                <img src={'images/our-mission.jpg'} alt={'our-mission'} />
            </div>
        )
    }

    return (
        <body className={"bg-[#00276f] h-screen"}>
            <div
                ref={mainDivRef}
                className="min-h-full min-w-full bg-[#00276f]"
            >
                <Header />
                <SideArrows
                    scrollableDivRef={slideShowRef}
                    scrollDistanse={screenWidth}
                />
                <div
                    ref={slideShowRef}
                    className={'flex h-fit w-fit overflow-hidden scroll-smooth'}
                >
                    <img src={'images/slide1.jpg'} />
                    <img src={'images/slide2.jpg'} />
                    <img src={'images/slide3.jpg'} />
                    <img src={'images/slide4.jpg'} />
                </div>
                <NeedAssistance />
                <OurMission />
                <Footer />
            </div>
        </body>
    )
}

export default App
