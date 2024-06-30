import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CopyIcon, ChevronRightIcon, ChevronLeftIcon, Cross1Icon, CheckIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { motion } from 'framer-motion';

interface CalendarConfig {
    startHour: string;
    endHour: string;
    startBreak: string;
    endBreak: string;
    days: string[]
}

type Day = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

const formHorarioSchema = z.object({
    startHour: z.string(),
    startMin: z.string(),
    endHour: z.string(),
    endMin: z.string()
});

export default function Agendamiento() {
    const [calendarConfig, setCalendarConfig] = useState({} as CalendarConfig)
    const [actualdate, setActualdate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<number[]>([]);
    const [dayOfWeek, setDayOfWeek] = useState({ lunes: false, martes: false, miercoles: false, jueves: false, viernes: false, sabado: false, domingo: false });

    function selectDayOfWeek(day: Day) {
        console.log(day);
        console.log(dayOfWeek.lunes);


        setDayOfWeek(prevState => ({ ...prevState, [day]: !prevState[day] }));
    }

    function getFirstAndLastTrueDay() {
        let firstTrueDay: string | null = null;
        let lastTrueDay: string | null = null;

        for (const [day, value] of Object.entries(dayOfWeek)) {
            if (value) {
                if (!firstTrueDay) {
                    firstTrueDay = day;
                }
                lastTrueDay = day;
            }
        }

        return `${firstTrueDay} a ${lastTrueDay}`;
    }

    function checkDays(days: number[]) {
        const firstDay = new Date(actualdate.getFullYear(), actualdate.getMonth(), days[0]);
        const dayOfWeek = firstDay.toLocaleString('es-ES', { weekday: 'long' });

        for (let i = 1; i < days.length; i++) {
            const day = new Date(actualdate.getFullYear(), actualdate.getMonth(), days[i]);
            if (day.getDay() !== firstDay.getDay()) {
                return { allSameDayOfWeek: false };
            }
        }

        return { allSameDayOfWeek: true, dayOfWeek };
    }

    function saveDayOfWeek() {
        let newCal = calendarConfig;
        let days = [];
        for (const [day, value] of Object.entries(dayOfWeek)) {
            if (value) {
                days.push(day);
            }
        }
        newCal.days = days;

        setCalendarConfig(prevState => ({ ...prevState, days: days }));
        toast(`Configuración guardada`, {
            description: "Los días de atención han sido guardados correctamente.",
            action: {
                label: "Cerrar",
                onClick: () => console.log("Undo"),
            },
        })
    }

    async function saveHorario(values: z.infer<typeof formHorarioSchema>) {
        let newCal = calendarConfig;

        newCal.startHour = `${values.startHour}:${values.startMin}`;
        newCal.endHour = `${values.endHour}:${values.endMin}`;
        setCalendarConfig(newCal);
        toast(`Configuración guardada`, {
            description: "Horario de atención actualizado correctamente.",
            action: {
                label: "Cerrar",
                onClick: () => console.log("Undo"),
            },
        })
    }

    async function saveDescanso(values: z.infer<typeof formHorarioSchema>) {
        let newCal = calendarConfig;
        newCal.startBreak = `${values.startHour}:${values.startMin}`;
        newCal.endBreak = `${values.endHour}:${values.endMin}`;
        setCalendarConfig(newCal);
        toast(`Configuración guardada`, {
            description: "Hora de descanso actualizada correctamente.",
            action: {
                label: "Cerrar",
                onClick: () => console.log("Undo"),
            },
        })
    }

    const formHorario = useForm<z.infer<typeof formHorarioSchema>>({
        resolver: zodResolver(formHorarioSchema),
        defaultValues: {
            startHour: '',
            startMin: '',
            endHour: '',
            endMin: ''
        },
    });

    const formDescanso = useForm<z.infer<typeof formHorarioSchema>>({
        resolver: zodResolver(formHorarioSchema),
        defaultValues: {
            startHour: '',
            startMin: '',
            endHour: '',
            endMin: ''
        },
    });

    const incrementMonth = () => {
        let newDate = new Date(actualdate);
        newDate.setMonth(newDate.getMonth() + 1);
        setActualdate(newDate);
    }

    const decrementMonth = () => {
        let newDate = new Date(actualdate);
        newDate.setMonth(newDate.getMonth() - 1);
        setActualdate(newDate);
    }

    function multiSelect(i: number) {
        let selected = [...selectedDay];

        if (selected.find(l => l === i)) {
            selected = selected.filter(l => l !== i);
            setSelectedDay(selected);
            toast(`Día ${i} descarmado`, {
                action: {
                    label: "Cerrar",
                    onClick: () => console.log("Undo"),
                },
            })
            return;
        } else {
            selected.push(i);
            setSelectedDay(selected);
            toast(`Día ${i} seleccionado`, {

                action: {
                    label: "Cerrar",
                    onClick: () => console.log("Undo"),
                },
            })
        }
    }

    function noDaySelected() {
        toast(`No hay días seleccionados`, {
            description: "Por favor seleccione al menos un día",
            action: {
                label: "Cerrar",
                onClick: () => console.log("Undo"),
            },
        })
    }

    function generateCalendar() {
        const date = actualdate;
        const month = date.getMonth();
        const year = date.getFullYear();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const firstDayIndex = (firstDayOfMonth.getDay() + 6) % 7;
        const lastDayIndex = (lastDayOfMonth.getDay() + 6) % 7;

        const daysInMonth = lastDayOfMonth.getDate();

        const calendar = [];

        // Fill in days before the start of the current month
        for (let i = 0; i < firstDayIndex; i++) {
            calendar.push(<div key={`pre${i}`} className="calendar-day empty w-full h-[130px] max-h-[130px] border-[0px] border-white"></div>);
        }

        // Fill in the actual days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayOfWeek = new Date(year, month, i).getDay();
            const isWeekend = dayOfWeek === 6 || dayOfWeek === 0; // 6 is Saturday, 0 is Sunday
            const weekendStyle = isWeekend ? 'dark:hover:bg-red-800/20 bg-red-800/10' : '';
            calendar.push(<div key={i} onClick={() => multiSelect(i)} className={`calendar-day dark:hover:bg-zinc-900 hover:bg-zinc-100 cursor-pointer font-thin w-full p-3 h-[130px] ${selectedDay.find(l => l === i) ? 'border-2' : ''} max-h-[130px] border-green-900/80 ${weekendStyle}`}>{i}</div>);
        }

        // Fill in days after the end of the current month
        for (let i = lastDayIndex + 1; i < 7; i++) {
            calendar.push(<div key={`post${i}`} className="calendar-day empty h-[130px] w-full border-[0px] max-h-[130px] border-white"></div>);
        }

        return calendar;
    }

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
        <div className="w-full flex justify-between h-full">
            <div className="">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="w-48 border-[0px] border-white p-6 flex justify-center">
                            <div className="flex-col gap-1 cursor-pointer hover:dark:bg-zinc-800 border-[0px] hover:bg-zinc-200 border-white w-24 h-24 text-zinc-400 dark:text-zinc-500 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                                {calendarConfig.startHour && calendarConfig.endHour ?
                                    <CheckIcon className="h-6 w-6" />
                                    :
                                    <Cross1Icon className="h-6 w-6" />
                                }
                                <p>Horario</p>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Horario de atención</DialogTitle>
                            <DialogDescription>
                                Ingresar la hora de inicio y fin de atención de un día.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...formHorario}>
                            <form onSubmit={formHorario.handleSubmit(saveHorario)}>
                                <div className="flex flex-col w-full gap-3 pb-3">
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="horaInicio">
                                            Hora de inicio
                                        </Label>
                                        <div className="flex gap-3 w-full">
                                            <FormField control={formHorario.control} name="startHour"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Hora" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Hora</SelectLabel>
                                                                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                                                            <SelectItem key={hour} value={`${hour}`}>{hour < 10 ? `0${hour}` : hour}</SelectItem>
                                                                        ))}
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField control={formHorario.control} name="startMin"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Minutos" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Minutos</SelectLabel>
                                                                        <SelectItem value="00">00</SelectItem>
                                                                        <SelectItem value="30">30</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="horaFinal">
                                            Hora de cierre
                                        </Label>
                                        <div className="flex gap-3">
                                            <FormField control={formHorario.control} name="endHour"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Hora" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Hora</SelectLabel>
                                                                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                                                            <SelectItem key={hour} value={`${hour}`}>{hour < 10 ? `0${hour}` : hour}</SelectItem>
                                                                        ))}
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField control={formHorario.control} name="endMin"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Minutos" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Minutos</SelectLabel>
                                                                        <SelectItem value="00">00</SelectItem>
                                                                        <SelectItem value="30">30</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter className="sm:justify-start">
                                    <DialogClose asChild>
                                        <Button type="submit" variant="secondary">
                                            Guardar
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <div className="w-48 border-[0px] border-white p-6 flex justify-center">
                            <div className="flex-col gap-1 cursor-pointer hover:dark:bg-zinc-800 border-[0px] hover:bg-zinc-200 border-white w-24 h-24 text-zinc-400 dark:text-zinc-500 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                                {calendarConfig.startHour && calendarConfig.endHour ?
                                    <CheckIcon className="h-6 w-6" />
                                    :
                                    <Cross1Icon className="h-6 w-6" />
                                }
                                <p>Break</p>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Hora de descanso</DialogTitle>
                            <DialogDescription>
                                En la hora de descanso no se podrán realizar agendamientos.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...formDescanso}>
                            <form onSubmit={formDescanso.handleSubmit(saveDescanso)}>
                                <div className="flex flex-col w-full gap-3 pb-3">
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="horaInicio">
                                            Hora de inicio
                                        </Label>
                                        <div className="flex gap-3 w-full">
                                            <FormField control={formDescanso.control} name="startHour"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Hora" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Hora</SelectLabel>
                                                                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                                                            <SelectItem key={hour} value={`${hour}`}>{hour < 10 ? `0${hour}` : hour}</SelectItem>
                                                                        ))}
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField control={formDescanso.control} name="startMin"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Minutos" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Minutos</SelectLabel>
                                                                        <SelectItem value="00">00</SelectItem>
                                                                        <SelectItem value="30">30</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="horaFinal">
                                            Hora de cierre
                                        </Label>
                                        <div className="flex gap-3">
                                            <FormField control={formDescanso.control} name="endHour"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Hora" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Hora</SelectLabel>
                                                                        {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                                                            <SelectItem key={hour} value={`${hour}`}>{hour < 10 ? `0${hour}` : hour}</SelectItem>
                                                                        ))}
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField control={formDescanso.control} name="endMin"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormControl>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Minutos" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectGroup>
                                                                        <SelectLabel>Minutos</SelectLabel>
                                                                        <SelectItem value="00">00</SelectItem>
                                                                        <SelectItem value="30">30</SelectItem>
                                                                    </SelectGroup>
                                                                </SelectContent>
                                                            </Select>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter className="sm:justify-start">
                                    <DialogClose asChild>
                                        <Button type="submit" variant="secondary">
                                            Guardar
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <div className="w-48 border-[0px] border-white p-6 flex justify-center">
                            <div className="flex-col gap-1 cursor-pointer hover:dark:bg-zinc-800 border-[0px] hover:bg-zinc-200 border-white w-24 h-24 text-zinc-400 dark:text-zinc-500 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                                {calendarConfig.days && calendarConfig.endHour !== '' ?
                                    <CheckIcon className="h-6 w-6" />
                                    :
                                    <Cross1Icon className="h-6 w-6" />
                                }
                                <p>Días</p>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Días de atención</DialogTitle>
                            <DialogDescription>
                                Selecciona los días de atención.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="text-xs items-center">
                            <div className="grid grid-cols-7">
                                <p>LUNES</p>
                                <p>MARTES</p>
                                <p>MIERCOLES</p>
                                <p>JUEVES</p>
                                <p>VIERNES</p>
                                <p>SABADO</p>
                                <p>DOMINGO</p>
                            </div>
                            <div className="grid grid-cols-7 mt-3">

                                {Object.keys(dayOfWeek).map((d) =>
                                    <div key={d} onClick={() => selectDayOfWeek(d as Day)}
                                        className={`h-9 w-9 dark:bg-zinc-900 rounded-lg cursor-pointer bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800`}
                                        style={{ backgroundColor: `${dayOfWeek[d as Day] ? `#16a34a66` : ``}` }}></div>
                                )}

                            </div>
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button onClick={saveDayOfWeek} type="button" variant="secondary">
                                    Guardar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    {checkDays(selectedDay).allSameDayOfWeek ?
                        <DialogTrigger asChild>
                            <div className="w-48 border-[0px] border-white p-6 flex justify-center">
                                <div className="flex-col gap-1 cursor-pointer hover:dark:bg-zinc-800 border-[0px] hover:bg-zinc-200 border-white w-24 h-24 text-zinc-400 dark:text-zinc-500 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                                    <svg width="32" height="32" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    <p>Medio día</p>
                                </div>
                            </div>
                        </DialogTrigger>
                        :
                        <div onClick={noDaySelected} className="w-48 border-[0px] border-white p-6 flex justify-center">
                            <div className="flex-col gap-1 cursor-pointer hover:dark:bg-zinc-800 border-[0px] hover:bg-zinc-200 border-white w-24 h-24 text-zinc-400 dark:text-zinc-500 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                <p>Medio día</p>
                            </div>
                        </div>
                    }
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>¿Quiere aplicar esta regla?</DialogTitle>
                            <DialogDescription>
                                {`La siguiente regla se aplica a todos los `}
                                <span className="font-bold text-red-700">{`${checkDays(selectedDay).dayOfWeek}s `}</span>
                                en todos los calendarios.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="">
                                    <span className="capitalize">
                                        {`${checkDays(selectedDay).dayOfWeek}`}
                                    </span>
                                    {` hasta las ${calendarConfig.startBreak} hrs.`}
                                </Label>
                            </div>
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Guardar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/*<Dialog>
                    <DialogTrigger asChild>
                        <div className="w-48 border-[0px] border-white p-6 flex justify-center">
                            <div className="flex-col gap-1 cursor-pointer hover:dark:bg-zinc-800 border-[0px] hover:bg-zinc-200 border-white w-24 h-24 text-zinc-400 dark:text-zinc-500 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                <p>Feriados</p>
                            </div>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Share link</DialogTitle>
                            <DialogDescription>
                                Anyone who has this link will be able to view this.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                    Link
                                </Label>
                                <Input
                                    id="link"
                                    defaultValue="https://ui.shadcn.com/docs/installation"
                                    readOnly
                                />
                            </div>
                            <Button type="submit" size="sm" className="px-3">
                                <span className="sr-only">Copy</span>
                                <CopyIcon className="h-4 w-4" />
                            </Button>
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>*/}
            </div>

            <div className="w-full border-[0px] h-full border-white py-6 pr-6">

                <motion.div
                    className="h-full w-full hidden lg:block sticky top-16"
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0.2}
                >
                    <Card className="w-full h-full">
                        <CardHeader className="text-center flex flex-row items-center justify-between">
                            <div className="flex gap-3">
                                <div className="text-sm text-start">
                                    <p>Hora de atención: <span className="ml-2 text-xs text-zinc-500"><em>{calendarConfig.startHour ? `${calendarConfig.startHour}-${calendarConfig.endHour} hrs.` : `No configurado`}</em></span></p>
                                    <p>Hora de descanso: <span className="ml-2 text-xs text-zinc-500"><em>{calendarConfig.startBreak ? `${calendarConfig.startBreak}-${calendarConfig.endBreak} hrs.` : `No configurado`}</em></span></p>
                                </div>
                                <div className="text-sm text-start">
                                    <p>Días de atención: <span className="ml-2 text-xs text-zinc-500 capitalize"><em>{calendarConfig.days ? `${getFirstAndLastTrueDay()}` : `No configurado`}</em></span></p>
                                    <p className="sr-only">Feriados: <span className=" ml-2 text-xs text-zinc-500"><em>No configurado</em></span></p>
                                </div>
                            </div>
                            <div className="flex justify-start items-center gap-9">
                                <Button>Guardar</Button>
                                <Button variant="outline" onClick={decrementMonth} size="icon">
                                    <ChevronLeftIcon className="h-4 w-4" />
                                </Button>
                                <CardTitle className="uppercase">{`${actualdate.toLocaleString('default', { month: 'long' })}/${actualdate.getFullYear()}`}</CardTitle>
                                <Button variant="outline" onClick={incrementMonth} size="icon">
                                    <ChevronRightIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <Separator />
                        <CardContent className="">
                            <div className="grid text-center grid-cols-7 w-full py-6">
                                <p>LUNES</p>
                                <p>MARTES</p>
                                <p>MIERCOLES</p>
                                <p>JUEVES</p>
                                <p>VIERNES</p>
                                <p>SABADO</p>
                                <p>DOMINGO</p>
                            </div>
                            <div className="calendar grid grid-cols-7 w-full pt-6">
                                {generateCalendar()}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

            </div>
        </div >
    )
}