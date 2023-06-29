import React, {useState} from 'react'

const LabCalculation=(props)=> {

  const [cvdRiskValLab, setCvdRiskValLab]=useState();

  let { labCalData, country, age, usrGender, smoking, diabetes, bp, cholestrol } = props;


  let usrAge=parseInt(age)
  let usrBp=parseInt(bp)
  let usrChol=parseFloat(cholestrol)
  
  
    let rfAge, rfTotChol, rfCholestrol, rfSysBp, rfDibetes, rfSmoking;

    rfAge=usrAge-60
    rfTotChol=usrChol-6
    rfCholestrol=parseFloat(rfTotChol)
    rfSysBp=usrBp-120
    rfDibetes=diabetes==='yes'? 1 : 0
    rfSmoking=smoking==='yes'? 1 : 0 


    const calLabCvd=(chdAge, chdChol, chdBp, chdDibetes, chdSmoking, chdTot, strokeAge, strokeChol, strokeBp, strokeDibetes, strokeSmoking, strokeTot, uncalibratedProbChd, calibratedProbChd, uncalibratedProbStroke, calibratedProbStroke, calibratedProbCvd, finalCvdRiskPrediction)=>{

      let { title, region, gender, age_chd, age_stroke, chol_chd_1, chol_chd_2, chol_stroke_1, chol_stroke_2, sys_chd_1, sys_chd_2, sys_stroke_1, sys_stroke_2, diab_chd_1, diab_chd_2, diab_stroke_1, diab_stroke_2, smok_chd_1, smok_chd_2, smok_stroke_1, smok_stroke_2, uncalibrated_chd, calibrated_chd1, calibrated_chd2, uncalibrated_stroke, calibrated_stroke1, calibrated_stroke2 } = labCalData;


        chdAge=age_chd*rfAge
        chdChol=chol_chd_1*rfCholestrol-chol_chd_2*rfAge*rfCholestrol
        chdBp=sys_chd_1*rfSysBp-sys_chd_2*rfAge*rfSysBp
        chdDibetes=diab_chd_1*rfDibetes-diab_chd_2*rfAge*rfDibetes
        chdSmoking=smok_chd_1*rfSmoking-smok_chd_2*rfAge*rfSmoking
        chdTot=chdAge+chdChol+chdBp+chdDibetes+chdSmoking
        

        strokeAge=age_stroke*rfAge
        strokeChol=chol_stroke_1*rfCholestrol+chol_stroke_2*rfAge*rfCholestrol
        strokeBp=sys_stroke_1*rfSysBp-sys_stroke_2*rfAge*rfSysBp
        strokeDibetes=diab_stroke_1*rfDibetes-diab_stroke_2*rfAge*rfDibetes
        strokeSmoking=smok_stroke_1*rfSmoking-smok_stroke_2*rfAge*rfSmoking
        strokeTot=strokeAge+strokeChol+strokeBp+strokeDibetes+strokeSmoking

        
        uncalibratedProbChd = (1-uncalibrated_chd ** Math.exp(chdTot))
        
        let calibrated_chd1Int=parseFloat(calibrated_chd1)
        let calibrated_chd2Int=parseFloat(calibrated_chd2)
        
        calibratedProbChd = 1-Math.exp(-Math.exp(calibrated_chd1Int+calibrated_chd2Int*Math.log(-Math.log(1-uncalibratedProbChd))))

        uncalibratedProbStroke = 1-uncalibrated_stroke ** Math.exp(strokeTot)

        let calibrated_stroke1Int=parseFloat(calibrated_stroke1)
        let calibrated_stroke2Int=parseFloat(calibrated_stroke2)
        
        calibratedProbStroke = 1-Math.exp(-Math.exp(calibrated_stroke1Int+calibrated_stroke2Int*Math.log(-Math.log(1-uncalibratedProbStroke))))

        calibratedProbCvd = 1-(1-calibratedProbChd)*(1-calibratedProbStroke)

        finalCvdRiskPrediction=Math.round(calibratedProbCvd*100)
        setCvdRiskValLab(finalCvdRiskPrediction) 
    }
    const getVal=()=>{console.log('labCalData',labCalData)}

  return (
    <div>
      <button id='labCalBtn' className='btn btn-sm btn-primary my-1' onClick={calLabCvd}>CALCULATE LAB BASED CVD</button>
      <p>{cvdRiskValLab}</p>
      <button onClick={getVal}>get labCalData</button>
    </div>
  )
}

export default LabCalculation;
