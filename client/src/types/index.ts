export type Image = {
  id: string
  dataUrl: string
  name?: string
  size?: number
}

export type Product = {
  id: number
  name: string
  description: string
  images: Array<Image>
  price: number
}

export type Collection = {
  id: number
  name: string
  description: string
  active: boolean
  userId: number
  imageUrl: string
}

export type Message = {
  success?: string
  error?: string
}

export type CartProduct = {
  id: number
  quantity: number
}

export type CartStore = {
  endpoint: string
  products: Array<CartProduct>
}

export type Cart = Array<CartStore>