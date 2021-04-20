import { decode } from 'html-entities';

export const Input = ({ input, meta, ...rest }) => (
  <div className={rest.parentClass}>
    <input
      {...input}
      value={decode(input.value)}
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
      value={decode(input.value)}
      {...rest}
      className={(meta.touched && meta.error ? 'input-bagad alert-input ' : 'input-bagad ') + rest.className}
      // onChange={(event, value) => input.onChange(value)}
      // errorText={meta.touched ? meta.error : ''}
    >
    </textarea> 
    {meta.touched && meta.error ? <span className="alert-color">{meta.error}</span> : ''}
  </div>
)

export const File = ({ input, meta, children, ...rest }) => (
  <div>
    <input
      {...input}
      {...rest}
      className={(meta.touched && meta.error ? 'input-bagad alert-input input-bagad-file ' : 'input-bagad input-bagad-file ') + rest.className}
      // onChange={(event, value) => input.onChange(value)}
      // errorText={meta.touched ? meta.error : ''}
    >
    </input> 
    {meta.touched && meta.error ? <span className="alert-color">{meta.error}</span> : ''}
  </div>
)