import { api } from "./api"

export const followAPi = api.injectEndpoints({
  endpoints: builder => ({
    followUser: builder.mutation<void, { followingId: string }>({
      query: id => ({
        url: "/follow",
        method: "POST",
        body: id,
      }),
    }),
    unFollowUser: builder.mutation<void, string>({
      query: id => ({
        url: `/follow/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const { useFollowUserMutation, useUnFollowUserMutation } = followAPi
export const {
  endpoints: { followUser, unFollowUser },
} = followAPi
