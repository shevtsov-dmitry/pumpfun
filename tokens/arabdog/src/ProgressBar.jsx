import { useState } from 'react'

export default function ProgressBar() {
    const [progressInPercent, setProgressInPercent] = useState(89)

    return (
        <div className="flex flex-col gap-4 text-center max-mobile:ml-[-1.5em] max-mobile:mt-[-100%] max-mobile:scale-75">
            <p
                className={
                    'text-[#909aa7] max-laptop:text-[2rem] max-mobile:text-nowrap'
                }
            >
                bonding curve progress: {progressInPercent}%
            </p>
            <div
                className="progress2 progress-moved"
                style={{
                    '--progress': progressInPercent,
                }}
            >
                <div className="progress-bar2" />
            </div>
        </div>
    )
}
