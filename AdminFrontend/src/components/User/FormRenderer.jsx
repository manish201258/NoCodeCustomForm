import { useEffect, useState } from "react";
import "./FormRenderer.css";

export default function FormRenderer({ formId, readOnly = false }) {
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setForm(null);
    if (!formId) return;
    fetch(`${import.meta.env.VITE_API_BASE_URL}/forms/${formId}`)
      .then((res) => res.json())
      .then((f) => {
        setForm(f);
        const init = {};
        (f.fields || []).forEach((fld) => {
          if (fld.type === "checkbox" && fld.options?.length > 0) {
            init[fld.id] = [];
          } else if (fld.type === "checkbox") {
            init[fld.id] = false;
          } else {
            init[fld.id] = "";
          }
        });
        setAnswers(init);
      })
      .catch(() => setForm(null));
  }, [formId]);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((e) => ({ ...e, [id]: null }));
  };

  const validate = () => {
    const err = {};
    (form.fields || []).forEach((f) => {
      if (f.required) {
        const val = answers[f.id];
        if (
          val === undefined ||
          val === null ||
          (typeof val === "string" && val.trim() === "") ||
          (Array.isArray(val) && val.length === 0) ||
          (typeof val === "boolean" && val === false && f.type === "checkbox")
        ) {
          err[f.id] = "Required";
        }
      }
    });
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formId, answers }),
      });
      if (!res.ok) throw new Error('Submit failed');
      setMessage({ type: 'success', text: '✓ Response submitted successfully!' });
      const cleared = {};
      (form.fields || []).forEach((fld) => {
        if (fld.type === 'checkbox' && fld.options?.length > 0) {
          cleared[fld.id] = [];
        } else if (fld.type === 'checkbox') {
          cleared[fld.id] = false;
        } else {
          cleared[fld.id] = '';
        }
      });
      setAnswers(cleared);
    } catch (err) {
      setMessage({ type: 'error', text: '✗ Submit error: ' + (err.message || 'Unknown error') });
    } finally {
      setSubmitting(false);
    }
  };

  if (!form) return <div className="form-loading">Loading form…</div>;

  return (
    <div className="form-main">
      <div className="form-container">
        <div style={{ marginBottom: '1rem' }}>
          <h2 className="form-title">{form.title}</h2>
          {form.description && <p className="form-desc">{form.description}</p>}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
          {(form.fields || []).map((field) => (
            <div key={field.id}>
              {field.type !== 'checkbox' && (
                <label className="form-label">
                  {field.label}
                  {field.required && <span className="form-required">*</span>}
                </label>
              )}
              {field.type === 'checkbox' && (
                <div className="form-label">
                  {field.label}
                  {field.required && <span className="form-required">*</span>}
                </div>
              )}

              {(field.type === 'text' || field.type === 'email' || field.type === 'tel') && (
                <input
                  type={field.type}
                  className="form-input"
                  value={answers[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.label}
                  disabled={readOnly}
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  className="form-input"
                  value={answers[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  placeholder={field.label}
                  disabled={readOnly}
                />
              )}

              {(field.type === 'select' || field.type === 'dropdown') && (
                <select
                  className="form-select"
                  value={answers[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  disabled={readOnly}
                >
                  <option value="">Select {field.label}</option>
                  {(field.options || []).map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              )}

              {field.type === 'checkbox' && !field.options?.length && (
                <div className="form-checkbox-row">
                  <input
                    id={field.id}
                    type="checkbox"
                    className="form-checkbox"
                    checked={!!answers[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.checked)}
                    disabled={readOnly}
                  />
                  <label htmlFor={field.id} className="form-checkbox-label">
                    {field.label}
                  </label>
                </div>
              )}

              {field.type === 'checkbox' && field.options?.length > 0 && (
                <div className="form-checkbox-group">
                  {(field.options || []).map((opt, i) => (
                    <label key={i} className="form-checkbox-label">
                      <input
                        type="checkbox"
                        value={opt}
                        checked={(answers[field.id] || []).includes(opt)}
                        onChange={(e) => {
                          const current = answers[field.id] || [];
                          const updated = e.target.checked
                            ? [...current, opt]
                            : current.filter(item => item !== opt);
                          handleChange(field.id, updated);
                        }}
                        disabled={readOnly}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}

              {field.type === 'radio' && (
                <div className="form-radio-group">
                  {(field.options || []).map((opt, i) => (
                    <label key={i} className="form-radio-label">
                      <input
                        type="radio"
                        name={field.id}
                        value={opt}
                        checked={answers[field.id] === opt}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        disabled={readOnly}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}

              {errors[field.id] && <p className="form-error">{errors[field.id]}</p>}
            </div>
          ))}

          {!readOnly && (
            <div style={{ marginTop: '0.75rem' }}>
              {message && (
                <div className={`form-message form-message-${message.type}`}>
                  {message.text}
                </div>
              )}
              <button type="submit" disabled={submitting} className="form-btn">
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}