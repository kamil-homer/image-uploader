import { auth, storage } from "../firebase/firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import { ref, uploadBytesResumable } from "firebase/storage";

export const logInAnonymously = async () => {
  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.log(error);
  }
};

export const uploadToFirebaseStorage = (file: File, filename: string) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const storageRef = ref(storage, `${user.uid}/user_images/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return uploadTask;
    } else {
      throw new Error("Error while getting user");
    }
  } catch (error) {
    console.error(error);
  }
};
