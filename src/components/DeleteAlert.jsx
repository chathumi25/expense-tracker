import React from 'react'

function DeleteAlert({content , onDelete}) {
  return (
    <div>
        <p className='text-sm'>{content}</p>

        <div className='flex justify-end mt-6'>
  <button
    type='button'
    className='px-4 py-2 rounded-md border border-primary text-primary bg-blue-50 hover:bg-blue-300 transition-colors font-medium'
    onClick={onDelete}
  >
    Delete
  </button>
</div>

    </div>










  )
}

export default DeleteAlert