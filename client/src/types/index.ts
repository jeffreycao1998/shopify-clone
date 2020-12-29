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