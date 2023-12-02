import { useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

function Login() {
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const email: string = formData.get('email') as string;
    const password: string = formData.get('password') as string;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="login_container">
      <div className="login_wrapper">
        <span className="login_logo">Wonder Chat ✨</span>
        <span className="login_title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>Login</button>
          {error && <span className="error_msg">Something went wrong...</span>}
        </form>
        <p>
          You don't have an account? <Link to={'/signup'}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
