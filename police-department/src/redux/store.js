import { configureStore } from '@reduxjs/toolkit'
import slideShowAnimationSlice from './slideShowAnimationSlice.js'

export const store = configureStore({
    reducer: {
        slideShowAnimation: slideShowAnimationSlice,
    },
})
