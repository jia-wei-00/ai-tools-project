import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const STRIPE_API_KEY = import.meta.env.VITE_STRIPE_API_KEY;

// Define the types for your dataZ
interface Customer {
  id: string;
  name: string;
  email: string;
}

interface CustomersResponse {
  data: Customer[];
}

interface Subscription {
  id: string;
  customer: string;
  status: string;
  // Add other relevant fields
}

interface SubscriptionsResponse {
  data: Subscription[];
}

interface CustomerId {
  customerId: string;
}

interface CreateCustomerResponse {
  id: string;
  object: string;
  // Add other fields you expect from the response
}

interface CreateCustomerRequest {
  name: string;
  email: string;
  // Add other fields you need to send in the request
}

// Define your API slice
export const stripeApiSlice = createApi({
  reducerPath: "stripeApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://api.stripe.com/v1",
    baseUrl: "http://localhost:3000",
    prepareHeaders(headers) {
      headers.set("Authorization", `Bearer ${STRIPE_API_KEY}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchUsers: builder.query<CustomersResponse, void>({
      query: () => `/users`,
    }),
    fetchProducts: builder.query<CustomersResponse, void>({
      query: () => "/products/search?query=status:active",
    }),
    fetchSubscriptions: builder.query<SubscriptionsResponse, CustomerId>({
      query: ({ customerId }) => `/customers/${customerId}/subscriptions`,
    }),
    createCustomer: builder.mutation<
      CreateCustomerResponse,
      CreateCustomerRequest
    >({
      query: (newCustomer) => ({
        url: `/customers`,
        method: "POST",
        body: newCustomer,
      }),
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useFetchSubscriptionsQuery,
  useCreateCustomerMutation,
  useFetchProductsQuery,
} = stripeApiSlice;
