"use client"
import React, { useEffect } from 'react';
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
const Page = () => {
  const reset = async () => {
    try {
      await prisma.toDo.deleteMany();
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };
  useEffect(() => {
    reset();
    redirect("/");
  }, []); 

  return (
    <div>
    </div>
  );
};

export default Page;
