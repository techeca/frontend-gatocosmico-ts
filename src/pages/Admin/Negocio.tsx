import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner";
import { generateDate } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const formClinicaSchema = z.object({
    nombreFantasia: z.string(),
    razonSocial: z.string(),
    rut: z.string()
});

interface Clinica {
    nombreFantasia: string;
    razonSocial: string;
    rut: string;
}

export default function Negocio() {
    const context = useContext(UserContext);


    if (!context) {
        throw new Error('Component must be wrapped with <UserContext.Provider>');
    }
    const { user } = context;

    const formClinica = useForm<z.infer<typeof formClinicaSchema>>({
        resolver: zodResolver(formClinicaSchema),
        defaultValues: {
            nombreFantasia: user?.clinica.nombreFantasia,
            razonSocial: user?.clinica.razonSocial,
            rut: user?.rut
        },
    });

    async function onSubmit(values: z.infer<typeof formClinicaSchema>) {
        // ✅ This will be type-safe and validated.
        //console.log(values)
        const clinica: Clinica = {
            nombreFantasia: values.nombreFantasia,
            razonSocial: values.razonSocial,
            rut: values.rut
        };

        const response = await fetch('/admin/negocio', {
            method: 'patch',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clinica),
        });

        if (response.ok) {
            //obtener cuerpo de la respuesta
            const body = await response.json();

            //mostrar alerta
            toast(`Bienvenido ${body.usuario.nombre}`, {
                description: generateDate(),
                action: {
                    label: "Cerrar",
                    onClick: () => console.log("Undo"),
                },
            })
        } else {
            // manejo de errores 
            console.log(response);
            toast(`${response.status} - ${response.statusText}`, {
                description: generateDate(),
                action: {
                    label: "Cerrar",
                    onClick: () => console.log("Undo"),
                },
            })
        }
    }


    return (
        <div className="flex gap-3 w-full p-6">
            <div className="flex flex-col w-2/5 gap-3">
                <Card className="">
                    <CardHeader>
                        <CardTitle>Perfil de Usuario</CardTitle>
                        <CardDescription>Administra tus datos personales.</CardDescription>
                    </CardHeader>
                    <Form {...formClinica}>
                        <form onSubmit={formClinica.handleSubmit(onSubmit)}>
                            <CardContent className="z-20">
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <FormField control={formClinica.control} name="nombreFantasia"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nombre Fantasía</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Nombre Fantasía" {...field} autoComplete="nombreFantasia" autoCorrect="off" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <FormField control={formClinica.control} name="razonSocial"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Razón Social</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Razón Social" {...field} autoComplete="razonSocial" autoCorrect="off" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <FormField control={formClinica.control} name="rut"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>RUT</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="RUT" {...field} autoComplete="rut" autoCorrect="off" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Reset</Button>
                                <Button type="submit">Guardar</Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>

                <Card className="w-full">
                    <div className="absolute overflow-hidden w-56 h-56">
                        <div className="absolute -left-1 top-0 h-16 w-16">
                            <div className="bg-blue-900 absolute transform -rotate-45 text-center text-white font-semibold py-1 left-[-34px] top-[32px] w-[170px]">
                                Soon
                            </div>
                        </div>
                    </div>
                    <CardHeader className="blur-sm">
                        <CardTitle>Configuración de Cookies</CardTitle>
                        <CardDescription>Administra tu configuración de cookies.</CardDescription>
                    </CardHeader>
                    <CardContent className="blur-sm">
                        <div className="flex items-center justify-between py-2">
                            <Label className="flex flex-col" htmlFor="correo">
                                Strictly Necessary
                                <span className="dark:text-zinc-400/90 text-xs leading-snug text-muted-foreground">
                                    These cookies are essential in order to use the website and use its features.
                                </span>
                            </Label>
                            <div>
                                <Switch />
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <Label className="flex flex-col" htmlFor="correo">
                                Functional Cookies
                                <span className="dark:text-zinc-400/90 text-xs leading-snug text-muted-foreground">
                                    These cookies allow the website to provide personalized functionality.
                                </span>
                            </Label>
                            <div>
                                <Switch />
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="flex justify-between blur-sm">

                        <Button>Guardar</Button>
                    </CardFooter>
                </Card>
            </div>

            <Card className="w-3/5 gap-6">
                <CardHeader>
                    <CardTitle>Perfil de Usuario</CardTitle>
                    <CardDescription>Administra tus datos personales.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-2 w-full">
                        <div className="shadow-md cursor-pointer border-t-2 border-red-500/60 hover:border-red-500 bg-slate-50 dark:bg-zinc-900 rounded-xl px-6 pb-4 pt-6 flex flex-col">
                            <div className="flex justify-between">
                                <h1 className="flex flex-col text-slate-800 dark:text-zinc-100 text-lg font-semibold">Inventario
                                    <span className="text-base font-light text-slate-500 dark:text-zinc-400">Sistema para gestión de productos.</span></h1>

                            </div>
                            <div className="flex my-3">
                                <div className="flex justify-center items-center gap-3">
                                    <p className="font-semibold text-slate-800 dark:text-zinc-500">Estado:</p>
                                    <span className="relative mt-1 flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500/70"></span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="shadow-md cursor-pointer border-t-2 border-blue-500/60 hover:border-blue-500 dark:bg-zinc-900 bg-slate-50 rounded-xl px-6 pb-4 pt-6 flex flex-col">
                            <div className="flex justify-between">
                                <h1 className="flex flex-col dark:text-zinc-100 text-slate-800 text-lg font-semibold">Agendamiento
                                    <span className="text-base font-light text-slate-500 dark:text-zinc-400">Sistema para gestión de productos.</span></h1>

                            </div>
                            <div className="flex my-3">

                                <div className="flex justify-center items-center gap-3">
                                    <p className="font-semibold text-slate-800 dark:text-zinc-500">Estado:</p>
                                    <span className="relative mt-1 flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500/70"></span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="shadow-md cursor-pointer border-t-2 border-green-500/60 hover:border-green-500 dark:bg-zinc-900 bg-slate-50 rounded-xl px-6 pb-4 pt-6 flex flex-col">
                            <div className="flex justify-between">
                                <h1 className="flex flex-col dark:text-zinc-100 text-slate-800 text-lg font-semibold">Atención Médica
                                    <span className="text-base font-light text-slate-500 dark:text-zinc-400">Sistema para gestión de productos.</span></h1>

                            </div>
                            <div className="flex my-3">

                                <div className="flex justify-center items-center gap-3">
                                    <p className="font-semibold text-slate-800 dark:text-zinc-500">Estado:</p>
                                    <span className="relative mt-1 flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500/70"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex items-center border-b-[1px] pt-6 pb-3 gap-1">

                        <CardTitle>Resume de factura</CardTitle>
                    </div>


                    <div className="flex flex-col gap-1 mt-3">
                        <div className="flex justify-between items-center">
                            <p className="text-start w-full font-semibold">Servicios</p>
                        </div>
                        <p className="bg-slate-100 dark:bg-zinc-900 px-3 py-1 rounded-md text-sm dark:text-zinc-400 text-zinc-500 flex justify-between ml-3">Inventario
                            <span className="">$10</span>
                        </p>
                        <p className="bg-slate-100 dark:bg-zinc-900 px-3 py-1 rounded-md text-sm dark:text-zinc-400 text-zinc-500 flex justify-between ml-3">Atención de Pacientes
                            <span className="">$10</span>
                        </p>
                        <p className="bg-slate-100 dark:bg-zinc-900 px-3 py-1 rounded-md text-sm dark:text-zinc-400 text-zinc-500 flex justify-between ml-3">Agendamiento
                            <span className="">$10</span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <p className="text-start w-full font-semibold">Otros</p>
                        </div>
                        <p className="bg-slate-100 dark:bg-zinc-900 px-3 py-1 rounded-md text-sm dark:text-zinc-400 text-zinc-500 flex justify-between ml-3">Hosting
                            <span className="">$10</span>
                        </p>
                        <p className="bg-slate-100 dark:bg-zinc-900 px-3 py-1 rounded-md text-sm dark:text-zinc-400 text-zinc-500 flex justify-between ml-3">Dominio
                            <span className="">$10</span>
                        </p>
                        <p className="bg-slate-100 dark:bg-zinc-900 px-3 py-1 rounded-md text-sm dark:text-zinc-400 text-zinc-500 flex justify-between ml-3">Soporte
                            <span className="">$10</span>
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <p className="bg-slate-100 text-md font-semibold my-3 py-2 dark:bg-zinc-900 px-3 rounded-md text-sm dark:text-zinc-400 text-zinc-500 self-end">Total:
                            <span className="ml-3"> $60</span>
                        </p>
                    </div>


                    {<div className="w-full border-t-[1px] opacity-80 dark:border-zinc-800 border-zinc-200"></div>}

                </CardContent>

                <CardFooter className="flex justify-end">
                    <Button >Pagar</Button>
                </CardFooter>

            </Card>
        </div>
    )
}