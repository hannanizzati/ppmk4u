import React, { useState } from 'react'
import { Plus, Search, Filter, Heart, MessageCircle, MapPin, Clock, Star, User, X, Send, BookmarkCheck, CheckCircle, ShoppingCart, CreditCard, Upload, Tag, DollarSign, FileText } from 'lucide-react'

interface Reply {
  id: string
  userId: string
  userName: string
  userAvatar: string
  message: string
  timeAgo: string
  parentCommentId: string
}

interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  message: string
  timeAgo: string
  rating?: number
  itemId: string
  itemTitle: string
  itemImage: string
  itemPrice: number
  replies?: Reply[]
}

interface MarketplaceItem {
  id: string
  title: string
  price: number
  originalPrice?: number
  category: string
  condition: string
  description: string
  image: string
  location: string
  timeAgo: string
  seller: {
    name: string
    rating: number
    avatar: string
    userId: string
  }
  likes: number
  comments: number
  featured?: boolean
  isLiked?: boolean
  isSaved?: boolean
  isSold?: boolean
  itemComments: Comment[]
}

const mockItems: MarketplaceItem[] = [
  {
    id: '1',
    title: 'MacBook Pro 13" 2021',
    price: 1200000,
    originalPrice: 1500000,
    category: 'Electronics',
    condition: 'Like New',
    description: 'Excellent condition MacBook Pro with M1 chip. Perfect for students. Comes with original charger and box.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    location: 'Hongdae',
    timeAgo: '2 hours ago',
    seller: {
      name: 'Ahmad Rahman',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      userId: 'current-user'
    },
    likes: 12,
    comments: 5,
    featured: true,
    isLiked: false,
    isSaved: false,
    isSold: false,
    itemComments: [
      {
        id: '1',
        userId: '1',
        userName: 'Lisa Wong',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        message: 'Is the battery life still good? How many cycles?',
        timeAgo: '1 hour ago',
        itemId: '1',
        itemTitle: 'MacBook Pro 13" 2021',
        itemImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
        itemPrice: 1200000,
        replies: [
          {
            id: 'r1',
            userId: 'current-user',
            userName: 'You',
            userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
            message: 'Battery is excellent! Only 150 cycles.',
            timeAgo: '30 minutes ago',
            parentCommentId: '1'
          }
        ]
      },
      {
        id: '2',
        userId: '2',
        userName: 'James Park',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        message: 'Interested! Can we meet at Hongik University?',
        timeAgo: '3 hours ago',
        itemId: '1',
        itemTitle: 'MacBook Pro 13" 2021',
        itemImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
        itemPrice: 1200000,
        replies: []
      },
      {
        id: '3',
        userId: '3',
        userName: 'Kevin Liu',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        message: 'Does it come with AppleCare warranty?',
        timeAgo: '5 hours ago',
        itemId: '1',
        itemTitle: 'MacBook Pro 13" 2021',
        itemImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
        itemPrice: 1200000,
        replies: []
      },
      {
        id: '4',
        userId: '4',
        userName: 'Emma Thompson',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        message: 'Great condition! Would you consider ₩1,100,000?',
        timeAgo: '8 hours ago',
        itemId: '1',
        itemTitle: 'MacBook Pro 13" 2021',
        itemImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
        itemPrice: 1200000,
        replies: []
      },
      {
        id: 'user-1',
        userId: 'current-user',
        userName: 'You',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        message: 'Is the battery still in good condition? How many charge cycles?',
        timeAgo: '1 day ago',
        itemId: '1',
        itemTitle: 'MacBook Pro 13" 2021',
        itemImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
        itemPrice: 1200000,
        replies: []
      }
    ]
  },
  {
    id: '2',
    title: 'IKEA Study Desk',
    price: 80000,
    originalPrice: 120000,
    category: 'Furniture',
    condition: 'Good',
    description: 'White IKEA desk in good condition. Perfect for studying. Easy to assemble.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    location: 'Gangnam',
    timeAgo: '5 hours ago',
    seller: {
      name: 'Siti Nurhaliza',
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      userId: 'seller-2'
    },
    likes: 6,
    comments: 4,
    isLiked: false,
    isSaved: false,
    isSold: true,
    itemComments: [
      {
        id: '1',
        userId: '1',
        userName: 'Sarah Kim',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        message: 'Is this still available? Looks perfect for my dorm room!',
        timeAgo: '2 hours ago',
        itemId: '2',
        itemTitle: 'IKEA Study Desk',
        itemImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        itemPrice: 80000,
        replies: []
      },
      {
        id: '2',
        userId: '2',
        userName: 'David Chen',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        message: 'Great price! Can you deliver to Yonsei University?',
        timeAgo: '4 hours ago',
        itemId: '2',
        itemTitle: 'IKEA Study Desk',
        itemImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        itemPrice: 80000,
        replies: []
      },
      {
        id: '3',
        userId: '3',
        userName: 'Maya Patel',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
        message: 'Does it come with the chair as well?',
        timeAgo: '6 hours ago',
        itemId: '2',
        itemTitle: 'IKEA Study Desk',
        itemImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        itemPrice: 80000,
        replies: []
      },
      {
        id: '4',
        userId: 'current-user',
        userName: 'You',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        message: 'What are the exact dimensions? Need to make sure it fits in my room.',
        timeAgo: '1 day ago',
        itemId: '2',
        itemTitle: 'IKEA Study Desk',
        itemImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
        itemPrice: 80000,
        replies: []
      }
    ]
  },
  {
    id: '3',
    title: 'Korean Language Textbooks Set',
    price: 150000,
    originalPrice: 250000,
    category: 'Books',
    condition: 'Good',
    description: 'Complete set of Korean language textbooks from beginner to intermediate level. Great for TOPIK preparation.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    location: 'Sinchon',
    timeAgo: '1 day ago',
    seller: {
      name: 'Lim Wei Ming',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      userId: 'current-user'
    },
    likes: 15,
    comments: 4,
    isLiked: false,
    isSaved: false,
    isSold: false,
    itemComments: [
      {
        id: '1',
        userId: '1',
        userName: 'Anna Lee',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
        message: 'Perfect for TOPIK Level 3! Are all the answer keys included?',
        timeAgo: '5 hours ago',
        itemId: '3',
        itemTitle: 'Korean Language Textbooks Set',
        itemImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
        itemPrice: 150000,
        replies: []
      },
      {
        id: '2',
        userId: '2',
        userName: 'Kevin Tan',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        message: 'Great deal! I\'ll take it if still available.',
        timeAgo: '8 hours ago',
        itemId: '3',
        itemTitle: 'Korean Language Textbooks Set',
        itemImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
        itemPrice: 150000,
        replies: []
      },
      {
        id: '3',
        userId: '3',
        userName: 'Maria Santos',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        message: 'Do you have the audio CDs as well?',
        timeAgo: '12 hours ago',
        itemId: '3',
        itemTitle: 'Korean Language Textbooks Set',
        itemImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
        itemPrice: 150000,
        replies: []
      },
      {
        id: 'user-2',
        userId: 'current-user',
        userName: 'You',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        message: 'Perfect for TOPIK preparation! Do you have the workbooks too?',
        timeAgo: '2 days ago',
        itemId: '3',
        itemTitle: 'Korean Language Textbooks Set',
        itemImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
        itemPrice: 150000,
        replies: []
      }
    ]
  },
  {
    id: '4',
    title: 'iPhone 14 Pro 128GB',
    price: 950000,
    originalPrice: 1200000,
    category: 'Electronics',
    condition: 'Like New',
    description: 'Barely used iPhone 14 Pro in Space Black. Includes original box, charger, and screen protector already applied.',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    location: 'Itaewon',
    timeAgo: '3 hours ago',
    seller: {
      name: 'Sarah Kim',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      userId: 'seller-sarah'
    },
    likes: 8,
    comments: 3,
    featured: true,
    isLiked: false,
    isSaved: false,
    isSold: false,
    itemComments: [
      {
        id: '1',
        userId: '1',
        userName: 'Mike Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        message: 'What\'s the battery health percentage?',
        timeAgo: '2 hours ago',
        itemId: '4',
        itemTitle: 'iPhone 14 Pro 128GB',
        itemImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
        itemPrice: 950000,
        replies: []
      }
    ]
  },
  {
    id: '5',
    title: 'Gaming Chair - DXRacer',
    price: 200000,
    originalPrice: 350000,
    category: 'Furniture',
    condition: 'Good',
    description: 'Comfortable gaming chair in excellent condition. Perfect for long study sessions or gaming. All functions work perfectly.',
    image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop',
    location: 'Myeongdong',
    timeAgo: '6 hours ago',
    seller: {
      name: 'David Chen',
      rating: 4.6,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      userId: 'seller-david'
    },
    likes: 5,
    comments: 2,
    isLiked: false,
    isSaved: false,
    isSold: false,
    itemComments: [
      {
        id: '1',
        userId: '1',
        userName: 'Alex Wong',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        message: 'Does it have lumbar support?',
        timeAgo: '4 hours ago',
        itemId: '5',
        itemTitle: 'Gaming Chair - DXRacer',
        itemImage: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&h=300&fit=crop',
        itemPrice: 200000,
        replies: []
      }
    ]
  },
  {
    id: '6',
    title: 'Canon EOS M50 Camera',
    price: 450000,
    originalPrice: 650000,
    category: 'Electronics',
    condition: 'Like New',
    description: 'Mirrorless camera perfect for photography students. Includes 15-45mm lens, battery, charger, and 32GB SD card.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
    location: 'Hongdae',
    timeAgo: '1 day ago',
    seller: {
      name: 'Emma Thompson',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      userId: 'seller-emma'
    },
    likes: 12,
    comments: 6,
    isLiked: false,
    isSaved: false,
    isSold: false,
    itemComments: [
      {
        id: '1',
        userId: '1',
        userName: 'Photography Club',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
        message: 'Great camera for beginners! How many shutter actuations?',
        timeAgo: '12 hours ago',
        itemId: '6',
        itemTitle: 'Canon EOS M50 Camera',
        itemImage: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
        itemPrice: 450000,
        replies: []
      }
    ]
  },
  {
    id: '7',
    title: 'Calculus & Physics Textbooks',
    price: 120000,
    originalPrice: 200000,
    category: 'Books',
    condition: 'Good',
    description: 'Engineering textbooks bundle: Calculus I & II, Physics for Engineers. Great condition with minimal highlighting.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
    location: 'Gangnam',
    timeAgo: '2 days ago',
    seller: {
      name: 'Kevin Liu',
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      userId: 'seller-kevin'
    },
    likes: 7,
    comments: 4,
    isLiked: false,
    isSaved: false,
    isSold: false,
    itemComments: [
      {
        id: '1',
        userId: '1',
        userName: 'Engineering Student',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        message: 'Perfect for my semester! Are the solution manuals included?',
        timeAgo: '1 day ago',
        itemId: '7',
        itemTitle: 'Calculus & Physics Textbooks',
        itemImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
        itemPrice: 120000,
        replies: []
      }
    ]
  },
  {
    id: '8',
    title: 'Nike Air Force 1 - Size 270',
    price: 80000,
    originalPrice: 120000,
    category: 'Clothing',
    condition: 'Good',
    description: 'Classic white Nike Air Force 1 sneakers. Worn a few times, still in great condition. Perfect for casual wear.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    location: 'Sinchon',
    timeAgo: '4 hours ago',
    seller: {
      name: 'James Park',
      rating: 4.5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      userId: 'seller-james'
    },
    likes: 4,
    comments: 2,
    isLiked: false,
    isSaved: false,
    isSold: false,
    itemComments: [
      {
        id: '1',
        userId: '1',
        userName: 'Sneaker Lover',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        message: 'Do they fit true to size?',
        timeAgo: '3 hours ago',
        itemId: '8',
        itemTitle: 'Nike Air Force 1 - Size 270',
        itemImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
        itemPrice: 80000,
        replies: []
      }
    ]
  }
]

