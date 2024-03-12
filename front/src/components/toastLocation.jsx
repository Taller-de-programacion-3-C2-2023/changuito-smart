import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

export default function ToastLocation(props) {
    const toast = useRef(null);
    const [ showToast, setShowToast ] = useState(false)

    useEffect(() => {
        show()
    }, [])

    const clear = () => {
        toast.current.clear();
        setShowToast(false);
    };

    function show() {
        if (!showToast) {
            toast.current.clear();
            setShowToast(true);
            toast.current.show({
                summary: 'Acceso a su ubicacion',
                detail: 'La aplicacion necesita acceder a su ubicacion para una mejor experiencia. ',
                sticky: true,
                content: ({ message }) => (
                    <section className="flex p-3 gap-3 w-full bg-black-alpha-90 shadow-2 " style={{ borderRadius: '10px' }}>
                        <i className="pi pi-map-marker text-primary-500 text-2xl"></i>
                        <div className="flex flex-column gap-4 w-full">
                            <p className="m-0 font-semibold text-base text-white">{message.summary}</p>
                            <p className="m-0 text-base text-white text-700">{message.detail}</p>
                            <div className="flex gap-3 mb-3">
                                <Button label="Aceptar" text className="p-0 font-semibold" severity="success" onClick={props.accept}></Button>
                                <Button label="Rechazar" text className="p-0 font-semibold"  severity="danger" onClick={clear}></Button>
                            </div>
                        </div>
                    </section>
                )
            });
        }
    };

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast}
                onRemove={clear}
                position="top-center" 
            />
        </div>
    )
}