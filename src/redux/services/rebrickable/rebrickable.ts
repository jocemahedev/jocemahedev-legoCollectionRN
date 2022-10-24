// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RebrickablePart, RebrickableSet} from './type';
import {addParts, setAllParts} from '../../set';
const key = 'd257b01ffb01b4f4a205a41bcf8614cb';
// Define a service using a base URL and expected endpoints
export const rebrickableApi = createApi({
  reducerPath: 'rebrickableApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rebrickable.com/api/v3/lego/',
  }),
  endpoints: builder => ({
    getSetByIdLego: builder.query<RebrickableSet, string>({
      query: idLego => 'sets/' + idLego + '?page_size=1000&key=' + key,
    }),
    getPartsByIdLego: builder.query<RebrickablePart[], string>({
      query: idLego => 'sets/' + idLego + '/parts?page_size=1000&key=' + key,
      transformResponse: (response: any) => response.results,
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        // `onStart` side-effect
        console.log('getParts START');
        console.log(arg);
        try {
          const response = await queryFulfilled;
          dispatch(addParts(response.data));
          console.log('getParts GOOD');
        } catch (err) {
          // `onError` side-effect
          console.log('getParts BAD');
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetSetByIdLegoQuery, useGetPartsByIdLegoQuery} =
  rebrickableApi;