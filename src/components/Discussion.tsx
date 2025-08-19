import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, ThumbsUp, Eye, Clock, User, Send, Heart, Share2, Bookmark, Copy, X, Trash2 } from 'lucide-react';

interface Reply {
  id: number;
  author: string;
  isAnonymous: boolean;
  content: string;
  timestamp: string;
  likes: number;
  isHelpful: boolean;
  isUserAdded?: boolean;
  parentId?: number | null;
  replies?: Reply[];
}

interface DiscussionProps {
  postId: number;
  onBack: () => void;
  posts: Array<{
    id: number;
    title: string;
    content: string;
    author: string;
    isAnonymous: boolean;
    timestamp: string;
    category: string;
    replies: number;
    likes: number;
    views: number;
    tags: string[];
  }>;
  categories?: Array<{
    id: string;
    name: string;
  }>;
}

const Discussion: React.FC<DiscussionProps> = ({ postId, onBack, posts, categories = [] }) => {
  const [newReply, setNewReply] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([
    {
      id: 1,
      author: 'Senior Student',
      isAnonymous: false,
      content: 'Great question! First, you need to get permission from your university and immigration office. The process usually takes 2-3 weeks.',
      timestamp: '1 hour ago',
      likes: 12,
      isHelpful: true,
      parentId: null,
      replies: [],
    },
    {
      id: 2,
      author: 'Anonymous Helper',
      isAnonymous: true,
      content: 'I recommend checking out Alba Heaven (알바천국) and Part-time Job Korea websites. They have lots of student-friendly positions.',
      timestamp: '45 minutes ago',
      likes: 8,
      isHelpful: false,
      parentId: null,
      replies: [],
    },
    {
      id: 3,
      author: 'Malaysian Sunbae',
      isAnonymous: false,
      content: 'Make sure you don’t exceed 20 hours per week during semester time. During holidays, you can work full-time. Also, some jobs like tutoring pay really well!',
      timestamp: '30 minutes ago',
      likes: 15,
      isHelpful: true,
      parentId: null,
      replies: [],
    },
    {
      id: 4,
      author: 'Study Buddy',
      isAnonymous: false,
      content: 'Don’t forget to keep all your work documents organized. Immigration sometimes does random checks, so it’s better to be prepared.',
      timestamp: '20 minutes ago',
      likes: 6,
      isHelpful: false,
      parentId: null,
      replies: [],
    },
  ]);
  const [postLiked, setPostLiked] = useState(false);
  const [postSaved, setPostSaved] = useState(false);
  const [replyLikes, setReplyLikes] = useState<{ [key: number]: boolean }>({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [post, setPost] = useState(posts.find(p => p.id === postId) || posts[0] || {
    id: postId,
    title: 'Post Not Found',
    content: 'The requested post could not be found.',
    author: 'Unknown',
    isAnonymous: false,
    timestamp: 'N/A',
    category: 'general',
    replies: 0,
    likes: 0,
    views: 0,
    tags: [],
  });
  const [nestedReplyForms, setNestedReplyForms] = useState<{ [key: number]: { content: string; isAnonymous: boolean } }>({});

  const handleSubmitReply = (e: React.FormEvent, parentId: number | null = null) => {
    e.preventDefault();
    const content = parentId ? nestedReplyForms[parentId]?.content || '' : newReply;
    const replyIsAnonymous = parentId ? nestedReplyForms[parentId]?.isAnonymous || false : isAnonymous;
    if (content.trim()) {
      const newReplyId = replies.length > 0 ? Math.max(...replies.map(r => r.id)) + 1 : 1;
      const currentTime = new Date('2025-08-19T20:22:00+08:00');
      const now = new Date('2025-08-19T20:22:00+08:00');
      const diffMinutes = Math.floor((now.getTime() - currentTime.getTime()) / (1000 * 60));
      const timestamp = diffMinutes <= 1 ? 'Just now' : `${diffMinutes} minutes ago`;
      const newReply: Reply = {
        id: newReplyId,
        author: replyIsAnonymous ? 'Anonymous (You)' : 'Rumi (You)',
        isAnonymous: replyIsAnonymous,
        content,
        timestamp,
        likes: 0,
        isHelpful: false,
        isUserAdded: true,
        parentId,
        replies: [],
      };

      if (parentId) {
        setReplies(replies.map(reply =>
          reply.id === parentId
            ? { ...reply, replies: [...(reply.replies || []), newReply] }
            : reply
        ));
        setNestedReplyForms(prev => {
          const newForms = { ...prev };
          delete newForms[parentId];
          return newForms;
        });
      } else {
        setReplies([...replies, newReply]);
        setNewReply('');
        setIsAnonymous(false);
      }
      setPost(prevPost => ({ ...prevPost, replies: prevPost.replies + 1 }));
    }
  };

  const handleDeleteReply = (replyId: number, parentId: number | null = null) => {
    if (parentId) {
      setReplies(replies.map(reply =>
        reply.id === parentId
          ? { ...reply, replies: (reply.replies || []).filter(r => r.id !== replyId) }
          : reply
      ));
    } else {
      setReplies(replies.filter(reply => reply.id !== replyId));
    }
    setPost(prevPost => ({ ...prevPost, replies: prevPost.replies - 1 }));
  };

  const handlePostLike = () => {
    setPostLiked(!postLiked);
    setPost(prevPost => ({ ...prevPost, likes: postLiked ? prevPost.likes - 1 : prevPost.likes + 1 }));
  };

  const handleReplyLike = (replyId: number) => {
    setReplyLikes(prev => ({
      ...prev,
      [replyId]: !prev[replyId],
    }));
    setReplies(replies.map(reply =>
      reply.id === replyId
        ? { ...reply, likes: replyLikes[replyId] ? reply.likes - 1 : reply.likes + 1 }
        : { ...reply, replies: (reply.replies || []).map(nested =>
            nested.id === replyId
              ? { ...nested, likes: replyLikes[replyId] ? nested.likes - 1 : nested.likes + 1 }
              : nested
          ) }
    ));
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/discussion/${postId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.content,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Share failed:', err);
        setShowShareModal(true);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}/discussion/${postId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Link copied to clipboard!');
      setShowShareModal(false);
    });
  };

  const handleSocialShare = (platform: 'facebook' | 'whatsapp') => {
    const shareUrl = `${window.location.origin}/discussion/${postId}`;
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${post.title}: ${shareUrl}`)}`,
    };
    window.open(urls[platform], '_blank', 'noopener,noreferrer');
    setShowShareModal(false);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      questions: 'bg-blue-100/60 text-blue-700',
      advice: 'bg-green-100/60 text-green-700',
      experiences: 'bg-purple-100/60 text-purple-700',
      tips: 'bg-orange-100/60 text-orange-700',
      general: 'bg-gray-100/60 text-gray-700',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100/60 text-gray-700';
  };

  const handleNestedReplyChange = (replyId: number, content: string, isAnonymous: boolean) => {
    setNestedReplyForms(prev => ({
      ...prev,
      [replyId]: { content, isAnonymous },
    }));
  };

  const renderReply = (reply: Reply, depth: number = 0) => (
    <div key={reply.id} className={`bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6 ${depth > 0 ? 'ml-6' : ''}`}>
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          {reply.isAnonymous ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <span className="text-white text-sm font-bold">{reply.author.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <p className="font-medium text-gray-800">
              {reply.isAnonymous ? 'Anonymous' : reply.author}
            </p>
            {reply.isHelpful && (
              <span className="px-2 py-1 bg-green-100/60 backdrop-blur-sm text-green-700 rounded-full text-xs font-medium">
                Helpful
              </span>
            )}
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{reply.timestamp}</span>
            </div>
          </div>
          <p className="text-gray-700 mb-3 leading-relaxed">{reply.content}</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleReplyLike(reply.id)}
              className={`flex items-center space-x-1 text-sm ${
                replyLikes[reply.id] ? 'text-red-600' : 'text-gray-600'
              } hover:text-blue-600 transition-colors`}
            >
              <ThumbsUp className={`w-4 h-4 ${replyLikes[reply.id] ? 'fill-red-600' : ''}`} />
              <span>{reply.likes}</span>
            </button>
            <button
              onClick={() => setNestedReplyForms(prev => ({
                ...prev,
                [reply.id]: prev[reply.id] || { content: '', isAnonymous: false },
              }))}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Reply
            </button>
            <button className="text-sm text-gray-600 hover:text-orange-600 transition-colors">
              Mark as Helpful
            </button>
            {reply.isUserAdded && (
              <button
                onClick={() => handleDeleteReply(reply.id, reply.parentId)}
                className="text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          {nestedReplyForms[reply.id] && (
            <div className="mt-4">
              <form onSubmit={(e) => handleSubmitReply(e, reply.id)} className="space-y-4">
                <textarea
                  value={nestedReplyForms[reply.id].content}
                  onChange={(e) => handleNestedReplyChange(reply.id, e.target.value, nestedReplyForms[reply.id].isAnonymous)}
                  placeholder="Reply to this comment..."
                  className="w-full p-4 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={nestedReplyForms[reply.id].isAnonymous}
                      onChange={(e) => handleNestedReplyChange(reply.id, nestedReplyForms[reply.id].content, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Post anonymously</span>
                  </label>
                  <button
                    type="submit"
                    disabled={!nestedReplyForms[reply.id].content.trim()}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-600/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      {(reply.replies || []).map(nestedReply => renderReply(nestedReply, depth + 1))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-6 max-w-sm w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Share Post</h2>
              <button onClick={() => setShowShareModal(false)} className="text-gray-600 hover:text-gray-800">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-600/80 transition-all duration-200"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </button>
              <button
                onClick={() => handleSocialShare('facebook')}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-700/80 transition-all duration-200"
              >
                <span>Share on Facebook</span>
              </button>
              <button
                onClick={() => handleSocialShare('whatsapp')}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-green-600/80 transition-all duration-200"
              >
                <span>Share on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-xl rounded-xl border border-white/30 text-gray-700 hover:bg-white/30 transition-all duration-200 shadow-xl"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Community</span>
      </button>

      {/* Original Post */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              {post.isAnonymous ? (
                <User className="w-6 h-6 text-white" />
              ) : (
                <span className="text-white text-lg font-bold">{post.author.charAt(0)}</span>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-800 text-lg">
                {post.isAnonymous ? 'Anonymous' : post.author}
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-3 h-3" />
                <span>{post.timestamp}</span>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
            {categories.length > 0 ? categories.find(cat => cat.id === post.category)?.name || post.category : post.category}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>

        <div className="prose prose-gray max-w-none mb-6">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-3 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100/60 backdrop-blur-sm text-blue-700 rounded-lg text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MessageSquare className="w-4 h-4" />
              <span>{post.replies} replies</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.views} views</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handlePostLike}
              className={`flex items-center space-x-1 px-3 py-1 bg-white/40 backdrop-blur-sm rounded-lg hover:bg-white/50 transition-all duration-200 text-sm ${
                postLiked ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${postLiked ? 'fill-red-600' : ''}`} />
              <span>{post.likes}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 px-3 py-1 bg-white/40 backdrop-blur-sm rounded-lg hover:bg-white/50 transition-all duration-200 text-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button
              onClick={() => setPostSaved(!postSaved)}
              className={`flex items-center space-x-1 px-3 py-1 bg-white/40 backdrop-blur-sm rounded-lg hover:bg-white/50 transition-all duration-200 text-sm ${
                postSaved ? 'text-gray-600' : 'text-gray-600'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${postSaved ? 'fill-gray-600' : ''}`} />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reply Form */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add a Reply</h3>
        <form onSubmit={(e) => handleSubmitReply(e)} className="space-y-4">
          <textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Share your thoughts or advice..."
            className="w-full p-4 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-none"
            rows={4}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Post anonymously</span>
            </label>
            <button
              type="submit"
              disabled={!newReply.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-600/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>Reply</span>
            </button>
          </div>
        </form>
      </div>

      {/* Replies */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Replies ({replies.length})</h3>
        {replies.filter(reply => reply.parentId === null).map(reply => renderReply(reply))}
      </div>
    </div>
  );
};

export default Discussion;
