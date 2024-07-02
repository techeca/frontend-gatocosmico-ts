import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import { generateDate } from "@/lib/utils"
import { Label } from "@/components/ui/label";
import { useUserState } from "@/hooks/useUserState";

interface Account {
    correo: string;
}

export default function UserAcc() {
    const { user } = useUserState()
    const formSchemaAccount = z.object({
        correo: z.string().email()
    });
    const formAccount = useForm<z.infer<typeof formSchemaAccount>>({
        resolver: zodResolver(formSchemaAccount),
        defaultValues: {
            correo: user.account.correo || "",
        },
    });

    async function handleUpdateAccount(values: z.infer<typeof formSchemaAccount>) {
        const account: Account = {
            correo: values.correo
        };

        try {
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

    function resetFormAccount(e: React.MouseEvent) {
        e.preventDefault()
        formAccount.reset({
            correo: user.account.correo || "",
        });
    }

    return (
        <Card className="relative">
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
                                <Input id="clinica" placeholder="PetVet" className="bg-zinc-50 dark:bg-zinc-950" value={user.account.nombreFantasia} readOnly />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="rol">Rol</Label>
                                <Input id="rol" value={user.account.rol?.nombre} className="bg-zinc-50 dark:bg-zinc-950" readOnly />
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
    )
}