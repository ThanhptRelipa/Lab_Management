import React, { useState, useRef } from 'react'
import styles from './home.module.css'
import ReactDevicePreview from 'react-device-preview'
import { Editor } from '@tinymce/tinymce-react'
import HomeUser from './components/user'

const HomePage = () => {
  const [content, setContent] = useState('<p>This is the initial content of the editor.</p>')
  const [isPreview, setIsPreview] = useState(false)
  const editorRef = useRef(null)

  const generateContent = () => {
    return <div className={styles.contentContainer} dangerouslySetInnerHTML={{ __html: content }} />
  }

  const onPreview = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getContent())
      setIsPreview(true)
    }
  }

  return (
    <>
      <div className={styles.home}>homepage1</div>
      <HomeUser />
      <div className={styles.flex}>
        <Editor
          initialValue={content}
          onInit={(evt, editor) => { editorRef.current = editor }}
          init={{
            height: 500,
            menubar: false,
            resize: false,
            plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern help',
            toolbar: 'undo redo | styleselect | fontsizeselect | fontselect | ' +
            'bold italic backcolor forecolor | alignleft aligncenter ' +
            'alignright alignjustify | ' +
            'removeformat | help ',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }} />
        { isPreview && <ReactDevicePreview device='iphonex' scale='0.6'>
          <div className={ styles.screen }>
            { generateContent() }
          </div>
        </ReactDevicePreview>
        }
      </div>
      {!isPreview && <button onClick={onPreview}>Preview</button>}
      {isPreview && <button onClick={() => { setIsPreview(!isPreview) }}>Hiden Preview</button>}
    </>
  )
}

export default HomePage
