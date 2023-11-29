import { useState } from 'react';
import './Signup.scss';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import AddAvatar from '../../assets/addAvatar.png';
import { auth, db, storage } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

function Signup() {
  const [error, setError] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const displayName: string = formData.get('displayName') as string;
    const email: string = formData.get('email') as string;
    const password: string = formData.get('password') as string;
    const file = formData.get('file') as File;

    try {
      // create a user
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask?.on(
        'state_changed',
        (error) => {
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(response.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'users', response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_wrapper">
        <span className="signup_logo">Wonder Chat ✨</span>
        <span className="signup_title">Sign Up</span>
        <form onSubmit={handleSubmit}>
          <input type="text" name="displayName" placeholder="Display name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input
            style={{ display: 'none' }}
            name="file"
            type="file"
            id="file"
          />
          <label htmlFor="file">
            <img src={AddAvatar} alt="add_avatar_icon" width={34} />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
          {error && <span>Something went wrong...</span>}
        </form>
        <p>You already have an account? Login</p>
      </div>
    </div>
  );
}

export default Signup;
