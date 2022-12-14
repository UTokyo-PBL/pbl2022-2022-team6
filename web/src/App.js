import './App.css';
import instance from "./axios";

function App() {
  const login = () => {
      instance.post('/user/login', {
          email: 'example@translango.com',
          password: 'passw0rd',
      }).then((response) => {
          console.log(response)
          console.log(response.headers)
      }).catch((error) => {
          console.log(error)
      })
  }
  const profile = () => {
      instance.get('/user/profile')
          .then((response) => {
              console.log(response)
          })
          .catch((error) => {
              console.log(error)
          })
  }
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={login}>Login</button>
      <br/>
      <button onClick={profile}>Profile</button>
    </div>
  );
}

export default App;
