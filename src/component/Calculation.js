import React, {useState} from 'react'

const Calculation=(props)=> {

  const [chdValue, setChdValue]=useState();
  const [strokeValue, setstrokeValue]=useState();

  let { calData, country, age, usrGender, smoking, diabetes, bp, cholestrol } = props;
  
 

    let rfAge, rfTotChol, rfRoundChol, rfSysBp, rfDibetes, rfSmoking;

    rfAge=age-60
    rfTotChol=cholestrol-6
    rfRoundChol=rfTotChol.toFixed(1)
    rfSysBp=bp-120
    rfDibetes=diabetes==='yes'? 1 : 0
    rfSmoking=smoking==='yes'? 1 : 0 


    const getArr1=(chdAge, chdChol, chdBp, chdDibetes, chdSmoking, chdTot, strokeAge, strokeChol, strokeBp, strokeDibetes, strokeSmoking, strokeTot, uncalibratedProbChd, calibratedProbChd)=>{

      let { title, region, gender, age_chd, age_stroke, chol_chd_1, chol_chd_2, chol_stroke_1, chol_stroke_2, sys_chd_1, sys_chd_2, sys_stroke_1, sys_stroke_2, diab_chd_1, diab_chd_2, diab_stroke_1, diab_stroke_2, smok_chd_1, smok_chd_2, smok_stroke_1, smok_stroke_2, uncalibrated_chd, calibrated_chd1, calibrated_chd2, uncalibrated_stroke, calibrated_stroke1, calibrated_stroke2 } = calData;

      

        chdAge=age_chd*rfAge
        chdChol=chol_chd_1*rfRoundChol-chol_chd_2*rfAge*rfRoundChol
        chdBp=sys_chd_1*rfSysBp-sys_chd_2*rfAge*rfSysBp
        chdDibetes=diab_chd_1*rfDibetes-diab_chd_2*rfAge*rfDibetes
        chdSmoking=smok_chd_1*rfSmoking-smok_chd_2*rfAge*rfSmoking
        chdTot=chdAge+chdChol+chdBp+chdDibetes+chdSmoking
        
        setChdValue(chdTot)


        strokeAge=age_stroke*rfAge
        strokeChol=chol_stroke_1*rfRoundChol+chol_stroke_2*rfAge*rfRoundChol
        strokeBp=sys_stroke_1*rfSysBp-sys_stroke_2*rfAge*rfSysBp
        strokeDibetes=diab_stroke_1*rfDibetes-diab_stroke_2*rfAge*rfDibetes
        strokeSmoking=smok_stroke_1*rfSmoking-smok_stroke_2*rfAge*rfSmoking
        strokeTot=strokeAge+strokeChol+strokeBp+strokeDibetes+strokeSmoking

        setstrokeValue(strokeTot)
        
        uncalibratedProbChd = (1-uncalibrated_chd ** Math.exp(chdTot))
        let a = calibrated_chd1+calibrated_chd2*Math.log(-Math.log(1-uncalibratedProbChd))
        console.log(a)


        
       
    }


  return (
    <div>
      <button onClick={getArr1}>Get Array</button>
      <p></p>
    </div>
  )
}

export default Calculation;
