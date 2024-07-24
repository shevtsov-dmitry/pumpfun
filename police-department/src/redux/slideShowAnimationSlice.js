import { createSlice } from '@reduxjs/toolkit'

export const slideShowAnimationSlice = createSlice({
    name: 'slideShowAnimation',
    initialState: {
        isPlaying: true,
    },
    reducers: {
        setIsPlaying: (state, action) => {
            state.videoId = action.payload
        },
    },
})

export const { setVideoId } = slideShowAnimationSlice.actions
export default slideShowAnimationSlice.reducer