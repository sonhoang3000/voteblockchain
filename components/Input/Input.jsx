import React from 'react'

// INTERNAL IMPORT
// import Style from './Input.module.css'

const Input = ({ inputType, title, placeholder, handleClick }) => {
	return (
		<div className=''>
			<p>{title}</p>
			{inputType === "text" ? (
				<div className=''>
					<input
						type='text'
						className=''
						placeholder={placeholder}
						onChange={handleClick}
					/>
				</div>
			) : ""}
		</div>
	)
}

export default Input
