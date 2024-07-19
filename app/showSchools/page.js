// app/schools/page.js
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function fetchSchools() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/schools`,
      {
        cache: "no-store", // Optional: Disable caching for fresh data on every request
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default async function Schools() {
  const schools = await fetchSchools();

  if (schools.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg text-gray-700">No schools found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-300/60 min-h-screen">
      <Link href="/">
        <h1 className="font-semibold text-green-600 text-xl"><span>&larr; </span>Back</h1>
      </Link>
      <h2 className="text-4xl font-semibold text-gray-800 mb-4 text-center">
        Schools List
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {schools.map((school) => (
          <div
            key={school.id}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-md flex flex-col items-center"
          >
            <div className="md:w-80 md:h-60 w-70 h-40 overflow-hidden rounded-lg mb-4">
              {school.image && (
                <Image
                  src={school.image}
                  alt={school.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 rounded-lg mb-10"
                  priority
                />
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {school.name}
            </h3>
            <p className="text-gray-600 mb-1 text-center">
              {school.address}
            </p>
            <p className="text-gray-600 mb-1">{school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
