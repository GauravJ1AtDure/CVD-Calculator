import React, {useState} from 'react'

function NonLabCalculation(props) {
  const [cvdRiskValNonLab, setCvdRiskValNonLab]=useState();
  const [style, setStyle]=useState(); 

  let { nonLabcalData, nonLabCountry, nonLabAge, nonLabGender, nonLabSmoking, nonLabBp, nonLabBmi } = props;

  
  let usrAge=parseInt(nonLabAge)
  let usrBp=parseInt(nonLabBp)
  let usrBmi=parseFloat(nonLabBmi)

  let rfAge, rfSmoking, rfSysBp, rfBmi ;


    rfAge=usrAge-60
    rfSysBp=usrBp-120
    rfSmoking=nonLabSmoking==='yes'? 1 : 0 
    rfBmi=usrBmi-6
  

  const calNonLabCvd = (chdAge, chdBmi, chdBp, chdSmoking, chdTot, strokeAge, strokeBmi, strokeBp, strokeSmoking, strokeTot, uncalibratedProbChd, calibratedProbChd, uncalibratedProbStroke, calibratedProbStroke, calibratedProbCvd, finalCvdRiskPrediction) =>{

    let { age_chd, age_stroke, bmi_chd_1, bmi_chd_2, bmi_stroke_1, bmi_stroke_2, calibrated_chd1, calibrated_chd2, calibrated_stroke1, calibrated_stroke2, gender, region, smok_chd_1, smok_chd_2, smok_stroke_1, smok_stroke_2, sys_chd_1, sys_chd_2, sys_stroke_1, sys_stroke_2, title, uncalibrated_chd, uncalibrated_stroke } = nonLabcalData;
    
        chdAge=age_chd*rfAge
        chdBmi=bmi_chd_1*rfBmi-bmi_chd_2*rfAge*rfBmi
        chdBp=sys_chd_1*rfSysBp-sys_chd_2*rfAge*rfSysBp
        chdSmoking=smok_chd_1*rfSmoking-smok_chd_2*rfAge*rfSmoking
        chdTot=chdAge+chdBmi+chdBp+chdSmoking

        strokeAge=age_stroke*rfAge
        strokeBmi=bmi_stroke_1*rfBmi-bmi_stroke_2*rfAge*rfBmi
        strokeBp=sys_stroke_1*rfSysBp-sys_stroke_2*rfAge*rfSysBp
        strokeSmoking=smok_stroke_1*rfSmoking-smok_stroke_2*rfAge*rfSmoking
        strokeTot=strokeAge+strokeBmi+strokeBp+strokeSmoking

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
        if(finalCvdRiskPrediction >= 30)
        {
          setStyle({backgroundColor:'brown', 
          color: 'white',
          fontSize: '40px', 
          textAlign: 'center',
          padding: '5px',
          borderRadius: '15px'
        })
        }
        else if (finalCvdRiskPrediction < 30)
        {
          setStyle({backgroundColor:'chartreuse', 
          color: 'black',
          fontSize: '40px',
          textAlign: 'center',
          padding: '5px',
          borderRadius: '15px'
        })
        }
  
        let c = finalCvdRiskPrediction >= 30 ? '≥30' : finalCvdRiskPrediction
        setCvdRiskValNonLab(c+'%') 

  }

  return (
    <div>
      <button id='nonLabCalBtn' disabled={!nonLabcalData} className="btn btn-sm btn-primary my-1" onClick={calNonLabCvd}>CALCULATE NON LAB BASED CVD</button>

   <div style={{textAlign:'center', border: 'solid 0.1px black', padding: '5px', backgroundColor: '#34c717', fontWeight:'bold'}} >10 year risk of a CVD event<br/><span style={style}>{cvdRiskValNonLab}</span></div>
    </div>
  )
}

export default NonLabCalculation

