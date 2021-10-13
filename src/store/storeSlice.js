import {createSlice} from "@reduxjs/toolkit"

const storeSlice = createSlice({
    name: "storeSlice",
    initialState: {
        searchText: "",
        order: "Sırala",
        filter: {color: "", brand: ""},
        cartSize: localStorage.getItem("cart") ? Object.keys(JSON.parse(localStorage.getItem("cart"))).length : 0,
    },
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        setOrder: (state, action) => {
            state.order = action.payload
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setCartSize: (state, action) => {
            state.cartSize = action.payload
        },
    },
})

export const {setSearchText, setOrder, setFilter, setCartSize} = storeSlice.actions
export default storeSlice.reducer
