import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url:'/api/users/auth',
        method:'POST',
        body:data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url:'/api/users/',
        method:'POST',
        body:data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url:'/api/users/logout',
        method:'POST',
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url:'/api/users/profile',
        method:'GET',
      }),
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url:'/api/users/profile',
        method:'PUT',
        body:data
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useGetProfileQuery, useEditProfileMutation } = apiSlice
