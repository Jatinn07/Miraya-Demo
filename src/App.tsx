import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { CollectionPage } from './components/CollectionPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AboutUsPage } from './components/AboutUsPage';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { ConsultationModal } from './components/ConsultationModal';
import { SearchModal } from './components/SearchModal';
import { AuroraDetailModal } from './components/AuroraDetailModal';
import { FEATURED_PRODUCTS, ProductItem } from './data/jewelleryData';
import {
  CollectionProduct,
  PDP_SOLITAIRE_PRODUCT,
} from './data/collectionProducts';
import { Check } from 'lucide-react';

export default function App() {
  // Page view: 'home' (brand new homepage with Stacked Carousel) | 'collection' | 'pdp' | 'cart' | 'checkout' | 'about' (previous story page)
  const [currentPage, setCurrentPage] = useState<
    'home' | 'collection' | 'pdp' | 'cart' | 'checkout' | 'about'
  >('home');

  // Currently viewed product on PDP
  const [selectedPdpProduct, setSelectedPdpProduct] = useState<CollectionProduct>(
    PDP_SOLITAIRE_PRODUCT
  );

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: FEATURED_PRODUCTS[0],
      quantity: 1,
    },
  ]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<ProductItem[]>([
    FEATURED_PRODUCTS[1],
  ]);

  // UI Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [auroraDetail, setAuroraDetail] = useState<{ title: string; detail: string } | null>(null);

  // Subtle floating toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleAddToCart = (product: ProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added “${product.name}” to your Shopping Bag`);
  };

  const handleAddCollectionProductToCart = (p: CollectionProduct) => {
    const adapted: ProductItem = {
      id: p.id,
      name: p.name,
      category: 'Rings',
      price: p.price,
      carat: p.carat,
      metal: p.metal || '18KT Gold',
      cut: 'Brilliant Round',
      clarity: 'VVS1',
      color: 'D-F Colorless',
      description: 'Handcrafted master solitaire jewellery set in gold with lab-grown diamonds of extraordinary brilliance.',
      image: p.primaryImage,
    };
    handleAddToCart(adapted);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (product: ProductItem) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed “${product.name}” from Wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved “${product.name}” to your Wishlist`);
        return [...prev, product];
      }
    });
  };

  const handleToggleCollectionWishlist = (p: CollectionProduct) => {
    const adapted: ProductItem = {
      id: p.id,
      name: p.name,
      category: 'Rings',
      price: p.price,
      carat: p.carat,
      metal: p.metal || '18KT Gold',
      cut: 'Brilliant Round',
      clarity: 'VVS1',
      color: 'D-F Colorless',
      description: 'Handcrafted master solitaire jewellery set in gold with diamonds of extraordinary brilliance.',
      image: p.primaryImage,
    };
    handleToggleWishlist(adapted);
  };

  const handleRemoveWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const handleMoveToCart = (product: ProductItem) => {
    handleAddToCart(product);
    handleRemoveWishlist(product.id);
  };

  const handleOpenPdp = (product: CollectionProduct) => {
    setSelectedPdpProduct(product);
    setCurrentPage('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-[#302326] flex flex-col font-sans selection:bg-[#E7FFE6] selection:text-[#214E34]">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#211416] text-white px-4 py-3 rounded-[12px] shadow-xl border border-white/10 flex items-center gap-2.5 text-sm animate-slide-up">
          <div className="w-5 h-5 rounded-full bg-[#214E34] flex items-center justify-center text-white shrink-0">
            <Check className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}



      {/* CONDITIONAL PAGE RENDERING */}
      {currentPage === 'home' ? (
        /* BRAND NEW HOME PAGE (With Physical Stacked Card Hero Carousel) */
        <HomePage
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateCollection={() => {
            setCurrentPage('collection');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateAbout={() => {
            setCurrentPage('about');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateCart={() => {
            setCurrentPage('cart');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigatePdp={handleOpenPdp}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenConsultation={() => setIsConsultationOpen(true)}
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          wishlistCount={wishlist.length}
          wishlistItems={wishlist.map((w) => w.id)}
          onToggleWishlist={handleToggleCollectionWishlist}
          onAddToCart={handleAddCollectionProductToCart}
        />
      ) : currentPage === 'collection' ? (
        /* COLLECTION / PRODUCT LISTING PAGE (With Filter Drawer & Hover Images) */
        <CollectionPage
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenCart={() => {
            setCurrentPage('cart');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          wishlistCount={wishlist.length}
          wishlistItems={wishlist.map((w) => w.id)}
          onToggleWishlist={handleToggleCollectionWishlist}
          onAddToCart={handleAddCollectionProductToCart}
          onSelectProduct={handleOpenPdp}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />
      ) : currentPage === 'pdp' ? (
        /* PRODUCT DETAIL PAGE */
        <ProductDetailPage
          product={selectedPdpProduct}
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateCollection={() => {
            setCurrentPage('collection');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenCart={() => {
            setCurrentPage('cart');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          wishlistCount={wishlist.length}
          wishlistItems={wishlist.map((w) => w.id)}
          onToggleWishlist={handleToggleCollectionWishlist}
          onAddToCart={handleAddCollectionProductToCart}
          onSelectProduct={handleOpenPdp}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />
      ) : currentPage === 'cart' ? (
        /* CART PAGE */
        <CartPage
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateCollection={() => {
            setCurrentPage('collection');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateCheckout={() => {
            setCurrentPage('checkout');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onSelectProduct={handleOpenPdp}
          onOpenConsultation={() => setIsConsultationOpen(true)}
          wishlistCount={wishlist.length}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          wishlistItems={wishlist.map((w) => w.id)}
          onToggleWishlist={handleToggleCollectionWishlist}
        />
      ) : currentPage === 'checkout' ? (
        /* CHECKOUT PAGE */
        <CheckoutPage
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateCollection={() => {
            setCurrentPage('collection');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateCart={() => {
            setCurrentPage('cart');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenConsultation={() => setIsConsultationOpen(true)}
          wishlistCount={wishlist.length}
          onOpenWishlist={() => setIsWishlistOpen(true)}
        />
      ) : (
        /* ABOUT US PAGE (Previous Atelier Story Page) */
        <AboutUsPage
          onNavigateHome={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateCollection={() => {
            setCurrentPage('collection');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onNavigateCart={() => {
            setCurrentPage('cart');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onQuickView={(p) => setSelectedProduct(p)}
          onLearnMoreAurora={(data) => setAuroraDetail(data)}
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          wishlistCount={wishlist.length}
        />
      )}

      {/* SHARED MODALS & DRAWERS */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemoveWishlist={handleRemoveWishlist}
        onMoveToCart={handleMoveToCart}
      />

      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={
          selectedProduct
            ? wishlist.some((p) => p.id === selectedProduct.id)
            : false
        }
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      <AuroraDetailModal
        data={auroraDetail}
        onClose={() => setAuroraDetail(null)}
        onBookConsultation={() => setIsConsultationOpen(true)}
      />
    </div>
  );
}
