import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"

import storeSlice from"./storeSlice"

const rootReducer = combineReducers({
    store: storeSlice,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store
