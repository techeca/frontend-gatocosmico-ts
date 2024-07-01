import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import { generateDate } from "@/lib/utils"
import { useState, ChangeEvent } from "react";

interface Password {
    contrasenaActual: string;
    nuevaContrasena: string;
    reNuevaContrasena: string;
}

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

export default function ChangePassword(){
    const [password, setPassword] = useState('');

    const formPassword = useForm<z.infer<typeof formSchemaPassword>>({
        resolver: zodResolver(formSchemaPassword),
        defaultValues: {
            contrasenaActual: "",
            nuevaContrasena: "",
            reNuevaContrasena: "",
        },
    });

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

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        //field.onChange(e);
        setPassword(e.target.value);
    }
    
    function resetFormPassword(e: React.MouseEvent) {
        e.preventDefault()
        formPassword.reset({
            contrasenaActual: "",
            nuevaContrasena: ""
        });
    }

    return(
        <Card className="relative">
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
    )
}