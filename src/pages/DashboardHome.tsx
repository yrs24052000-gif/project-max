import { FileText, Snowflake, Calendar, CheckCircle, TrendingUp } from 'lucide-react';
import { mockQuotes, mockMeetings } from '../data/mockData';
import { DashboardCard } from '../components/DashboardCard';

interface DashboardHomeProps {
  onNavigate: (page: string) => void;
}

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const activeQuotes = mockQuotes
    .filter(q => q.status === 'in-progress' || q.status === 'pending')
    .slice(0, 5);

  const coldQuotes = mockQuotes
    .filter(q => q.status === 'cold')
    .slice(0, 5);

  const upcomingMeetings = mockMeetings
    .filter(m => new Date(m.dateTime) > new Date('2025-10-03'))
    .slice(0, 5);

  const statusColors = {
    pending: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
    'in-progress': 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    completed: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    cold: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
  };

  const getQuoteInfo = (quoteId: string) => {
    return mockQuotes.find(q => q.id === quoteId);
  };



  const totalQuotesStats = mockQuotes.length;
  const activeQuotesStats = mockQuotes.filter(q => q.status === 'in-progress' || q.status === 'pending').length;
  const coldQuotesStats = mockQuotes.filter(q => q.status === 'cold').length;
  const completedQuotesStats = mockQuotes.filter(q => q.status === 'completed').length;
  // const totalValueStats = mockQuotes.reduce((sum, q) => sum + q.amount, 0);

  
  const stats = [ 
    {
      title: 'Total Quotes',
      value: totalQuotesStats,
      icon: FileText,
      color: 'bg-blue-500',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Active Quotes',
      value: activeQuotesStats,
      icon: TrendingUp,
      color: 'bg-green-500',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: 'Cold Quotes',
      value: coldQuotesStats,
      icon: FileText,
      color: 'bg-orange-500',
      textColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      title: 'Completed',
      value: completedQuotesStats,
      icon: CheckCircle,
      color: 'bg-purple-500',
      textColor: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Quick overview of your quotes and meetings
        </p>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className={`text-3xl font-bold mt-2 ${stat.textColor}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 ${stat.color} rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Active Quotes"
          icon={FileText}
          iconColor="bg-blue-600"
          onViewMore={() => onNavigate('active-quotes')}
        >
          <div className="space-y-3">
            {activeQuotes.map(quote => (
              <div
                key={quote.id}
                className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => onNavigate('active-quotes')}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {quote.clientName}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {quote.projectName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {quote.id}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors[quote.status]}`}>
                    {quote.status}
                  </span>
                </div>
              </div>
            ))}

            {activeQuotes.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No active quotes
              </p>
            )}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Cold Quotes"
          icon={Snowflake}
          iconColor="bg-orange-600"
          onViewMore={() => onNavigate('cold-quotes')}
        >
          <div className="space-y-3">
            {coldQuotes.map(quote => {
              const daysSince = Math.ceil(
                Math.abs(new Date('2025-10-03').getTime() - new Date(quote.lastFollowUp).getTime()) /
                (1000 * 60 * 60 * 24)
              );

              return (
                <div
                  key={quote.id}
                  className="p-3 bg-orange-50 dark:bg-gray-900 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => onNavigate('cold-quotes')}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {quote.clientName}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {quote.projectName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {quote.id}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full text-xs font-bold whitespace-nowrap">
                      {daysSince}d
                    </span>
                  </div>
                </div>
              );
            })}

            {coldQuotes.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No cold quotes
              </p>
            )}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Upcoming Meetings"
          icon={Calendar}
          iconColor="bg-green-600"
          onViewMore={() => onNavigate('meetings')}
        >
          <div className="space-y-3">
            {upcomingMeetings.map(meeting => {
              const quote = getQuoteInfo(meeting.quoteId);
              const date = new Date(meeting.dateTime);
              const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

              return (
                <div
                  key={meeting.id}
                  className="p-3 bg-green-50 dark:bg-gray-900 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => onNavigate('meetings')}
                >
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {quote?.clientName || 'Unknown Client'}
                      </p>
                      <span className="text-xs font-medium text-green-700 dark:text-green-300 whitespace-nowrap">
                        {dateStr}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {meeting.contactPerson}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {meeting.quoteId}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {timeStr}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {upcomingMeetings.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                No upcoming meetings
              </p>
            )}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
