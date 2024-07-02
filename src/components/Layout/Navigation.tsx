import {
    NavigationMenu,
    NavigationMenuContent,
    //NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    //NavigationMenuViewport,
  } from "@/components/ui/navigation-menu";
import * as React from "react"
import { cn, generateDate } from "@/lib/utils";
import { Link } from "react-router-dom"
import { ModeToggle } from "../mode-toggle";
import { UserContext } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button"
import { AvatarIcon, ExitIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { toast } from "sonner"
import { useUserState } from "@/hooks/useUserState";

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ]

  function ProfileMenu(){
    const navigate = useNavigate()

    function handleProfile(){
      navigate('/profile', { replace: true });
    }

    return(
      <Button onClick={handleProfile} variant="secondary" size="icon">
        <AvatarIcon className="h-5 w-5" />
      </Button>
    )
  }

  function ExitMenuBtn(){
    const navigate = useNavigate()
    const context = useContext(UserContext);

    if (!context) {
      throw new Error('Component must be wrapped with <UserContext.Provider>');
    }
    const { setUser } = context; 


    async function handleLogout(){
      const response = await fetch('/profile', {
        method: 'POST',
      });

      try {
        if (response.ok) {
        //limpia datos de usuario //localstorage y context
            //removeSession('user');
            sessionStorage.clear()
            setUser(null);
            navigate('/login', { replace: true });
            //addAlert('Sesión cerrada', 'success')
            toast(`Sesión cerrada`, {
              description: generateDate(),
              action: {
                label: "Cerrar",
                onClick: () => console.log("Undo"),
              },
            })
        } 
      }catch (error) {
          //handleError(error)
          console.log(error);     
      }   

    }

    return(
      <Button onClick={handleLogout} variant="destructive" size="icon">
        <ExitIcon className="h-5 w-5" />
      </Button>
    )
  }
   
  export default function Navigation() {
    const { routes } = useUserState()

    return (
      <div className="sticky top-0 z-10 flex border-b-[1px] justify-center items-center p-2 px-6 backdrop-blur-md">
        <div>
        <div className="text-xl font-extrabold">
          <Link to={'/home'}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-violet-600">
              GatoCósmico
            </span>
          </Link>
        </div>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="hidden sm:flex">
            {routes && 
              <NavigationMenuItem>
                <NavigationMenuTrigger>{routes[0].name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          to="/home"
                        >
                          
                          <div className="mb-2 mt-4 text-lg font-medium">
                            GatoCósmico
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Revisa tu panel central para ver las últimas novedades.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {routes[0].urls.map((component, index) => (
                      <ListItem key={index} to="/docs" title={component.title}>
                        Re-usable components built using Radix UI and Tailwind CSS.
                      </ListItem>  
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            }
            {routes && routes.length > 1 && 
              <NavigationMenuItem>
                <NavigationMenuTrigger>{routes[1].name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {routes[1].urls.map((component, index) => (
                      <ListItem
                      key={component.title}
                      title={component.title}
                      to={component.url}
                    >
                        {components[index].description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            }

            <NavigationMenuItem>
              {/*<a href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
                </NavigationMenuLink>
                </a>*/}
                
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex gap-3">
          <ModeToggle />
          {routes &&
          <>
            <ProfileMenu />
            <ExitMenuBtn />
          </>
          }
        </div>
        
      </div>
    )
  }
   
  const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
  >(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  })
  ListItem.displayName = "ListItem"