export type ImageType = {
  id: string
  dataUrl: string
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

export type CollectionType = {
  id: number
  name: string
  description: string
  active: boolean
  userId: number
  imageUrl: string
}

export type ContextType = {
  user: {
    id: number
  },
  _extensionStack: any
}