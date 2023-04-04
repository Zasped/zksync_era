import React, { useEffect, useId, useState } from 'react';
import InputNum from './ui/InputNum';
import { useTranslation } from 'react-i18next';


const RandomDelay = ({name, localKey = null}) => {
    const idFrom = useId()
    const idTo = useId()
    const {t} = useTranslation()

    const [randomDelay, setRandomDelay] = useState(JSON.parse(localStorage.getItem(localKey)) || {from: null, to: null});

    useEffect(() => {
        if (localKey){
            localStorage.setItem(localKey, JSON.stringify(randomDelay))
        }
    }, [randomDelay]);

    return (
        <div>
            <p className={'font-medium text-gray-900'}>{name}</p>
            <div className={'flex items-center gap-2'}>
                <label className={'basis-1/4'} htmlFor={idFrom}>{t('from')}</label>
                <span className={'basis-1/4'}>
                    <InputNum
                        id={idFrom}
                        placeholder={0}
                        value={randomDelay.from}
                        onChange={(e) => setRandomDelay({...randomDelay, from: e.target.value})}
                    />
                </span>
                <label className={'basis-1/4'} htmlFor={idTo}>{t('to')}</label>
                <span className={'basis-1/4'}>
                    <InputNum
                        id={idTo}
                        placeholder={0}
                        value={randomDelay.to}
                        onChange={(e) => setRandomDelay({...randomDelay, to: e.target.value})}
                    />
                </span>
            </div>
        </div>
    );
};

export default RandomDelay;