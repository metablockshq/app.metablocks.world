const TextInput = ({
  label,
  placeholder,
  inputType,
  value,
  onChange,
  errors,
}) => (
  <div>
    <div className="form-control">
      <label className="label">
        <span className="label-text font-bold">{label}</span>
      </label>
      <input
        type={inputType}
        placeholder={`ex: ${placeholder}`}
        className="input mb-4"
        value={value}
        onChange={onChange}
      />

      {errors && errors.length > 0 && (
        <div class="alert alert-warning">
          <div class="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="w-6 h-6 mx-2 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            {errors.map((e) => (
              <label key={e}>{e}</label>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default TextInput;
