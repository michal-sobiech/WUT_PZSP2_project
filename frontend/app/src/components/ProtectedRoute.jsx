import useToken from "../hooks/useToken";
import { useEffect, useState } from "react";
import MyContext from '../contexts/MyContext';
import { useLocation } from "react-router-dom";
import * as restutils from "../utils/restutils" 

export default function ProtectedRoute({ backendUrl, successChild, failureChild }) {
  let [token, setToken] = useToken();
  let [data, setData] = useState({});
  let [child, setChild] = useState(<div>Loading</div>);
  let location = useLocation();

  useEffect(() => {
    async function getData() {
      console.log('TOKEN: ' + token);
      const response = await restutils.get(backendUrl, token);
      if (response.ok) {
        let responseJson = await response.json();
        console.log(responseJson);
        setData(responseJson);
        setChild(
          responseJson['status'] === 'success'? successChild: failureChild
        )
      } else {
        setChild(failureChild);
      }      
    }
    getData();
  }, [location]);

  return (
    <MyContext.Provider value={data}>
        <div>{child}</div>
    </MyContext.Provider>
  );
}