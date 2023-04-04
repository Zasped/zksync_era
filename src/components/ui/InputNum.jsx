import React from 'react';
import classNames from 'classnames';


const InputNum = ({id, placeholder, step = 1, className, ...args}) => {
    return (
        <input
            id={id}
            type="number"
            placeholder={placeholder}
            className={classNames([
                'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1',
                className
            ])}
            step={step}
            min={0}
            {...args}
        />
    );
};

export default InputNum;