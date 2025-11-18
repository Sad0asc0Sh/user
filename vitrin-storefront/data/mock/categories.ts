
export type SubCategory = {
  id: string;
  name: string;
  slug: string;
  image: string;
};

export type MainCategory = {
  id: string;
  name: string;
  slug: string;
  bannerImage?: string;
  subCategories: SubCategory[];
};

export const mockCategories: MainCategory[] = [
  {
    id: '1',
    name: 'کالای دیجیتال',
    slug: 'digital',
    bannerImage: 'https://placehold.co/1200x200/e2e8f0/64748b?text=Digital+Banner',
    subCategories: [
      { id: '1-1', name: 'موبایل', slug: 'mobile', image: 'https://placehold.co/200x200/e2e8f0/64748b?text=Mobile' },
      { id: '1-2', name: 'لپ‌تاپ', slug: 'laptop', image: 'https://placehold.co/200x200/e2e8f0/64748b?text=Laptop' },
      { id: '1-3', name: 'ساعت هوشمند', slug: 'smartwatch', image: 'https://placehold.co/200x200/e2e8f0/64748b?text=Smartwatch' },
      { id: '1-4', name: 'کنسول بازی', slug: 'gaming-console', image: 'https://placehold.co/200x200/e2e8f0/64748b?text=Console' },
    ],
  },
  {
    id: '2',
    name: 'مد و پوشاک',
    slug: 'fashion',
    bannerImage: 'https://placehold.co/1200x200/e2e8f0/64748b?text=Fashion+Banner',
    subCategories: [
      { id: '2-1', name: 'پوشاک مردانه', slug: 'men-clothing', image: 'https://placehold.co/200x200/e2e8f0/64748b?text=Men' },
      { id: '2-2', name: 'پوشاک زنانه', slug: 'women-clothing', image: 'https://placehold.co/200x200/e2e8f0/64748b?text=Women' },
      { id: '2-3', name: 'بچگانه', slug: 'kids-clothing', image: 'https://placehold.co/200x200/e2e8f0/64748b?text=Kids' },
    ],
  },
  {
    id: '3',
    name: 'زیبایی و سلامت',
    slug: 'health-beauty',
    bannerImage: 'https://placehold.co/1200x200/e2e8f0/64748b?text=Beauty+Banner',
    subCategories: [
        { id: '3-1', name: 'عطر و ادکلن', slug: 'perfume', image: 'https://placehold.co/200x200/e2e8f0/64748b?text=Perfume'},
        { id: '3-2', name: 'آرایش و گریم', slug: 'makeup', image: 'https://placehold.co/200x200/e2e8f0/64748b?text=Makeup'},
        { id: '3-3', name: 'مراقبت پوست', slug: 'skincare', image: 'https://placehold.co/200x200/e2e8f0/64748b?text=Skincare'},
        { id: '3-4', name: 'مراقبت مو', slug: 'haircare', image: 'https://placehold.co/200x200/e2e8f0/64748b?text=Haircare'},
    ],
  },
  {
    id: '4',
    name: 'خانه و آشپزخانه',
    slug: 'home-kitchen',
    bannerImage: 'https://placehold.co/1200x200/e2e8f0/64748b?text=Home+Banner',
    subCategories: [
        { id: '4-1', name: 'لوازم پخت و پز', slug: 'cooking', image: 'https://placehold.co/200x200/e2e8f0/64748b?text=Cooking'},
        { id: '4-2', name: 'دکوراتیو', slug: 'decorative', image: 'https://placehold.co/200x200/e2e8f0/64748b?text=Decorative'},
        { id: '4-3', name: 'فرش', slug: 'rug', image: 'https://placehold.co/200x200/e2e8f0/64748b?text=Rug'},
    ],
  },
];
