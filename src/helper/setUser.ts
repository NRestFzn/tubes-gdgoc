import { auth } from '@/firebase';
import { updateProfile } from 'firebase/auth';

const setUser = async (username: string) => {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: username });
  }
}

export default setUser