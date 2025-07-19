// app/cart/page.tsx or app/cart/page.jsx
import ShoppingCart from '@/components/cart/ShoppingCart'
import { Container } from '@/components/shared/Container'
import React from 'react'

export default function Page() {
  return (
    <div>
        <ShoppingCart />
    </div>
  )
}

