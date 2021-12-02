

// Computes the tax using the 2021 tax brakets. Inflation factor (1.00 being standard) can be applied to approximate future years.
// Brakets are for single filing

// will find the max of std calculation or amt
function ComputeTax_fv(income_pv, inflation_accume, deduction_pv) {
  return Math.max(
    ComputeTax_stdCalc_fv(income_pv, inflation_accume, deduction_pv),
    ComputeTax_amt(income_pv, inflation_accume)
  )

}


function ComputeTax_stdCalc_fv(income_pv, inflation_accume, deduction_pv){
    max =  [0, 9875, 40125, 85525, 163300, 207350, 518400,  Infinity];
    rate = [0, 0.10,  0.12,  0.22,   0.24,   0.32,   0.35,      0.37];

    for(let i = 0; i < max.length; i ++){
      max[i] = max[i] * inflation_accume
    }

    left = inflation_accume * (income_pv - deduction_pv); // income left
    tax_fv = 0.0;

    for(let i = 1; i < max.length && left > 0; i++) {
        df = Math.min(max[i]-max[i-1],left);
        tax_fv += rate[i]*df;
        left -= df;
    }

  return tax_fv
}

// Deduction is built into this one
function ComputeTax_amt(income_pv, inflation_accume){
    max =  [0, 73600, Infinity];
    rate = [0, 0.26,     0.28];

    for(let i = 0; i < max.length; i ++){
      max[i] = max[i] * inflation_accume
    }

    left = inflation_accume * (income_pv - deduction_pv); // income left
    tax_fv = 0.0;

    for(let i = 1; i < max.length && left > 0; i++) {
        df = Math.min(max[i]-max[i-1],left);
        tax_fv += rate[i]*df;
        left -= df;
    }

  return tax_fv
}
