import { getProduct } from '@/lib/products'
import type { CartItem } from '@/lib/store'

export function cartItemName(item: CartItem): string {
  return getProduct(item.slug)?.name ?? item.slug
}

export function cartItemImage(item: CartItem): string {
  return getProduct(item.slug)?.image ?? '/placeholder.svg'
}

export function cartItemPrice(item: CartItem): number {
  return getProduct(item.slug)?.price ?? 0
}
