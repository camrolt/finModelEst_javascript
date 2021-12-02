


function ComputeTax_fv(income_pv, inflation_accume, deduction_pv){
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