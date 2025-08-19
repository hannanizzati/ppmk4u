import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Eye, Clock, User, Search, Filter, Plus, ArrowRight, X, Heart, Trash2, ArrowLeft, Send, Share2, Bookmark, Copy } from 'lucide-react';

interface Post {
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
}

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

interface Category {
  id: string;
  name: string;
}

interface DiscussionProps {
  postId: number;
  onBack: () => void;
  posts: Post[];
  categories: Category[];
}

const Discussion: React.FC<DiscussionProps> = ({ postId, onBack, posts, categories }) => {
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
              className={`flex items-center space-x-1 text-sm ${replyLikes[reply.id] ? 'text-red-600' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
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

      <button
        onClick={onBack}
        className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-xl rounded-xl border border-white/30 text-gray-700 hover:bg-white/30 transition-all duration-200 shadow-xl"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Community</span>
      </button>

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
              className={`flex items-center space-x-1 px-3 py-1 bg-white/40 backdrop-blur-sm rounded-lg hover:bg-white/50 transition-all duration-200 text-sm ${postLiked ? 'text-red-600' : 'text-gray-600'}`}
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
              className={`flex items-center space-x-1 px-3 py-1 bg-white/40 backdrop-blur-sm rounded-lg hover:bg-white/50 transition-all duration-200 text-sm ${postSaved ? 'text-gray-600' : 'text-gray-600'}`}
            >
              <Bookmark className={`w-4 h-4 ${postSaved ? 'fill-gray-600' : ''}`} />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

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

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Replies ({replies.length})</h3>
        {replies.filter(reply => reply.parentId === null).map(reply => renderReply(reply))}
      </div>
    </div>
  );
};

const Community: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    tags: '',
    category: 'questions',
    isAnonymous: false,
  });
  const [postLikes, setPostLikes] = useState<{ [key: number]: boolean }>({});

  const categories: Category[] = [
    { id: 'all', name: 'All Posts' },
    { id: 'questions', name: 'Questions' },
    { id: 'advice', name: 'Advice' },
    { id: 'experiences', name: 'Experiences' },
    { id: 'tips', name: 'Tips & Tricks' },
    { id: 'general', name: 'General Discussion' },
  ];

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: 'How to find part-time jobs as an international student?',
      content: 'I\'m looking for advice on finding part-time work while studying in Korea. What are the legal requirements and best places to look?',
      author: 'Anonymous Sonbae',
      isAnonymous: true,
      timestamp: '2 hours ago',
      category: 'questions',
      replies: 4,
      likes: 23,
      views: 156,
      tags: ['work', 'part-time', 'legal', 'advice'],
    },
    {
      id: 2,
      title: 'My experience with Korean healthcare system',
      content: 'Just wanted to share my recent experience with the Korean healthcare system. Overall very positive, but here are some tips for fellow Malaysians...',
      author: 'Ahmad Rahman',
      isAnonymous: false,
      timestamp: '5 hours ago',
      category: 'experiences',
      replies: 8,
      likes: 34,
      views: 289,
      tags: ['healthcare', 'insurance', 'tips'],
    },
    {
      id: 3,
      title: 'Best Korean language learning apps?',
      content: 'Can senior students recommend the best apps for learning Korean? I\'ve tried a few but looking for more comprehensive options.',
      author: 'New Student',
      isAnonymous: true,
      timestamp: '1 day ago',
      category: 'questions',
      replies: 22,
      likes: 18,
      views: 234,
      tags: ['korean', 'language', 'apps', 'study'],
    },
    {
      id: 4,
      title: 'Tips for surviving Korean winter',
      content: 'For new students experiencing their first Korean winter, here are some essential tips from someone who\'s been through 3 winters here...',
      author: 'Winter Survivor',
      isAnonymous: false,
      timestamp: '2 days ago',
      category: 'tips',
      replies: 12,
      likes: 45,
      views: 378,
      tags: ['winter', 'clothing', 'heating', 'survival'],
    },
    {
      id: 5,
      title: 'Homesickness and how I dealt with it',
      content: 'Sharing my journey of dealing with homesickness during my first year in Korea. Hope this helps other students going through the same thing.',
      author: 'Anonymous Helper',
      isAnonymous: true,
      timestamp: '3 days ago',
      category: 'experiences',
      replies: 28,
      likes: 67,
      views: 445,
      tags: ['mental-health', 'homesickness', 'support'],
    },
    {
      id: 6,
      title: 'Best places to buy halal food in Seoul',
      content: 'Compiled a list of the best places to buy halal ingredients and ready-made food in Seoul. Updated for 2024!',
      author: 'Foodie Guide',
      isAnonymous: false,
      timestamp: '4 days ago',
      category: 'tips',
      replies: 19,
      likes: 52,
      views: 567,
      tags: ['halal', 'food', 'shopping', 'seoul'],
    },
  ]);

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      questions: 'bg-blue-100/60 text-blue-700 border-blue-200/30',
      advice: 'bg-green-100/60 text-green-700 border-green-200/30',
      experiences: 'bg-purple-100/60 text-purple-700 border-purple-200/30',
      tips: 'bg-orange-100/60 text-orange-700 border-orange-200/30',
      general: 'bg-gray-100/60 text-gray-700 border-gray-200/30',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100/60 text-gray-700 border-gray-200/30';
  };

  const handleReplyClick = (postId: number) => {
    if (posts.some(p => p.id === postId)) {
      setSelectedPostId(postId);
    }
  };

  const handleBackToCommunity = () => {
    setSelectedPostId(null);
  };

  const handleNewPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.category) {
      alert('Please fill in title, content, and category.');
      return;
    }
    const newPostId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    const newPostData: Post = {
      id: newPostId,
      title: newPost.title,
      content: newPost.content,
      author: newPost.isAnonymous ? 'Anonymous (You)' : 'Rumi (You)',
      isAnonymous: newPost.isAnonymous,
      timestamp: 'Just now',
      category: newPost.category,
      replies: 0,
      likes: 0,
      views: 0,
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };
    setPosts([newPostData, ...posts]);
    setNewPost({ title: '', content: '', tags: '', category: 'questions', isAnonymous: false });
    setShowNewPostModal(false);
  };

  const handlePostLike = (postId: number) => {
    setPostLikes(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: postLikes[postId] ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const PostCard = ({ post }: { post: Post }) => (
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6 hover:bg-white/25 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            {post.isAnonymous ? (
              <User className="w-5 h-5 text-white" />
            ) : (
              <span className="text-white text-sm font-bold">{post.author.charAt(0)}</span>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {post.isAnonymous ? 'Anonymous' : post.author}
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-3 h-3" />
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border backdrop-blur-sm ${getCategoryColor(post.category)}`}>
          {categories.find(cat => cat.id === post.category)?.name || post.category}
        </span>
      </div>

      <h3
        className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors cursor-pointer"
        onClick={() => handleReplyClick(post.id)}
      >
        {post.title}
      </h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100/60 backdrop-blur-sm text-blue-700 rounded-lg text-xs font-medium border border-blue-200/30"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MessageSquare className="w-4 h-4" />
            <span>{post.replies} replies</span>
          </div>
          <button
            onClick={() => handlePostLike(post.id)}
            className={`flex items-center space-x-1 px-3 py-1 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 backdrop-blur-sm rounded-lg transition-all duration-200 text-sm border border-white/30 ${postLikes[post.id] ? 'text-red-600' : 'text-gray-600'}`}
          >
            <Heart className={`w-4 h-4 ${postLikes[post.id] ? 'fill-red-600' : ''}`} />
            <span>{post.likes} likes</span>
          </button>
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{post.views} views</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleReplyClick(post.id)}
            className="flex items-center space-x-1 px-3 py-1 bg-white/40 backdrop-blur-sm rounded-lg hover:bg-white/50 transition-all duration-200 text-sm border border-white/30 group"
          >
            <span>Reply</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
          {post.author.includes('(You)') && (
            <button
              onClick={() => handleDeletePost(post.id)}
              className="text-red-600 hover:text-red-800 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6">
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">New Post</h2>
              <button onClick={() => setShowNewPostModal(false)} className="text-gray-600 hover:text-gray-800">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleNewPostSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Enter post title..."
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Share your thoughts..."
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-none"
                  rows={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  placeholder="e.g., study, tips, korea"
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                >
                  {categories.filter(cat => cat.id !== 'all').map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newPost.isAnonymous}
                  onChange={(e) => setNewPost({ ...newPost, isAnonymous: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Post anonymously</span>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 bg-gray-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-gray-600/80 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newPost.title.trim() || !newPost.content.trim()}
                  className="px-4 py-2 bg-blue-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-600/80 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedPostId ? (
        <Discussion postId={selectedPostId} onBack={handleBackToCommunity} posts={posts} categories={categories} />
      ) : (
        <div className="space-y-6">
          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">자유게시판 (Community Board)</h1>
                <p className="text-gray-600">Ask questions, share experiences, and connect with fellow Malaysian students</p>
              </div>
              <button
                onClick={() => setShowNewPostModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500/80 backdrop-blur-sm text-white rounded-xl hover:bg-blue-600/80 transition-all duration-200 border border-blue-400/30 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>New Post</span>
              </button>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-6 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 backdrop-blur-xl rounded-2xl border border-white/30 p-4 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-200/30">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Anonymous posting available</p>
                <p className="text-xs text-gray-600">Feel free to ask sensitive questions anonymously</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 p-12 text-center shadow-xl">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
              <p className="text-gray-500">Try adjusting your search terms or category filter</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Community;
