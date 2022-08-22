import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { AddressState } from "../utils/types";
import { getRequest, postAuthRequest, postRequest } from "../utils/helper/helper"




const initialState: AddressState = {
    locations: [],
    loading: false,
    error: null
}


export const getAddress = createAsyncThunk(
    'address/getAddress',
    async () => {
        const response = await getRequest(`/sidehustle/account/locations`)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const addAddress = createAsyncThunk(
    'address/addAddress',
    async (payload: {state: string, street: string, city: string, isDefault: boolean}) => {
        const response = await postRequest(`/sidehustle/account/locations`, payload)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const updateAddress = createAsyncThunk(
    'address/updateAddress',
    async (payload: {state: string, street: string, city: string, isDefault: boolean, id: string}) => {
        const response = await postRequest(`/sidehustle/account/locations/${payload.id}/update`, payload)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)



export const AddressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAddress.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(getAddress.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.locations = action.payload
            }),
            builder.addCase(getAddress.rejected, (state, action) => {
                state.loading = false,
                state.error = action.error.message
            }),
            builder.addCase(addAddress.pending, (state, action) => {
                state.loading = true
            }),
            builder.addCase(addAddress.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
            }),
            builder.addCase(addAddress.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
    }
})

export const AddressData = (state: RootState) => state.address.locations;

export default AddressSlice.reducer;