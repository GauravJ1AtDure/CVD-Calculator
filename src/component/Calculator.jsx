import React , {useState, useEffect} from 'react'
import regionlists from './RegionData';

function Calculator() {
    const [countryArr, setCountryArr] = useState([]);
    const [labBasedArr, setLabBasedArr]=useState([]);
    const [nonLabBasedArr, setNonLabBasedArr]=useState([]);
    const [country, setCountry]=useState('');
    const [region, setRegion]=useState('')
    const [gender, setGender]=useState('');
    const [useEffectArr, setUseEffectArr]=useState(1);
    const [regionOfCountries, setRegionOfCountries]=useState([])
    const [calArr, setCalArr]=useState([])



    useEffect(() => {

         setRegionOfCountries(regionlists)
         getCountryData()
         getLabBasedData()
         getNonLabBasedData()
         
     },[useEffectArr]);

     const handleChange = (e,c) => {
      setUseEffectArr(useEffectArr+1)
      c=e.target.value
      setCountry(c)
      let reg=regionOfCountries.map((val)=>val[c])
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
                 // console.log('labBasedArr',labBasedArr);
                
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

/*const getArr=()=>{
   let newArray = labBasedArr.map((val)=>val[country])
   console.log('newArray',newArray);
   setCalArr(newArray)
   
}
*/
    
      
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
          <select className="form-select" aria-label="Default select example">
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
          <p>{region}{gender}</p>
        </div>
        );
  
}


export default Calculator;