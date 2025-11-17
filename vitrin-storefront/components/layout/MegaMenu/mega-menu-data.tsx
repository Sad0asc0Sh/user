
import {
  Shirt,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Camera,
  Gamepad2,
  Home,
  Book,
  HeartPulse,
} from 'lucide-react';
import { ReactNode } from 'react';

export interface Level3Category {
  name: string;
  href: string;
}

export interface Level2Category {
  name: string;
  href: string;
  items: Level3Category[];
}

export interface Level1Category {
  name: string;
  icon: ReactNode;
  subCategories: Level2Category[];
}

export const megaMenuData: Level1Category[] = [
  {
    name: 'Digital Goods',
    icon: <Smartphone size={24} />,
    subCategories: [
      {
        name: 'Mobile',
        href: '/digital-goods/mobile',
        items: [
          { name: 'By Price', href: '/digital-goods/mobile/by-price' },
          { name: 'By Usage', href: '/digital-goods/mobile/by-usage' },
          { name: 'By Type', href: '/digital-goods/mobile/by-type' },
          { name: 'Accessories', href: '/digital-goods/mobile/accessories' },
        ],
      },
      {
        name: 'Laptops',
        href: '/digital-goods/laptops',
        items: [
          { name: 'Gaming Laptops', href: '/digital-goods/laptops/gaming' },
          { name: 'Ultrabooks', href: '/digital-goods/laptops/ultrabooks' },
          { name: '2-in-1s', href: '/digital-goods/laptops/2-in-1' },
        ],
      },
      {
        name: 'Cameras',
        href: '/digital-goods/cameras',
        items: [
            { name: 'By Price', href: '/digital-goods/mobile/by-price' },
            { name: 'By Usage', href: '/digital-goods/mobile/by-usage' },
            { name: 'By Type', href: '/digital-goods/mobile/by-type' },
            { name: 'Accessories', href: '/digital-goods/mobile/accessories' },
        ],
      },
    ],
  },
  {
    name: 'Fashion',
    icon: <Shirt size={24} />,
    subCategories: [
      {
        name: 'Men',
        href: '/fashion/men',
        items: [
          { name: 'T-Shirts', href: '/fashion/men/t-shirts' },
          { name: 'Jeans', href: '/fashion/men/jeans' },
          { name: 'Shoes', href: '/fashion/men/shoes' },
        ],
      },
      {
        name: 'Women',
        href: '/fashion/women',
        items: [
          { name: 'Dresses', href: '/fashion/women/dresses' },
          { name: 'Handbags', href: '/fashion/women/handbags' },
          { name: 'Jewelry', href: '/fashion/women/jewelry' },
        ],
      },
    ],
  },
  {
    name: 'Electronics',
    icon: <Headphones size={24} />,
    subCategories: [
        {
            name: 'Mobile',
            href: '/digital-goods/mobile',
            items: [
              { name: 'By Price', href: '/digital-goods/mobile/by-price' },
              { name: 'By Usage', href: '/digital-goods/mobile/by-usage' },
              { name: 'By Type', href: '/digital-goods/mobile/by-type' },
              { name: 'Accessories', href: '/digital-goods/mobile/accessories' },
            ],
          },
          {
            name: 'Laptops',
            href: '/digital-goods/laptops',
            items: [
              { name: 'Gaming Laptops', href: '/digital-goods/laptops/gaming' },
              { name: 'Ultrabooks', href: '/digital-goods/laptops/ultrabooks' },
              { name: '2-in-1s', href: '/digital-goods/laptops/2-in-1' },
            ],
          },
          {
            name: 'Cameras',
            href: '/digital-goods/cameras',
            items: [
                { name: 'By Price', href: '/digital-goods/mobile/by-price' },
                { name: 'By Usage', href: '/digital-goods/mobile/by-usage' },
                { name: 'By Type', href: '/digital-goods/mobile/by-type' },
                { name: 'Accessories', href: '/digital-goods/mobile/accessories' },
            ],
          },
    ],
  },
  {
    name: 'Home & Kitchen',
    icon: <Home size={24} />,
    subCategories: [
        {
            name: 'Mobile',
            href: '/digital-goods/mobile',
            items: [
              { name: 'By Price', href: '/digital-goods/mobile/by-price' },
              { name: 'By Usage', href: '/digital-goods/mobile/by-usage' },
              { name: 'By Type', href: '/digital-goods/mobile/by-type' },
              { name: 'Accessories', href: '/digital-goods/mobile/accessories' },
            ],
          },
          {
            name: 'Laptops',
            href: '/digital-goods/laptops',
            items: [
              { name: 'Gaming Laptops', href: '/digital-goods/laptops/gaming' },
              { name: 'Ultrabooks', href: '/digital-goods/laptops/ultrabooks' },
              { name: '2-in-1s', href: '/digital-goods/laptops/2-in-1' },
            ],
          },
          {
            name: 'Cameras',
            href: '/digital-goods/cameras',
            items: [
                { name: 'By Price', href: '/digital-goods/mobile/by-price' },
                { name: 'By Usage', href: '/digital-goods/mobile/by-usage' },
                { name: 'By Type', href: '/digital-goods/mobile/by-type' },
                { name: 'Accessories', href: '/digital-goods/mobile/accessories' },
            ],
          },
    ],
  },
  {
    name: 'Health & Beauty',
    icon: <HeartPulse size={24} />,
    subCategories: [
        {
            name: 'Mobile',
            href: '/digital-goods/mobile',
            items: [
              { name: 'By Price', href: '/digital-goods/mobile/by-price' },
              { name: 'By Usage', href: '/digital-goods/mobile/by-usage' },
              { name: 'By Type', href: '/digital-goods/mobile/by-type' },
              { name: 'Accessories', href: '/digital-goods/mobile/accessories' },
            ],
          },
          {
            name: 'Laptops',
            href: '/digital-goods/laptops',
            items: [
              { name: 'Gaming Laptops', href: '/digital-goods/laptops/gaming' },
              { name: 'Ultrabooks', href: '/digital-goods/laptops/ultrabooks' },
              { name: '2-in-1s', href: '/digital-goods/laptops/2-in-1' },
            ],
          },
          {
            name: 'Cameras',
            href: '/digital-goods/cameras',
            items: [
                { name: 'By Price', href: '/digital-goods/mobile/by-price' },
                { name: 'By Usage', href: '/digital-goods/mobile/by-usage' },
                { name: 'By Type', href: '/digital-goods/mobile/by-type' },
                { name: 'Accessories', href: '/digital-goods/mobile/accessories' },
            ],
          },
    ],
  },
];
