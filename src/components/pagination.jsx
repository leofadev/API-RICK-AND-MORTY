import React from 'react'

const pagination = ({prev, next, onPrevious, onNext}) => {

const handlePrevious = () =>{
onPrevious();
}

const handleNext = () =>{
onNext();
}

return (
<nav>
    <ul className='pagination justify-content-end'>
        {
        prev ? (
        <li className='page-item'>
            <button className='page-link p-3' onClick={handlePrevious}>Previous</button>
        </li>
        ) : null}
        {
            next ? (
        <li className='page-item'>
            <button className='page-link p-3' onClick={handleNext}>Next</button>
        </li>
        ) : null}
    </ul>
</nav>
)
}

export default pagination
