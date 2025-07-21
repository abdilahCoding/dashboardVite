import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  DollarSign, 
  ChevronDown, 
  ChevronRight, 
  BarChart3, 
  TrendingUp,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [financeOpen, setFinanceOpen] = useState(false);
  const location = useLocation();
  
  // Auto-open finance menu if we're on a finance page
  React.useEffect(() => {
    if (location.pathname.includes('/finance/')) {
      setFinanceOpen(true);
    }
  }, [location.pathname]);

  const menuItems = [
    {
      name: 'Dashboard',
      icon: Home,
      path: '/dashboard',
    },
    {
      name: 'Finance',
      icon: DollarSign,
      hasSubmenu: true,
      submenu: [
        {
          name: 'Revenue Table',
          icon: BarChart3,
          path: '/dashboard/finance/revenue',
        },
        {
          name: 'Expenses Table',
          icon: TrendingUp,
          path: '/dashboard/finance/expenses',
        },
      ],
    },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const isActiveParent = (submenu) => {
    return submenu?.some(item => location.pathname === item.path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-30 h-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:fixed
        w-64 border-r border-gray-200
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            title="Close Sidebar"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={() => setFinanceOpen(!financeOpen)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                        ${isActiveParent(item.submenu) 
                          ? 'bg-indigo-100 text-indigo-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                      </div>
                      {financeOpen ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      financeOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <ul className="mt-2 ml-6 space-y-1">
                        {item.submenu.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              to={subItem.path}
                              // onClick={() => {
                              //   // Only close sidebar on mobile screens (< 1024px)
                              //   if (window.innerWidth < 1024) {
                              //     setIsOpen(false);
                              //   }
                              // }}
                              className={`
                                flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 transform hover:translate-x-1
                                ${isActiveLink(subItem.path)
                                  ? 'bg-indigo-100 text-indigo-700 font-medium shadow-sm'
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }
                              `}
                            >
                              <subItem.icon className="h-4 w-4 mr-3" />
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => {
                      // Only close sidebar on mobile screens (< 1024px)
                      if (window.innerWidth < 1024) {
                        setIsOpen(false);
                      }
                    }}
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                      ${isActiveLink(item.path)
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;