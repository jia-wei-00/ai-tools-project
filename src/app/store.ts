import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counter-slice";
import { dogApiSlice } from "../features/dogs/dogs-api-slice";
import { stripeApiSlice } from "../features/stripe/stripe-api-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [dogApiSlice.reducerPath]: dogApiSlice.reducer,
    [stripeApiSlice.reducerPath]: stripeApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    //the purpose to do this is to combine the default middleware with apiSlice middleware
    return getDefaultMiddleware().concat(
      dogApiSlice.middleware,
      stripeApiSlice.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
