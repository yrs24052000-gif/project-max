import { useState, useMemo } from 'react';
import { Search, Filter, Send, ChevronLeft, ChevronRight, CheckSquare, Square } from 'lucide-react';
import { mockQuotes } from '../data/mockData';

const ITEMS_PER_PAGE = 5;

export function ColdQuotes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProjectType, setSelectedProjectType] = useState<string>('all');
  const [selectedQuotes, setSelectedQuotes] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const coldQuotes = mockQuotes.filter(q => q.status === 'cold');

  const filteredQuotes = useMemo(() => {
    return coldQuotes.filter(quote => {
      const matchesSearch =
        quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedProjectType === 'all' || quote.projectType === selectedProjectType;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedProjectType, coldQuotes]);

  const totalPages = Math.ceil(filteredQuotes.length / ITEMS_PER_PAGE);
  const paginatedQuotes = filteredQuotes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const projectTypes = Array.from(new Set(mockQuotes.map(q => q.projectType)));

  const getDaysSinceFollowUp = (lastFollowUp: string) => {
    const today = new Date('2025-10-03');
    const lastDate = new Date(lastFollowUp);
    const diffTime = Math.abs(today.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleToggleSelect = (id: string) => {
    const newSelected = new Set(selectedQuotes);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedQuotes(newSelected);
  };

  const handleSendFollowUp = (id: string) => {
    alert(`Re-engagement follow-up sent for cold quote: ${id}`);
    console.log('Sending re-engagement follow-up for cold quote:', id);
  };

  const handleBulkFollowUp = () => {
    if (selectedQuotes.size === 0) {
      alert('Please select at least one quote');
      return;
    }
    alert(`Bulk re-engagement follow-up sent for ${selectedQuotes.size} cold quotes`);
    console.log('Sending bulk re-engagement for cold quotes:', Array.from(selectedQuotes));
    setSelectedQuotes(new Set());
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cold Quotes</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Quotes with no response in 30+ days
          </p>
        </div>
        {selectedQuotes.size > 0 && (
          <button
            onClick={handleBulkFollowUp}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
            Bulk Re-engagement ({selectedQuotes.size})
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by client, project, or quote ID..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Type
              </label>
              <select
                value={selectedProjectType}
                onChange={(e) => {
                  setSelectedProjectType(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
              >
                <option value="all">All Types</option>
                {projectTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {paginatedQuotes.map(quote => {
          const daysSince = getDaysSinceFollowUp(quote.lastFollowUp);

          return (
            <div
              key={quote.id}
              className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 border-2 border-orange-200 dark:border-orange-700 rounded-lg p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleToggleSelect(quote.id)}
                  className="flex-shrink-0"
                >
                  {selectedQuotes.has(quote.id) ? (
                    <CheckSquare className="w-5 h-5 text-orange-600" />
                  ) : (
                    <Square className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  )}
                </button>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{quote.id}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{quote.clientName}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{quote.projectName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{quote.projectType}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Last follow-up</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {new Date(quote.lastFollowUp).toLocaleDateString()}
                    </p>
                    <p className="text-xs font-bold text-orange-700 dark:text-orange-400">
                      {daysSince} days ago
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-1 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full text-xs font-bold">
                      Cold
                    </span>

                    <button
                      onClick={() => handleSendFollowUp(quote.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Re-engage
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredQuotes.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">No cold quotes found matching your criteria</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredQuotes.length)} of{' '}
            {filteredQuotes.length} results
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
