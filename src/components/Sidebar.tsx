// import { LayoutDashboard, FileText, Snowflake, Calendar, BarChart3, Settings, X } from 'lucide-react';

// interface SidebarProps {
//   currentPage: string;
//   onNavigate: (page: string) => void;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const menuItems = [
//   { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
//   { id: 'active-quotes', label: 'Active Quotes', icon: FileText },
//   { id: 'cold-quotes', label: 'Cold Quotes', icon: Snowflake },
//   { id: 'meetings', label: 'Scheduled Meetings', icon: Calendar },
//   { id: 'reports', label: 'Reports', icon: BarChart3 },
//   { id: 'settings', label: 'Settings', icon: Settings }
// ];

// export function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
//   return (
//     <>
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={onClose}
//         />
//       )}

//       <aside
//         className={`
//           fixed lg:static inset-y-0 left-0 z-50
//           w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
//           transform transition-all duration-300 ease-in-out
//           ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         `}
//       >
//         <div className="flex items-center justify-between p-6 lg:hidden">
//           <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
//           </button>
//         </div>

//         <nav className="p-4 space-y-2">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = currentPage === item.id;

//             return (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   onNavigate(item.id);
//                   onClose();
//                 }}
//                 className={`
//                   w-full flex items-center gap-3 px-4 py-3 rounded-lg
//                   transition-all duration-200
//                   ${isActive
//                     ? 'bg-blue-600 text-white shadow-lg'
//                     : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
//                   }
//                 `}
//               >
//                 <Icon className="w-5 h-5" />
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             );
//           })}
//         </nav>
//       </aside>
//     </>
//   );
// }


import { LayoutDashboard, FileText, Snowflake, Calendar, BarChart3, Settings, X } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'active-quotes', label: 'Active Quotes', icon: FileText },
  { id: 'cold-quotes', label: 'Cold Quotes', icon: Snowflake },
  { id: 'meetings', label: 'Scheduled Meetings', icon: Calendar },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-x-0 top-16 bottom-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto
          fixed top-16 bottom-0 left-0 z-50 lg:static lg:top-auto lg:bottom-auto lg:left-auto lg:z-auto
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-6 lg:hidden">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}