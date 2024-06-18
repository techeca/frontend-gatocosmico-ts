import { Link } from "react-router-dom";

export default function NotFound(){

    return(
        <div className="h-full w-full flex">
            <section className="h-full w-full place-content-center">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">404</h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 dark:text-zinc-100 md:text-4xl">Algo está mal.</p>
                        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, no podemos encontrar la página que estabas buscando. Puede seguir navegando desde el menu principal. </p>
                        <Link to="/" className="inline-flex bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">Volver al Inicio</Link>
                    </div>   
                </div>
            </section>
        </div>
    )
}