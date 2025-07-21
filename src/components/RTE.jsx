import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form' // it integrates custom inputs with the form

function RTE({name, control, label, defaultvalue=''}) {
  return (
   <div className='w-full'> 
   {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
   <Controller
      name = {name || 'content'}
      control = {control}
      render = {({field: {onChange}}) => (
         <Editor 
         initialValue={defaultvalue}
          init={
            { initialValue: defaultvalue,
              branding: false, // Disables TinyMCE branding
              height: 500,
              menubar: true,
              plugins:[
               'advlist autolink lists link image charmap print preview anchor',
               'searchreplace visualblocks code fullscreen',
               'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help',
               content_style: 'body {font-size:14px } '
            }
         }
         onEditorChange={onChange} // A callback function that updates the form state when the editor content changes.
         />
      )}
   />
    
    </div>
  )
}

export default RTE