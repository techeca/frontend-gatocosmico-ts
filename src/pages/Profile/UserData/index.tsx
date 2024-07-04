import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button"
import { toast } from "sonner";
import { generateDate } from "@/lib/utils"
import { useUserState } from "@/hooks/useUserState";

interface Profile {
    nombre?: string;
    apellido?: string;
    rut?: string;
}

export default function UserData() {
    const { user } = useUserState();
    const formSchemaProfile = z.object({
        nombre: z.string().min(4),
        apellido: z.string().min(4),
        rut: z.string() //regex rut
    });
    const formProfile = useForm<z.infer<typeof formSchemaProfile>>({
        resolver: zodResolver(formSchemaProfile),
        defaultValues: {
            nombre: user.profile.nombre || "",
            apellido: user.profile.apellido || "",
            rut: user.profile.rut || "",
        },
    });

    async function handleUpdateProfile(values: z.infer<typeof formSchemaProfile>) {
        const profile: Profile = {
            nombre: values.nombre,
            apellido: values.apellido,
            rut: values.rut
        };

        try {
            const response = await fetch('/usuario/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile),
            });

            if (response.ok) {
                const data = await response.json()
                console.log(data);
                user.update.profile(data);

                toast(`Perfil Actualizado`, {
                    description: generateDate(),
                    action: {
                        label: "Cerrar",
                        onClick: () => console.log("Undo"),
                    },
                })
            }

        } catch (error) {
            toast(`${error}`, {
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
            nombre: user.profile.nombre || "",
            apellido: user.profile.apellido || "",
            rut: user.profile.rut || "",
        });
    }

    return (
        <Card className="relative backdrop-blur-sm bg-transparent">
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
    )
}