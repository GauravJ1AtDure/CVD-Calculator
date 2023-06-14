import React , {useState, useEffect} from 'react'

function Calculator() {
    const [countryArr, setCountryArr] = useState([]);
    const [labBasedArr, setLabBasedArr]=useState([]);
    const [nonLabBasedArr, setNonLabBasedArr]=useState([]);
    const [country, setCountry]=useState();
    const [useEffectArr, setUseEffectArr]=useState(1);

    useEffect(() => {

      
         getCountryData()
         getLabBasedData()
         getNonLabBasedData()
       
      
     }
     , [useEffectArr]);


     const getCountryData=()=>{
     fetch('https://ncd-pen.duredemos.com/json/countries?_format=json')
           .then((response) => response.json())
           .then((countryData) => {
              setCountryArr(countryData);
           })
           .catch((err) => {
              console.log(err.message);
           });
           console.log('countryArr',countryArr);
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
                  console.log('labBasedArr',labBasedArr);
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
                        console.log('nonLabBasedArr',nonLabBasedArr);
                        
                      }



     const handleChange = (e) => {
      console.log(e.target.value)
      setUseEffectArr(useEffectArr+1)
      };



      
     return (
        <div className="container">
            <select className="form-select" aria-label="Default select example" onChange={handleChange}>
            <option defaultValue>Select Country</option>
               {countryArr.map((elements, index) => {
              return (
               <option key={index} value={elements.country}>{elements.country}</option>
              );
           })}
          </select>
          <p>{country}</p>
        </div>
        );
  
}


export default Calculator;