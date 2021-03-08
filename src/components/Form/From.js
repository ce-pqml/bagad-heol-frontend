export const Input = ({ input, meta, ...rest }) => (
  <div>
    <input
      {...input}
      {...rest}
      className={(meta.touched && meta.error ? 'input-bagad alert-input ' : 'input-bagad ') + rest.className}
    />
    {meta.touched && meta.error ? <span className="alert-color">{meta.error}</span> : ''}
  </div>
)

export const Select = ({ input, meta, children, ...rest }) => (
  <div>
    <select
      {...input}
      {...rest}
      className={(meta.touched && meta.error ? 'input-bagad alert-input ' : 'input-bagad ') + rest.className}
      // onChange={(event, value) => input.onChange(value)}
      // errorText={meta.touched ? meta.error : ''}
    >
      {children}
    </select> 
    {meta.touched && meta.error ? <span className="alert-color">{meta.error}</span> : ''}
  </div>
)

export const TextArea = ({ input, meta, children, ...rest }) => (
  <div>
    <textarea
      {...input}
      {...rest}
      className={(meta.touched && meta.error ? 'input-bagad alert-input ' : 'input-bagad ') + rest.className}
      // onChange={(event, value) => input.onChange(value)}
      // errorText={meta.touched ? meta.error : ''}
    >
    </textarea> 
    {meta.touched && meta.error ? <span className="alert-color">{meta.error}</span> : ''}
  </div>
)