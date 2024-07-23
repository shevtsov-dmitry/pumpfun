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
                <div>
                    <h1 className={'font-circ-bold text-9xl'}>OUR MISSION:</h1>
                    <ul className={'list-decimal'}>
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
        </div>
    )
}

export default App
