import { useEffect, useReducer } from 'react';
import user from './components/data';
import './App.css';
import user from './components/data';

const initialState = {
  name: "",
  email: "",
  bio: "",
  originalUser: null
};

function formReducer(state, action){
  switch(action.type) {
    case "LOAD_USER":
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        bio: action.payload.bio,
        originalUser: action.payload
      }
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.field]: action.payload.value
      }
    case "RESET_FORM":
      return {
        ...state,
        name: state.originalUser.name,
        email: state.originalUser.email,
        bio: state.originalUser.bio
      }
    default:
      return state
  }
}



function App() {
  const [state, dispatch] = useReducer(formReducer, initialState)

  useEffect(()=>{
    dispatch({type: "LOAD_USER", payload: user});
  },[])

  const handleChange = (e) => {
    dispatch({type: "UPDATE_FIELD", payload: {
      field: e.target.name,
      value: e.target.value
    }})
  }

  return (
    <div className="App">
      <div>
      <h1>React ใช้ .jsx ได้! 🚀</h1>
      <input name="name" onChange={handleChange}/>
      <input name="email" onChange={handleChange}/>
      <input name="bio" onChange={handleChange}/>
      <button onClick={() => dispatch({type: "RESET_FORM"})}>Reset</button>
      <h1>{state.name} {state.email} {state.bio}</h1>
    </div>
    </div>
  );
}

export default App;
