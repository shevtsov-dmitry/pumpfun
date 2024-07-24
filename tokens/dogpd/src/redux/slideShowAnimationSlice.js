import { createSlice } from '@reduxjs/toolkit'

export const slideShowAnimationSlice = createSlice({
    name: 'slideShowAnimation',
    initialState: {
        isPlaying: true,
    },
    reducers: {
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload
        },
    },
})

export const { setIsPlaying } = slideShowAnimationSlice.actions
export default slideShowAnimationSlice.reducer