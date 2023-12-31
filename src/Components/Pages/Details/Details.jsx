import React from "react";
import Rating from "react-rating";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Revcart from "../Dashboard/Revcart/Revcart";
import {
  useLoaderData,
  useParams,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/Provider";
import { useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
const Details = () => {
  const jobs = useLoaderData();
  const { _id } = useParams();

  const jobdetail = jobs.find((job) => job._id == _id);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosPublic();
  const { data: usrs = [], refetch } = useQuery({
    queryKey: ["usrs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/review", {});

      return res.data;
    },
  });
  const revdetail = usrs.filter((job) => job.name == jobdetail.name);

  console.log(revdetail);
  const handleCart = () => {
    // savejob(idInt, User);
    // // toast("Successfully Added to Cart");   const image = jobdetail.image;
    const image = jobdetail.image;
    const name = jobdetail.name;
    const username = jobdetail.username;
    const pdate = jobdetail.pdate;
    const ing = jobdetail.ing;
    const rating = jobdetail.rating;
    const price = jobdetail.price;
    const description = jobdetail.description;
    const review = jobdetail.review;
    const likes = jobdetail.likes;
    if (!user) {
      navigate("/login");
    } else {
      // send data
      console.log("ok");
      const usernameadd = user.displayName;
      const useremails = user.email;
      let stats = "Pending";
      const cart = {
        image,
        name,
        usernameadd,
        stats,
        useremails,
        username,
        pdate,
        ing,
        rating,
        price,
        description,
        review,
        likes,
      };
      fetch(`https://uni-meal-server.vercel.app/reqmeal`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cart),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            toast("Sucessfully requested");
            navigate("/");
          }
        });
    }
  };
  console.log(jobdetail.name);

  const handlerev = () => {
    refetch();
    const image = jobdetail.image;
    const name = jobdetail.name;
    const username = jobdetail.username;
    const pdate = jobdetail.pdate;
    const ing = jobdetail.ing;
    const rating = jobdetail.rating;
    const price = jobdetail.price;
    const description = jobdetail.description;

    const likes = jobdetail.likes;
    const usernameadd = user.displayName;
    const useremails = user.email;

    const review = document.getElementById("review").value;

    const revs = {
      review,
      image,
      name,
      usernameadd,

      useremails,
      username,
      pdate,
      ing,
      rating,
      price,
      description,
      review,
      likes,
    };

    fetch(`https://uni-meal-server.vercel.app/review`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(revs),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast("Sucessfully Review Given");
          review.value = " ";
        }
        review.value = " ";
      });

    console.log(name);
  };

  return (
    <div>
      <div className="flex  flex-col gap-1 justify-center items-center   rounded-md ">
        <h1 className="text-4xl font-bold text-[#EAA334]">Details</h1>
        <h1 className="text-xl"></h1>
        <div
          className="w-1/12
       -bold mb-4"
        >
          <hr></hr>
        </div>
        <div className="h-auto w-auto my-6 rounded-md flex flex-col md:flex-row gap-2  border-black  bg-slate-200">
          <div className="flex flex-col justify-center items-center">
            <div>
              <img
                src={jobdetail.image}
                className="h-[300px] w-[380px] m-2 rounded-md p-2 bg-white"
              ></img>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 p-2">
              <h3 className="text-center pt-2 text-[#120f0a] text-xl font-semibold">
                {jobdetail.name}
              </h3>

              <h3 className="text-center w-[300px]  text-[#120f0a] text-normal font-semibold pt-2">
                Added By : {jobdetail.username}
              </h3>

              <h3 className="text-center w-[300px]  text-[#120f0a] text-normal font-semibold pt-2">
                Description: <br></br>
                {jobdetail.description}
              </h3>
              <h3 className="text-center w-[300px]  text-[#120f0a] text-normal font-semibold pt-2">
                Ingredients : <br></br>
                {jobdetail.ing}
              </h3>
              <h3 className="text-center w-[300px]  text-[#120f0a] text-normal font-semibold pt-2">
                Ratings:
              </h3>
              <Rating
                className="text-center"
                placeholderRating={jobdetail.rating}
                emptySymbol={
                  <img
                    src="https://i.ibb.co/k5sbZ4X/star-empty.png"
                    className="icon w-[15px]"
                  />
                }
                placeholderSymbol={
                  <img
                    src="https://i.ibb.co/KqZ970k/star-full.png"
                    className="icon"
                  />
                }
                fullSymbol={
                  <img
                    src="https://i.ibb.co/KqZ970k/star-full.png"
                    className="icon"
                  />
                }
              />

              <h3 className="text-center  text-[#120f0a] text font-semibold">
                Price: {jobdetail.price} ৳
              </h3>

              <h3 className="text-center text-[#120f0a]  font-semibold">
                Post Time: {jobdetail.pdate}
              </h3>
              <h3 className="text-center w-[300px]  text-[#120f0a] text-normal font-semibold pt-2">
                Reviews:
              </h3>
              <div className="flex flex-wrap flex-col justify-center items-center gap-4">
                {revdetail.map((jobs) => (
                  <Revcart jobs={jobs}></Revcart>
                ))}
              </div>
              <div className="join">
                <input
                  id="review"
                  className="input input-bordered join-item "
                  placeholder="Review"
                />
                <button
                  onClick={handlerev}
                  className="btn btn-error join-item rounded-r-md "
                >
                  Give Review
                </button>
              </div>
              <button className="btn btn-error w-[100px] mx-auto my-4">
                Like
              </button>

              <div className="flex justify-center flex-col items-center md:mt-10">
                {" "}
                <button
                  onClick={handleCart}
                  className="btn btn-error mx-4 mb-4"
                >
                  Request Meal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Details;
