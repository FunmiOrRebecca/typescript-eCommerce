import { FormInputLabel, Group, Input } from "./form-input.styles";


const FormInput = ( {label, ...otherProps}) => {
   
    return(
        <Group>
            <Input  {...otherProps}/>
            {label && (
            <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
            )}       
  { /*     <input
          type="text"
          required
          onChange={changeHandler}
          name="displayName"
          value={displayName}
    /> */}
        </Group>
    )
}

export default FormInput;

// before styled components
// const FormInput = ( {label, ...otherProps}) => {
   
//     return(
//         <div className="group">
//             <input className="form-input" {...otherProps}/>
//             {label && (
//             <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
//             )}       
//   { /*     <input
//           type="text"
//           required
//           onChange={changeHandler}
//           name="displayName"
//           value={displayName}
//     /> */}
//         </div>
//     )
// }

// export default FormInput;



// import './form-input.component.scss';
// const FormInput = ({label, ...otherProps}) => {
//     console.log(otherProps.value.length);
//     return(
//         <div className="group">
//         <input className="form-input" {...otherProps}/>
//         {label && (
//         <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
//         )}       
        
//         </div>
//     )
// }

// export default FormInput;