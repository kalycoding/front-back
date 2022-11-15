import React, { useEffect, useState } from 'react'
import { Image, Input, Button, Space, Row, Col } from 'antd'
import { useForm } from "react-hook-form";

export const Display = () => {
    const { register, handleSubmit } = useForm();
    const [selectedFile, setSelectedFile] = useState();
    const [images, setImages] = useState([])
    const [angle, setAngle] = useState('')
    useEffect(() => {
      async function displayImages() {
        const response = await fetch('http://127.0.0.1:8000/image')
        const responseData = await response.json()
        setImages(responseData)
      }
      displayImages()
    }, [])
    
    const rotateImg = async (id) => {
        const response = await fetch(
            `http://127.0.0.1:8000/image/${id}/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'angle':angle
                })
            }
        )
        window.location.reload()
    }
    
    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

    

    // const handleSubmission = async () => {
	// 	const formData = new FormData();

	// 	const response = await fetch(
    //         `http://127.0.0.1:8000/image/`,
    //         {
    //             method: 'POST',
                
    //             body: getFormData(formData)
    //         }
    //     ).then((response) => response.json())
    //     .then((result) => {
    //         console.log('Success:', result);
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });
	// };
    
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("image", data.file[0]);

        const res = await fetch("http://127.0.0.1:8000/image/", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());
        window.location.reload();
    };
    
    
  return (
    <div className='w-full py-8'>
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-16 px-6 justify-between w-full h-full">
        {
            images.map(img => (
        <div className="h-56">
        <Image
            width={200}
            src={img.image}
            />
            <Input onChange={(e) => setAngle(Number(e.target.value))} placeholder='rotate keys, 90, 180, 360'  />
            <Button
            onClick={() => rotateImg(img.id)}
            type="primary"
            >
            Rotate
            </Button>
        </div>
            ))
        }
  </div>
  <div className="w-full py-16 bg-gray-50 flex flex-col justify-center align-center">
        <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-3xl text-center">Upload Image</h3>
        <input type="file" {...register("file")} placeholder="Upload image" className="mx-auto bg-white rounded-lg py-4 px-4" />
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Upload
      </button>
        </form>
  </div>
    </div>

  )
}
