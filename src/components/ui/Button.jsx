import React from 'react';


const Button = ({children, onClick, ...args}) => {
    return (
        <div
            onClick={onClick}
            className="disabled:bg-blue-400 text-white text-center cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg px-3 py-2.5 focus:outline-none w-full"
            {...args}
        >
            {children}
        </div>
    );
};

export default Button;