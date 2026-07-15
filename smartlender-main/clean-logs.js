<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>SmartLender Preview</title>
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;sans-serif;margin:24px;background:#f7fafc}
    .card{background:#fff;padding:20px;border-radius:12px;max-width:720px;margin:0 auto;box-shadow:0 10px 30px rgba(2,6,23,.08)}
    label{display:block;margin-top:12px;font-weight:600}
    input,select{width:100%;padding:10px;margin-top:6px;border-radius:8px;border:1px solid #d1d5db}
    button{margin-top:16px;padding:12px 16px;border:none;border-radius:10px;background:#0ea5a4;color:white;font-weight:700}
    .result{margin-top:16px;padding:12px;border-radius:8px}
    .ok{background:#ecfeff;border:1px solid #2dd4bf}
    .bad{background:#fff1f2;border:1px solid #fb7185}
  </style>
</head>
<body>
  <div class="card">
    <h2>SmartLender — Loan Prediction (Preview)</h2>
    <form id="loanForm">
      <label>Gender<select id="gender"><option value="">Select</option><option>Male</option><option>Female</option></select></label>
      <label>Married<select id="married"><option value="">Select</option><option>Yes</option><option>No</option></select></label>
      <label>Dependents<select id="dependents"><option value="">Select</option><option>0</option><option>1</option><option>2</option><option>3+</option></select></label>
      <label>Education<select id="education"><option value="">Select</option><option>Graduate</option><option>Not Graduate</option></select></label>
      <label>Self Employed<select id="self_employed"><option value="">Select</option><option>Yes</option><option>No</option></select></label>
      <label>Credit History<select id="credit_history"><option value="">Select</option><option value="1">1</option><option value="0">0</option></select></label>
      <label>Property Area<select id="property_area"><option value="">Select</option><option>Urban</option><option>Semiurban</option><option>Rural</option></select></label>
      <label>Applicant Income (₹)<input id="applicant_income" inputmode="numeric" /></label>
      <label>Coapplicant Income (₹)<input id="coapplicant_income" inputmode="numeric" /></label>
      <label>Loan Amount (₹ in thousands)<input id="loan_amount" inputmode="numeric" /></label>
      <label>Loan Amount Term (months)<input id="loan_term" inputmode="numeric" /></label>
      <hr style="margin-top:18px"/>
      <label>Full Name<input id="full_name" /></label>
      <label>Phone (Indian format)<input id="phone" inputmode="numeric" maxlength="10" placeholder="10-digit"/></label>
      <label>Email<input id="email" type="email"/></label>
      <button type="submit" id="submitBtn">Predict My Loan Approval</button>
    </form>
    <div id="output"></div>
  </div>
  <script src="app.js"></script>
</body>
</html>