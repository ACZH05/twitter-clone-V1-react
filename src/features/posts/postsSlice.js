import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const BASE_URL = 'https://twitter-api-alfred-chinchin.sigma-school-full-stack.repl.co'

export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByuser",
    async (userId) => {
        const res = await fetch(`${BASE_URL}/posts/user/${userId}`)
        return res.json()
    }
)

const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload
            state.loading = false
        })
    }
})

export default postsSlice.reducer