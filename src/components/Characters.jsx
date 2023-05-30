import React from 'react'


const Characters = ({characters = []}) => {

return (
<div className='row'>
    {
    characters.map((item, index) =>(
    <div key={index} className='col mb-5 mt-5'>
        <div className='card bg-info bg-opacity-10 border border-3 border-info border-start-0 rounded-end shadow' style={{minWidth:"200px"}}>
            <img src={item.image} alt=""/>
            <div className='card-body'>
                <h5 className="card-title mb-4 p-1 border-bottom border-start border-3 border-info  rounded shadow">{item.name}</h5>
                <p>Species: {item.species}</p> 
                <p>Gender: {item.gender}</p>
                <p>Status: {item.status}</p>
                <p>Location: {item.location.name}</p>
                <p>Origin: {item.origin.name}</p>
                <p>Created: {item.created}</p>
            </div>
        </div>
    </div>
        
    ))
    
    }

</div>
)
}

export default Characters
