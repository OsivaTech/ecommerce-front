'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { Product } from '@/types/api/Response/ProductResponse'
import toast from 'react-hot-toast'

export type CartItem = {
  product: Product
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const cartItems = localStorage.getItem('cartItems')
    if (cartItems) {
      setItems(JSON.parse(cartItems))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items))
  }, [items])

  const addToCart = (product: Product, quantity: number) => {
    if (quantity > product.stock) {
      toast.error(
        `Estoque insuficiente! Temos apenas ${product.stock} unidade${product.stock === 1 ? '' : 's'} de ${product.name}`,
      )
      return
    }

    const existingItem = items.find((item) => item.product.id === product.id)

    if (existingItem) {
      const newTotalQuantity = existingItem.quantity + quantity
      if (newTotalQuantity > product.stock) {
        toast.error(
          `Estoque insuficiente! Você já tem ${existingItem.quantity} no carrinho e temos apenas ${product.stock} unidade${product.stock === 1 ? '' : 's'} disponível${product.stock === 1 ? '' : 's'} de ${product.name}`,
        )
        return
      }

      toast.success(
        `Quantidade atualizada para ${existingItem.quantity + quantity} unidades`,
      )
    } else {
      toast.success(`${product.name} adicionado ao carrinho`)
    }

    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id,
      )

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      } else {
        return [...prevItems, { product, quantity }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    const itemToRemove = items.find((item) => item.product.id === productId)
    if (itemToRemove) {
      toast.success(`${itemToRemove.product.name} removido do carrinho`)
    }
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId),
    )
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    const item = items.find((item) => item.product.id === productId)
    if (item && quantity > item.product.stock) {
      toast.error(
        `Estoque insuficiente! Temos apenas ${item.product.stock} unidade${item.product.stock === 1 ? '' : 's'} disponível${item.product.stock === 1 ? '' : 's'} de ${item.product.name}`,
      )
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => {
    setItems([])
    localStorage.removeItem('cartItems')
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + (item.product.price || 0) * item.quantity,
      0,
    )
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
