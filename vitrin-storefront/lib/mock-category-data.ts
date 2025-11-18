export type LeafCategory = {
  name: string;
  slug: string;
};

export type SubCategory = {
  name: string;
  slug: string;
  image: string; // Can be used for a small icon or header image if needed
  children: LeafCategory[];
};

export type MainCategory = {
  id: string;
  name: string;
  slug: string;
  bannerImage: string;
  subCategories: SubCategory[];
};

export const mockCategories: MainCategory[] = [
  {
    id: '1',
    name: 'کالای دیجیتال',
    slug: 'digital',
    bannerImage: '/images/mock/banner-digital.jpg',
    subCategories: [
      { name: 'موبایل', slug: 'mobile', image: '', children: [
        { name: 'اپل', slug: 'apple' },
        { name: 'سامسونگ', slug: 'samsung' },
        { name: 'شیائومی', slug: 'xiaomi' },
        { name: 'هواوی', slug: 'huawei' },
      ]},
      { name: 'لپ‌تاپ', slug: 'laptop', image: '', children: [
        { name: 'مک‌بوک', slug: 'macbook' },
        { name: 'لپ‌تاپ گیمینگ', slug: 'gaming-laptop' },
        { name: 'لپ‌تاپ خانگی', slug: 'home-laptop' },
      ]},
      { name: 'ساعت هوشمند', slug: 'smartwatch', image: '', children: [
        { name: 'اپل واچ', slug: 'apple-watch' },
        { name: 'گلکسی واچ', slug: 'galaxy-watch' },
      ]},
    ],
  },
  {
    id: '2',
    name: 'مد و پوشاک',
    slug: 'fashion',
    bannerImage: '/images/mock/banner-fashion.jpg',
    subCategories: [
      { name: 'پوشاک مردانه', slug: 'men-clothing', image: '', children: [
        { name: 'تی‌شرت', slug: 't-shirt' },
        { name: 'پیراهن', slug: 'shirt' },
        { name: 'شلوار', slug: 'pants' },
      ]},
      { name: 'پوشاک زنانه', slug: 'women-clothing', image: '', children: [
        { name: 'مانتو', slug: 'manto' },
        { name: 'شال و روسری', slug: 'scarf' },
        { name: 'لباس مجلسی', slug: 'dress' },
      ]},
    ],
  },
  {
    id: '3',
    name: 'زیبایی و سلامت',
    slug: 'health-beauty',
    bannerImage: '/images/mock/banner-beauty.jpg',
    subCategories: [
        { name: 'عطر و ادکلن', slug: 'perfume', image: '', children: [
            { name: 'مردانه', slug: 'men-perfume'},
            { name: 'زنانه', slug: 'women-perfume'},
        ]},
        { name: 'آرایش و گریم', slug: 'makeup', image: '', children: [
            { name: 'آرایش صورت', slug: 'face-makeup'},
            { name: 'آرایش چشم', slug: 'eye-makeup'},
        ]},
    ],
  },
  {
    id: '4',
    name: 'خانه و آشپزخانه',
    slug: 'home-kitchen',
    bannerImage: '/images/mock/banner-home.jpg',
    subCategories: [
        { name: 'لوازم پخت و پز', slug: 'cooking', image: '', children: [
            { name: 'قابلمه', slug: 'pot'},
            { name: 'تابه', slug: 'pan'},
        ]},
        { name: 'دکوراتیو', slug: 'decorative', image: '', children: [
            { name: 'ساعت دیواری', slug: 'wall-clock'},
            { name: 'آینه', slug: 'mirror'},
        ]},
    ],
  },
  {
    id: '5',
    name: 'کتاب، لوازم تحریر و هنر',
    slug: 'books-art',
    bannerImage: '/images/mock/banner-art.jpg',
    subCategories: [
        { name: 'کتاب و مجله', slug: 'books', image: '', children: [
            { name: 'رمان', slug: 'novel'},
            { name: 'تاریخی', slug: 'history'},
            { name: 'روانشناسی', slug: 'psychology'},
        ]},
        { name: 'نوشت افزار', slug: 'stationery', image: '', children: [
            { name: 'خودکار و روان‌نویس', slug: 'pen'},
            { name: 'دفتر', slug: 'notebook'},
        ]},
    ],
  },
];