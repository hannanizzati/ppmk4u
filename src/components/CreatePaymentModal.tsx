import React, { useState } from 'react'
import { X, CreditCard, User, Calendar, DollarSign, Building, MessageCircle, Tag, Check, Search, Users } from 'lucide-react'

interface CreatePaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (paymentData: any) => void
}

const CreatePaymentModal: React.FC<CreatePaymentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    members: [] as string[],
    item: '',
    amount: '',
    dueDate: '',
    type: 'membership',
    bankAccount: '',
    kakaoId: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const availableMembers = [
    'Ahmad Rahman',
    'Siti Nurhaliza', 
    'Muhammad Faiz',
    'Nurul Aina',
    'Zulkifli Hassan',
    'Aminah Binti Ali',
    'Hannan Abdullah',
    'Fatimah Zahra',
    'Omar Hassan',
    'Khadijah Mohd'
  ]

  const filteredMembers = availableMembers.filter(member =>
    member.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.members.length === 0) {
      alert('Please select at least one member')
      return
    }
    
    const paymentData = {
      ...formData,
      amount: parseInt(formData.amount),
      dueDate: formData.dueDate
    }
    
    onSubmit(paymentData)
    
    // Reset form
    setFormData({
      members: [],
      item: '',
      amount: '',
      dueDate: '',
      type: 'membership',
      bankAccount: '',
      kakaoId: ''
    })
    setSearchTerm('')
    
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const toggleMember = (member: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.includes(member)
        ? prev.members.filter(m => m !== member)
        : [...prev.members, member]
    }))
  }

  const selectAllMembers = () => {
    setFormData(prev => ({
      ...prev,
      members: availableMembers
    }))
    setIsDropdownOpen(false)
    setSearchTerm('')
  }

  const clearAllMembers = () => {
    setFormData(prev => ({
      ...prev,
      members: []
    }))
  }

  const removeMember = (memberToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter(m => m !== memberToRemove)
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 w-full max-w-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <CreditCard className="w-6 h-6" />
            <span>Request Payment</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-200"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Member Selection with Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Select Members ({formData.members.length} selected)</span>
            </label>
            
            {/* Search Input */}
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  placeholder="Search members or select all..."
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                />
              </div>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-xl border border-white/30 rounded-xl shadow-2xl z-10 max-h-64 overflow-y-auto">
                  {/* Select All Option */}
                  <button
                    type="button"
                    onClick={selectAllMembers}
                    className="w-full p-3 text-left hover:bg-white/50 transition-all duration-200 flex items-center space-x-3 border-b border-white/20"
                  >
                    <div className="w-5 h-5 rounded border-2 border-blue-500 bg-blue-500 flex items-center justify-center">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                    <div>
                      <span className="font-medium text-blue-600">Select All Members</span>
                      <p className="text-xs text-gray-600">Add all {availableMembers.length} members to payment request</p>
                    </div>
                  </button>

                  {/* Individual Members */}
                  {filteredMembers.map((member) => (
                    <button
                      key={member}
                      type="button"
                      onClick={() => toggleMember(member)}
                      className="w-full p-3 text-left hover:bg-white/50 transition-all duration-200 flex items-center space-x-3"
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        formData.members.includes(member)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-400'
                      }`}>
                        {formData.members.includes(member) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="font-medium text-gray-700">{member}</span>
                        <p className="text-xs text-gray-500">Community Member</p>
                      </div>
                    </button>
                  ))}

                  {filteredMembers.length === 0 && searchTerm && (
                    <div className="p-4 text-center text-gray-500">
                      <p>No members found matching "{searchTerm}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Close dropdown when clicking outside */}
            {isDropdownOpen && (
              <div 
                className="fixed inset-0 z-0" 
                onClick={() => setIsDropdownOpen(false)}
              />
            )}

            {/* Selected Members Tags */}
            {formData.members.length > 0 && (
              <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">
                    Selected Members ({formData.members.length})
                  </p>
                  <button
                    type="button"
                    onClick={clearAllMembers}
                    className="text-xs text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.members.map((member) => (
                    <span
                      key={member}
                      className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/80 text-white text-sm rounded-full"
                    >
                      <span>{member}</span>
                      <button
                        type="button"
                        onClick={() => removeMember(member)}
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payment Item */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>Payment Item</span>
              </label>
              <input
                type="text"
                name="item"
                value={formData.item}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                placeholder="e.g., Annual Membership Fee"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <DollarSign className="w-4 h-4" />
                <span>Amount (₩)</span>
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                placeholder="Enter amount"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Due Date</span>
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              />
            </div>

            {/* Payment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              >
                <option value="membership">Membership</option>
                <option value="event">Event</option>
                <option value="materials">Materials</option>
                <option value="program">Program</option>
                <option value="workshop">Workshop</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* KakaoTalk ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>KakaoTalk ID</span>
              </label>
              <input
                type="text"
                name="kakaoId"
                value={formData.kakaoId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                placeholder="Enter KakaoTalk ID"
              />
            </div>

            {/* Bank Account */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>Bank Account Details</span>
              </label>
              <input
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                placeholder="e.g., KB Kookmin Bank - 1234-56-789012"
              />
            </div>
          </div>

          {/* Payment Summary */}
          {formData.members.length > 0 && formData.amount && (
            <div className="p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Payment Request Summary
              </p>
              <div className="space-y-1 text-sm text-gray-600">
                <p>• {formData.members.length} payment request{formData.members.length > 1 ? 's' : ''} will be created</p>
                <p>• Total amount: ₩{(parseInt(formData.amount || '0') * formData.members.length).toLocaleString()}</p>
                <p>• Individual amount: ₩{parseInt(formData.amount || '0').toLocaleString()} per member</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 rounded-xl hover:bg-white/30 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 font-medium"
            >
              Create Payment Request{formData.members.length > 1 ? 's' : ''}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePaymentModal
