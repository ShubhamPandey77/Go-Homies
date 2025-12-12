import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostCard from '../../Components/Feed/PostCard'
import { setAllPosts } from '../../Store/AllPostsSlice'
import { FetchPost } from '../../../ApiCall'
import Footer from '../../Components/Footer/Footer'

const Posts = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.AllPosts || [])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await FetchPost()
        if (response.status === 200) {
          dispatch(setAllPosts(response.data))
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()

    const handlePostCreated = () => {
      fetchPosts()
    }

    window.addEventListener('postCreated', handlePostCreated)
    return () => window.removeEventListener('postCreated', handlePostCreated)
  }, [dispatch])

  return (
    <div className='flex flex-col items-center justify-start min-h-screen py-8 bg-[#FAFAFA] pt-[100px]'>
      <div className='w-full max-w-2xl px-4'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold mb-4 text-center'>Travel Posts</h1>
          <p className='text-gray-600 text-center'>Discover travel destinations and join fellow travelers</p>
        </div>
        
        {loading && (
          <div className='flex justify-center items-center py-12 bg-white rounded-lg border border-[#e0e0e0]'>
            <p className='text-gray-500'>Loading posts...</p>
          </div>
        )}

        {!loading && (!posts || posts.length === 0) && (
          <div className='flex justify-center items-center py-12 bg-white rounded-lg border border-[#e0e0e0]'>
            <p className='text-gray-500'>No posts yet. Create one to get started!</p>
          </div>
        )}

        <div className='flex flex-col gap-6'>
          {posts && posts.length > 0 && posts.map((post) => (
            <PostCard
              key={post._id}
              postId={post._id}
              user={post.userId}
              desc={post.description}
              budget={post.BudgetPerPerson}
              TravelMonth={post.TravelMonth}
              destination={post.destination}
              totalPersons={post.totalPersons}
              time={post.createdAt}
              initialOptedIn={post.interested_persons?.some(
                (person) => person._id === localStorage.getItem('userId')
              ) || false}
              initialOptCount={post.interested_persons?.length || 0}
              likeCount={post.likeCount || 0}
              image={post.image}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Posts
