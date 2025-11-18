
// export type GroupCategory = 'Stokfella' | 'Micro-Loan' | 'Workers-Union';

// export type PaymentAccountType = 'MoMo' | 'BuildingSociety' | 'InstaCash' | 'Unayo' | 'Delta Pay' | 'Bank';

export const mockGroups = [
  {
    id: '1',
    name: 'Ezulwini Stokfellas',
    type: 'stokfellas',
    description: 'Community savings group for groceries and essentials',
    created_by: 'user1',
    admin_id: 'user1',
    total_members: 8,
    status: 'active',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-11-06T08:30:00Z',
  },
  {
    id: '2',
    name: 'Mbabane Micro Loans',
    type: 'micro-loan',
    description: 'Small business loans for entrepreneurs',
    created_by: 'user2',
    admin_id: 'user2',
    total_members: 12,
    status: 'active',
    created_at: '2024-02-20T14:22:00Z',
    updated_at: '2024-11-05T09:15:00Z',
  },
  {
    id: '3',
    name: 'Teachers Union',
    type: 'workers-union',
    description: 'Teachers welfare and savings scheme',
    created_by: 'user3',
    admin_id: 'user3',
    total_members: 15,
    status: 'active',
    created_at: '2024-03-10T11:45:00Z',
    updated_at: '2024-11-04T16:20:00Z',
  },
];

export const mockTransactions = [
  {
    id: 't1',
    group_id: '1',
    user_id: 'currentUser',
    type: 'deposit',
    amount: 500,
    description: 'Monthly savings contribution',
    payment_method: 'MoMo',
    transaction_proof_url: '',
    status: 'completed',
    created_at: '2024-11-01T09:00:00Z',
    updated_at: '2024-11-01T09:05:00Z',
  },
  {
    id: 't2',
    group_id: '1',
    user_id: 'currentUser',
    type: 'withdrawal',
    amount: 1200,
    description: 'Grocery shopping round',
    payment_method: 'Bank',
    transaction_proof_url: '',
    status: 'completed',
    created_at: '2024-10-28T14:30:00Z',
    updated_at: '2024-10-28T14:35:00Z',
  },
  {
    id: 't3',
    group_id: '2',
    user_id: 'currentUser',
    type: 'loan',
    amount: 3000,
    description: 'Business startup capital',
    payment_method: 'Bank',
    transaction_proof_url: '',
    status: 'completed',
    created_at: '2024-10-15T10:15:00Z',
    updated_at: '2024-10-15T10:20:00Z',
  },
  {
    id: 't4',
    group_id: '1',
    user_id: 'currentUser',
    type: 'interest',
    amount: 75,
    description: 'Interest earned on savings',
    payment_method: 'Bank',
    transaction_proof_url: '',
    status: 'completed',
    created_at: '2024-10-30T08:00:00Z',
    updated_at: '2024-10-30T08:05:00Z',
  },
];

export const mockMemberAccounts = [
  {
    id: 'ma1',
    group_id: '1',
    user_id: 'currentUser',
    total_contributed: 2500,
    total_borrowed: 0,
    current_balance: 2575,
    interest_accumulated: 75,
    last_updated: '2024-11-06T08:00:00Z',
  },
  {
    id: 'ma2',
    group_id: '2',
    user_id: 'currentUser',
    total_contributed: 1500,
    total_borrowed: 3000,
    current_balance: -1500,
    interest_accumulated: 300,
    last_updated: '2024-11-06T08:00:00Z',
  },
  {
    id: 'ma3',
    group_id: '3',
    user_id: 'currentUser',
    total_contributed: 3000,
    total_borrowed: 0,
    current_balance: 3150,
    interest_accumulated: 150,
    last_updated: '2024-11-06T08:00:00Z',
  },
];

export const mockLoans = [
  {
    id: 'l1',
    group_id: '2',
    user_id: 'currentUser',
    amount_requested: 3000,
    amount_approved: 3000,
    interest_rate: 10,
    status: 'disbursed',
    requested_at: '2024-10-10T09:00:00Z',
    approved_at: '2024-10-12T10:30:00Z',
    due_date: '2024-11-15T23:59:59Z',
    repaid_at: null,
  },
  {
    id: 'l2',
    group_id: '2',
    user_id: 'currentUser',
    amount_requested: 2000,
    amount_approved: 0,
    interest_rate: 0,
    status: 'pending',
    requested_at: '2024-11-01T14:00:00Z',
    approved_at: null,
    due_date: null,
    repaid_at: null,
  },
];

export const mockGroupSettings = [
  {
    id: 'gs1',
    group_id: '1',
    payment_methods: ['MoMo', 'Bank', 'BuildingSociety'],
    subscription_frequency: 'monthly',
    subscription_amount: 500,
    interest_rate: 3,
    min_loan_amount: 1000,
    max_loan_amount: 50000,
    loan_term_days: 30,
  },
  {
    id: 'gs2',
    group_id: '2',
    payment_methods: ['Bank', 'MoMo', 'Unayo'],
    subscription_frequency: 'monthly',
    subscription_amount: 1000,
    interest_rate: 10,
    min_loan_amount: 2000,
    max_loan_amount: 100000,
    loan_term_days: 60,
  },
  {
    id: 'gs3',
    group_id: '3',
    payment_methods: ['Bank', 'DeltaPay'],
    subscription_frequency: 'monthly',
    subscription_amount: 800,
    interest_rate: 5,
    min_loan_amount: 1500,
    max_loan_amount: 75000,
    loan_term_days: 45,
  },
];

