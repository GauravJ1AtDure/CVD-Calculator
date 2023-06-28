import React, { useState, useEffect } from "react";
import regionlists from "./RegionData";
import LabCalculation from "./LabCalculation";
import NonLabCalculation from "./NonLabCalculation";

function Calculator() {
  const [regionOfCountries, setRegionOfCountries] = useState(regionlists);
  const [countryArr, setCountryArr] = useState([]);
  const [labBasedArr, setLabBasedArr] = useState([]);
  const [nonLabBasedArr, setNonLabBasedArr] = useState([]);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState();
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [smoke, setSmoke] = useState();
  const [bp, setBp] = useState();
  const [cholestrol, setCholestrol] = useState();
  const [diabetes, setDiabetes] = useState();
  const [bmi, setBmi] = useState();
  const [useEffectArr, setUseEffectArr] = useState(1);
  const [labCalArr, setLabCalArr] = useState([]);
  const [nonLabCalArr, setNonLabCalArr] = useState([]);
  const [calTitle, setCalTitle] = useState('LAB BASED CVD RISK');


  const getCountryData = () => {
   fetch("https://ncd-pen.duredemos.com/json/countries?_format=json")
     .then((response) => response.json())
     .then((countryData) => {
       setCountryArr(countryData);
     })
     .catch((err) => {
       console.log(err.message);
     });
 };

 const getLabBasedData = () => {
   fetch("https://ncd-pen.duredemos.com/json/lab-based?_format=json")
     .then((response) => response.json())
     .then((labData) => {
       setLabBasedArr(labData);
     })
     .catch((err) => {
       console.log(err.message);
     });
 };

 const getNonLabBasedData = () => {
   fetch("https://ncd-pen.duredemos.com/json/nonlab-based?_format=json")
     .then((response) => response.json())
     .then((nonLabData) => {
       setNonLabBasedArr(nonLabData);
     })
     .catch((err) => {
       console.log(err.message);
     });
 };


  useEffect(() => {
    getCountryData();
    getLabBasedData();
    getNonLabBasedData();

    let labArray = labBasedArr.filter((val) => {
      return val.region === region && val.gender === gender;
    });
    let nonLabArray = nonLabBasedArr.filter((val) => {
      return val.region === region && val.gender === gender;
    });
    setLabCalArr(...labArray);
    setNonLabCalArr(...nonLabArray);
    // eslint-disable-next-line
  }, [useEffectArr]);


 const setLabType=(e)=>{
  setUseEffectArr(useEffectArr + 1);
  if(e.target.value==='LAB BASED CVD RISK')
  {
    setCalTitle(e.target.value)
    document.getElementById("bmiSec").style.display = "none";
    document.getElementById("cholestrolSec").style.display = "";
    document.getElementById("diabetesSec").style.display = "";
    
  }
  else if(e.target.value !=='LAB BASED CVD RISK')
  {
    setCalTitle(e.target.value)
    document.getElementById("cholestrolSec").style.display = "none";
    document.getElementById("diabetesSec").style.display = "none";
    document.getElementById("bmiSec").style.display = "";
    
  }
 }


  const updateRegion = (e, c) => {
    c = e.target.value;
    setCountry(c);
    setRegion(regionOfCountries[c]);
    setUseEffectArr(useEffectArr + 1);
  };

  const changeGender = (e) => {
    setGender(e.target.value);
    setUseEffectArr(useEffectArr + 1);
  };

  const getAge = (e) => {
    setAge(e.target.value);
    setUseEffectArr(useEffectArr + 1);
  };

  const getSmoke = (e) => {
    setSmoke(e.target.value);
    setUseEffectArr(useEffectArr + 1);
  };

  const getDiabetes = (e) => {
    setDiabetes(e.target.value);
    setUseEffectArr(useEffectArr + 1);
  };

  const getBp = (e) => {
    setBp(e.target.value);
    setUseEffectArr(useEffectArr + 1);
  };

  const getCholestrol = (e) => {
    setCholestrol(e.target.value);
    setUseEffectArr(useEffectArr + 1);
  };

  const getBmi = (e) => {
    setBmi(e.target.value);
    setUseEffectArr(useEffectArr + 1);
  }

  

  return (
    <div className="container">
      <select className="form-select" aria-label="Default select example" onChange={setLabType}>
        <option defaultValue>LAB BASED CVD RISK</option>
        <option value="NON LAB BASED CVD RISK">NON-LAB BASED CVD RISK</option>
        </select>
      <select className="form-select" aria-label="Default select example" onChange={updateRegion}>
        <option defaultValue>Select Country</option>
        {countryArr.map((elements, index) => {
          return (
            <option key={index} value={elements.country}>{elements.country}</option>
          );
        })}
      </select>
      <input className="form-control" type="number" placeholder="Age (40 to 74 years only)" onChange={getAge}/>
      <select className="form-select" aria-label="Default select example" onChange={changeGender}>
        <option defaultValue>Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select className="form-select" aria-label="Default select example" onChange={getSmoke}>
        <option defaultValue>Smoking</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      <select id="diabetesSec" className="form-select" aria-label="Default select example" onChange={getDiabetes}>
        <option defaultValue>Diabetes</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
      <input className="form-control" type="number" placeholder="Systolic BP" onChange={getBp}/>
      <input id="bmiSec" className="form-control" type="number" placeholder="BMI" onChange={getBmi}/>
      <input id="cholestrolSec" className="form-control" type="number" placeholder="Total cholestrol (in mmol)" onChange={getCholestrol}/>
      <LabCalculation labCalData={labCalArr}
        country={country}
        age={age}
        usrGender={gender}
        smoking={smoke}
        diabetes={diabetes}
        bp={bp}
        cholestrol={cholestrol}
        btnTitle={calTitle}
      />
      <NonLabCalculation nonLabcalData={nonLabCalArr}
        country={country}
        age={age}
        usrGender={gender}
        smoking={smoke}
        bp={bp}
        bmi={bmi}
        btnTitle={calTitle}
      />
    </div>
  );
}

export default Calculator;
