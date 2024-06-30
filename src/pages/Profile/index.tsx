import { useState, ChangeEvent, useContext } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    //FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
/*import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"*/
import { Switch } from "@/components/ui/switch"
import { UserContext } from "@/contexts/UserContext"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { generateDate } from "@/lib/utils"
//import { useUserState } from "@/hooks/useUserState"
import { motion } from 'framer-motion';

interface Profile {
    nombre: string;
    apellido: string;
    rut: string;
}

interface Account {
    correo: string;
}

interface Password {
    contrasenaActual: string;
    nuevaContrasena: string;
    reNuevaContrasena: string;
}

const formSchemaProfile = z.object({
    nombre: z.string().min(4),
    apellido: z.string().min(4),
    rut: z.string() //regex rut
});

const formSchemaAccount = z.object({
    correo: z.string().email()
});

const formSchemaPassword = z.object({
    contrasenaActual: z.string().min(6),
    nuevaContrasena: z.string(),
    reNuevaContrasena: z.string()
}).refine(data => data.nuevaContrasena === data.reNuevaContrasena, {
    // Mensaje de error personalizado
    message: "No concide que Nueva Contraseña",
    // Esta opción asegura que la validación personalizada se ejecuta solo si todas las demás validaciones pasan
    path: ['reNuevaContrasena']
});

