import { StateCreator } from 'zustand';
import { CartItem } from '../../types';

interface CartSlice {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

export const cartSlice: StateCreator<CartSlice> = (set) => ({
  cart: [],
  
  addToCart: (item) => set((state) => {
    const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      return {
        cart: state.cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      };
    }
    return { 
      cart: [...state.cart, { 
        id: item.id,
        name: item.name,
        price: typeof item.price === 'number' ? item.price : 0,
        quantity: 1
      }] 
    };
  }),
  
  removeFromCart: (itemId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== itemId)
  })),
  
  updateCartItemQuantity: (itemId, quantity) => set((state) => ({
    cart: quantity > 0 
      ? state.cart.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      : state.cart.filter((item) => item.id !== itemId)
  })),
  
  clearCart: () => set({ cart: [] })
});