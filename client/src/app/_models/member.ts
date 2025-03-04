import { Photo } from "./Photo"

export interface Member {
    id: number
    username: string
    age: number
    photoUrl: string
    knownAs: string
    created: Date
    lastActive: Date
    gender: string
    introduction: string
    interests: any
    lookingFor: string
    country: string
    city: string
    photos: Photo[]
  }
  
