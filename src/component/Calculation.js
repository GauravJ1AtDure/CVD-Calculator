import React from 'react'

const Calculation=(age, totChol, sysBp, dibetes, smoking, props)=> {

    let rfAge, rfTotChol, rfSysBp, rfDibetes, rfSmoking;

    rfAge=age-60
    rfTotChol=totChol-6
    rfSysBp=sysBp-120
    rfDibetes=dibetes==='yes'? 1 : 0
    rfSmoking=smoking==='yes'? 1 : 0 

    let { title, region, gender, age_chd, age_stroke, chol_chd_1, chol_chd_2, chol_stroke_1, chol_stroke_2, sys_chd_1, sys_chd_2, sys_stroke_1, sys_stroke_2, diab_chd_1, diab_chd_2, diab_stroke_1, diab_stroke_2, smok_chd_1, smok_chd_2, smok_stroke_1, smok_stroke_2, uncalibrated_chd, calibrated_chd1, calibrated_chd2, uncalibrated_stroke, calibrated_stroke1, calibrated_stroke2 } = props;



  return (
    <div>
      
    </div>
  )
}

export default Calculation
