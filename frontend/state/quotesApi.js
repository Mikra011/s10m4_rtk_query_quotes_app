import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const quotesApi = createApi({
    reducerPath: 'quotesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/'})
    endpoints: builder => ({
        getQuotes: builder.query({

        }),
        createQuote: builder.mutation({
            
        }),
        toggleQuote: builder.mutation({

        }),
        deleteQuote: builder.mutation({

        })
    })
})

export const {
    getQuotes, createQuote, toggleQuote, deleteQuote
} = quotesApi