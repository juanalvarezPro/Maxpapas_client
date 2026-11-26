import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Registro() {

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();

    const [errores, setErrores] = useState([])
    const {registro} = useAuth({middleware: 'guest', url: '/'})

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        registro(datos, setErrores)
    }

    return (
        <>
            <h1 className="font-display text-4xl font-semibold text-ink">Crea tu cuenta</h1>
            <p className="mt-2 text-ink-soft">Crea tu cuenta llenando el formulario</p>

            <div className="card mt-8 p-6 sm:p-8">
                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                >
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>)  : null }

                    <div>
                        <label
                            className="label"
                            htmlFor="name"
                        >Nombre</label>
                        <input
                            type="text"
                            id="name"
                            className="input"
                            name="name"
                            placeholder="Tu nombre"
                            ref={nameRef}
                        />
                    </div>

                    <div>
                        <label
                            className="label"
                            htmlFor="email"
                        >Email</label>
                        <input
                            type="email"
                            id="email"
                            className="input"
                            name="email"
                            placeholder="tu@correo.com"
                            ref={emailRef}
                        />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label
                                className="label"
                                htmlFor="password"
                            >Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                className="input"
                                name="password"
                                placeholder="Contraseña"
                                ref={passwordRef}
                            />
                        </div>

                        <div>
                            <label
                                className="label"
                                htmlFor="password_confirmation"
                            >Repetir contraseña</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                className="input"
                                name="password_confirmation"
                                placeholder="Repetir"
                                ref={passwordConfirmationRef}
                            />
                        </div>
                    </div>

                    <input
                        type="submit"
                        value="Crear cuenta"
                        className="btn-primary w-full py-3.5 text-base"
                    />
                </form>
            </div>

            <nav className="mt-6 text-center text-sm text-ink-soft">
                <Link to="/auth/login" className="font-semibold hover:text-primary-700 transition">
                    ¿Ya tienes cuenta? <span className="text-primary-700 underline underline-offset-4">Inicia sesión</span>
                </Link>
            </nav>
        </>
    )
}
