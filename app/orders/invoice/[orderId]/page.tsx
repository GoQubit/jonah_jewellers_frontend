"use client"
import React from "react";
import InvoicePage from "./_components/InvoicePage";

interface PageProps {
  params: {
    orderId: string;
  };
}

const Page = ({ params }: { params: any }) => {

  return (
    <div>
      <InvoicePage orderId={params?.orderId} />
    </div>
  );
};

export default Page;
