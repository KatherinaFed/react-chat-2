import './Signup.scss';
import AddAvatar from '../../assets/addAvatar.png'

function Signup() {
  return (
    <div className="signup_container">
      <div className="signup_wrapper">
        <span className="signup_logo">Wonder Chat ✨</span>
        <span className="signup_title">Sign Up</span>
        <form>
          <input type="text" placeholder="Display name" />
          <input type="email" placeholder="Emal" />
          <input type="password" placeholder="Password" />
          <input style={{ display: 'none' }} type="file" id="file" />
          <label htmlFor="file">
            <img src={AddAvatar} alt="add_avatar_icon" width={34} />
            <span>Add an avatar</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>You already have an account? Login</p>
      </div>
    </div>
  );
}

export default Signup;
