export default function FieldItem({ field, index, form, setForm }) {
  const updateField = (key, value) => {
    const updated = [...form.fields];
    updated[index][key] = value;
    setForm({ ...form, fields: updated });
  };

  const addOption = () => {
    updateField("options", [...field.options, ""]);
  };

  const updateOption = (i, value) => {
    const newOptions = [...field.options];
    newOptions[i] = value;
    updateField("options", newOptions);
  };

  return (
    <div>

      {/* Label */}
      <label className="block text-sm font-semibold mb-1">
        Field Label
      </label>
      <input
        value={field.label}
        onChange={(e) => updateField("label", e.target.value)}
        className="w-full p-2 border rounded mb-3"
        placeholder="Enter label"
      />

      <p className="text-sm text-gray-500 mb-2">
        Type: {field.type}
      </p>

      {/* Options */}
      {(field.type === "select" || field.type === "radio" || field.type === "checkbox") && (
        <div>
          <label className="text-sm font-medium">Options</label>

          {field.options.map((opt, i) => (
            <input
              key={i}
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              className="w-full p-2 border rounded mt-2"
              placeholder="Option"
            />
          ))}

          <button
            onClick={addOption}
            className="mt-2 text-blue-600 text-sm hover:underline"
          >
            + Add Option
          </button>
        </div>
      )}
    </div>
  );
}