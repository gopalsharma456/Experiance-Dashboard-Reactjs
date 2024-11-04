import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [inputs, setInputs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name);
    console.log(value);

    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const getLocationFromApi = async () => {
    // const payload = {
    //   header: {
    //     Authorization: 'Bearer ' + localStorage.getItem('token')
    //   }
    // }
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/positions"
    );
    console.log(response.data);
    setLocations(response.data.data);
  };

  useEffect(() => {
    getLocationFromApi(setLocations);
  }, []);

  const handleChecked = () => {
    setChecked((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputs(inputs);
    console.log("form submitted", inputs);
    // setInputs([])
  };

  return (
    <>
      <h1>Experience Dashboard</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="title">
          Job title
          <input
            type="text"
            placeholder="Enter your job title"
            name="jobTitle"
            value={inputs.jobTitle || ""}
            onChange={handleChange}
          />
        </label>

        <label title="company-name">
          Company Name
          <input
            type="text"
            placeholder="Enter your company name"
            name="companyName"
            value={inputs.companyName || ""}
            onChange={handleChange}
          />
        </label>

        <div className="checkbox">
          <label>
            <input type="checkbox" name="checkbox" onChange={handleChange} onClick={handleChecked}/>
            Current Company
          </label>
        </div>

        <select className="select">
          {locations.map((location) => {
            return (
              <option
                key={`${location.name}${location.iso2}`}
                value={location.name}
                onChange={handleChange}
                name="locationName"
              >
                {location.name}
              </option>
            );
          })}
        </select>

        <input type="submit" />
      </form>
    </>
  );
}

export default App;
