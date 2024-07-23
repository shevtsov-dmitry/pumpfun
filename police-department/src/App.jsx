function App() {
    return (
        <div className="min-h-full w-full bg-[#00276f]">
            <header className={'flex w-full items-center justify-around py-2'}>
                <h1 className={'header-text'}>PREVENT RUGS</h1>
                <img src={'/images/logo.png'} alt={'logo'} />
                <h1 className={'header-text'}>PREVENT SCAM</h1>
            </header>
            <main className={'flex h-fit w-fit overflow-scroll'}>
                <img src={'images/slide1.jpg'} />
                <img src={'images/slide2.jpg'} />
                <img src={'images/slide3.jpg'} />
                <img src={'images/slide4.jpg'} />
            </main>
            <div
                className={
                    'flex flex-col items-center justify-center bg-[#003793] p-[5%]'
                }
            >
                <h1 className={'mb-5 font-circ-bold text-8xl'}>
                    IF YOU NEED ASSISTANCE:
                </h1>
                <h1 className={'font-circ-book text-6xl'}>
                    5LxsSvNDwNmCNPX3a8GVVhp8oUP35KHywWnr8jAvpump
                </h1>
            </div>
            <div className={'h-fit w-fit'}>
                <div className={"h-fit flex items-center justify-center"}>

                </div>
                <div id={"our-mission-text-holder"} className={"absolute ml-[3%] mt-[12.5%]"}>
                    <h1 className={'font-circ-bold text-9xl mb-5'}>OUR MISSION:</h1>
                    <ul className={'flex flex-col gap-6'}>
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
            <footer className={"bg-[#004592] py-[1.5%] flex items-center justify-center flex-col gap-5"}>
                <h1 className={"font-circ-bold text-8xl"}>IN CASE OF ANY EMERGENCIES</h1>
                <ul id={"icons"} className={"flex gap-7"}>
                    <img className={"footer-icon"} src={"images/icon-dex.png"} alt={"icon-dex"}/>
                    <img className={"footer-icon"} src={"images/icon-tground.png"} alt={"icon-tground"}/>
                    <img className={"footer-icon"} src={"images/icon-x.png"} alt={"icon-twitter"}/>
                </ul>
            </footer>
        </div>
    )
}

export default App
