"use client";
import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

type PostsDataType = {
  userId: string;
  id: number;
  title: string;
  body: string;
};

function Dashboard() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number[]>([]);
  const [posts, setPosts] = useState<PostsDataType[] | string>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0); // Track which group of 5 pages to show

  useEffect(() => {
    async function ViewPosts() {
      setIsLoading(true);
      try {
        const response = fetch(`https://jsonplaceholder.typicode.com/posts`)
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setPosts(data);
              const totalPages = Math.ceil(data.length / 5);
              setNumPages([...Array(totalPages).keys()].map((i) => i + 1));
            } else {
              setPosts("Internal server error to load posts");
            }
          });

      } catch (error) {
        console.log("Error occurred :-", error);
        setPosts("Internal server error to load posts");
      } finally {
        setIsLoading(false);
      }
    }
    ViewPosts();
  }, []);

  // Determine the range of page numbers to display (max 5 at a time)
  const maxPagesToShow = 5;
  const startIdx = pageGroup * maxPagesToShow;
  const endIdx = startIdx + maxPagesToShow;
  const visiblePages = numPages.slice(startIdx, endIdx);

  if (Array.isArray(posts)) {

    if (isLoading === true) {
      return (
        <div className="w-full h-[100vh] pl-14 p-5">
          <div className=" mt-[25vh]">
            <p className='text-center text-[1.4rem] mt-[25vh] font-bold'>
              Loading posts
              <img
                src="./loader.gif"
                alt="loading..."
                className="m-auto w-[100px] h-[100px]" />
            </p>
          </div>
        </div>
      );
    } else {
      // Filter posts based on search input (by title or ID)
      const filteredPosts = posts?.filter(
        (post) =>
          post?.title?.toLowerCase().includes(search.toLowerCase()) ||
          post?.id?.toString().includes(search)
      );

      // If search is active, ignore pagination and show all matching posts
      const displayedPosts =
        search.length > 0
          ? filteredPosts
          : posts?.slice((page - 1) * 5, page * 5);

      return (
        <div className="pl-14 p-5">
          {/* Search bar */}
          <div className="flex justify-center p-[] items-center border w-fit">
            <input
              className="p-1"
              type="text"
              placeholder="Search by title or ID"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }} />
            <Search />
          </div>

          {/* Table to display the posts */}
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Title</th>
              </tr>
            </thead>
            <tbody>
              {displayedPosts?.map((post) => (
                <tr key={post.id}>
                  <td className="border p-2">{post.id}</td>
                  <td className="border p-2">{post.title}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls (Only Show When No Search Query) */}
          {search.length === 0 && (
            <div className="grid justify-center items-center gap-4 mt-4">

              {/* Pagination Buttons */}
              <div className="flex gap-2">

                {startIdx > 0 && (
                  <button
                    className="w-[30px] h-[30px] border border-gray-500 rounded-full hover:bg-gray-200 hover:cursor-pointer"
                    onClick={() => setPageGroup((prev) => prev - 1)}
                  >
                    &laquo;
                  </button>
                )}

                {visiblePages.map((btn) => (
                  <button
                    key={btn}
                    className={`w-[30px] h-[30px] border border-gray-500 rounded-full ${page === btn ? "bg-blue-500 text-white" : "hover:bg-gray-200 hover:cursor-pointer"
                      }`}
                    onClick={() => setPage(btn)}
                  >
                    {btn}
                  </button>
                ))}

                {endIdx < numPages.length && (
                  <button
                    className="w-[30px] h-[30px] border border-gray-500 rounded-full hover:bg-gray-200 hover:cursor-pointer"
                    onClick={() => setPageGroup((prev) => prev + 1)}
                  >
                    &raquo;
                  </button>
                )}
              </div>
              {/* Next and Previous buttons */}
              <div className="flex justify-center gap-x-32">


                {/* Previous Button */}
                <button
                  className="font-bold hover:cursor-pointer"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </button>

                {/* Next Button */}
                <button
                  className="font-bold hover:cursor-pointer"
                  onClick={() => setPage((prev) => Math.min(prev + 1, numPages.length))}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

  } else {
    return (
      <div className="w-full h-[100vh] pl-14 p-5">
        <p className='text-center text-[1.4rem] mt-[25vh] font-bold'>{typeof posts === "string" && "Internal server error occurred !"}</p>
      </div>
    );
  }
}

export default Dashboard;
