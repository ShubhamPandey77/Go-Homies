import React, { useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { LikeVlog, UnlikeVlog, CommentOnVlog } from '../../../ApiCall';

const VlogCard = ({ vlogId, title, description, videoUrl, user, likeCount: initialLikeCount, time, likes: initialLikes }) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount || 0);
  const [isLiked, setIsLiked] = useState(initialLikes?.includes(user?._id) || false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isCommentingLoading, setIsCommentingLoading] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  const convertVideoUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtu.be')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    if (url.includes('watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtube.com/embed')) {
      return url;
    }
    if (url.includes('vimeo.com')) {
      const vimeoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${vimeoId}`;
    }
    return url;
  };

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        const response = await UnlikeVlog(vlogId);
        if (response?.status === 200) {
          setIsLiked(false);
          setLikeCount(Math.max(0, likeCount - 1));
        }
      } else {
        const response = await LikeVlog(vlogId);
        if (response?.status === 200) {
          setIsLiked(true);
          setLikeCount(likeCount + 1);
        }
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    setIsCommentingLoading(true);
    try {
      const response = await CommentOnVlog(vlogId, commentText);
      if (response?.status === 200) {
        setCommentText('');
        setShowCommentForm(false);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsCommentingLoading(false);
    }
  };

  const handleShare = () => {
    const shareText = `Check out this amazing vlog: ${title}`;
    if (navigator.share) {
      navigator.share({
        title,
        text: shareText,
        url: window.location.href,
      }).catch((err) => console.log('Share error:', err));
    } else {
      alert('Sharing not supported on this device');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#d7d7d8] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Video Section */}
      <div className="w-full aspect-video bg-black flex items-center justify-center">
        <iframe
          width="100%"
          height="100%"
          src={convertVideoUrl(videoUrl)}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#6B8E23] rounded-full flex items-center justify-center text-white text-sm font-bold">
            {getUserInitials(user?.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user?.name || 'Anonymous'}</p>
            <p className="text-xs text-gray-500">{formatDate(time)}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-3 pb-3 border-t border-b border-[#e0e0e0]">
          <button 
            onClick={handleLikeToggle}
            className={`flex items-center gap-1 transition ${isLiked ? 'text-red-500' : 'text-gray-600 hover:text-[#6B8E23]'}`}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="text-sm">{likeCount}</span>
          </button>
          <button 
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="flex items-center gap-1 text-gray-600 hover:text-[#6B8E23] transition"
          >
            <MessageCircle size={16} />
            <span className="text-sm">Comment</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-1 text-gray-600 hover:text-[#6B8E23] transition"
          >
            <Share2 size={16} />
            <span className="text-sm">Share</span>
          </button>
        </div>

        {/* Comment Form */}
        {showCommentForm && (
          <div className="pt-3 flex gap-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 px-3 py-2 border border-[#d7d7d8] rounded-lg text-sm focus:outline-none focus:border-[#6B8E23]"
            />
            <button
              onClick={handleCommentSubmit}
              disabled={isCommentingLoading}
              className="px-4 py-2 bg-[#6B8E23] text-white rounded-lg text-sm hover:bg-[#5a7a1c] transition disabled:bg-gray-400"
            >
              {isCommentingLoading ? 'Posting...' : 'Post'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VlogCard;