// for worker union
export const mockUser = {
  id: '1',
  name: 'Thabo Dlamini',
  email: 'thabo.dlamini@email.sz',
  phone: '+268 7612 3456',
  membershipId: 'WU-2021-0456',
  joinDate: '2021-03-15',
  occupation: 'Factory Worker',
  branch: 'Matsapha Branch',
  avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
};

export const mockAnnouncements = [
  {
    id: '1',
    title: 'Monthly Meeting Scheduled',
    message: 'General assembly meeting scheduled for 25th November at the union hall.',
    type: 'info',
    date: '2025-11-15',
    isRead: false,
  },
  {
    id: '2',
    title: 'Subscription Payment Due',
    message: 'Your monthly subscription of E150 is due by 20th November.',
    type: 'warning',
    date: '2025-11-10',
    isRead: false,
  },
  {
    id: '3',
    title: 'New Health Benefits Available',
    message: 'Check out the new health insurance packages available to all members.',
    type: 'success',
    date: '2025-11-05',
    isRead: true,
  },
];

export const mockSubscriptions = [
  {
    id: '1',
    amount: 150,
    date: '2025-10-15',
    status: 'paid',
    period: 'October 2025',
    paymentMethod: 'MTN MoMo',
  },
  {
    id: '2',
    amount: 150,
    date: '2025-09-15',
    status: 'paid',
    period: 'September 2025',
    paymentMethod: 'MTN MoMo',
  },
  {
    id: '3',
    amount: 150,
    date: '2025-08-15',
    status: 'paid',
    period: 'August 2025',
    paymentMethod: 'MTN MoMo',
  },
  {
    id: '4',
    amount: 150,
    date: '2025-11-15',
    status: 'pending',
    period: 'November 2025',
    paymentMethod: 'MTN MoMo',
  },
];

export const mockEvents = [
  {
    id: '1',
    title: 'General Assembly Meeting',
    description: 'Monthly meeting to discuss union matters and member concerns.',
    date: '2025-11-25',
    time: '14:00',
    location: 'Union Hall, Matsapha',
    type: 'meeting',
    attendees: 45,
  },
  {
    id: '2',
    title: 'Workers Rights Training',
    description: 'Educational workshop on workers rights and labor laws in Eswatini.',
    date: '2025-12-02',
    time: '09:00',
    location: 'Training Center, Mbabane',
    type: 'training',
    attendees: 30,
  },
  {
    id: '3',
    title: 'Annual Union Conference',
    description: 'Yearly conference bringing together all branches nationwide.',
    date: '2025-12-15',
    time: '08:00',
    location: 'Mavuso Trade Centre',
    type: 'conference',
    attendees: 200,
  },
  {
    id: '4',
    title: 'End of Year Social',
    description: 'Celebrate the year with fellow union members and families.',
    date: '2025-12-20',
    time: '17:00',
    location: 'Royal Swazi Convention Centre',
    type: 'social',
  },
];

export const mockPosts = [
  {
    id: '1',
    authorName: 'Sipho Nkosi',
    authorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    title: 'Thoughts on Recent Wage Negotiations',
    content: 'I believe we need to push harder for better working conditions alongside wage increases. What are your thoughts?',
    date: '2025-11-16',
    likes: 23,
    isLiked: false,
    comments: [
      {
        id: '1',
        authorName: 'Nomsa Zwane',
        content: 'I completely agree. Health and safety should be our priority.',
        date: '2025-11-16',
      },
      {
        id: '2',
        authorName: 'Mandla Simelane',
        content: 'Well said! We should bring this up at the next meeting.',
        date: '2025-11-17',
      },
    ],
  },
  {
    id: '2',
    authorName: 'Thandiwe Masuku',
    authorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    title: 'Thank You for the Training Session',
    content: 'The workers rights training last week was incredibly informative. Thank you to the organizers!',
    date: '2025-11-14',
    likes: 45,
    isLiked: true,
    comments: [
      {
        id: '3',
        authorName: 'Bongani Dube',
        content: 'It was indeed very helpful. Looking forward to more sessions.',
        date: '2025-11-14',
      },
    ],
  },
];

export const mockBenefits = [
  {
    id: '1',
    title: 'Health Insurance',
    description: 'Comprehensive medical coverage for you and your immediate family.',
    icon: 'heart',
    category: 'health',
  },
  {
    id: '2',
    title: 'Legal Assistance',
    description: 'Free legal consultation and representation for work-related matters.',
    icon: 'scale',
    category: 'legal',
  },
  {
    id: '3',
    title: 'Education Fund',
    description: 'Financial support for members children education expenses.',
    icon: 'book',
    category: 'education',
  },
  {
    id: '4',
    title: 'Emergency Loans',
    description: 'Quick access to emergency loans with favorable interest rates.',
    icon: 'wallet',
    category: 'financial',
  },
  {
    id: '5',
    title: 'Funeral Cover',
    description: 'Funeral assistance for members and immediate family members.',
    icon: 'flower',
    category: 'other',
  },
  {
    id: '6',
    title: 'Retirement Planning',
    description: 'Guidance and support for retirement savings and planning.',
    icon: 'piggy-bank',
    category: 'financial',
  },
];

export const mockFinanceSummary = {
  balance: 2450,
  savings: 3200,
  pendingPayments: 150,
  totalContributions: 5800,
};

export const mockApplications = [
  {
    id: '1',
    type: 'loan',
    title: 'Emergency Loan Application',
    status: 'pending',
    date: '2025-11-10',
  },
  {
    id: '2',
    type: 'education',
    title: 'Education Fund Request',
    status: 'approved',
    date: '2025-10-20',
  },
  {
    id: '3',
    type: 'leave',
    title: 'Extended Leave Request',
    status: 'approved',
    date: '2025-09-15',
  },
];

