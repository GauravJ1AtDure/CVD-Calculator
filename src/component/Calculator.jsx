import React , {useState, useEffect} from 'react'
import regionlists from './RegionData';
import CalculateTable from './CalculateTable';

function Calculator() {
   const [regionOfCountries, setRegionOfCountries]=useState(regionlists)
    const [countryArr, setCountryArr] = useState([]);
    const [labBasedArr, setLabBasedArr]=useState([]);
    const [nonLabBasedArr, setNonLabBasedArr]=useState([]);
    const [country, setCountry]=useState('');
    const [region, setRegion]=useState()
    const [gender, setGender]=useState();
    const [useEffectArr, setUseEffectArr]=useState(1);
    const [calArr, setCalArr]=useState([])



    useEffect(() => {

         //setRegionOfCountries(regionlists)
         getCountryData()
         getLabBasedData()
         getNonLabBasedData()
        // getArr()
     },[useEffectArr]);


     const handleChange = (e,c) => {
      setUseEffectArr(useEffectArr+1)
      c=e.target.value
      setCountry(c)
      let reg=regionOfCountries[0][c];
      setRegion(reg)
      };


      const changeGender=(e,g)=>{
      g=e.target.value
      setUseEffectArr(useEffectArr+1)
      setGender(g)
      }


     const getCountryData=()=>{
     fetch('https://ncd-pen.duredemos.com/json/countries?_format=json')
           .then((response) => response.json())
           .then((countryData) => {
              setCountryArr(countryData);
           })
           .catch((err) => {
              console.log(err.message);
           });
           //console.log('countryArr',countryArr);
         }


         const getLabBasedData=()=>{
            fetch('https://ncd-pen.duredemos.com/json/lab-based?_format=json')
                  .then((response) => response.json())
                  .then((labData) => {
                     setLabBasedArr(labData);
                  })
                  .catch((err) => {
                     console.log(err.message);
                  });
                  //console.log('labBasedArr',labBasedArr);
                
                }


         const getNonLabBasedData=()=>{
               fetch('https://ncd-pen.duredemos.com/json/lab-based?_format=json')
                        .then((response) => response.json())
                        .then((nonLabData) => {
                           setNonLabBasedArr(nonLabData);
                           
                        })
                        .catch((err) => {
                           console.log(err.message);
                        });
                        //console.log('nonLabBasedArr',nonLabBasedArr);
                        
                      }

const getArr=()=>{
   let newArray = labBasedArr.filter((val) => {return(
            val.region===region && val.gender===gender)
   })
   setCalArr(newArray)
   
   
}
const getData=()=>{
   console.log(calArr)
}

    
      
     return (
        <div className="container">
        LAB BASED CVD RISK
         <select className="form-select" aria-label="Default select example" onChange={handleChange}>
            <option defaultValue>Select Country</option>
               {countryArr.map((elements, index) => {
              return (
               <option key={index} value={elements.country}>{elements.country}</option>
              );
           })}
          </select>
          <input className="form-control" type="number" placeholder="Age (40 to 74 years only)" />
          <select className="form-select" aria-label="Default select example" onChange={changeGender}>
          <option defaultValue>Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          </select>
          <select className="form-select" aria-label="Default select example" onChange={getArr}>
          <option defaultValue>Smoking</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          </select>
          <select className="form-select" aria-label="Default select example">
          <option defaultValue>Diabetes</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          </select>
          <input className="form-control" type="number" placeholder="Systolic BP" />
          <input className="form-control" type="number" placeholder="Total cholestrol (in mmol)" />
          <button onClick={getData}>getData</button>
          {/* <CalculateTable title={calArr[0].title===undefined ? 'data not loaded yet' : calArr[0].title} region={calArr[0].region} gender={calArr[0].gender}
         age_chd={calArr[0].age_chd} age_stroke={calArr[0].age_stroke} chol_chd_1={calArr[0].chol_chd_1}
         chol_chd_2={calArr[0].chol_chd_2} chol_stroke_1={calArr[0].chol_stroke_1} chol_stroke_2={calArr[0].chol_stroke_2}
         sys_chd_1={calArr[0].sys_chd_1} sys_chd_2={calArr[0].sys_chd_2} sys_stroke_1={calArr[0].sys_stroke_1}
         sys_stroke_2={calArr[0].sys_stroke_2} diab_chd_1={calArr[0].diab_chd_1} diab_chd_2={calArr[0].diab_chd_2}
         diab_stroke_1={calArr[0].diab_stroke_1} diab_stroke_2={calArr[0].diab_stroke_2} smok_chd_1={calArr[0].smok_chd_1} smok_chd_2={calArr[0].smok_chd_2} smok_stroke_1={calArr[0].smok_stroke_1} smok_stroke_2={calArr[0].smok_stroke_2}
         uncalibrated_chd={calArr[0].uncalibrated_chd} calibrated_chd1={calArr[0].calibrated_chd1} calibrated_chd2={calArr[0].calibrated_chd2} uncalibrated_stroke={calArr[0].uncalibrated_stroke} calibrated_stroke1={calArr[0].calibrated_stroke1} calibrated_stroke2={calArr[0].calibrated_stroke2}/> */}
        </div>
        );
  
}


export default Calculator;