export interface CartItemModel {
  id: string;
  name: string;
  sku: string;
  metal: string;
  diamond: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
}

export const INITIAL_CART_ITEMS: CartItemModel[] = [
  {
    id: 'cart-1',
    name: 'Floral Stud Earrings',
    sku: 'AJ-E-8821',
    metal: '18kt Rose Gold',
    diamond: '0.42 ct VVS-VS Diamonds',
    price: 42850,
    quantity: 1,
    image: '/src/assets/images/floral_earrings_thumb_1790764074763.jpg',
    inStock: true,
  },
  {
    id: 'cart-2',
    name: 'Classic Circle Pendant',
    sku: 'AJ-P-1094',
    metal: '18kt Yellow Gold',
    diamond: '0.35 ct Brilliant Cut Diamond',
    price: 38200,
    quantity: 1,
    image: '/src/assets/images/circle_pendant_thumb_1790764103077.jpg',
    inStock: true,
  },
  {
    id: 'cart-3',
    name: 'Tennis Bracelet',
    sku: 'AJ-B-7740',
    metal: '18kt White Gold',
    diamond: '1.20 ct Round Diamonds',
    price: 42695,
    quantity: 1,
    image: '/src/assets/images/tennis_bracelet_thumb_1790764128140.jpg',
    inStock: true,
  },
];
