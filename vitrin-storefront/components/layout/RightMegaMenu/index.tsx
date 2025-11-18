'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import { useOnClickOutside } from '@/components/hooks/use-on-click-outside';
import { useMegaMenuStack } from './use-mega-menu-stack';
import { MegaMenuPanel } from './mega-menu-panel';
import { megaMenuCategories, Category } from './data';

interface RightMegaMenuProps {
  open: boolean;
  onClose: () => void;
}

export const RightMegaMenu: React.FC<RightMegaMenuProps> = ({
  open,
  onClose,
}) => {
  const { stack, push, pop, reset } = useMegaMenuStack(megaMenuCategories);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside of it
  useOnClickOutside(menuRef, onClose);

  // Reset stack when menu is closed
  useEffect(() => {
    if (!open) {
      setTimeout(reset, 300); // Delay to allow exit animation
    }
  }, [open, reset]);

  // Close menu with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleItemClick = (item: Category, level: number) => {
    if (item.children && item.children.length > 0) {
      push(item, level);
    } else {
      onClose();
      console.log(`Navigate to category: ${item.id}`);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay پس‌زمینه تیره منو */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 top-[70px] z-40 bg-black/40 md:top-[110px]"
            aria-hidden="true"
          />

          {/* Menu Wrapper - خود منوی کناری */}
          <div
            ref={menuRef}
            className="fixed right-0 top-[70px] z-50 h-[calc(100vh-70px)] md:top-[110px] md:h-[calc(100vh-110px)]"
            dir="rtl"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex h-full justify-end"
            >
              <AnimatePresence initial={false}>
                {stack.map((panel) => (
                  <MegaMenuPanel
                    key={panel.level}
                    panel={panel}
                    onItemClick={handleItemClick}
                    onBackClick={pop}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-[100] rounded-full bg-white p-2 text-gray-700 shadow-lg transition-all hover:bg-gray-100"
              aria-label="بستن منوی دسته‌بندی‌ها"
            >
              <X size={24} />
            </button>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

