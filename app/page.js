"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);

  const router = useRouter();
  const toastDuration = 4000;

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const response = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Form submitted successfully!", {
          autoClose: toastDuration,
        });
        reset();
        setImagePreview(null);
        setTimeout(() => router.push("/showSchools"), toastDuration);
      } else {
        toast.error("Error submitting form");
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute top-0 left-0 w-full -z-10"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#03045e", stopOpacity: "1" }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#90e0ef", stopOpacity: "1" }}
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient)"
          d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,181.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <div className="ml-auto px-10 py-3 md:text-3xl border shadow-lg mr-4 mt-2 transition-transform duration-300 hover:scale-110 rounded-lg">
        <Link href="/showSchools">Show Schools</Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:p-10 p-4 bg-secondary/40 border border-gray-300 rounded-lg shadow-lg flex flex-col gap-y-6 lg:w-1/2 my-4 font-bold"
      >
        <h2 className="text-3xl font-semibold text-center mb-4">
          School Registration
        </h2>
        <div className="flex items-center justify-between gap-x-4">
          <label htmlFor="name" className="w-1/4 text-gray-700">
            Name :
          </label>
          <input
            id="name"
            {...register("name", { required: true })}
            className="border border-gray-300 rounded-md flex-1 p-2 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="School's name"
            name="name"
          />
        </div>
        {errors.name && (
            <span className="text-red-500 text-xs">
              ! This field is required
            </span>
          )}
          <div className="flex items-center justify-between gap-x-4">
          <label htmlFor="address" className="w-1/4 text-gray-700">
            Address :
          </label>
          <input
            id="address"
            {...register("address", { required: true })}
            className="border border-gray-300 rounded-md flex-1 p-2 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="School's address"
            name="address"
          />
          
        </div>
        {errors.address && (
          <span className="text-red-500 text-xs">
            ! This field is required
          </span>
        )}
        <div className="flex items-center justify-between gap-x-4">
          <label htmlFor="city" className="w-1/4 text-gray-700">
            City :
          </label>
          <input
            id="city"
            {...register("city", { required: true })}
            className="border border-gray-300 rounded-md flex-1 p-2 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="City"
            name="city"
          />
        </div>
        {errors.city && (
          <span className="text-red-500 text-xs">
            ! This field is required
          </span>
        )}
        <div className="flex items-center justify-between gap-x-4">
          <label htmlFor="state" className="w-1/4 text-gray-700">
            State :
          </label>
          <input
            id="state"
            {...register("state", { required: true })}
            className="border border-gray-300 rounded-md flex-1 p-2 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="State"
            name="state"
          />
          
        </div>
        {errors.state && (
          <span className="text-red-500 text-xs">
            ! This field is required
          </span>
        )}
        <div className="flex items-center justify-between gap-x-4">
        <label htmlFor="contact" className="w-1/4 text-gray-700">
            Phone no:
          </label>
          <input
            id="contact"
            {...register("contact", {
              required: true,
              max: 9999999999,
              min: 1000000000,
            })}
            className="border border-gray-300 rounded-md flex-1 p-2 focus:outline-none focus:border-blue-500"
            type="number"
            placeholder="Phone number"
            name="contact"
          />
        </div>
        {errors.contact?.type === "required" && (
          <span className="text-red-500 text-xs">
            ! This field is required
          </span>
        )}
        {errors.contact?.type === "max" && (
          <span className="text-red-500 text-xs ">
            ! This should be 10 digits
          </span>
        )}
        {errors.contact?.type === "min" && (
          <span className="text-red-500 text-xs">
            ! This should be 10 digits
          </span>
        )}
        <div className="flex items-center justify-between gap-x-4">
          <label htmlFor="image" className="w-1/4 text-gray-700">
            Select Image :
          </label>
          <input
            id="image"
            {...register("image", { required: true })}
            className="border border-gray-300 rounded-md flex-1 p-2 focus:outline-none focus:border-blue-500"
            type="file"
            onChange={handleImageChange}
            name="image"
          />
        </div>
        {errors.image && (
          <span className="text-red-500 text-xs">
            ! This field is required
          </span>
        )}
        {imagePreview && (
          <div className="flex justify-center items-center gap-x-4">
            <Image
              src={imagePreview}
              alt="Preview"
              width={300}
              height={300}
              className="object-cover border border-gray-300 rounded-md"
              priority
            />
          </div>
        )}
        <div className="flex items-center justify-between gap-x-4">
        <label htmlFor="email" className="w-1/4 text-gray-700">
            Email ID :
          </label>
          <input
            id="email"
            {...register("email_id", { required: true })}
            className="border border-gray-300 rounded-md flex-1 p-2 focus:outline-none focus:border-blue-500"
            type="email"
            placeholder="School's email"
            name="email_id"
          />
        </div>
        {errors.email_id && (
          <span className="text-red-500 text-xs">
            ! This field is required
          </span>
        )}
        <div className="flex justify-start mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-600 focus:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
