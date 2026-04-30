import { useEffect, useState } from 'react'

export default function Responses() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const formsRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/forms`)
        const forms = await formsRes.json()

        const pairs = await Promise.all(forms.map(async (f) => {
          const r = await fetch(`${import.meta.env.VITE_API_BASE_URL}/responses/${f._id}`)
          const data = await r.json()
          return (data || []).map((d) => ({ form: f, response: d }))
        }))

        setEntries(pairs.flat())
      } catch (err) {
        setEntries([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) return <div className="text-sm text-gray-500">Loading responses…</div>

  if (entries.length === 0) return <div className="text-sm text-gray-500">No responses yet.</div>

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Responses</h3>

      <div className="space-y-3">
        {entries
          .sort((a, b) => new Date(b.response.createdAt) - new Date(a.response.createdAt))
          .map((e, i) => {
            const answers = e.response.answers || {};
            const hasFields = Array.isArray(e.form.fields) && e.form.fields.length > 0;

            return (
              <div key={i} className="p-4 bg-white border border-gray-100 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-600">Form: <span className="font-medium text-gray-800">{e.form.title}</span></div>
                  <div className="text-xs text-gray-500">{new Date(e.response.createdAt).toLocaleString()}</div>
                </div>

                {hasFields ? (
                  <div className="grid gap-2">
                    {e.form.fields.map((f) => (
                      <div key={f.id} className="flex items-start gap-4">
                        <div className="w-40 text-sm text-gray-600">{f.label || f.id}:</div>
                        <div className="text-sm text-gray-800 break-words">{formatAnswer(answers[f.id])}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <pre className="text-xs bg-gray-50 p-3 rounded">{JSON.stringify(answers, null, 2)}</pre>
                )}
              </div>
            );
          })}
      </div>
    </div>
  )
}

function formatAnswer(val) {
  if (val === undefined || val === null) return '-';
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val);
}
