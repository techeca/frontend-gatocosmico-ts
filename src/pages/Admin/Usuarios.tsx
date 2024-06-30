import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react"
import {
    Pagination,
    PaginationContent,
    //PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { motion } from 'framer-motion';

interface User {
    id?: string;
    nombre: string;
    apellido: string;
    correo: string;
    rut: string;
    password?: string;
    rol: {
        nombre: string;
    }
}

const formSchemaOldUser = z.object({
    nombre: z.string(),
    apellido: z.string().min(4),
    rut: z.string().min(4),
    correo: z.string().email(),
    rol: z.string().min(4)
});

const formSchemaNewUser = z.object({
    nombre: z.string(),
    apellido: z.string().min(4),
    rut: z.string().min(4),
    correo: z.string().email(),
    password: z.string().min(6),
    repassword: z.string().min(6),
    rol: z.string().min(4)

}).refine(data => data.password === data.repassword, {
    message: 'Las contraseñas no coinciden',
    path: ['repassword']
})

export default function Usuarios() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>({ nombre: '', apellido: '', correo: '', rut: '', rol: { nombre: '' } });
    const [isNewUser, setIsNewUser] = useState(true);
    const [repassword, setRepassword] = useState('');

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

    const formOldUser = useForm<z.infer<typeof formSchemaOldUser>>({
        resolver: zodResolver(formSchemaOldUser),
        defaultValues: {
            nombre: selectedUser.nombre,
            apellido: selectedUser.apellido,
            correo: selectedUser.correo,
            rut: selectedUser.rut,
            rol: selectedUser.rol.nombre,
        },
    });

    const formNewUser = useForm<z.infer<typeof formSchemaNewUser>>({
        resolver: zodResolver(formSchemaNewUser),
        defaultValues: {
            nombre: '',
            apellido: '',
            correo: '',
            rut: '',
            password: '',
            repassword: '',
            rol: '',
        },
    });

    function selectUser(user: User) {
        setSelectedUser(user)
        setIsNewUser(false)
        formOldUser.reset({
            nombre: user.nombre,
            apellido: user.apellido,
            rut: user.rut,
            correo: user.correo,
            rol: user.rol.nombre
        })
        console.log(user);

    }

    function newUser() {
        setIsNewUser(true)
        formNewUser.reset({
            nombre: '',
            apellido: '',
            correo: '',
            rut: '',
            rol: ''
        })
        //setSelectedUser(user)
    }

    async function handleNewUser(values: z.infer<typeof formSchemaNewUser>) {
        const newUser: User = {
            nombre: values.nombre,
            apellido: values.apellido,
            correo: values.correo,
            rut: values.rut,
            password: values.password,
            rol: {
                nombre: values.rol
            }
        }

        const response = await fetch('/admin/usuarios/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })

        if (response.ok) {
            const newUser = await response.json()
            const cleanUser: User = { nombre: '', apellido: '', correo: '', rut: '', rol: { nombre: '' } }
            setSelectedUser(cleanUser)
            setIsNewUser(true)
            // Crea una copia del estado actual de users
            const usersCopy = [...users];
            // Agrega el nuevo usuario a la copia
            usersCopy.push(newUser);
            // Actualiza el estado de users con la copia
            setUsers(usersCopy);
        }

    }

    async function handleUpdateUser(values: z.infer<typeof formSchemaOldUser>) {
        const usuario: User = {
            nombre: values.nombre,
            apellido: values.apellido,
            rut: values.rut,
            correo: values.correo,
            rol: {
                nombre: values.rol
            }
        };

        //console.log(selectedUser);
        const response = await fetch('/admin/usuarios/actualizar', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })

        if (response.ok) {
            const updatedUser = await response.json();
            //setSelectedUser(newUserTemp);
            setIsNewUser(true);

            // Crea una copia del estado actual de users
            const usersCopy = [...users];

            // Encuentra el índice del usuario que quieres actualizar
            const index = usersCopy.findIndex(user => user.id === updatedUser.id);

            // Si el usuario existe en el array, actualiza sus valores
            if (index !== -1) {
                usersCopy[index] = updatedUser;
            }

            // Actualiza el estado de users con la copia
            setUsers(usersCopy);
        }
    }

    function handleChangeNewUser() {

        /*if (e.target.name === 'rol' && !isNewUser) {
            setSelectedUser({
                ...selectedUser,
                rol: {
                    id: e.target.value
                }
            })
        } else {
            console.log(selectedUser);
            setSelectedUser({
                ...selectedUser,
                [e.target.name]: e.target.value
            })
        }*/

    }

    useEffect(() => {
        fetch('/admin/usuarios')
            .then(response => response.json())
            .then(data => setUsers(data))
    }, [])

    return (
        users &&
        <div className="flex gap-6 w-full p-6">
            <motion.div
                className="w-full"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={0.2}
            >
                <Card className="">
                    <CardHeader>
                        <CardTitle>Lista de Usuario</CardTitle>
                        <CardDescription>Aquí puedes administrar todos los usuarios de tu sistema.</CardDescription>
                    </CardHeader>
                    {/*<div>
                        <button className="transition-colors duration-200 bg-green-500 hover:bg-green-600 text-white px-2 py-2 rounded-md">Nuevo Usuario</button>
                    </div>*/}
                    <CardContent className='w-full flex flex-col gap-6'>

                        <div className=' flex gap-3 items-center border-[0px] rounded-md'>
                            <Label className='text-sm font-semibold mb-1'>Buscar</Label>
                            <Input placeholder='Buscar' className="" />
                            <Button onClick={() => newUser()}>Nuevo Usuario</Button>
                        </div>

                        <table className=''>
                            <thead className='text-left'>
                                <tr className='text-sm bg-zinc-500/10'>
                                    <th className='py-2 pl-2'>NAME</th>
                                    <th>ROL</th>
                                    <th>ESTADO</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {/*Lista de usuarios*/}
                                {users.map(user =>
                                    <tr key={user.rut} onClick={() => selectUser(user)} className='text-sm hover:bg-zinc-200/10 hover:cursor-pointer'>
                                        <td className='font-semibold pl-2 flex items-center gap-2 py-2'>
                                            <div className='border-[1px] rounded-full w-12 h-12 flex items-center justify-center bg-zinc-600/10'>{user.nombre.charAt(0).toUpperCase()}</div>
                                            <div>
                                                <p className='capitalize'>{user.nombre} {user.apellido}</p>
                                                <p className='text-xs font-normal'>{user.correo}</p>
                                            </div>
                                        </td>
                                        <td className='font-semibold'>{user.rol.nombre}</td>
                                        <td className='flex items-center gap-2'>
                                            <div className='w-3 h-3 bg-green-500 rounded-full'>

                                            </div>
                                            Habilitado
                                        </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>

                        <div className='flex justify-end p-0 border-[0px] rounded-md gap-3'>

                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#" isActive>
                                            2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="/Home">3</PaginationLink>
                                    </PaginationItem>
                                    {/*<PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>*/}
                                    <PaginationItem>
                                        <PaginationNext href="#" />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>

                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                className="h-[570px] w-full hidden lg:block sticky top-16"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={0.3}
            >
                <div className=''>
                    <Card className={``}>

                        <CardHeader>
                            <CardTitle>Detalles {selectedUser && `${selectedUser.nombre} ${selectedUser.apellido}`}</CardTitle>
                            <CardDescription>Administra tus datos personales.</CardDescription>
                        </CardHeader>

                        {isNewUser === true &&
                            <Form {...formNewUser}>
                                <form onSubmit={formNewUser.handleSubmit(handleNewUser)}>
                                    <CardContent>
                                        <div className='flex flex-col gap-3 '>
                                            {/*<div className='w-full'>
                                        <div className='p-6 w-full border-[1px] rounded-md'>
                                            detalles
                                        </div>
                                        </div>*/}
                                            <div className='flex items-center gap-3'>
                                                <div className='flex flex-col w-full'>
                                                    <FormField control={formNewUser.control} name="nombre"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Email</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Nombre" {...field} autoComplete="nombre" autoCorrect="off" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className='flex flex-col w-full'>
                                                    <FormField control={formNewUser.control} name="apellido"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Apellido</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Apellido" {...field} autoComplete="apellido" autoCorrect="off" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <div className='flex flex-col w-full'>
                                                    <FormField control={formNewUser.control} name="rut"
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

                                                <div className='flex flex-col w-full'>
                                                    <FormField control={formNewUser.control} name="correo"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Correo</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Correo" {...field} autoComplete="correo" autoCorrect="off" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <div className='flex flex-col w-full'>

                                                    <Label className="py-1 mb-2">ROL</Label>
                                                    <Input placeholder="ROL" autoComplete="rol" autoCorrect="off" readOnly />

                                                </div>

                                                <div className='flex flex-col w-full'>
                                                    <FormField control={formNewUser.control} name="rol"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="py-1 mb-2">Cambiar ROL</FormLabel>
                                                                <FormControl>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <SelectTrigger className="w-full">
                                                                            <SelectValue placeholder="Seleccionar ROL" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectLabel>ROLES</SelectLabel>
                                                                                <SelectItem value="Administrador">Administrador</SelectItem>
                                                                                <SelectItem value="Doctor">Doctor</SelectItem>
                                                                                <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    
                                                    {/*<input type="text"  value={selectedUser?.correo} placeholder='Correo' className='border-[1px] rounded-md p-2' />*/}
                                                </div>
                                            </div>

                                            <div className={`items-center gap-3 flex ${isNewUser ? '' : 'opacity-0 h-0'}`}>
                                                <div className='flex flex-col w-full'>
                                                    <FormField control={formNewUser.control} name="password"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Contraseña</FormLabel>
                                                                <FormControl>
                                                                    <Input type="password" placeholder="Password" {...field} autoComplete="password" autoCorrect="off" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className='flex flex-col w-full'>
                                                    <FormField control={formNewUser.control} name="repassword"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Repetir contraseña</FormLabel>
                                                                <FormControl>
                                                                    <Input type="password" placeholder="Repetir Password" {...field} autoComplete="repassword" autoCorrect="off" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>

                                        </div>



                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <Button type="submit" className={`relative overflow-hidden w-48 h-10 bg-red-500 border-gray-100 rounded-lg shadow-inner group ${isNewUser ? ' text-black' : 'text-gray-600'}`}>
                                            <span className={`absolute top-0 left-0 h-0 transition-all duration-200 border-t-2 border-gray-800 ${isNewUser ? 'w-48' : 'w-0'} ease`}></span>
                                            <span className={`absolute bottom-0 right-0 h-0 transition-all duration-200 border-b-2 border-gray-800 ${isNewUser ? 'w-48' : 'w-0'} ease`}></span>
                                            <span className={`absolute top-0 left-0 w-48 transition-all duration-300 delay-200 bg-gray-800 ${isNewUser ? 'h-10' : 'h-0'} ease`}></span>
                                            <span className={`absolute bottom-0 left-0 w-48 transition-all duration-300 delay-200 bg-gray-800 ${isNewUser ? 'h-10' : 'h-0'} ease`}></span>
                                            <span className={`absolute transition-all inset-0 w-48 duration-300 delay-300 bg-zinc-800 ${isNewUser ? 'h-10' : 'h-0'}`}></span>
                                            <span className={`relative transition-all duration-300 delay-200 ${isNewUser ? 'text-white' : 'text-slate-50'} ease`}>
                                                <div className='flex justify-center gap-3'>
                                                    {isNewUser ?
                                                        <>

                                                            Agregar
                                                        </>

                                                        :
                                                        <>

                                                            Actualizar
                                                        </>

                                                    }
                                                </div>
                                            </span>
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Form>
                        }
                        {isNewUser === false &&
                            <Form {...formOldUser}>
                                <form onSubmit={formOldUser.handleSubmit(handleUpdateUser)}>
                                    <CardContent>
                                        <div className='flex flex-col gap-3 '>
                                            {/*<div className='w-full'>
                                        <div className='p-6 w-full border-[1px] rounded-md'>
                                            detalles
                                        </div>
                                        </div>*/}
                                            <div className='flex items-center gap-3'>
                                                <div className='flex flex-col w-full'>
                                                    <FormField control={formOldUser.control} name="nombre"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Nombre</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Nombre" {...field}  autoComplete="nombre" autoCorrect="off" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <div className='flex flex-col w-full'>
                                                    <FormField control={formOldUser.control} name="apellido"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Apellido</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Apellido" {...field} autoComplete="apellido" autoCorrect="off" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <div className='flex flex-col w-full'>
                                                    <FormField control={formOldUser.control} name="rut"
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

                                                <div className='flex flex-col w-full'>
                                                    <FormField control={formOldUser.control} name="correo"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Correo</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="Correo" {...field} autoComplete="correo" autoCorrect="off" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <div className='flex flex-col w-full'>

                                                    <Label className="py-1 mb-2">ROL</Label>
                                                    <Input placeholder="ROL" readOnly />

                                                </div>

                                                <div className='flex flex-col w-full'>
                                                    <FormField control={formOldUser.control} name="rol"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="py-1 mb-2">Cambiar ROL</FormLabel>
                                                                <FormControl>
                                                                    <Select onValueChange={field.onChange} {...field}>
                                                                        <SelectTrigger className="w-full">
                                                                            <SelectValue placeholder="Seleccionar ROL" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectLabel>ROLES</SelectLabel>
                                                                                <SelectItem value="Administrador">Administrador</SelectItem>
                                                                                <SelectItem value="Doctor">Doctor</SelectItem>
                                                                                <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                                                                                <SelectItem value="Tecnico">Técnico</SelectItem>
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />


                                                    {/*<input type="text"  value={selectedUser?.correo} placeholder='Correo' className='border-[1px] rounded-md p-2' />*/}
                                                </div>
                                            </div>

                                        </div>



                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <Button type="submit" className={`relative overflow-hidden w-48 h-10 bg-red-500 border-gray-100 rounded-lg shadow-inner group ${isNewUser ? ' text-black' : 'text-gray-600'}`}>
                                            <span className={`absolute top-0 left-0 h-0 transition-all duration-200 border-t-2 border-gray-800 ${isNewUser ? 'w-48' : 'w-0'} ease`}></span>
                                            <span className={`absolute bottom-0 right-0 h-0 transition-all duration-200 border-b-2 border-gray-800 ${isNewUser ? 'w-48' : 'w-0'} ease`}></span>
                                            <span className={`absolute top-0 left-0 w-48 transition-all duration-300 delay-200 bg-gray-800 ${isNewUser ? 'h-10' : 'h-0'} ease`}></span>
                                            <span className={`absolute bottom-0 left-0 w-48 transition-all duration-300 delay-200 bg-gray-800 ${isNewUser ? 'h-10' : 'h-0'} ease`}></span>
                                            <span className={`absolute transition-all inset-0 w-48 duration-300 delay-300 bg-zinc-800 ${isNewUser ? 'h-10' : 'h-0'}`}></span>
                                            <span className={`relative transition-all duration-300 delay-200 ${isNewUser ? 'text-white' : 'text-slate-50'} ease`}>
                                                <div className='flex justify-center gap-3'>
                                                    {isNewUser ?
                                                        <>

                                                            Agregar
                                                        </>

                                                        :
                                                        <>

                                                            Actualizar
                                                        </>

                                                    }
                                                </div>
                                            </span>
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Form>
                        }

                    </Card>
                </div>
            </motion.div>
        </div>
    )
}