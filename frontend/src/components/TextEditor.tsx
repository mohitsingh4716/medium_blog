
import { useCallback, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'highlight.js/styles/github.css'; 
import hljs from 'highlight.js';
import axios from 'axios';

export const TextEditor=({value,onChange}:{value:string, onChange: (value: string) => void}) =>{

    const quillRef = useRef<ReactQuill | null>(null);  

   

    useEffect(() => {
        hljs.configure({
            languages: undefined,
        });
        hljs.highlightAll(); 
    }, []);


     const imageHandler = useCallback(() => {
       
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
    
        input.onchange = async () => {
            if (!input.files) return;
            const file = input.files[0];
    
           
            const formData = new FormData();
            formData.append('image', file);
    
            try {
               
                const response = await axios.post('https://api.imgbb.com/1/upload?key=94f605fa0980519a8e5e9383fada7cdd', formData);
                
              
                const imageUrl = response.data.data.url;
    
              
                const quillEditor = quillRef.current?.getEditor();
                if (quillEditor) {
                    const range = quillEditor.getSelection(true);
                    quillEditor.insertEmbed(range.index, 'image', imageUrl, 'user');
                }
            } catch (error) {
                console.error('Error uploading image to ImgBB:', error);
            }
        };
    }, []);


    const modules = {
        toolbar:{
            container:[
                [{ 'header': '1' }, { 'header': '2' }], 
                [{ 'font': [] }], 
                [{ 'size': ['small', false, 'large', 'huge'] }], 
                [{ 'align': [] }],
                ['bold', 'italic', 'underline'], 
                [{ 'list': 'ordered' }, { 'list': 'bullet' }], 
                ['blockquote', 'code-block'],
                ['link', 'image'], 
                ['clean'] 
            ],
        
         handlers: {
                  image: imageHandler 
              }
        },
      };
      
     const formats = [
        'header', 'font', 'size', 'align',
        'bold', 'italic', 'underline', 
         'background', 'list', 'bullet',
         'blockquote', 'code-block',
        'link', 'image'
      ];


  

    return(
      <div className="mt-4 lg:mt-8 w-96 lg:w-full " >
      <ReactQuill
        theme="snow"
        ref={quillRef}
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write an article..."
        className="h-[500px] rounded-md"
      />
    </div>
    )
    
}
  
 