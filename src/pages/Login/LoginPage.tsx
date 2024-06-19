import { useContext, useEffect, useMemo, useState } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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
import { Card } from "@/components/ui/card"
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { UserContext } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { toast } from "sonner"
import { generateDate } from "@/lib/utils";

interface User {
  correo: string;
  contrasena: string;
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export default function LoginPage() {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [init, setInit] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  if (!context) {
    throw new Error('Component must be wrapped with <UserContext.Provider>');
  }
  const { user, setUser } = context;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    //console.log(values)
    const user: User = {
      correo: values.email,
      contrasena: values.password,
    };

    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      //obtener cuerpo de la respuesta
      const body = await response.json();
      setUser(body.usuario);
      navigate('/profile', { replace: true })
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
    }
  }

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
    sessionStorage.clear();
    sessionStorage.removeItem('userData');
  }, [user]);

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 120,
      particles: {
        color: {
          value: theme === 'dark' ? "#fff" : "#09090b",
        },
        move: {
          direction: "top",
          enable: true,
          random: false,
          speed: 0.5,
          straight: false,
        },
        number: {
          density: {
            enable: false,
          },
          value: 70,
        },
        opacity: {
          value: { min: 0.1, max: 0.5 },
        },
        shape: {
          close: true,
          fill: true,
          type: "circle",
        },
        size: {
          value: { min: 1, max: 2 },
        },
      },
      detectRetina: true,
    }),
    [theme],
  );

  return (
    <div>
      <div className=" transform transition duration-500 ease-in-out animate-fade-in-down relative flex cursor-pointer items-center overflow-hidden rounded-xl border-slate-800 p-[1.5px] translate-y-10 opacity-0">
        <div className="animate-rotate -z-10 absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#18181b_20deg,transparent_120deg)] dark:bg-[conic-gradient(#fff_20deg,transparent_120deg)]"></div>

        <Card className="p-6 max-w-96 dark:bg-zinc-950">
          <h1 className="text-2xl font-semibold tracking-tight text-center">Ingresar</h1>
          <p className="text-sm text-muted-foreground">Escribe tu correo y contraseña para ingresar</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="py-6 space-y-8">
              <FormField control={form.control} name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} autoComplete="email" autoCorrect="off" />
                    </FormControl>
                    <FormDescription>
                      Email inicio de sesión.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input placeholder="Contraseña" type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Contraseña para inicio de sesión.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Enviar</Button>
            </form>
          </Form>
        </Card>
      </div>
      <div className="fixed -z-10 dark:opacity-35 opacity-50">
        {init && <Particles id="tsparticles" /*particlesLoaded={particlesLoaded}*/ options={options} />}
      </div>
    </div>

  )
}