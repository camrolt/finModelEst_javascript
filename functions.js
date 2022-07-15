// Computes the tax using the 2022 tax brakets
// Brakets are for single filing
// https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2022

// will find the max of std calculation or amt
function ComputeTax(income, deduction)
{
  return Math.max(
    ComputeTax_stdCalc(income, deduction),
    ComputeTax_amt(income)
  )

}

function ComputeTax_stdCalc(income, deduction, filing){

  if(filing == "s")
  {
    max =  [0, 10275, 41775, 89075, 170050, 215950, 539900,  Infinity];
  }
  else if(filing == "m")
  {
    max =  [0, 20550, 83550, 178150, 340100, 431900, 647850,  Infinity];
  }
  else
  {
    return Error
  }

  rate = [0, 0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37];
  
    left = (income - deduction); // income left
    tax = 0.0;

    for(let i = 1; i < max.length && left > 0; i++)
    {
      incomeInBracket = Math.min(max[i] - max[i-1], left);
      tax += rate[i-1] * incomeInBracket;
      left -= incomeInBracket;
    }

  return tax
}

// Deduction is built into this one
function ComputeTax_amt(income, filing){

  if(filing == "s")
  {
    max =  [0, 75900, Infinity];
  }
  else if(filing == "m")
  {
    max =  [0, 118100, Infinity];
  }
  else
  {
    return Error
  }

    rate = [0, 0.26, 0.28];

    rem = income; // income remaining 
    tax = 0.0;

    for(let i = 1; i < max.length && rem > 0; i++)
    {
      incomeInBracket = Math.min(max[i] - max[i-1], rem);
      tax += rate[i-1] * incomeInBracket;
      rem -= incomeInBracket;
    }

  return tax
}
