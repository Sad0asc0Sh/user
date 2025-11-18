"use client";

import React, { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, X } from 'lucide-react';
import { megaMenuData, Level1Category, Level2Category, Level3Category } from './mega-menu-data';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';

interface MegaMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface Panel {
  id: string;
  title: string;
  data: (Level1Category | Level2Category | Level3Category)[];
  level: number;
}

const panelVariants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
};

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, setIsOpen }) => {
  const [panels, setPanels] = useState<Panel[]>([
    { id: 'root', title: 'دسته‌بندی‌ها', data: megaMenuData, level: 0 },
  ]);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  // Reset panels when menu is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setPanels([{ id: 'root', title: 'دسته‌بندی‌ها', data: megaMenuData, level: 0 }]);
      }, 300); // Wait for exit animation
    }
  }, [isOpen]);

  useOnClickOutside(menuContainerRef, handleClose);

  const handleItemClick = (item: Level1Category | Level2Category, level: number) => {
    const children = 'subCategories' in item ? item.subCategories : ('items' in item ? item.items : undefined);

    // If item has no children, it's a leaf node/link. Close menu on click.
    if (!children || children.length === 0) {
      handleClose();
      return;
    }

    // New panel to be added or to replace existing one
    const newPanel: Panel = {
      id: item.name,
      title: item.name,
      data: children,
      level: level + 1,
    };

    // State management for panels with max depth of 3
    setPanels(prevPanels => {
      // Create a new array from previous panels up to the current level.
      // This effectively closes any deeper levels.
      const updatedPanels = prevPanels.slice(0, level + 1);
      
      // Add the new panel.
      updatedPanels.push(newPanel);

      // Ensure we don't exceed the maximum depth of 3 panels.
      // The root panel is level 0, so we can have panels at index 0, 1, 2.
      return updatedPanels.slice(0, 3);
    });
  };

  const handleBack = () => {
    setPanels(prev => prev.slice(0, prev.length - 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 z-40"
            aria-hidden="true"
          />

          {/* Menu Container */}
          <div ref={menuContainerRef} className="fixed top-0 right-0 h-full z-50 flex" dir="rtl">
            <AnimatePresence initial={false}>
              {panels.map((panel, index) => (
                <motion.div
                  key={panel.id}
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-[360px] h-full bg-white shadow-lg flex flex-col"
                  style={{ zIndex: 10 + index }}
                >
                  {/* Panel Header */}
                  <div className="flex items-center p-4 border-b border-gray-200">
                    {index === 0 ? (
                      <button onClick={handleClose} className="p-2 -mr-2">
                        <X size={24} />
                      </button>
                    ) : (
                      <button onClick={handleBack} className="p-2 -mr-2 flex items-center gap-1 text-sm">
                        <ChevronLeft size={20} />
                      </button>
                    )}
                    <h2 className="font-semibold text-lg mx-auto pr-8">{panel.title}</h2>
                  </div>

                  {/* Panel Body */}
                  <div className="flex-grow overflow-y-auto">
                    <ul className="p-3 space-y-1">
                      {panel.data.map(item => (
                        <li key={item.name}>
                          <button
                            onClick={() => handleItemClick(item as Level1Category | Level2Category, index)}
                            className="w-full flex items-center justify-between text-right px-4 py-3 rounded-xl transition-colors duration-200 hover:bg-gray-100"
                          >
                            <div className="flex items-center gap-4">
                              {'icon' in item && (
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-mega-menu-accent text-brand-primary">
                                  {item.icon}
                                </div>
                              )}
                              <span className="font-medium text-text-primary">{item.name}</span>
                            </div>
                            {('subCategories' in item && item.subCategories.length > 0 || 'items' in item && item.items.length > 0) && (
                              <ChevronLeft size={20} className="text-gray-400" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;