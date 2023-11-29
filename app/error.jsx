"use client";
import React from "react";

const ErrorPage = ({ error, reset }) => {
  console.log(error);
  return (
    <>
      <div>Unexpected error</div>
      <button className="btn" onClick={() => reset()}>
        Retry
      </button>
    </>
  );
};

export default ErrorPage;
