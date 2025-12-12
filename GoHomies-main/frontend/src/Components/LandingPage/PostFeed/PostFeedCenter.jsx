import React, { useEffect, useState } from "react";
import PostCard from "../../Feed/PostCard";
import { FetchPost } from "../../../../ApiCall";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../../Store/AllPostsSlice";

const PostFeedCenter = ({ className }) => {
  const dispatch = useDispatch();
  const [responseShow, setResponseShow] = useState(false);
  const [BlogOrPost, setBlogOrPost] = useState("Posts");
  const [loading, setLoading] = useState(true);

  const AllPosts = useSelector((state) => state.AllPosts || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchPost();

        if (res?.data?.msg === "Not Logged In") {
          setResponseShow(true);
          setLoading(false);
          return;
        }

        if (res?.status === 200) {
          dispatch(setAllPosts(res.data));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const handlePostCreated = () => {
      fetchData();
    };

    window.addEventListener("postCreated", handlePostCreated);
    return () => window.removeEventListener("postCreated", handlePostCreated);
  }, [dispatch]);

  // ❗ User not logged in
  if (responseShow) {
    return (
      <div className="border border-[#e0e0e0] px-4 py-4 rounded-[16px] flex-[.75] w-full">
        Please log in first to view the feed.
      </div>
    );
  }

  // ❗ Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-lg font-medium">
        Loading posts...
      </div>
    );
  }

  return (
    <div
      className={`${className} custom-scrollbar-hide h-[calc(100vh-80px)] flex flex-col gap-4`}
    >
      {/* Toggle Switch */}
      <div className="w-full p-[.25rem] h-[73px] rounded-3xl flex items-center justify-between border border-[#d7d7d8] bg-white">
        <div
          className="w-[49%] text-center py-[.5rem] rounded-3xl relative overflow-hidden cursor-pointer"
          onClick={() => setBlogOrPost("Posts")}
        >
          <h1 className={`relative z-[200] ${BlogOrPost === "Posts" && "text-white"}`}>
            Posts
          </h1>

          <div
            className={`h-full bg-[#0b85ff] absolute top-0 z-[100] transition-all duration-200 ${
              BlogOrPost === "Posts" ? "w-[100%]" : "w-[0%]"
            }`}
          ></div>
        </div>

        <div
          className="w-[49%] text-center py-[.5rem] rounded-3xl relative overflow-hidden cursor-pointer"
          onClick={() => setBlogOrPost("Blogs")}
        >
          <h1 className={`relative z-[200] ${BlogOrPost === "Blogs" && "text-white"}`}>
            Blogs
          </h1>

          <div
            className={`h-full bg-[#0b85ff] absolute top-0 z-[100] transition-all duration-200 ${
              BlogOrPost === "Blogs" ? "w-[100%]" : "w-[0%]"
            }`}
          ></div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {Array.isArray(AllPosts) && AllPosts.length > 0 ? (
          AllPosts.map((post, index) => {
            const interestedPersons = post?.interested_persons || [];
            const userId = post?.userId;

            return (
              <PostCard
                key={index}
                postId={post._id}
                user={userId}
                desc={post.description}
                budget={post.BudgetPerPerson}
                TravelMonth={post.TravelMonth}
                destination={post.destination}
                totalPersons={post.totalPersons}
                stats={post.stats}
                time={post.createdAt}
                initialOptedIn={interestedPersons.includes(userId)}
                initialOptCount={interestedPersons.length}
                likedPerson={post.likedBy}
                likeCount={post.likeCount}
                image={post.image}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-500 mt-4">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default PostFeedCenter;
