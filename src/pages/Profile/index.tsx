import { motion } from 'framer-motion';
import UserData from './UserData'
import ChangePassword from "./ChangePass"
import UserAcc from "./UserAcc"

//próximos a retirar
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function Profile() {
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

    return (
        <div className="flex flex-col lg:flex-row gap-6 justify-center w-full p-6 flex-wrap">

            <motion.div className="w-full lg:w-5/12 h-fit" variants={cardVariants} initial="hidden" animate="visible" custom={0.2}>
                <UserData />
            </motion.div>

            <motion.div className="w-full lg:w-6/12 h-fit" variants={cardVariants} initial="hidden" animate="visible" custom={0.3}>
                <ChangePassword />
            </motion.div>

            <motion.div className="w-full lg:w-5/12 h-fit" variants={cardVariants} initial="hidden" animate="visible" custom={0.4}>
                <UserAcc />
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