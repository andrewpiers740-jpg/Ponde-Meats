'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE } from '@/src/config/site';

export interface CartItem {
  id: string; // product id + variant id
  productId: string;
  name: string;
  variantId?: string;
  variantName?: string;
  price: number;
  quantity: number;
  image: string;
  unit?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  isMinOrderMet: boolean;
  freeShippingProgress: number;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  applyDiscountCode: (code: string) => boolean;
  discountCodeError: string | null;
  discountCodeApplied: boolean;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pondemeats_cart');
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountCodeApplied, setDiscountCodeApplied] = useState(false);
  const [discountCodeError, setDiscountCodeError] = useState<string | null>(null);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pondemeats_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscountCodeApplied(false);
  };

  const applyDiscountCode = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'PONDE5' || trimmed === 'WHOLESALE5' || trimmed === 'COWIRRA') {
      setDiscountCodeApplied(true);
      setDiscountCodeError(null);
      return true;
    } else {
      setDiscountCodeError('Invalid coupon code. Note: 5% Bank/PayID discount is applied automatically!');
      return false;
    }
  };

  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);

  // Alt-payment (Bank Transfer / PayID) 5% discount
  const baseDiscount = subtotal * (SITE.orderRules.altPaymentDiscountPercent / 100);
  const promoDiscount = discountCodeApplied ? subtotal * 0.05 : 0;
  const discount = Number((baseDiscount + promoDiscount).toFixed(2));

  // Refrigerated delivery rule: $1000 threshold for free delivery, otherwise $20 flat rate
  const shipping = subtotal === 0 || subtotal >= SITE.orderRules.freeShippingThreshold ? 0 : SITE.orderRules.flatShippingFee;
  const total = Number(Math.max(0, subtotal - discount + shipping).toFixed(2));
  const isMinOrderMet = subtotal >= SITE.orderRules.minOrder || subtotal === 0;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / SITE.orderRules.freeShippingThreshold) * 100));
  const itemCount = items.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        subtotal,
        discount,
        shipping,
        total,
        isMinOrderMet,
        freeShippingProgress,
        discountCode,
        setDiscountCode,
        applyDiscountCode,
        discountCodeError,
        discountCodeApplied,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
