import React from 'react'
import Card from './Card'

function RenderCards({ title, data }) {
    if(data?.length > 0) {
        console.log(data);
        return data.map((post) => <Card key={data._id} {...post} />)
    }
    return (
        <h2 className="mt-5 font-bold text-xl uppercase">CArd</h2>
    )
}

export default RenderCards
