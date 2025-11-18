export interface Category {
  id: string;
  title: string;
  icon?: string;
  children?: Category[];
}

export const megaMenuCategories: Category[] = [
  {
    id: "digital-goods",
    title: "کالای دیجیتال و لوازم جانبی",
    icon: "Smartphone",
    children: [
      {
        id: "mobile-tablet",
        title: "موبایل و تبلت",
        children: [
          { id: "smartphones", title: "گوشی موبایل" },
          { id: "tablets", title: "تبلت" },
          { id: "mobile-accessories", title: "لوازم جانبی موبایل" },
        ],
      },
      {
        id: "laptops",
        title: "لپ‌تاپ و کامپیوتر",
        children: [
          { id: "laptops-gaming", title: "لپ‌تاپ گیمینگ" },
          { id: "laptops-ultrabook", title: "اولترابوک و دانشجویی" },
        ],
      },
      {
        id: "cameras",
        title: "دوربین و عکاسی",
        children: [
          { id: "dslr", title: "دوربین DSLR" },
          { id: "mirrorless", title: "دوربین بدون آینه" },
        ],
      },
      {
        id: "consoles",
        title: "کنسول بازی و گیمینگ",
        children: [
          { id: "ps5", title: "پلی استیشن ۵" },
          { id: "xbox", title: "Xbox Series" },
        ],
      },
    ],
  },
  {
    id: "appliances",
    title: "خانه و آشپزخانه",
    icon: "Watch",
    children: [
      {
        id: "kitchen",
        title: "لوازم برقی آشپزخانه",
        children: [
          { id: "refrigerator", title: "یخچال و فریزر" },
          { id: "washing-machine", title: "ماشین لباسشویی" },
        ],
      },
    ],
  },
  {
    id: "fashion",
    title: "مد و پوشاک",
    icon: "Headphones",
    children: [
      {
        id: "mens-clothing",
        title: "پوشاک مردانه",
        children: [
          { id: "mens-shirts", title: "پیراهن مردانه" },
          { id: "mens-trousers", title: "شلوار مردانه" },
        ],
      },
      {
        id: "womens-clothing",
        title: "پوشاک زنانه",
        children: [
          { id: "womens-dresses", title: "پیراهن و مانتو زنانه" },
          { id: "womens-trousers", title: "شلوار و شلوارک زنانه" },
        ],
      },
    ],
  },
  {
    id: "tools",
    title: "ابزار و تجهیزات",
    icon: "Camera",
    children: [],
  },
  {
    id: "beauty",
    title: "آرایشی، بهداشتی و سلامت",
    icon: "Gamepad2",
    children: [],
  },
];

