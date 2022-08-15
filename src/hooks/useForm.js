import {useState} from 'react';

export default function useForm(getNewModelObject){
    const [values, setValues] = useState(getNewModelObject());
    const [errors, setErrors] = useState(Object)

    const handleInputChange = e =>{
        const {name, value} = e.target
        setValues({
            ...values,
            [name]: value
        })
    }
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    }
}