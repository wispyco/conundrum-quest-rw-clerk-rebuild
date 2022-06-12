import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'



const HeroForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    props.onSave(data, props?.hero?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        
          <TextField
            name="name"
            defaultValue={props.hero?.name}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
        

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="questId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Quest id
        </Label>
        
          <NumberField
            name="questId"
            defaultValue={props.hero?.questId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="questId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default HeroForm
