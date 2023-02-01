import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {preview} from '../../public/assets'
import {getRandomPrompt} from '../utils'
import { FormField, Loader } from '../components'

function CreatePost() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    })
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        if(form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch('http://localhost:8080/api/v1/dalle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: form.prompt }),
                });
                const data = await response.json()

                setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}`})
            } catch (error) {
                alert(error)
            } finally {
                setGeneratingImg(false)
            }
        } else {
            alert(`Enter a prompt first Bruh`)
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(form.prompt && form.photo) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/v1/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...form})
                })
                await response.json();
                alert('Success');
                navigate('/');
            } catch (err) {
                alert(err)
                console.log(err)
            } finally {
                setLoading(false)
            } 
        }  else {
            alert('Cant Generate an Image without a prompt!')
        }
    }

    // setForm is used to easily update every state in the form element
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value})
    }
    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        console.log(randomPrompt);
        setForm({...form, prompt: randomPrompt})
    }
  return (
    <section className="max-w-7xl mx-auto bg-gradient-to-r from-white to-transparent rounded-lg p-8">
         <div>
            <h1 className="font-extrabold text-[#222328] text-[32px] font-Bungee">Create</h1>
            <p className="mt-2 font-fredricka text-[14px] max-w-[500px]">Create through a collection of imaginative and visually stunnig images generated by DALL-E AI & Share With Whoever Cares...</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-16 max-w-3xl">
                <div className="flex flex-col gap-5">
                        <FormField 
                            labelName="Your Name"
                            type="text"
                            name="name"
                            placeholder="John Wick"
                            value={form.name}
                            handleChange={handleChange}
                        />
                        <FormField
                            labelName="Prompt"
                            type="text"
                            name="prompt"
                            placeholder="teddy bears shopping for groceries in Japan, ukiyo-e"
                            value={form.prompt}
                            handleChange={handleChange}
                            isSurpriseMe
                            handleSurpriseMe={handleSurpriseMe}
                        />

                    <div className="relative bg-gray-50 border-gray-300 text-gray-900 border text-sm rounded-lg focus:ring[#4649ff] focus:border-[#4649ff00] p-3 w-64 h-64 flex justify-center items-center">
                        {form.photo ? (
                            <img
                            src={form.photo}
                            alt={form.prompt}
                            className="w-full h-full object-contain"
                            />
                            ) : (
                            <img
                            src={preview}
                                alt="preview"
                                className="w-9/12 h-9/12 object-contain opacity-40"
                            />
                            )}
                        {generatingImg && (
                            <div className="absolute inset-0 z-0 flex justify-center items-center rounded-lg bg-[rgba(0,0,0,0.5)] opacity-40">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-5 flex gap-5">
                    <button
                        type="button"
                        onClick={generateImage}
                        className="bg-[rgba(235,229,229,0.5)] font-medium rounded-md am:w-auto py-2.5text-center w-full "
                    >
                        {generatingImg ? 'Generating...' : 'Generate'}
                    </button>
                </div>
                <div className="mt-10">
                    <p className="mt-2 text-[14px]">Once you have created th image uou want, uou can share it with others in the community</p>
                    <button
                        className="mt-3 font-medium rounded-md text-sm w-full sm:w-auto bg-[rgba(235,229,229,0.5)] "
                        type="submit"
                    >
                        {loading ? 'Sharing...': 'Share with the community'}
                    </button>

                </div>
            </form>
    </section>
  )
}

export default CreatePost

