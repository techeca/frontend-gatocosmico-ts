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
import { CopyIcon, ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons"
import { useState } from "react"

interface CalendarConfig {
    startHour: number;
    endHour: number;
    startBreak: number;
    endBreak: number;
}

export default function Agendamiento() {
    const [calendarConfig, setCalendarConfig] = useState({} as CalendarConfig)
    const [actualdate, setActualdate] = useState(new Date());

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
            calendar.push(<div className="calendar-day empty w-full h-[130px] max-h-[130px] border-[0px] border-white"></div>);
        }

        // Fill in the actual days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayOfWeek = new Date(year, month, i).getDay();
            const isWeekend = dayOfWeek === 6 || dayOfWeek === 0; // 6 is Saturday, 0 is Sunday
            const weekendStyle = isWeekend ? 'dark:hover:bg-red-800/20 bg-red-800/10' : 'rounded-xl';
            calendar.push(<div className={`calendar-day dark:hover:bg-zinc-900 hover:bg-zinc-100 cursor-pointer font-thin w-full p-3 h-[130px] border-[0px] max-h-[130px] border-white ${weekendStyle}`}>{i}</div>);
        }

        // Fill in days after the end of the current month
        for (let i = lastDayIndex + 1; i < 7; i++) {
            calendar.push(<div className="calendar-day empty h-[130px] w-full border-[0px] max-h-[130px] border-white"></div>);
        }

        return calendar;
    }

    return (
        <div className="w-full flex justify-between h-full">
            <div className="">
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="w-48 border-[0px] border-white p-6 flex justify-center">
                            <div className="cursor-pointer hover:dark:bg-zinc-800 border-[0px] hover:bg-zinc-200 border-white w-24 h-24 text-zinc-400 dark:text-zinc-500 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
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
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className="w-48 border-[0px] border-white p-6 flex justify-center">
                            <div className="cursor-pointer hover:dark:bg-zinc-800 border-[0px] hover:bg-zinc-200 border-white w-24 h-24 text-zinc-400 dark:text-zinc-500 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
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
                </Dialog>
            </div>

            <div className="w-full border-[0px] h-full border-white py-6 pr-6">


                <Card className="w-full h-full">
                    <CardHeader className="text-center flex flex-row items-center justify-between">
                        <div className="text-sm text-start">
                            <p>Horario de atención: <span className="ml-2 text-xs text-zinc-500"><em>No configurado</em></span></p>
                            <p>Hora de break: <span className="ml-2 text-xs text-zinc-500"><em>No configurado</em></span></p>
                        </div>
                        <div className="flex justify-start items-center gap-9">
                            <Button variant="outline" onClick={decrementMonth} size="icon">
                                <ChevronLeftIcon className="h-4 w-4" />
                            </Button>
                            <CardTitle className="uppercase">{actualdate.toLocaleString('default', { month: 'long' })}</CardTitle>
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

            </div>
        </div>
    )
}