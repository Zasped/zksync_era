import Api from './components/Api';
import React, { Suspense, useEffect, useId, useRef, useState } from 'react';
import ProjectRow from './components/ProjectRow';
import Button from './components/ui/Button';
import { hideWallet } from './utils/hideWallet';
import InputNum from './components/ui/InputNum';
import RandomDelay from './components/RandomDelay';
import { useTranslation, withTranslation } from 'react-i18next';


function App () {
    // Видно ли api ключ и кошельки
    const [isVisible, setIsVisible] = useState(false);

    // Начата ли операция
    const [isStarted, setIsStarted] = useState(false);

    // Идет ли операция
    const [isTakenOperation, setIsTakenOperation] = useState(false);

    // Загруженные кошельки
    const [uploadWallets, setUploadWallets] = useState(null);

    // Перевод
    const {t, i18n} = useTranslation()

    const importWalletId = useId()

    // Логи
    const [logs, setLogs] = useState(null);
    const ref = useRef(null);

    // Начать операцию
    const Start = () => {
        setIsStarted(true)
        setLogs('Started')
        setIsTakenOperation(true)
    }

    // Продолжить операцию
    const Continue = () => {
        setIsStarted(true)
        setLogs('Continued')
    }

    // Остановить операцию
    const Stop = () => {
        setIsStarted(false)
        setLogs('Stopped')
    }

    function fileUpload (event) {
        let file = event.target.files[0];

        let reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function() {
            if (reader.result === '') return setLogs(t('NoWalletsDetected'))

            let wallets = reader.result.split('\r\n')
            setUploadWallets(wallets);

            wallets = wallets.map(el => {
                return `${t('walletUpload')} ${el}`
            })
            setLogs(wallets)
        };

        reader.onerror = function() {
            console.log(reader.error);
        };
    }

    // Вывод логов
    useEffect(() => {
        if (logs && logs.length) {

            if (Array.isArray(logs)) {
                for (const log of logs) {
                    const element = document.createElement('p')
                    element.innerText = `${ref.current.children.length + 1} - ${log}`
                    ref.current.appendChild(element)
                }
            } else {
                const element = document.createElement('p')
                element.innerText = `${ref.current.children.length + 1} - ${logs}`
                ref.current.appendChild(element)
            }

            ref.current.scrollTo(0, ref.current.scrollHeight)
            setLogs(null)
        }
    }, [logs]);

    const locales = {
        en: 'English',
        ru: 'Русский',
    }

    return (
        <Suspense fallback={'...loading'}>
            <div className="py-2 px-4 flex flex-col gap-6 text-sm">
                <div className={'flex flex-col gap-4'}>
                    <div className={'flex gap-2 items-center'}>
                        <div className={'flex flex-col gap-2 basis-full'}>
                            <Button onClick={e => setIsVisible(prev => !prev)}>{t('showApiAndWallet')}</Button>
                            <label className={'w-full'} htmlFor={importWalletId}>
                                <input id={importWalletId} type="file" className={'hidden'} accept=".txt" onChange={fileUpload}/>
                                <Button>{t('importWallet')}</Button>
                            </label>
                        </div>
                        <select onChange={e => i18n.changeLanguage(e.target.value)} className={'bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5'}>
                            {Object.keys(locales).map((el) => <option key={el} selected={i18n.language === el} value={el}>{locales[el]}</option>)}
                        </select>
                    </div>
                    <Api vision={isVisible}/>
                </div>

                <div className={'flex flex-col gap-4'}>
                    <p className={'font-medium text-gray-900'}>{t('selectProject')}</p>
                    <ProjectRow name={'Stargate (Arbitirum/Optimism)'}/>
                    <ProjectRow name={'Stargate (Arbitirum)'}/>
                    <ProjectRow name={'Stargate (Optimism)'}/>
                    <ProjectRow name={'Stargate'}/>
                </div>

                <div className={'flex flex-col gap-4'}>
                    <RandomDelay name={t('delayWallet')} localKey={'delayWallet'}/>
                    <RandomDelay name={t('delayProject')} localKey={'delayProject'}/>
                </div>

                <div className={'flex flex-col gap-4'}>
                    <div className={'flex gap-2'}>
                        {(isTakenOperation)
                            ? <Button disabled={isStarted} onClick={Continue}>{t('continue')}</Button>
                            : <Button disabled={isStarted} onClick={Start}>{t('start')}</Button>
                        }
                        <Button disabled={!isStarted} onClick={Stop}>{t('stop')}</Button>
                    </div>
                    <div>
                        <p className={'text-center'}>{t('logs')}</p>
                        <div className={'border-black border-[1px] p-1 h-[300px] overflow-y-auto'} ref={ref}/>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}

export default App;