interface SellItemModalProps {
  onClose: () => void
  onSubmit: (item: Omit<MarketplaceItem, 'id' | 'timeAgo' | 'likes' | 'comments' | 'isLiked' | 'isSaved' | 'isSold' | 'itemComments'>) => void
}

const SellItemModal: React.FC<SellItemModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    originalPrice: '',
    category: 'Electronics',
    condition: 'Like New',
    description: '',
    location: '',
    sellerName: '',
    sellerRating: '4.5'
  })

  const [imagePreview, setImagePreview] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = ['Electronics', 'Furniture', 'Books', 'Clothing', 'Sports', 'Others']
  const conditions = ['Like New', 'Good', 'Fair', 'Poor']
  const locations = ['Hongdae', 'Gangnam', 'Sinchon', 'Myeongdong', 'Itaewon', 'Jongno', 'Others']

  // Sample images for demo purposes
  const sampleImages = [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleImageSelect = () => {
    // For demo purposes, randomly select a sample image
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)]
    setImagePreview(randomImage)
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.price.trim()) newErrors.price = 'Price is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.sellerName.trim()) newErrors.sellerName = 'Seller name is required'
    if (!imagePreview) newErrors.image = 'Please select an image'

    if (formData.price && isNaN(Number(formData.price))) {
      newErrors.price = 'Price must be a valid number'
    }

    if (formData.originalPrice && isNaN(Number(formData.originalPrice))) {
      newErrors.originalPrice = 'Original price must be a valid number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const itemData: Omit<MarketplaceItem, 'id' | 'timeAgo' | 'likes' | 'comments' | 'isLiked' | 'isSaved' | 'isSold' | 'itemComments'> = {
      title: formData.title,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      category: formData.category,
      condition: formData.condition,
      description: formData.description,
      image: imagePreview,
      location: formData.location,
      seller: {
        name: formData.sellerName,
        rating: Number(formData.sellerRating),
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        userId: 'current-user'
      }
    }

    onSubmit(itemData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold text-gray-800">Sell Your Item</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Upload className="w-4 h-4 inline mr-2" />
              Item Photo
            </label>
            <div className="border-2 border-dashed border-white/30 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setImagePreview('')}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to select a sample image</p>
                  <button
                    type="button"
                    onClick={handleImageSelect}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Select Sample Image
                  </button>
                </div>
              )}
            </div>
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-2" />
              Item Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., MacBook Pro 13 inch 2021"
              className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-500 text-gray-800"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Price Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Selling Price (₩) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="120000"
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-500 text-gray-800"
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (₩) <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                placeholder="150000"
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-500 text-gray-800"
              />
              {errors.originalPrice && <p className="text-red-500 text-sm mt-1">{errors.originalPrice}</p>}
            </div>
          </div>

          {/* Category and Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-800"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-800"
              >
                {conditions.map(condition => (
                  <option key={condition} value={condition}>{condition}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe your item in detail. Include any defects, accessories included, reason for selling, etc."
              className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-500 text-gray-800 resize-none"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Location *
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-800"
            >
              <option value="">Select location</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>

          {/* Seller Information */}
          <div className="border-t border-white/20 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Seller Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Your Name *
                </label>
                <input
                  type="text"
                  name="sellerName"
                  value={formData.sellerName}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-500 text-gray-800"
                />
                {errors.sellerName && <p className="text-red-500 text-sm mt-1">{errors.sellerName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Star className="w-4 h-4 inline mr-2" />
                  Your Rating
                </label>
                <select
                  name="sellerRating"
                  value={formData.sellerRating}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-800"
                >
                  <option value="5.0">5.0 ⭐⭐⭐⭐⭐</option>
                  <option value="4.9">4.9 ⭐⭐⭐⭐⭐</option>
                  <option value="4.8">4.8 ⭐⭐⭐⭐⭐</option>
                  <option value="4.7">4.7 ⭐⭐⭐⭐⭐</option>
                  <option value="4.6">4.6 ⭐⭐⭐⭐⭐</option>
                  <option value="4.5">4.5 ⭐⭐⭐⭐⭐</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/30 hover:bg-white/50 text-gray-700 rounded-xl transition-colors border border-white/30 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              List Item for Sale
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const Marketplace: React.FC = () => {
  const [showSellModal, setShowSellModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showCommentsModal, setShowCommentsModal] = useState(false)
  const [showLikesModal, setShowLikesModal] = useState(false)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Items')
  const [items, setItems] = useState<MarketplaceItem[]>(mockItems)
  const [message, setMessage] = useState('')
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [buyerInfo, setBuyerInfo] = useState({
    name: '',
    phone: '',
    meetingLocation: '',
    paymentMethod: 'cash'
  })

  const categories = ['All Items', 'Electronics', 'Furniture', 'Books', 'Clothing', 'Sports', 'Others']

  const formatPrice = (price: number) => {
    return `₩${price.toLocaleString()}`
  }

  const isCurrentUserSeller = (item: MarketplaceItem) => {
    return item.seller.userId === 'current-user'
  }

  const handleSellItem = (newItem: Omit<MarketplaceItem, 'id' | 'timeAgo' | 'likes' | 'comments' | 'isLiked' | 'isSaved' | 'isSold' | 'itemComments'>) => {
    const item: MarketplaceItem = {
      ...newItem,
      id: Date.now().toString(),
      timeAgo: 'Just now',
      likes: 0,
      comments: 0,
      isLiked: false,
      isSaved: false,
      isSold: false,
      itemComments: []
    }
    setItems([item, ...items])
    setShowSellModal(false)
  }

  const handleToggleSoldStatus = (itemId: string) => {
    setItems(items.map(item => {
      if (item.id === itemId && isCurrentUserSeller(item)) {
        return {
          ...item,
          isSold: !item.isSold
        }
      }
      return item
    }))
  }

  const handleLike = (itemId: string) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          isLiked: !item.isLiked,
          likes: item.isLiked ? item.likes - 1 : item.likes + 1
        }
      }
      return item
    }))
  }

  const handleSave = (itemId: string) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          isSaved: !item.isSaved
        }
      }
      return item
    }))
  }

  const handleContactSeller = (item: MarketplaceItem) => {
    setSelectedItem(item)
    setShowContactModal(true)
    setMessage(`Hi ${item.seller.name}, I'm interested in your ${item.title}. Is it still available?`)
  }

  const handleBuyNow = (item: MarketplaceItem) => {
    setSelectedItem(item)
    setShowPurchaseModal(true)
    setBuyerInfo({
      name: '',
      phone: '',
      meetingLocation: item.location,
      paymentMethod: 'cash'
    })
  }

  const handleShowComments = (item: MarketplaceItem) => {
    console.log('Opening comments for item:', item.title)
    console.log('Item comments:', item.itemComments)
    setSelectedItem(item)
    setShowCommentsModal(true)
  }

  const handleSendMessage = () => {
    alert(`Message sent to ${selectedItem?.seller.name}!`)
    setShowContactModal(false)
    setMessage('')
    setSelectedItem(null)
  }

  const handleCompletePurchase = () => {
    if (!selectedItem || !buyerInfo.name || !buyerInfo.phone) {
      alert('Please fill in all required fields')
      return
    }

    setItems(items.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          isSold: true
        }
      }
      return item
    }))

    alert(`Purchase request sent to ${selectedItem.seller.name}!\n\nThey will contact you at ${buyerInfo.phone} to arrange the meeting at ${buyerInfo.meetingLocation}.\n\nPayment method: ${buyerInfo.paymentMethod === 'cash' ? 'Cash on delivery' : 'Bank transfer'}`)
    
    setShowPurchaseModal(false)
    setBuyerInfo({ name: '', phone: '', meetingLocation: '', paymentMethod: 'cash' })
    setSelectedItem(null)
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedItem) return

    const comment: Comment = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      message: newComment.trim(),
      timeAgo: 'Just now',
      itemId: selectedItem.id,
      itemTitle: selectedItem.title,
      itemImage: selectedItem.image,
      itemPrice: selectedItem.price,
      replies: []
    }

    setItems(items.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          comments: item.comments + 1,
          itemComments: [comment, ...item.itemComments]
        }
      }
      return item
    }))

    setSelectedItem({
      ...selectedItem,
      comments: selectedItem.comments + 1,
      itemComments: [comment, ...selectedItem.itemComments]
    })

    setNewComment('')
  }

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId)
    setReplyText('')
  }

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim() || !selectedItem) return

    const reply: Reply = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      message: replyText.trim(),
      timeAgo: 'Just now',
      parentCommentId: commentId
    }

    setItems(items.map(item => {
      if (item.id === selectedItem.id) {
        return {
          ...item,
          itemComments: item.itemComments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                replies: [reply, ...(comment.replies || [])]
              }
            }
            return comment
          })
        }
      }
      return item
    }))

    setSelectedItem({
      ...selectedItem,
      itemComments: selectedItem.itemComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [reply, ...(comment.replies || [])]
          }
        }
        return comment
      })
    })

    setReplyText('')
    setReplyingTo(null)
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All Items' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const likedItems = items.filter(item => item.isLiked)

  return (
    <div>
      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">PM</span>
                </div>
                <h1 className="text-xl font-bold text-gray-800">PPMK Marketplace</h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowLikesModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl hover:from-pink-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span className="font-medium">My Likes</span>
                {likedItems.length > 0 && (
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                    {likedItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowSellModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Sell Item</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Marketplace</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Buy and sell items within the Malaysian student community
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-500 text-gray-800"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-800 appearance-none cursor-pointer min-w-[150px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`group relative bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 ${
                item.isSold ? 'opacity-60' : ''
              }`}
            >
              {item.isSold && (
                <div className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center">
                  <div className="bg-gray-800/90 text-white px-6 py-3 rounded-xl font-bold text-lg backdrop-blur-sm border border-gray-600">
                    거래완료
                  </div>
                </div>
              )}
              {item.featured && !item.isSold && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-400 to-yellow-400 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  ⭐ Featured Item
                </div>
              )}
              {!item.isSold && (
                <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-sm font-medium shadow-lg ${
                  item.condition === 'Like New' ? 'bg-green-500 text-white' : 
                  (item.condition === 'Good' ? 'bg-blue-500 text-white' : 
                  'bg-yellow-500 text-white')
                }`}>
                  {item.condition}
                </div>
              )}
              {isCurrentUserSeller(item) && (
                <div className="absolute top-4 left-4 z-30">
                  <button
                    onClick={() => handleToggleSoldStatus(item.id)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium shadow-lg transition-all duration-200 ${
                      item.isSold 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-gray-800 hover:bg-gray-900 text-white'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{item.isSold ? 'Mark Available' : 'Mark as Sold'}</span>
                  </button>
                </div>
              )}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <button 
                    onClick={() => handleLike(item.id)}
                    className={`transition-colors ${
                      item.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    }`}
                    disabled={item.isSold}
                  >
                    <Heart className={`w-5 h-5 ${item.isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(item.price)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(item.originalPrice)}
                    </span>
                  )}
                  <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.timeAgo}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.seller.avatar}
                      alt={item.seller.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {item.seller.name}
                        {isCurrentUserSeller(item) && (
                          <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                            You
                          </span>
                        )}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-500">{item.seller.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-500">
                    <button 
                      onClick={() => handleLike(item.id)}
                      className={`flex items-center space-x-1 transition-colors ${
                        item.isLiked ? 'text-red-500' : 'hover:text-red-500'
                      }`}
                      disabled={item.isSold}
                    >
                      <Heart className={`w-4 h-4 ${item.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm">{item.likes}</span>
                    </button>
                    <button 
                      onClick={() => handleShowComments(item)}
                      className="flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer"
                      title="View Comments"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{item.comments}</span>
                    </button>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  {!isCurrentUserSeller(item) ? (
                    <>
                      <button 
                        onClick={() => handleBuyNow(item)}
                        disabled={item.isSold}
                        className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-xl transition-colors font-medium ${
                          item.isSold 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>{item.isSold ? 'Sold Out' : 'Buy Now'}</span>
                      </button>
                      <button 
                        onClick={() => handleContactSeller(item)}
                        disabled={item.isSold}
                        className={`px-4 py-2 rounded-xl transition-colors font-medium ${
                          item.isSold 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        Chat
                      </button>
                      <button 
                        onClick={() => handleSave(item.id)}
                        className={`px-4 py-2 rounded-xl transition-colors border font-medium ${
                          item.isSaved 
                            ? 'bg-green-500 text-white border-green-500' 
                            : 'bg-white/30 hover:bg-white/50 text-gray-700 border-white/30'
                        }`}
                      >
                        {item.isSaved ? 'Saved' : 'Save'}
                      </button>
                    </>
                  ) : (
                    <div className="flex-1 text-center py-2 px-4 bg-blue-100 text-blue-700 rounded-xl font-medium">
                      Your Item
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      {showSellModal && (
        <SellItemModal
          onClose={() => setShowSellModal(false)}
          onSubmit={handleSellItem}
        />
      )}
      {showPurchaseModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 w-full max-w-md border border-white/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-800">Purchase Item</h3>
              </div>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-3 mb-6 p-3 bg-white/50 rounded-xl">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-sm">{selectedItem.title}</h4>
                <p className="text-lg font-bold text-green-600">{formatPrice(selectedItem.price)}</p>
                <p className="text-xs text-gray-500">Seller: {selectedItem.seller.name}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={buyerInfo.name}
                  onChange={(e) => setBuyerInfo({...buyerInfo, name: e.target.value})}
                  className="w-full px-3 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={buyerInfo.phone}
                  onChange={(e) => setBuyerInfo({...buyerInfo, phone: e.target.value})}
                  className="w-full px-3 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent"
                  placeholder="010-1234-5678"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Location
                </label>
                <input
                  type="text"
                  value={buyerInfo.meetingLocation}
                  onChange={(e) => setBuyerInfo({...buyerInfo, meetingLocation: e.target.value})}
                  className="w-full px-3 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent"
                  placeholder="Preferred meeting location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={buyerInfo.paymentMethod}
                  onChange={(e) => setBuyerInfo({...buyerInfo, paymentMethod: e.target.value})}
                  className="w-full px-3 py-2 bg-white/50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent"
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="transfer">Bank Transfer</option>
                </select>
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Purchase Summary</span>
              </div>
              <div className="text-sm text-green-700">
                <p>• The seller will be notified of your purchase request</p>
                <p>• They will contact you to arrange the meeting</p>
                <p>• Payment will be made during the meetup</p>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1 px-4 py-2 bg-white/30 hover:bg-white/50 text-gray-700 rounded-xl transition-colors border border-white/30"
              >
                Cancel
              </button>
              <button
                onClick={handleCompletePurchase}
                disabled={!buyerInfo.name || !buyerInfo.phone}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Confirm Purchase</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {showLikesModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] border border-white/30 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
                <h3 className="text-2xl font-semibold text-gray-800">
                  My Liked Items ({likedItems.length})
                </h3>
              </div>
              <button
                onClick={() => setShowLikesModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {likedItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {likedItems.map((item) => (
                    <div
                      key={item.id}
                      className={`bg-white/30 backdrop-blur-sm border border-white/30 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 ${
                        item.isSold ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex relative">
                        {item.isSold && (
                          <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                            <div className="bg-gray-800/90 text-white px-4 py-2 rounded-lg font-bold text-sm backdrop-blur-sm">
                              거래완료
                            </div>
                          </div>
                        )}
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">
                              {item.title}
                            </h4>
                            <button 
                              onClick={() => handleLike(item.id)}
                              className="text-red-500 hover:text-red-600 transition-colors"
                              disabled={item.isSold}
                            >
                              <Heart className="w-4 h-4 fill-current" />
                            </button>
                          </div>
                          <p className="text-lg font-bold text-blue-600 mb-2">
                            {formatPrice(item.price)}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{item.location}</span>
                            </div>
                            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                              {item.category}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            {!isCurrentUserSeller(item) ? (
                              <>
                                <button 
                                  onClick={() => {
                                    if (!item.isSold) {
                                      handleBuyNow(item)
                                      setShowLikesModal(false)
                                    }
                                  }}
                                  disabled={item.isSold}
                                  className={`flex-1 py-1.5 px-3 rounded-lg transition-colors text-sm font-medium ${
                                    item.isSold 
                                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                      : 'bg-green-500 hover:bg-green-600 text-white'
                                  }`}
                                >
                                  {item.isSold ? 'Sold' : 'Buy'}
                                </button>
                                <button 
                                  onClick={() => handleSave(item.id)}
                                  className={`px-3 py-1.5 rounded-lg transition-colors text-sm font-medium ${
                                    item.isSaved 
                                      ? 'bg-green-500 text-white' 
                                      : 'bg-white/50 hover:bg-white/70 text-gray-700'
                                  }`}
                                >
                                  {item.isSaved ? 'Saved' : 'Save'}
                                </button>
                              </>
                            ) : (
                              <div className="flex-1 text-center py-1.5 px-3 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                                Your Item
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-red-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">No liked items yet</h4>
                  <p className="text-gray-600">Start liking items to see them here!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {showContactModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 w-full max-w-md border border-white/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Contact Seller</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-3 mb-4 p-3 bg-white/50 rounded-xl">
              <img
                src={selectedItem.seller.avatar}
                alt={selectedItem.seller.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-800">{selectedItem.seller.name}</p>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-500">{selectedItem.seller.rating}</span>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Item: {selectedItem.title}</p>
              <p className="text-lg font-semibold text-blue-600">{formatPrice(selectedItem.price)}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full p-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
                placeholder="Type your message here..."
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 px-4 py-2 bg-white/30 hover:bg-white/50 text-gray-700 rounded-xl transition-colors border border-white/30"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {showCommentsModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Comments ({selectedItem.itemComments?.length || 0})
              </h3>
              <button
                onClick={() => {
                  setShowCommentsModal(false)
                  setReplyingTo(null)
                  setReplyText('')
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 border-b border-gray-200">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium text-gray-900">{selectedItem.title}</p>
                <p className="text-sm text-blue-600 font-semibold">{formatPrice(selectedItem.price)}</p>
                {selectedItem.isSold && (
                  <span className="inline-block mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded-full">
                    거래완료
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              {selectedItem.itemComments && selectedItem.itemComments.length > 0 ? (
                selectedItem.itemComments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex space-x-3">
                      <img
                        src={comment.userAvatar}
                        alt={comment.userName}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-2xl px-3 py-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className={`font-semibold text-sm ${
                              comment.userId === 'current-user' ? 'text-blue-600' : 'text-gray-900'
                            }`}>
                              {comment.userName}
                            </p>
                            {comment.userId === 'current-user' && (
                              <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                                You
                              </span>
                            )}
                          </div>
                          <p className="text-gray-800 text-sm">{comment.message}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 ml-3">
                          <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                          <button 
                            onClick={() => handleReply(comment.id)}
                            className="text-xs text-gray-500 hover:text-blue-600 font-medium"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-11 space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex space-x-3">
                            <img
                              src={reply.userAvatar}
                              alt={reply.userName}
                              className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="bg-gray-100 rounded-2xl px-3 py-2">
                                <div className="flex items-center space-x-2 mb-1">
                                  <p className={`font-semibold text-xs ${
                                    reply.userId === 'current-user' ? 'text-blue-600' : 'text-gray-900'
                                  }`}>
                                    {reply.userName}
                                  </p>
                                  {reply.userId === 'current-user' && (
                                    <span className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded-full text-[10px]">
                                      You
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-800 text-xs">{reply.message}</p>
                              </div>
                              <div className="flex items-center space-x-3 mt-1 ml-3">
                                <span className="text-xs text-gray-500">{reply.timeAgo}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {replyingTo === comment.id && (
                      <div className="ml-11 flex space-x-2">
                        <img
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                          alt="You"
                          className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 flex items-end space-x-2">
                          <div className="flex-1 bg-gray-100 rounded-2xl px-3 py-2 min-h-[32px] flex items-center">
                            <input
                              type="text"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="w-full bg-transparent border-none outline-none text-xs placeholder-gray-500"
                              placeholder="Write a reply..."
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault()
                                  handleAddReply(comment.id)
                                }
                              }}
                              autoFocus
                            />
                          </div>
                          <button
                            onClick={() => handleAddReply(comment.id)}
                            disabled={!replyText.trim()}
                            className="p-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                          >
                            <Send className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => {
                              setReplyingTo(null)
                              setReplyText('')
                            }}
                            className="p-1.5 bg-gray-300 hover:bg-gray-400 text-gray-600 rounded-full transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
            <div className="border-t border-gray-200 p-4 bg-white">
              <div className="flex space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  alt="You"
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 flex items-end space-x-2">
                  <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 min-h-[40px] flex items-center">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-sm placeholder-gray-500"
                      placeholder="Write a comment..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          handleAddComment()
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="p-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Marketplace
