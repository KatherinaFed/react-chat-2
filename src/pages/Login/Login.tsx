import './Login.scss';

function Login() {
  return (
    <div className="login_container">
      <div className="login_wrapper">
        <span className="login_logo">Wonder Chat ✨</span>
        <span className="login_title">Login</span>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
        </form>
        <p>You don't have an account? Sign Up</p>
      </div>
    </div>
  );
}

export default Login;
