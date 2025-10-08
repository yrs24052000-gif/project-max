// import { Menu } from 'lucide-react';
// import { ThemeToggle } from './ThemeToggle';

// interface HeaderProps {
//   onToggleSidebar: () => void;
// }

// export function Header({ onToggleSidebar }: HeaderProps) {
//   return (
//     <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors duration-200">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button
//             onClick={onToggleSidebar}
//             className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//             aria-label="Toggle sidebar"
//           >
//             <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
//           </button>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Project Max
//           </h1>
//         </div>
//         <ThemeToggle />
//       </div>
//     </header>
//   );
// }

import { Menu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 h-16 flex items-center transition-colors duration-200">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Project Max
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
