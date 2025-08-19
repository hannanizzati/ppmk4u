import React, { useState } from 'react'
import { CreditCard, Clock, CheckCircle, AlertTriangle, Filter, Calendar, User, ArrowLeft, Building, MessageCircle, Upload, Plus, Receipt, X, Send } from 'lucide-react'
import CreatePaymentModal from './CreatePaymentModal'

const Payments = () => {
  const [filter, setFilter] = useState('all')
  const [selectedMember, setSelectedMember] = useState<number | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [showReceiptUpload, setShowReceiptUpload] = useState(false)
  const [payments, setPayments] = useState([
    {
      id: 1,
      member: 'Ahmad Rahman',
      item: 'PPMK Annual Fee',
      amount: 40000,
      dueDate: '2024-12-15',
      status: 'paid',
      type: 'membership',
      bankAccount: 'KB Kookmin Bank - 1234-56-789012',
      kakaoId: 'ahmad_rahman_my',
      paidDate: '2024-12-14',
      receipt: 'receipt_annual_fee.pdf'
    },
    {
      id: 2,
      member: 'Siti Nurhaliza',
      item: 'Event Registration - Cultural Night',
      amount: 40000,
      dueDate: '2024-12-10',
      status: 'received',
      type: 'event',
      paidDate: '2024-12-08',
      bankAccount: 'Shinhan Bank - 9876-54-321098',
      kakaoId: 'cik_ct'
    },
    {
      id: 3,
      member: 'Muhammad Faiz',
      item: 'Study Group Materials',
      amount: 5000,
      dueDate: '2024-12-05',
      status: 'overdue',
      type: 'materials',
      bankAccount: 'Woori Bank - 5555-66-777888',
      kakaoId: 'faiz_chan'
    },
    {
      id: 4,
      member: 'Nurul Aina',
      item: 'Language Exchange Program',
      amount: 10000,
      dueDate: '2024-12-20',
      status: 'to be paid',
      type: 'program',
      bankAccount: 'Hana Bank - 1111-22-333444',
      kakaoId: 'nurul_aina_my'
    },
    {
      id: 5,
      member: 'Zulkifli Hassan',
      item: 'Badminton Club Membership',
      amount: 15000,
      dueDate: '2024-12-25',
      status: 'to be received',
      type: 'membership',
      paidDate: '2024-12-01',
      bankAccount: 'KB Kookmin Bank - 7777-88-999000',
      kakaoId: 'zulkifli_hassan'
    },
    {
      id: 6,
      member: 'Aminah Binti Ali',
      item: 'Workshop Fee - Korean Language',
      amount: 25000,
      dueDate: '2024-12-18',
      status: 'to be received',
      type: 'workshop',
      bankAccount: 'Hana Bank - 2222-33-444555',
      kakaoId: 'aminah_ali_my'
    }
  ])

  const handleCreatePayment = (paymentData: any) => {
    const newPayments = paymentData.members.map((member: string, index: number) => ({
      ...paymentData,
      id: payments.length + index + 1,
      member: member,
      status: 'to be received'
    }))
    setPayments(prev => [...prev, ...newPayments])
  }

  const handleMarkAsPaid = (paymentId: number) => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId 
        ? { 
            ...payment, 
            status: 'paid', 
            paidDate: new Date().toISOString().split('T')[0],
            receipt: 'receipt.pdf'
          }
        : payment
    ))
    setShowReceiptUpload(false)
  }

  const handleMarkAsReceived = (paymentId: number) => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId 
        ? { 
            ...payment, 
            status: 'received', 
            paidDate: new Date().toISOString().split('T')[0]
          }
        : payment
    ))
  }

  const handleCancelPayment = (paymentId: number) => {
    setPayments(prev => prev.filter(payment => payment.id !== paymentId))
    setSelectedMember(null)
  }

  const filteredPayments = payments
    .filter(payment => {
      if (filter === 'all') return true
      if (filter === 'to be paid') return payment.status === 'to be paid' || payment.status === 'overdue'
      if (filter === 'paid') return payment.status === 'paid'
      if (filter === 'to be received') return payment.status === 'to be received'
      if (filter === 'received') return payment.status === 'received'
      return true
    })
    .sort((a, b) => {
      // Define status priority: overdue > to be paid > to be received > paid > received
      const statusPriority = { 
        overdue: 1, 
        'to be paid': 2, 
        'to be received': 3, 
        paid: 4, 
        received: 5 
      }
      
      // Compare by status priority first
      if (statusPriority[a.status as keyof typeof statusPriority] !== statusPriority[b.status as keyof typeof statusPriority]) {
        return statusPriority[a.status as keyof typeof statusPriority] - statusPriority[b.status as keyof typeof statusPriority]
      }
      
      // For overdue, to be paid, and to be received, sort by dueDate (oldest to latest)
      if (a.status === 'overdue' || a.status === 'to be paid' || a.status === 'to be received') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }
      
      // For paid and received, sort by paidDate (latest to oldest)
      if ((a.status === 'paid' || a.status === 'received') && a.paidDate && b.paidDate) {
        return new Date(b.paidDate).getTime() - new Date(a.paidDate).getTime()
      }
      
      return 0
    })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'received':
        return <Receipt className="w-5 h-5 text-blue-500" />
      case 'to be paid':
        return <Clock className="w-5 h-5 text-orange-500" />
      case 'to be received':
        return <Upload className="w-5 h-5 text-yellow-500" />
      case 'overdue':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border"
    switch (status) {
      case 'paid':
        return `${baseClasses} bg-green-500/80 text-white border-white/30`
      case 'received':
        return `${baseClasses} bg-blue-500/80 text-white border-white/30`
      case 'to be paid':
        return `${baseClasses} bg-orange-500/80 text-white border-white/30`
      case 'to be received':
        return `${baseClasses} bg-yellow-500/80 text-white border-white/30`
      case 'overdue':
        return `${baseClasses} bg-red-500/80 text-white border-white/30`
      default:
        return `${baseClasses} bg-gray-500/80 text-white border-white/30`
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'to be paid':
        return 'To Be Paid'
      case 'to be received':
        return 'To Be Received'
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'paid' || status === 'received') return false
    const due = new Date(dueDate)
    const today = new Date()
    return due < today
  }

  const formatCurrency = (amount: number) => {
    return `₩${amount.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR')
  }

  const getDirectionLabel = (status: string, member: string) => {
    if (status === 'to be received' || status === 'received') {
      return `from: ${member}`
    } else {
      return `to: ${member}`
    }
  }

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0)
  const totalReceived = payments.filter(p => p.status === 'received').reduce((sum, p) => sum + p.amount, 0)
  const totalToBePaid = payments.filter(p => p.status === 'to be paid' || p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0)
  const totalToBeReceived = payments.filter(p => p.status === 'to be received').reduce((sum, p) => sum + p.amount, 0)
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0)

  const selectedPayment = selectedMember ? payments.find(p => p.id === selectedMember) : null

  if (selectedPayment) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSelectedMember(null)}
              className="p-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h2 className="text-3xl font-bold text-gray-800">Payment Details</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Member Information */}
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Member Information</span>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-medium">
                    {selectedPayment.member.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">{selectedPayment.member}</h4>
                  <p className="text-gray-600">Community Member</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/20">
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Bank Account</p>
                    <p className="font-medium text-gray-800">{selectedPayment.bankAccount}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">KakaoTalk ID</p>
                    <p className="font-medium text-gray-800">{selectedPayment.kakaoId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Payment Information</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Item</p>
                <p className="text-lg font-semibold text-gray-800">{selectedPayment.item}</p>
                <p className="text-sm text-gray-600 capitalize">{selectedPayment.type}</p>
                <p className="text-xs text-gray-500 mt-1">{getDirectionLabel(selectedPayment.status, selectedPayment.member)}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(selectedPayment.amount)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className={`font-medium ${isOverdue(selectedPayment.dueDate, selectedPayment.status) ? 'text-red-600' : 'text-gray-800'}`}>
                    {formatDate(selectedPayment.dueDate)}
                  </p>
                </div>
                
                {selectedPayment.paidDate && (
                  <div>
                    <p className="text-sm text-gray-600">Paid Date</p>
                    <p className="font-medium text-green-600">{formatDate(selectedPayment.paidDate)}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Status</p>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedPayment.status)}
                  <span className={getStatusBadge(selectedPayment.status)}>
                    {getStatusText(selectedPayment.status)}
                  </span>
                </div>
              </div>

              {selectedPayment.receipt && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Receipt</p>
                  <div className="flex items-center space-x-2 p-3 bg-white/10 rounded-lg">
                    <Receipt className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{selectedPayment.receipt}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/20 space-y-3">
                {(selectedPayment.status === 'overdue' || selectedPayment.status === 'to be paid') && (
                  <>
                    {!showReceiptUpload ? (
                      <button 
                        onClick={() => setShowReceiptUpload(true)}
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Mark as Paid</span>
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <div className="p-4 bg-white/10 rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">Upload Receipt (PDF)</p>
                          <div className="flex items-center space-x-2 p-3 bg-white/10 rounded-lg border-2 border-dashed border-white/30">
                            <Upload className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">receipt.pdf</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleMarkAsPaid(selectedPayment.id)}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium"
                          >
                            Confirm Upload
                          </button>
                          <button 
                            onClick={() => setShowReceiptUpload(false)}
                            className="px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 text-gray-700 rounded-xl hover:bg-white/30 transition-all duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {selectedPayment.status === 'to be received' && (
                  <>
                    <button 
                      onClick={() => handleMarkAsReceived(selectedPayment.id)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium"
                    >
                      Mark as Received
                    </button>
                    <button 
                      onClick={() => handleCancelPayment(selectedPayment.id)}
                      className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel Payment</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Payment Management</h1>
            <p className="text-gray-600">Track and manage community payment requests</p>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Request Payment</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Paid</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(totalPaid)}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-green-500" />
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Received</p>
              <p className="text-xl font-bold text-blue-600">{formatCurrency(totalReceived)}</p>
            </div>
            <Receipt className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">To Be Paid</p>
              <p className="text-xl font-bold text-orange-600">{formatCurrency(totalToBePaid)}</p>
            </div>
            <Clock className="w-6 h-6 text-orange-500" />
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">To Be Received</p>
              <p className="text-xl font-bold text-yellow-600">{formatCurrency(totalToBeReceived)}</p>
            </div>
            <Upload className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Overdue</p>
              <p className="text-xl font-bold text-red-600">{formatCurrency(totalOverdue)}</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white/15 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'to be paid', label: 'To Be Paid' },
              { key: 'to be received', label: 'To Be Received' },
              { key: 'paid', label: 'Paid' },
              { key: 'received', label: 'Received' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  filter === key
                    ? 'bg-blue-500/80 text-white backdrop-blur-sm'
                    : 'bg-white/20 text-gray-700 hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10 border-b border-white/20">
              <tr>
                <th className="px-6 py-4 text-left text-lg font-semibold text-gray-700">Item Name</th>
                <th className="px-6 py-4 text-left text-lg font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-4 text-left text-lg font-semibold text-gray-700">Due Date</th>
                <th className="px-6 py-4 text-left text-lg font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-white/10 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div>
                        <button 
                          onClick={() => setSelectedMember(payment.id)}
                          className="text-left hover:text-blue-600 transition-colors duration-200"
                        >
                          <p className="text-gray-700 font-medium hover:underline">{payment.item}</p>
                        </button>
                        <p className="text-gray-500 text-xs capitalize">{payment.type}</p>
                        <p className="text-gray-600 text-sm">{getDirectionLabel(payment.status, payment.member)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700 font-semibold">{formatCurrency(payment.amount)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className={`text-sm ${isOverdue(payment.dueDate, payment.status) ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                        {formatDate(payment.dueDate)}
                      </span>
                    </div>
                    {payment.status === 'overdue' && (
                      <p className="text-xs text-red-600 mt-1">Overdue</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payment.status)}
                      <span className={getStatusBadge(payment.status)}>
                        {getStatusText(payment.status)}
                      </span>
                    </div>
                    {payment.paidDate && (
                      <p className="text-xs text-gray-600 mt-1">Date: {formatDate(payment.paidDate)}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Payment Modal */}
      <CreatePaymentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePayment}
      />
    </div>
  )
}

export default Payments
