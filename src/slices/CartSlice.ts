import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { CartState } from "../utils/types";
import { getRequest, postAuthRequest, postRequest, specialPostRequest } from "../utils/helper/helper"




const initialState: CartState = {
    carts: [],
    loading: false,
    error: null
}


export const getCarts = createAsyncThunk(
    'cart/getCarts',
    async () => {
        const response = await getRequest(`/sidehustle/cart`)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (payload: any) => {
        const response = await postRequest(`/sidehustle/cart/add`, payload)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const updateCart = createAsyncThunk(
    'cart/updateCart',
    async (payload: any) => {
        const response = await postRequest(`/sidehustle/cart/update?cartId=${payload?.id}`, payload)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const cartCheckout = createAsyncThunk(
    'cart/cartCheckout',
    async (payload: any) => {
        const response = await postRequest(`/sidehustle/orders/checkout`, payload)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)

export const deleteCart = createAsyncThunk(
    'cart/deleteCart',
    async (payload: any) => {
        const response = await specialPostRequest(`/sidehustle/cart/delete?cartId=${payload}`, payload)
        if (response?.status === 200) {
            return response?.data?.data
        }
    }
)



export const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCarts.pending, (state, action) => {
            state.loading = true
        }),
            builder.addCase(getCarts.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                    state.carts = action.payload
            }),
            builder.addCase(getCarts.rejected, (state, action) => {
                state.loading = false,
                    state.carts = []
                state.error = action.error.message
            }),
            builder.addCase(addToCart.pending, (state, action) => {
                state.loading = true
            }),
            builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false
            }),
            builder.addCase(addToCart.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            }),
            builder.addCase(updateCart.pending, (state, action) => {
                state.loading = true
            }),
            builder.addCase(updateCart.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.carts = action.payload
            }),
            builder.addCase(updateCart.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            }),
            builder.addCase(deleteCart.pending, (state, action) => {
                state.loading = true
            }),
            builder.addCase(deleteCart.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false,
                state.carts = []
            }),
            builder.addCase(deleteCart.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
    }
})

export const CartData = (state: RootState) => state.cart.carts;

export default CartSlice.reducer;
