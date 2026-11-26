import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Login() {

    const nameRef = createRef();
    const passwordRef = createRef();

    const [errores, setErrores] = useState([])
    const { login } = useAuth({
        middleware: 'guest',
        url: '/'
    })

    const handleSubmit = async e => {
        e.preventDefault();

        const datos = {
            name: nameRef.current.value,
            password: passwordRef.current.value,
        }

        login(datos, setErrores)
    }


    return (
        <>
            <h1 className="font-display text-4xl font-semibold text-ink">Iniciar sesión</h1>
            <p className="mt-2 text-ink-soft">Para crear un pedido debes iniciar sesión</p>

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
                            htmlFor="password"
                        >Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="input"
                            name="password"
                            placeholder="Tu contraseña"
                            ref={passwordRef}
                        />
                    </div>


                    <input
                        type="submit"
                        value="Iniciar sesión"
                        className="btn-primary w-full py-3.5 text-base"
                    />
                </form>
            </div>

            <nav className="mt-6 text-center text-sm text-ink-soft">
                <Link to="/auth/registro" className="font-semibold hover:text-primary-700 transition">
                    ¿No tienes cuenta? <span className="text-primary-700 underline underline-offset-4">Crea una</span>
                </Link>
            </nav>
        </>
    )
}
