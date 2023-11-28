import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="grid place-items-center h-[80vh]">
      <div className="italic">
        This page doesn&apos;t exist. <br />
        Click here for&nbsp;
        <Link href={"/"} className="underline hover:text-blue-800">
          Home
        </Link>
        &nbsp;page.
      </div>
    </main>
  );
};

export default NotFound;
