import React from "react";
import {Link} from "react-router-dom";

function NewList() {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl  lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 flex f">
        <div className="gap-5 flex lg:flex-cols-3 sm:max-w-sm sm:mx-auto ">
      <Link to="#" className="group relative block bg-black">
        <img
          alt="Developer"
          src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
          className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
        />

        <div className="relative p-4 sm:p-6 lg:p-8">
          <p className="text-sm font-medium uppercase tracking-widest text-secondc">
            Developer
          </p>

          <p className="text-xl font-bold text-white sm:text-2xl">Tony Wayne</p>

          <div className="mt-32 sm:mt-48 lg:mt-64">
            <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-sm text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis
                perferendis hic asperiores quibusdam quidem voluptates
                doloremque reiciendis nostrum harum. Repudiandae?
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div></div>
  );
}

export default NewList;
