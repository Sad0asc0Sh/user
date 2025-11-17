'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { Category } from './data';
import { getIcon } from './icon-map';

interface MegaMenuPanelProps {
  panel: {
    level: number;
    data: Category[];
    title?: string;
  };
  onItemClick: (item: Category, level: number) => void;
  onBackClick: () => void;
}

export const MegaMenuPanel: React.FC<MegaMenuPanelProps> = ({ panel, onItemClick, onBackClick }) => {
  const isFirstLevel = panel.level === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }} // Slide from left for RTL
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="h-full w-full sm:w-[260px] md:w-[300px] bg-white flex flex-col border-l border-gray-200"
      style={{ zIndex: 10 + panel.level }}
    >
      {/* Panel Header */}
      <div className="flex items-center shrink-0 px-4 py-3 border-b border-gray-200">
        {!isFirstLevel && (
          <button onClick={onBackClick} className="p-2 -ml-2 rounded-md hover:bg-gray-100 transition-colors">
            <ArrowRight size={20} className="text-gray-600" />
          </button>
        )}
        <h3 className="font-bold text-base md:text-lg text-text-primary mr-3">
          {panel.title}
        </h3>
      </div>

      {/* Panel Body */}
      <div className="flex-grow overflow-y-auto">
        <ul>
          {panel.data.map((item) => {
            const Icon = isFirstLevel ? getIcon(item.icon) : null;
            const hasChildren = item.children && item.children.length > 0;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onItemClick(item, panel.level)}
                  className="w-full flex items-center justify-between text-right px-4 py-3 hover:bg-brand-secondary/30 transition-colors duration-150"
                >
                  <div className="flex items-center gap-4">
                    {Icon && (
                      <div className="w-10 h-10 flex items-center justify-center bg-brand-secondary/50 rounded-full">
                        <Icon size={22} className="text-brand-primary" />
                      </div>
                    )}
                    <span className="text-sm md:text-[15px] text-text-primary font-medium">
                      {item.title}
                    </span>
                  </div>
                  {hasChildren && <ChevronLeft size={20} className="text-gray-400" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
};
