import React from "react";
import Layout from "../components/Layout";

const FourOhFour = () => {
  return (
    <Layout>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Sorry, we couldn&apos;t find this page.</p>
      </div>
    </Layout>
  );
};

export default FourOhFour;
