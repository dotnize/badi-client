import { randomUUID } from "expo-crypto";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAn5I5inz6GHSEnY8p0PKs7kG547J1OB4Q",
  authDomain: "badi-ph.firebaseapp.com",
  projectId: "badi-ph",
  storageBucket: "badi-ph.appspot.com",
  messagingSenderId: "433729763988",
  appId: "1:433729763988:web:90b0f2af57a851809e5281",
};
const firebase = initializeApp(firebaseConfig);

export const storage = getStorage(firebase);

// placeholder images
export const defaultAvatarUrl =
  "https://firebasestorage.googleapis.com/v0/b/badi-ph.appspot.com/o/defaultAvatar.jpg?alt=media&token=2db03c5b-886a-4b01-a6ef-972e91146908";
export const emptyImageUrl =
  "https://firebasestorage.googleapis.com/v0/b/badi-ph.appspot.com/o/emptyImage.jpg?alt=media&token=a6f8ae23-2cfb-4981-8e25-178435ff32cd";

export async function uploadAndGetURL(uri: string) {
  try {
    const res = await fetch(uri);
    const blob = await res.blob();

    const fileRef = ref(storage, `/images/${randomUUID()}`);

    await uploadBytes(fileRef, blob);

    return await getDownloadURL(fileRef);
  } catch (err) {
    console.error(err);
  }
}