export default function Profile() {
    const [password, setPassword] = useState('');
    const context = useContext(UserContext);
    //const userState = useUserState()

    if (!context) {
        throw new Error('Component must be wrapped with <UserContext.Provider>');
    }

    const { user } = context;
    //console.log(userState);
    const cardVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: (delay: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: delay, // Use the delay passed as a prop
            },
        }),
    };

    const formProfile = useForm<z.infer<typeof formSchemaProfile>>({
        resolver: zodResolver(formSchemaProfile),
        defaultValues: {
            nombre: user?.nombre || "",
            apellido: user?.apellido || "",
            rut: user?.rut || "",
        },
    });

    const formAccount = useForm<z.infer<typeof formSchemaAccount>>({
        resolver: zodResolver(formSchemaAccount),
        defaultValues: {
            correo: user?.correo || "",
        },
    });

    const formPassword = useForm<z.infer<typeof formSchemaPassword>>({
        resolver: zodResolver(formSchemaPassword),
        defaultValues: {
            contrasenaActual: "",
            nuevaContrasena: "",
            reNuevaContrasena: "",
        },
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        //field.onChange(e);
        setPassword(e.target.value);
    }

    //async function onSubmit(values: z.infer<typeof formSchema>)
    async function handleUpdateProfile(values: z.infer<typeof formSchemaProfile>) {
        const profile: Profile = {
            nombre: values.nombre,
            apellido: values.apellido,
            rut: values.rut
        };

        const response = await fetch('/usuario/profile', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile),
        });

        if (response.ok) {
            //const body = await response.json();
            //console.log(body);
            toast(`Perfil Actualizado`, {
                description: generateDate(),
                action: {
                    label: "Cerrar",
                    onClick: () => console.log("Undo"),
                },
            })
        } else {
            toast(`Error al actualizar el Perfil`, {
                description: generateDate(),
                action: {
                    label: "Cerrar",
                    onClick: () => console.log("Undo"),
                },
            })
        }
    }

    async function handleUpdateAccount(values: z.infer<typeof formSchemaAccount>) {
        const account: Account = {
            correo: values.correo
        };

        const response = await fetch('/usuario/profile', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        });

        if (response.ok) {
            //const body = await response.json();
            //console.log(body);
            toast(`Email Actualizado`, {
                description: generateDate(),
                action: {
                    label: "Cerrar",
                    onClick: () => console.log("Undo"),
                },
            })
        } else {
            toast(`Error al actualizar el Email`, {
                description: generateDate(),
                action: {
                    label: "Cerrar",
                    onClick: () => console.log("Undo"),
                },
            })
        }
    }

    async function handleUpdatePassword(values: z.infer<typeof formSchemaPassword>) {
        const newpassword: Password = {
            contrasenaActual: values.contrasenaActual,
            nuevaContrasena: password,
            reNuevaContrasena: values.reNuevaContrasena
        };

        const response = await fetch('/usuario/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newpassword),
        });

        if (response.ok) {
            //const body = await response.json();
            //console.log(body);
            toast(`Contraseña Actualizada`, {
                description: generateDate(),
                action: {
                    label: "Cerrar",
                    onClick: () => console.log("Undo"),
                },
            })
        } else {
            toast(`Error al actualizar la contraseña`, {
                description: generateDate(),
                action: {
                    label: "Cerrar",
                    onClick: () => console.log("Undo"),
                },
            })
        }

    }

    function resetFormProfile(e: React.MouseEvent) {
        e.preventDefault()
        formProfile.reset({
            nombre: user?.nombre || "",
            apellido: user?.apellido || "",
            rut: user?.rut || "",
        });
    }

    function resetFormAccount(e: React.MouseEvent) {
        e.preventDefault()
        formAccount.reset({
            correo: user?.correo || "",
        });
    }

    function resetFormPassword(e: React.MouseEvent) {
        e.preventDefault()
        formPassword.reset({
            contrasenaActual: "",
            nuevaContrasena: ""
        });
    }

    
    return (
        <div className="flex flex-col lg:flex-row gap-6 justify-center w-full p-6 flex-wrap">

            <motion.div
                className="w-full lg:w-5/12 h-fit"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={0.2}
            >
                <Card className="relative bg-transparent">
                    <div className="absolute h-full -z-10 w-full [mask-image:radial-gradient(black_75%,transparent)]">
                        
                    </div>
                    <CardHeader>
                        <CardTitle className="">Perfil de Usuario</CardTitle>
                        <CardDescription>Administra tus datos personales.</CardDescription>
                    </CardHeader>
                    <Form {...formProfile}>
                        <form className="" onSubmit={formProfile.handleSubmit(handleUpdateProfile)}>
                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                    <FormField control={formProfile.control} name="nombre"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nombre</FormLabel>
                                                <FormControl>
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Input placeholder="Joe" {...field} autoComplete="Nombre" className="bg-zinc-50 dark:bg-zinc-950" autoCorrect="off" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField control={formProfile.control} name="apellido"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Apellido</FormLabel>
                                                <FormControl>
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Input placeholder="Doe" {...field} autoComplete="Apellido" className="bg-zinc-50 dark:bg-zinc-950" autoCorrect="off" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField control={formProfile.control} name="rut"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>RUT</FormLabel>
                                                <FormControl>
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Input placeholder="RUT" {...field} autoComplete="RUT" className="bg-zinc-50 dark:bg-zinc-950" autoCorrect="off" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" onClick={e => resetFormProfile(e)}>Reset</Button>
                                <Button type="submit">Guardar</Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </motion.div>

            <motion.div
                className="w-full lg:w-6/12 h-fit"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={0.3}
            >
                <Card className="relative bg-transparent">
                    <div className="absolute h-full -z-10 w-full [mask-image:radial-gradient(black_75%,transparent)]">
                        
                    </div>
                    <CardHeader>
                        <CardTitle>Cambiar Contraseña</CardTitle>
                        <CardDescription>Cambia tu contraseña para ingresar.</CardDescription>
                    </CardHeader>

                    <Form {...formPassword}>
                        <form onSubmit={formPassword.handleSubmit(handleUpdatePassword)}>
                            <CardContent>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="grid w-full h-fit items-center gap-4">

                                        <div className="flex flex-col space-y-1.5">
                                            <FormField control={formPassword.control} name="contrasenaActual"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Contraseña</FormLabel>
                                                        <FormControl>
                                                            <div className="flex flex-col space-y-1.5">
                                                                <Input type="password" placeholder="******" {...field} className="bg-zinc-50 dark:bg-zinc-950" autoComplete="contrasenaActual" autoCorrect="off" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="flex flex-col space-y-1.5">
                                            <FormField control={formPassword.control} name="nuevaContrasena"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nueva contraseña</FormLabel>
                                                        <FormControl>
                                                            <div className="flex flex-col space-y-1.5">
                                                                <Input type="password" placeholder="******" {...field} className="bg-zinc-50 dark:bg-zinc-950" onChange={(e) => { field.onChange(e); handleChange(e) }} autoComplete="nuevaContrasena" autoCorrect="off" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="flex flex-col space-y-1.5">
                                            <FormField control={formPassword.control} name="reNuevaContrasena"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Repetir nueva contraseña</FormLabel>
                                                        <FormControl>
                                                            <div className="flex flex-col space-y-1.5">
                                                                <Input type="password" placeholder="******" {...field} className="bg-zinc-50 dark:bg-zinc-950" autoComplete="reNuevaContrasena" autoCorrect="off" />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                    </div>

                                    <div className="grid w-full items-center dark:bg-zinc-900 rounded-xl border-[1px] border-zinc-800">

                                        <div className="px-6">

                                            <div className="mb-3">

                                                <h4 className="my-2 text-sm font-semibold text-gray-800 dark:text-white">
                                                    Tu nueva contraseña debe tener:
                                                </h4>

                                                <ul className="space-y-1 text-sm text-gray-500 dark:text-zinc-500">

                                                    <li className={`flex items-center gap-x-2 ${formPassword.getValues().nuevaContrasena.length >= 6 ? 'text-green-600' : 'text-zinc-500'}`}>
                                                        {formPassword.getValues().nuevaContrasena.length >= 6 ? (
                                                            <span data-check="">
                                                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                            </span>
                                                        ) : (
                                                            <span data-uncheck="">
                                                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M18 6 6 18"></path>
                                                                    <path d="m6 6 12 12"></path>
                                                                </svg>
                                                            </span>
                                                        )}
                                                        Mínimo 6 caracteres.
                                                    </li>
                                                    <li className={`flex items-center gap-x-2 ${/[a-z]/.test(formPassword.getValues().nuevaContrasena) ? 'text-green-600' : 'text-zinc-500'}`}>
                                                        {/[a-z]/.test(formPassword.getValues().nuevaContrasena) ? (
                                                            <span data-check="">
                                                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                            </span>
                                                        ) : (
                                                            <span data-uncheck="">
                                                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M18 6 6 18"></path>
                                                                    <path d="m6 6 12 12"></path>
                                                                </svg>
                                                            </span>
                                                        )}
                                                        Debe tener minúsculas.
                                                    </li>
                                                    <li className={`flex items-center gap-x-2 ${/[A-Z]/.test(formPassword.getValues().nuevaContrasena) ? 'text-green-600' : 'text-zinc-500'}`}>
                                                        {/[A-Z]/.test(formPassword.getValues().nuevaContrasena) ? (
                                                            <span data-check="">
                                                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                            </span>
                                                        ) : (
                                                            <span data-uncheck="">
                                                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M18 6 6 18"></path>
                                                                    <path d="m6 6 12 12"></path>
                                                                </svg>
                                                            </span>
                                                        )}
                                                        Debe tener mayúsculas.
                                                    </li>
                                                    <li className={`flex items-center gap-x-2 ${/[0-9]/.test(formPassword.getValues().nuevaContrasena) ? 'text-green-600' : 'text-zinc-500'}`}>
                                                        {/[0-9]/.test(formPassword.getValues().nuevaContrasena) ? (
                                                            <span data-check="">
                                                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                            </span>
                                                        ) : (
                                                            <span data-uncheck="">
                                                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M18 6 6 18"></path>
                                                                    <path d="m6 6 12 12"></path>
                                                                </svg>
                                                            </span>
                                                        )}
                                                        Debe contener números.
                                                    </li>
                                                    <li className={`flex items-center gap-x-2 ${/[!@#$%^&*()_+\-=[\]{}\\|;:'",<.>/?]/.test(formPassword.getValues().nuevaContrasena) ? 'text-green-600' : 'text-zinc-500'}`}>
                                                        {/[!@#$%^&*()_+\-=[\]{}\\|;:'",<.>/?]/.test(formPassword.getValues().nuevaContrasena) ? (
                                                            <span data-check="">
                                                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                                </svg>
                                                            </span>
                                                        ) : (
                                                            <span data-uncheck="">
                                                                <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M18 6 6 18"></path>
                                                                    <path d="m6 6 12 12"></path>
                                                                </svg>
                                                            </span>
                                                        )}
                                                        Debe contener caracteres especiales.
                                                    </li>

                                                </ul>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-6 justify-end">
                                <Button onClick={(e) => resetFormPassword(e)} variant="secondary">Reset</Button>
                                <Button type="submit">Cambiar</Button>
                            </CardFooter>
                        </form>
                    </Form>

                </Card>
            </motion.div>

            <motion.div
                className="w-full lg:w-5/12 h-fit"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={0.4}
            >
                <Card className="relative bg-transparent">
                    <div className="absolute h-full w-full -z-10 [mask-image:radial-gradient(black_75%,transparent)]">
                        
                    </div>
                    <CardHeader>
                        <CardTitle>Configuración de Cuenta</CardTitle>
                        <CardDescription>Relacionado con la cuenta del sistema.</CardDescription>
                    </CardHeader>
                    <Form {...formAccount}>
                        <form onSubmit={formAccount.handleSubmit(handleUpdateAccount)}>
                            <CardContent>

                                <div className="grid w-full items-center gap-4">
                                    <FormField control={formAccount.control} name="correo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Correo</FormLabel>
                                                <FormControl>
                                                    <div className="flex flex-col space-y-1.5">
                                                        <Input placeholder="Correo" {...field} className="bg-zinc-50 dark:bg-zinc-950" autoComplete="Correo" autoCorrect="off" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="clinica">Clinica</Label>
                                        <Input id="clinica" placeholder="PetVet" className="bg-zinc-50 dark:bg-zinc-950" value={user?.clinica?.nombreFantasia} readOnly />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="rol">Rol</Label>
                                        <Input id="rol" value={user?.rol} className="bg-zinc-50 dark:bg-zinc-950" readOnly />
                                    </div>
                                </div>

                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button onClick={(e) => resetFormAccount(e)} variant="outline">Reset</Button>
                                <Button type="submit">Guardar</Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>

            </motion.div>

            <motion.div
                className="w-full lg:w-3/12 h-fit"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={0.5}
            >
                <Card className="">
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
                        <div className="flex items-center justify-between py-2">
                            <Label className="flex flex-col" htmlFor="correo">
                                Performance Cookies
                                <span className="dark:text-zinc-400/90 text-xs leading-snug text-muted-foreground">
                                    These cookies help to improve the performance of the website.
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

            </motion.div>

            <motion.div
                className="w-full lg:w-3/12 h-fit"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={0.6}
            >
                <Card className="">
                    <div className="absolute overflow-hidden w-56 h-56">
                        <div className="absolute -left-1 top-0 h-16 w-16">
                            <div className="bg-blue-900 absolute transform -rotate-45 text-center text-white font-semibold py-1 left-[-34px] top-[32px] w-[170px]">
                                Soon
                            </div>
                        </div>
                    </div>
                    <CardHeader className="blur-sm">
                        <CardTitle>Email Notifications</CardTitle>
                        <CardDescription>Administra la configuración de notificaciones.</CardDescription>
                    </CardHeader>
                    <CardContent className="blur-sm">
                        <div className="flex items-center justify-between py-2">
                            <Label className="flex flex-col" htmlFor="correo">
                                Marketing emails
                                <span className="dark:text-zinc-400/90 text-xs leading-snug text-muted-foreground">
                                    Receive emails about new products, features, and more.
                                </span>
                            </Label>
                            <div>
                                <Switch />
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <Label className="flex flex-col" htmlFor="correo">
                                Security emails
                                <span className="dark:text-zinc-400/90 text-xs leading-snug text-muted-foreground">
                                    Receive emails about your account security.
                                </span>
                            </Label>
                            <div>
                                <Switch />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="blur-sm flex justify-between">

                        <Button>Guardar</Button>
                    </CardFooter>
                </Card>

            </motion.div>

        </div>
    )
}