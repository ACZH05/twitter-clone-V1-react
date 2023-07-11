import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { db } from "../../firebase"

export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByuser",
    async (userId) => {
        try {
            const postsRef = collection(db, `users/${userId}/posts`)

            const querySnapshot = await getDocs(postsRef)
            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            
            return docs
        }
        catch (error) {
            console.error(error)
            throw error
        }

    }
)

export const savePost = createAsyncThunk(
    "posts/savePost",
    async ({ userId, postContent}) => {
        try {
            const postsRef = collection(db, `users/${userId}/posts`)
            console.log(`users/${userId}/posts`)
            const newPostRef = doc(postsRef)
            console.log(postContent)
            await setDoc(newPostRef, { content: postContent, likes: []})
            const newPost = await getDoc(newPostRef)

            const post = {
                id: newPost.id,
                ...newPost.data()
            }

            return post
        }
        catch (error) {
            console.error(error)
            throw error
        }
    }
)

export const likePost = createAsyncThunk (
    "posts/likePost",
    async ({ userId, postId }) => {
        try {
            const postsRef = doc(db, `users/${userId}/posts/${postId}`)

            const docSnap = await getDoc(postsRef)

            if (docSnap.exists()) {
                const postData = docSnap.data()
                const likes = [...postData.likes, userId]

                await setDoc(postsRef, { ...postData, likes })
            }

            return { userId, postId }
        }
        catch (error) {
            console.error(error)
            throw error
        }
    }
)

export const removeLikeFromPost = createAsyncThunk (
    "posts/removeLikeFromPost",
    async ({ userId, postId }) => {
        try {
            const postsRef = doc(db, `users/${userId}/posts/${postId}`)

            const docSnap = await getDoc(postsRef)

            if (docSnap.exists()) {
                const postData = docSnap.data()
                const likes = postData.likes.filter((id) => id !== userId)

                await setDoc(postsRef, { ...postData, likes })
            }

            return { userId, postId }
        }
        catch (error) {
            console.error(error)
            throw error
        }
    }
)

const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsByUser.fulfilled, (state, action) => {
                state.posts = action.payload
                state.loading = false
            })
            .addCase(savePost.fulfilled, (state, action) => {
                state.posts = [action.payload, ...state.posts]
            })
            .addCase(likePost.fulfilled, (state, action) => {
                const { userId, postId } = action.payload

                const postIndex = state.posts.findIndex((post) => post.id === postId)

                if (postIndex !== -1) {
                    state.posts[postIndex].likes.push(userId)
                }
            })
            .addCase(removeLikeFromPost.fulfilled, (state, action) => {
                const { userId, postId} = action.payload

                const postIndex = state.posts.findIndex((post) => post.id === postId)

                if (postId !== -1) {
                    state.posts[postIndex].likes = state.posts[postIndex].likes.filter(
                        (id) => id !== userId
                    )
                }
            })
    }
})

export default postsSlice.reducer