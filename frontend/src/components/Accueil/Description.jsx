import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoo } from '@fortawesome/free-solid-svg-icons';


function Description() {
  return (
    <div>
        <section className="my-8 bg-white text-black">
	<div className="container flex flex-col items-center p-4 mx-auto space-y-6 md:p-8">
    <FontAwesomeIcon
        icon={faPoo}
        className="text-4xl text-principal"
      />  
		<p className="px-6 py-2 text-2xl font-semibold text-center sm:font-bold sm:text-3xl md:text-4xl lg:max-w-2xl xl:max-w-4xl text-black">"Veniam quidem animi ea maxime odit fugiat architecto perferendis ipsum perspiciatis iusto, provident qui nam dolorum corporis."</p>
	</div>
</section>
    </div>
  )
}

export default Description