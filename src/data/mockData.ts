export interface Quote {
  id: string;
  clientName: string;
  projectName: string;
  lastFollowUp: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cold';
  projectType: string;
  amount: number;
}

export interface Meeting {
  id: string;
  dateTime: string;
  quoteId: string;
  contactPerson: string;
  location: string;
}

export const mockQuotes: Quote[] = [
  {
    id: 'Q-2025-001',
    clientName: 'Acme Corporation',
    projectName: 'Website Redesign',
    lastFollowUp: '2025-09-28',
    status: 'in-progress',
    projectType: 'Web Development',
    amount: 45000
  },
  {
    id: 'Q-2025-002',
    clientName: 'TechStart Inc',
    projectName: 'Mobile App Development',
    lastFollowUp: '2025-09-30',
    status: 'pending',
    projectType: 'Mobile Development',
    amount: 78000
  },
  {
    id: 'Q-2025-003',
    clientName: 'Global Solutions',
    projectName: 'E-commerce Platform',
    lastFollowUp: '2025-08-15',
    status: 'cold',
    projectType: 'Web Development',
    amount: 125000
  },
  {
    id: 'Q-2025-004',
    clientName: 'Innovation Labs',
    projectName: 'Data Analytics Dashboard',
    lastFollowUp: '2025-10-01',
    status: 'in-progress',
    projectType: 'Data Analytics',
    amount: 62000
  },
  {
    id: 'Q-2025-005',
    clientName: 'Marketing Pro',
    projectName: 'CRM Integration',
    lastFollowUp: '2025-07-20',
    status: 'cold',
    projectType: 'Integration',
    amount: 34000
  },
  {
    id: 'Q-2025-006',
    clientName: 'Finance Plus',
    projectName: 'Banking Portal',
    lastFollowUp: '2025-09-25',
    status: 'pending',
    projectType: 'Web Development',
    amount: 95000
  },
  {
    id: 'Q-2025-007',
    clientName: 'HealthCare Systems',
    projectName: 'Patient Management System',
    lastFollowUp: '2025-10-02',
    status: 'in-progress',
    projectType: 'Healthcare',
    amount: 110000
  },
  {
    id: 'Q-2025-008',
    clientName: 'EduTech Solutions',
    projectName: 'Learning Management Platform',
    lastFollowUp: '2025-08-01',
    status: 'cold',
    projectType: 'Education',
    amount: 72000
  },
  {
    id: 'Q-2025-009',
    clientName: 'RetailMax',
    projectName: 'Inventory Management',
    lastFollowUp: '2025-09-29',
    status: 'pending',
    projectType: 'Retail',
    amount: 48000
  },
  {
    id: 'Q-2025-010',
    clientName: 'CloudNet Services',
    projectName: 'Infrastructure Upgrade',
    lastFollowUp: '2025-09-27',
    status: 'completed',
    projectType: 'Infrastructure',
    amount: 88000
  },
  {
    id: 'Q-2025-011',
    clientName: 'Media Group',
    projectName: 'Content Management System',
    lastFollowUp: '2025-09-26',
    status: 'in-progress',
    projectType: 'Web Development',
    amount: 56000
  },
  {
    id: 'Q-2025-012',
    clientName: 'AutoParts Ltd',
    projectName: 'Supply Chain Portal',
    lastFollowUp: '2025-07-10',
    status: 'cold',
    projectType: 'Logistics',
    amount: 67000
  }
];

export const mockMeetings: Meeting[] = [
  {
    id: 'M-001',
    dateTime: '2025-10-05T10:00:00',
    quoteId: 'Q-2025-001',
    contactPerson: 'John Smith',
    location: 'Virtual - Zoom'
  },
  {
    id: 'M-002',
    dateTime: '2025-10-07T14:30:00',
    quoteId: 'Q-2025-004',
    contactPerson: 'Sarah Johnson',
    location: 'Office - Conference Room A'
  },
  {
    id: 'M-003',
    dateTime: '2025-10-08T11:00:00',
    quoteId: 'Q-2025-007',
    contactPerson: 'Michael Chen',
    location: 'Client Site'
  },
  {
    id: 'M-004',
    dateTime: '2025-10-10T15:00:00',
    quoteId: 'Q-2025-002',
    contactPerson: 'Emily Davis',
    location: 'Virtual - Teams'
  },
  {
    id: 'M-005',
    dateTime: '2025-10-12T09:30:00',
    quoteId: 'Q-2025-011',
    contactPerson: 'Robert Wilson',
    location: 'Office - Conference Room B'
  }
];
