export type Image = {
  id: string
  data_url: string
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
  user_id: number
  image_url: string
}