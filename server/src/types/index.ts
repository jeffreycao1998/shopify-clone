export type ImageType = {
  id: string
  data_url: string
  name?: string
  size?: number
}

export type ProductType = {
  id: number
  name: string
  description: string
  images: Array<ImageType>
  price: number
}

export type ContextType = {
  user: {
    id: number
  },
  _extensionStack: any
}