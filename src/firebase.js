import {initializeApp} from "firebase/app"
import "firebase/auth"
import { getAuth } from "firebase/auth"
import {getFirestore} from "@firebase/firestore"

const app = initializeApp({
 /* key not availabele */
})

 export const  auth = getAuth(app)

 export const db = getFirestore(app)

