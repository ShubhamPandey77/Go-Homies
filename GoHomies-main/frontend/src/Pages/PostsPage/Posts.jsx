import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PostCard from '../../Components/Feed/PostCard'
import { setAllPosts } from '../../Store/AllPostsSlice'
import { FetchPost, CreatePost } from '../../../ApiCall'
import Footer from '../../Components/Footer/Footer'
import { Snackbar, Alert } from '@mui/material'

const Posts = () => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.AllPosts || [])
  const userData = useSelector((state) => state.UserData)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [destination, setDestination] = useState('')
  const [totalPersons, setTotalPersons] = useState('')
  const [travelMonth, setTravelMonth] = useState('')
  const [budgetPerPerson, setBudgetPerPerson] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState('info')

  const handleCreatePost = async () => {
    if (!destination.trim() || !totalPersons || !travelMonth || !budgetPerPerson || !description.trim()) {
      setAlertMessage('Please fill in all fields')
      setAlertSeverity('warning')
      setOpenAlert(true)
      return
    }

    setIsCreating(true)
    try {
      const response = await CreatePost(destination, totalPersons, travelMonth, budgetPerPerson, description, image)
      if (response.status === 201 || response.status === 200) {
        setAlertMessage('Post created successfully!')
        setAlertSeverity('success')
        setOpenAlert(true)
        setDestination('')
        setTotalPersons('')
        setTravelMonth('')
        setBudgetPerPerson('')
        setDescription('')
        setImage(null)
        setShowForm(false)
        fetchPosts()
      } else {
        setAlertMessage(response.data?.msg || 'Error creating post')
        setAlertSeverity('error')
        setOpenAlert(true)
      }
    } catch (error) {
      console.error('Error creating post:', error)
      setAlertMessage('Error creating post')
      setAlertSeverity('error')
      setOpenAlert(true)
    } finally {
      setIsCreating(false)
    }
  }

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await FetchPost()
      if (response.status === 200) {
        const postsData = response.data.posts || response.data.data || response.data || []
        dispatch(setAllPosts(Array.isArray(postsData) ? postsData : []))
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
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

        {userData?.isAuthenticated && (
          <button
            onClick={() => setShowForm(!showForm)}
            className='mb-8 px-6 py-2 bg-[#6B8E23] text-white rounded-lg hover:bg-[#5a7a1c] transition w-full'
          >
            {showForm ? 'Cancel' : 'Create New Post'}
          </button>
        )}

        {showForm && userData?.isAuthenticated && (
          <div className='mb-8 p-6 bg-white rounded-lg shadow-md border border-[#e0e0e0]'>
            <h2 className='text-2xl font-bold mb-4'>Create a New Travel Post</h2>
            
            <div className='mb-4'>
              <label className='block text-sm font-medium mb-2'>Destination</label>
              <input
                type='text'
                placeholder='e.g., Paris, France'
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className='w-full px-4 py-2 border border-[#d7d7d8] rounded-lg focus:outline-none focus:border-[#6B8E23]'
              />
            </div>

            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-sm font-medium mb-2'>Total Persons</label>
                <input
                  type='number'
                  placeholder='e.g., 4'
                  value={totalPersons}
                  onChange={(e) => setTotalPersons(e.target.value)}
                  className='w-full px-4 py-2 border border-[#d7d7d8] rounded-lg focus:outline-none focus:border-[#6B8E23]'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-2'>Travel Month</label>
                <input
                  type='month'
                  value={travelMonth}
                  onChange={(e) => setTravelMonth(e.target.value)}
                  className='w-full px-4 py-2 border border-[#d7d7d8] rounded-lg focus:outline-none focus:border-[#6B8E23]'
                />
              </div>
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium mb-2'>Budget Per Person (USD)</label>
              <input
                type='number'
                placeholder='e.g., 1500'
                value={budgetPerPerson}
                onChange={(e) => setBudgetPerPerson(e.target.value)}
                className='w-full px-4 py-2 border border-[#d7d7d8] rounded-lg focus:outline-none focus:border-[#6B8E23]'
              />
            </div>

            <div className='mb-4'>
              <label className='block text-sm font-medium mb-2'>Description</label>
              <textarea
                placeholder='Describe your travel plan...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className='w-full px-4 py-2 border border-[#d7d7d8] rounded-lg focus:outline-none focus:border-[#6B8E23]'
              />
            </div>

            <div className='mb-6'>
              <label className='block text-sm font-medium mb-2'>Image (Optional)</label>
              <input
                type='file'
                accept='image/*'
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className='w-full px-4 py-2 border border-[#d7d7d8] rounded-lg focus:outline-none focus:border-[#6B8E23]'
              />
              {image && <p className='text-sm text-gray-600 mt-2'>Selected: {image.name}</p>}
            </div>

            <button
              onClick={handleCreatePost}
              disabled={isCreating}
              className='w-full px-6 py-2 bg-[#6B8E23] text-white rounded-lg hover:bg-[#5a7a1c] transition disabled:bg-gray-400'
            >
              {isCreating ? 'Creating...' : 'Publish Post'}
            </button>
          </div>
        )}
        
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

      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alertSeverity} variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>

      <Footer />
    </div>
  )
}

export default Posts
