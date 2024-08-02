import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import dotenv from 'dotenv'
// dotenv.config();
const apiUrl = import.meta.env.VITE_apiUrl;
// console.log(apiUrl)
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '', credentials: 'include' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url:`${apiUrl}/api/users/auth`,
        // url:`/api/users/auth`,
        method:'POST',
        body:data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url:`${apiUrl}/api/users/`,
        method:'POST',
        body:data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url:`${apiUrl}/api/users/logout`,
        method:'POST',
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url:`${apiUrl}/api/users/profile`,
        method:'GET',
      }),
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url:`${apiUrl}/api/users/profile`,
        method:'PUT',
        body:data
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetProfileQuery, useEditProfileMutation } = apiSlice
