import { useState, useEffect } from 'react';
import { Mail, MailOpen, Search, Filter, Plus, Paperclip, Clock, User, RefreshCw, Trash2 } from 'lucide-react';
import { emailService } from '../services/emailService';
import { Email, Contact, EmailFilters } from '../types/email';
import { EmailComposer } from '../components/EmailComposer';
import { ContactsPanel } from '../components/ContactsPanel';
import { mockQuotes } from '../data/mockData';
import { useToast } from '../contexts/ToastContext';

export function Emails() {
  const { showToast } = useToast();
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerTo, setComposerTo] = useState('');
  const [composerQuoteId, setComposerQuoteId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<EmailFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isContactsPanelOpen, setIsContactsPanelOpen] = useState(true);

  useEffect(() => {
    loadEmails();
  }, [filters]);

  const loadEmails = async () => {
    try {
      setIsLoading(true);
      const data = await emailService.getEmails({
        ...filters,
        searchQuery: searchQuery || undefined
      });
      setEmails(data);
    } catch (error) {
      console.error('Error loading emails:', error);
      showToast('Failed to load emails', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectEmail = async (email: Email) => {
    setSelectedEmail(email);
    if (!email.is_read) {
      try {
        await emailService.markAsRead(email.id);
        setEmails(emails.map(e => e.id === email.id ? { ...e, is_read: true } : e));
      } catch (error) {
        console.error('Error marking email as read:', error);
      }
    }
  };

  const handleDeleteEmail = async (emailId: string) => {
    if (!confirm('Are you sure you want to delete this email?')) return;

    try {
      await emailService.deleteEmail(emailId);
      setEmails(emails.filter(e => e.id !== emailId));
      if (selectedEmail?.id === emailId) {
        setSelectedEmail(null);
      }
      showToast('Email deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting email:', error);
      showToast('Failed to delete email', 'error');
    }
  };

  const handleSendEmail = (toEmail: string, quoteId?: string) => {
    setComposerTo(toEmail);
    setComposerQuoteId(quoteId || '');
    setIsComposerOpen(true);
  };

  const handleRefresh = () => {
    loadEmails();
    showToast('Emails refreshed', 'success');
  };

  const handleSearch = () => {
    setFilters({ ...filters, searchQuery });
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'new_inquiry': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200';
      case 'quote_sent': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
      case 'follow_up': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200';
      case 'closed': return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const getQuoteInfo = (quoteId: string | null) => {
    if (!quoteId) return null;
    return mockQuotes.find(q => q.id === quoteId);
  };

  const unreadCount = emails.filter(e => !e.is_read).length;

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Email Management</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => setIsComposerOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Compose Email
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {isContactsPanelOpen && (
          <div className="w-80 flex-shrink-0 overflow-hidden">
            <ContactsPanel
              onSelectContact={(contact) => console.log('Selected:', contact)}
              onSendEmail={(email) => handleSendEmail(email)}
            />
          </div>
        )}

        <div className="flex-1 flex overflow-hidden">
          <div className="w-96 flex-shrink-0 flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search emails..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors w-full"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              {showFilters && (
                <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select
                      value={filters.category || ''}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">All Categories</option>
                      <option value="new_inquiry">New Inquiry</option>
                      <option value="quote_sent">Quote Sent</option>
                      <option value="follow_up">Follow-Up</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Direction
                    </label>
                    <select
                      value={filters.direction || ''}
                      onChange={(e) => setFilters({ ...filters, direction: e.target.value || undefined })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">All</option>
                      <option value="inbound">Inbound</option>
                      <option value="outbound">Outbound</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.isRead === false}
                        onChange={(e) => setFilters({ ...filters, isRead: e.target.checked ? false : undefined })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-xs text-gray-700 dark:text-gray-300">Unread only</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto">
              {isLoading ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  Loading emails...
                </div>
              ) : emails.length === 0 ? (
                <div className="p-8 text-center">
                  <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No emails found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {emails.map(email => (
                    <button
                      key={email.id}
                      onClick={() => handleSelectEmail(email)}
                      className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        selectedEmail?.id === email.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      } ${!email.is_read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {email.is_read ? (
                            <MailOpen className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className={`text-sm truncate ${!email.is_read ? 'font-bold' : 'font-medium'} text-gray-900 dark:text-white`}>
                              {email.direction === 'outbound' ? email.recipient_email : email.sender_email}
                            </p>
                            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              {new Date(email.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className={`text-sm mb-1 truncate ${!email.is_read ? 'font-semibold' : ''} text-gray-700 dark:text-gray-300`}>
                            {email.subject}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-2">
                            {email.body.substring(0, 80)}...
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryBadgeColor(email.category)}`}>
                              {email.category.replace('_', ' ')}
                            </span>
                            {email.has_attachments && (
                              <Paperclip className="w-3 h-3 text-gray-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
            {selectedEmail ? (
              <>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedEmail.subject}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSendEmail(
                          selectedEmail.direction === 'outbound' ? selectedEmail.recipient_email : selectedEmail.sender_email,
                          selectedEmail.quote_id || undefined
                        )}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="Reply"
                      >
                        <Mail className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmail(selectedEmail.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">From:</span>
                      <span className="text-gray-900 dark:text-white">{selectedEmail.sender_email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">To:</span>
                      <span className="text-gray-900 dark:text-white">{selectedEmail.recipient_email}</span>
                    </div>
                    {selectedEmail.cc && selectedEmail.cc.length > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">Cc:</span>
                        <span className="text-gray-900 dark:text-white">{selectedEmail.cc.join(', ')}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {new Date(selectedEmail.sent_at || selectedEmail.created_at).toLocaleString()}
                      </span>
                    </div>
                    <span className={`inline-block text-xs px-2 py-1 rounded-full ${getCategoryBadgeColor(selectedEmail.category)}`}>
                      {selectedEmail.category.replace('_', ' ')}
                    </span>
                  </div>

                  {selectedEmail.quote_id && (
                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Related Quote: {getQuoteInfo(selectedEmail.quote_id)?.quoteNumber}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {getQuoteInfo(selectedEmail.quote_id)?.companyNames.join(', ')} - $
                            {getQuoteInfo(selectedEmail.quote_id)?.totalValue.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleSendEmail(selectedEmail.recipient_email, selectedEmail.quote_id!)}
                          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                        >
                          Send Follow-up
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-900 dark:text-white">
                      {selectedEmail.body}
                    </pre>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">Select an email to view</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <EmailComposer
        isOpen={isComposerOpen}
        onClose={() => {
          setIsComposerOpen(false);
          setComposerTo('');
          setComposerQuoteId('');
        }}
        toEmail={composerTo}
        quoteId={composerQuoteId}
        onSent={loadEmails}
      />
    </div>
  );
}
