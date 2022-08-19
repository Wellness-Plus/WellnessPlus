import { useEffect, useState } from "react";
import axios from "axios";

import GoalList from "../GoalList/GoalList";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const GoalDashboard = (props) => {

  const [goals, setGoals] = useState([]);
  const [category, setCategory] = useState("nutrition");
  const [complete, setComplete] = useState({});
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/current-user', { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        setUser(res.data.firstName);
        
        //TODO get all three goals from backend
        axios.get(`http://localhost:8000/api/${category}/user/${res.data._id}`, { withCredentials: true})
        .then(res => {
          console.log(res.data)
          setGoals(res.data)

          let tempComplete = {};
          res.data.map((goal) => tempComplete[goal._id] = goal.complete);
          setComplete(tempComplete);
        })
        .catch(err => console.log(err));
        
      })
      .catch((err) => console.log(err)); 
  }, [category]);
  
  return (
    <div className="m-5">
      <div className="my-3">
        <h2>Welcome {user} !</h2>
      </div>
      <div className="mx-5 mt-5">
        <ButtonGroup>
          <Button onClick={ (e) => setCategory(e.target.value) } value={'nutrition'}>Nutrition</Button>
          <Button onClick={ (e) => setCategory(e.target.value) } value={'fitness'}>Fitness</Button>
          <Button onClick={ (e) => setCategory(e.target.value) } value={'mindfulness'}>Mindfulness</Button>
        </ButtonGroup>
      </div>
      <GoalList setGoals={setGoals} goals={goals} category={category} complete={complete} setComplete={setComplete}/>
    </div>
  )
}
export default GoalDashboard;