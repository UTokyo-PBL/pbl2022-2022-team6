// --------->>> INSTANCES
// INSTANCE: Type for objects stored from images
export type objectType = {
    objectId: string
    timeStamp: Date
    userId: string
    modelOutput : number []
    english : string
    url: string
    latitude? : number
    longitude?: number
    caption?: string
    favourite?: boolean
}