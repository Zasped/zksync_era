import React, { useEffect, useId, useState } from 'react';
import InputNum from './ui/InputNum';
import { useTranslation } from 'react-i18next';


const ProjectRow = ({name}) => {
    const idCheckBox = useId()
    const idMin = useId()
    const idMax = useId()
    const {t} = useTranslation()

    const [project, setProject] = useState(JSON.parse(localStorage.getItem(name)) || {checked: false, min: null, max: null});

    useEffect(() => {
        localStorage.setItem(name, JSON.stringify(project))
    }, [project]);
    return (
        <div className={'flex items-center'}>
            <div className={'flex items-center basis-1/3'}>
                <input
                    id={idCheckBox}
                    type="checkbox"
                    checked={project.checked}
                    onChange={(e) => setProject({...project, checked: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mr-2"
                />
                <label htmlFor={idCheckBox} className="font-medium text-gray-900">{name}</label>
            </div>

            <div className={'flex items-center basis-1/3'}>
                <label htmlFor={idMin} className={'mr-2'}>{t('min')}:</label>
                <InputNum
                    id={idMin}
                    placeholder={'0.0'}
                    step={0.1}
                    className={'max-w-[80px]'}
                    value={project.min}
                    onChange={(e) => setProject({...project, min: e.target.value})}
                />
            </div>

            <div className={'flex items-center basis-1/3'}>
                <label htmlFor={idMax} className={'mr-2'}>{t('max')}:</label>
                <InputNum
                    id={idMax}
                    placeholder={'0.0'}
                    step={0.1}
                    className={'max-w-[80px]'}
                    value={project.max}
                    onChange={(e) => setProject({...project, max: e.target.value})}
                />
            </div>
        </div>
    );
};

export default ProjectRow;