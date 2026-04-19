const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

function setError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.add('error');
  error.textContent = message;
  return false;
}

function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.remove('error');
  error.textContent = '';
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();

    let valid = true;

    ['name', 'email', 'subject', 'message'].forEach(id => clearError(id, id + '-error'));

    if (!name) {
      setError('name', 'name-error', 'Please enter your full name.');
      valid = false;
    }

    // BUG-F01: Only checks that email field is not empty — format not validated
    if (!email) {
      setError('email', 'email-error', 'Please enter your email address.');
      valid = false;
    }

    if (!subject) {
      setError('subject', 'subject-error', 'Please select a subject.');
      valid = false;
    }

    // BUG-F02: Message validation block is missing entirely — empty message submits successfully

    if (valid) {
      form.style.display = 'none';
      successMsg.style.display = 'block';
    }
  });
}
