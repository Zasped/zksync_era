import React, { useEffect, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';


const Api = ({vision}) => {

    const {t} = useTranslation()
    const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey') || '');
    const id = useId()

    useEffect(() => {
        localStorage.setItem('apiKey', apiKey)
    }, [apiKey]);

    return (
        <div className={'flex flex-col'}>
            <label htmlFor={id} className="block font-medium text-gray-900">{t('apiKey')}</label>
            <input type={vision ? 'text' : 'password'} id={id} value={apiKey} onChange={event => setApiKey(event.target.value)}
                   className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"/>
        </div>
    );
};

export default Api;