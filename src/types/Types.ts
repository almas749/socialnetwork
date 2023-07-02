export type PostType = {
    id: number
    message: string
    likeCount: number
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean    
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}   

export type UserDataType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type FriendType = {
    id: number
    name: string
    imgUrl: string
}