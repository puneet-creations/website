import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

type NavItem = {
  id: number;
  label: string;
  link?: string;
  subMenus?: {
    title: string;
    items: {
      label: string;
      description: string;
      icon: React.ElementType;
      link: string;
    }[];
  }[];
};

type Props = {
  navItems: NavItem[];
};

export function DropdownNavigation({ navItems }: Props) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  return (
    <nav
      className="relative"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <ul className="flex items-center gap-1">
        {navItems.map((item) => (
          <li key={item.id} className="relative">
            {item.subMenus ? (
              <div className="flex items-center">
                <Link
                  to={item.link || '/'}
                  className={cn(
                    'flex items-center px-3 py-2 text-[15px] font-medium rounded-lg transition-colors',
                    activeMenu === item.id
                      ? 'text-[#187574]'
                      : 'text-[#555a6a] hover:text-[#1c1c1e]'
                  )}
                  style={{ fontFamily: "'Noto Sans', sans-serif" }}
                  onMouseEnter={() => setActiveMenu(item.id)}
                  onClick={() => setActiveMenu(null)}
                >
                  {item.label}
                </Link>
                <button
                  className="p-1 text-[#999] hover:text-[#1c1c1e] transition-colors"
                  aria-label={`Toggle ${item.label} menu`}
                  aria-haspopup="true"
                  aria-expanded={activeMenu === item.id}
                  onMouseEnter={() => setActiveMenu(item.id)}
                  onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                >
                  <ChevronDown
                    className={cn(
                      'w-3.5 h-3.5 transition-transform duration-200',
                      activeMenu === item.id && 'rotate-180'
                    )}
                  />
                </button>
              </div>
            ) : (
              <Link
                to={item.link || '/'}
                className="flex items-center px-3 py-2 text-[15px] font-medium text-[#555a6a] hover:text-[#1c1c1e] rounded-lg transition-colors"
                style={{ fontFamily: "'Noto Sans', sans-serif" }}
                onMouseEnter={() => setActiveMenu(null)}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {activeMenu !== null && (
          <motion.div
            className="absolute top-full left-0 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {navItems.map((item) =>
              item.id === activeMenu && item.subMenus ? (
                <motion.div
                  key={item.id}
                  layoutId="menu"
                  className="rounded-2xl border p-4 min-w-[520px]"
                  style={{
                    background: 'rgba(255,255,255,0.98)',
                    backdropFilter: 'blur(20px)',
                    borderColor: 'rgba(0,0,0,0.08)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)',
                  }}
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <div className="grid grid-cols-2 gap-4">
                    {item.subMenus.map((submenu) => (
                      <div key={submenu.title}>
                        <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#999] mb-2 px-2" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                          {submenu.title}
                        </h4>
                        <ul className="space-y-0.5">
                          {submenu.items.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                to={sub.link}
                                onClick={() => setActiveMenu(null)}
                                className="group flex items-start gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-[rgba(0,0,0,0.04)]"
                              >
                                <span
                                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors group-hover:bg-[rgba(0,0,0,0.06)]"
                                  style={{ background: 'rgba(0,0,0,0.04)' }}
                                >
                                  <sub.icon className="h-4 w-4 text-[#888] group-hover:text-[#187574] transition-colors" />
                                </span>
                                <span className="flex flex-col">
                                  <span className="text-[14px] font-medium text-[#1c1c1e] group-hover:text-[#187574] transition-colors" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                                    {sub.label}
                                  </span>
                                  <span className="text-[12px] leading-snug text-[#888]" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
                                    {sub.description}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : null
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
