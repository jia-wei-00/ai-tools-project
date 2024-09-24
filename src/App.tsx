// src/App.tsx
import React from "react";
import { useFetchUsersQuery } from "./features/stripe/stripe-api-slice";

const App: React.FC = () => {
  const { data, isFetching, error } = useFetchUsersQuery();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Customers</h1>
      {data && data.data.length > 0 ? (
        <ul>
          {data.data.map((customer) => (
            <li key={customer.id}>
              {customer.name} - {customer.email}
            </li>
          ))}
        </ul>
      ) : (
        <div>No customers found</div>
      )}
    </div>
  );
};

export default App;
