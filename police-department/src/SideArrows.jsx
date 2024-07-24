import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIsPlaying } from './redux/slideShowAnimationSlice.js'

/** Custom react component, which adds side arrows to collection, making it interactive and scrollable.
 * requires @property scrollableDivRef collection reference.
 */
export function SideArrows(props) {
    const [isPostersBlockHovered, setIsPostersBlockHovered] = useState(true)
    const [isArrowHovered, setIsArrowHovered] = useState(false)
    const dispatch = useDispatch()

    const rightArrowRef = useRef()
    const leftArrowRef = useRef()
    const arrowsHolderRef = useRef()
    const scrollableDivRef = props.scrollableDivRef
    const ARROW_SCROLL_DISTANCE = props.scrollDistanse

    let Arrows
    if (scrollableDivRef !== undefined) {
        Arrows = new SideScrollArrows(
            scrollableDivRef,
            leftArrowRef,
            rightArrowRef
        )
    }

    const scrollLeft = () => Arrows.scrollLeft(ARROW_SCROLL_DISTANCE)
    const scrollRight = () => Arrows.scrollRight(ARROW_SCROLL_DISTANCE)
    const hideArrowsLeaningScreen = () => Arrows.hideArrowsLeaningScreen()
    const hideShowArrowsOnHover = () =>
        Arrows.hideShowArrowsOnHover(
            isPostersBlockHovered,
            isArrowHovered,
            arrowsHolderRef
        )

    useEffect(() => {
        leftArrowRef.current.style.visibility = 'hidden'
    }, [])

    useEffect(() => {
        // hideShowArrowsOnHover()
    }, [isPostersBlockHovered, isArrowHovered])

    useEffect(() => {
        if (scrollableDivRef === undefined) return
        scrollableDivRef.current.addEventListener('mouseenter', () => {
            scrollableDivRef.current.style.backgroundColor = 'red'
            setIsPostersBlockHovered(true)
        })

        scrollableDivRef.current.addEventListener('mouseleave', () => {
            scrollableDivRef.current.style.backgroundColor = 'blue'
            setIsPostersBlockHovered(false)
        })

        let blockElement = scrollableDivRef
        blockElement = blockElement.current
        blockElement.addEventListener('scroll', hideArrowsLeaningScreen)
        // blockElement.removeEventListener('scroll', hideArrowsLeaningScreen)
    }, [scrollableDivRef])

    const arrowStyle =
        'z-20 hover:cursor-pointer hover:bg-blue-600 hover:opacity-100 p-4 rounded-[50%]'

    return (
        <div
            ref={arrowsHolderRef}
            className={`absolute mt-[17%] flex h-fit w-full items-center justify-between`}
        >
            <img
                ref={leftArrowRef}
                src={'images/left-arrow.png'}
                onClick={() => {
                    scrollLeft()
                    dispatch(setIsPlaying(false))
                }}
                className={arrowStyle}
                onMouseEnter={() => setIsArrowHovered(true)}
                onMouseLeave={() => setIsArrowHovered(false)}
                alt={'scroll compilation left'}
            />
            <img
                ref={rightArrowRef}
                src={'images/right-arrow.png'}
                onClick={() => {
                    scrollRight()
                    dispatch(setIsPlaying(false))
                }}
                className={arrowStyle}
                onMouseEnter={() => setIsArrowHovered(true)}
                onMouseLeave={() => setIsArrowHovered(false)}
                alt={'scroll compilation right'}
            />
        </div>
    )
}

class SideScrollArrows {
    rightArrowRef
    leftArrowRef
    scrollableDivRef

    constructor(scrollableDivRef, leftArrowRef, rightArrowRef) {
        this.scrollableDivRef = scrollableDivRef
        this.rightArrowRef = rightArrowRef
        this.leftArrowRef = leftArrowRef
    }

    scrollLeft(distance) {
        this.scrollableDivRef.current.scrollLeft -= distance
    }

    scrollRight(distance) {
        this.scrollableDivRef.current.scrollLeft += distance
    }

    hideArrowsLeaningScreen() {
        const block = this.scrollableDivRef.current
        if (block === undefined) return

        const isScrollAtMin = block.scrollLeft === 0
        const isScrollAtMax =
            block.scrollLeft >= block.scrollWidth - block.clientWidth

        if (isScrollAtMin) {
            this.leftArrowRef.current.style.visibility = 'hidden'
        } else {
            this.leftArrowRef.current.style.visibility = 'visible'
        }

        if (isScrollAtMax) {
            this.rightArrowRef.current.style.visibility = 'hidden'
        } else {
            this.rightArrowRef.current.style.visibility = 'visible'
        }
    }

    hideShowArrowsOnHover(isBlockHovered, isArrowHovered, arrowsHolder) {
        if (arrowsHolder.current === undefined) return
        const style = arrowsHolder.current.style
        isBlockHovered || (!isBlockHovered && isArrowHovered)
            ? (style.display = 'flex')
            : (style.display = 'none')
    }
}
