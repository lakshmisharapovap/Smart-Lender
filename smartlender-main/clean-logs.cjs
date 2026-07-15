function predict(f){
  // simple heuristic copied/adapted from LoanForm.tsx logic
  const {credit_history, applicant_income, coapplicant_income, loan_amount, loan_term, education, married, property_area} = f;
  const income = (Number(applicant_income)||0) + (Number(coapplicant_income)||0);
  const loanAmt = Number(loan_amount)||0;
  const term = Number(loan_term)||360;
  const dti = loanAmt>0? (loanAmt / Math.max(1,income)) : 0;

  let score = 0;
  if(credit_history==="1") score += 40; 
  if(education==="Graduate") score += 10;
  if(married==="Yes") score += 5;
  if(property_area==="Urban") score += 5;
  if(dti < 0.5) score += 20; else if(dti < 1) score += 10;
  if(income > 50000) score += 15;

  return {approved: score >= 50, score};
}

function $(id){return document.getElementById(id)}

document.getElementById('loanForm').addEventListener('submit', function(e){
  e.preventDefault();
  const f = {
    gender: $('gender').value,
    married: $('married').value,
    dependents: $('dependents').value,
    education: $('education').value,
    self_employed: $('self_employed').value,
    credit_history: $('credit_history').value,
    property_area: $('property_area').value,
    applicant_income: $('applicant_income').value,
    coapplicant_income: $('coapplicant_income').value,
    loan_amount: $('loan_amount').value,
    loan_term: $('loan_term').value,
    full_name: $('full_name').value,
    phone: $('phone').value,
    email: $('email').value
  };
  const res = predict(f);
  const out = $('output');
  out.innerHTML = '';
  const box = document.createElement('div');
  box.className = 'result ' + (res.approved? 'ok':'bad');
  box.innerHTML = `<strong>${res.approved? 'Likely Approved':'Likely Rejected'}</strong><div>Score: ${res.score}</div><div>Thanks, ${f.full_name||'applicant'} — we used a preview heuristic.</div>`;
  out.appendChild(box);
});
