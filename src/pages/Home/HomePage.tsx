import { wavesBackground } from "@/lib/icons";
import { useState } from "react";

export default function Home() {
    const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });
    const [isFlipped, setIsFlipped] = useState(false);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { clientX, clientY } = event;
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
        const xPos = ((clientX - left) - width / 2) / 20;
        const yPos = ((clientY - top) - height / 2) / -20;
    
        setRotation({ rotateX: yPos, rotateY: xPos });
    };

    const handleMouseLeave = () => {
        setRotation({ rotateX: 0, rotateY: 0 });
    };

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flex">
            <div className="relative z-10 mx-auto max-w-md px-4 sm:max-w-lg">
            
                <div className="isolate" style={{opacity:1, transform:'none'}}>
                    <div className="opacity-100">
                        <div className="mx-auto w-full max-w-sm rounded-2xl" 
                            style={{transition: `all 500ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s`, 
                                    willChange: 'transform', 
                                    transform: `perspective(1000px) rotateX(${rotation.rotateX}deg)  rotateY(${isFlipped ? (180+rotation.rotateY) : rotation.rotateY}deg) scale3d(1, 1, 1)`}}
                            onClick={handleClick}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}>
                        
                        <div className={`${isFlipped ? `` : `bg-[image:radial-gradient(221.02%_101.62%_at_50%_0%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_78.73%)]`} bg-cover bg-no-repeat rounded-2xl bg-[rgba(9,9,11,0.97)] shadow-[0_2px_20px_rgba(0,0,0,0.5),0_20px_28px_rgba(0,0,0,0.4),inset_0_0.5px_0_rgba(153,253,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.06)]`} style={{opacity: 1, transform: `none`}}>
                                <div className="relative flex flex-col items-center overflow-hidden border-b border-dashed border-white/10 pb-14">
                                    
                                    {/*header space (el espacio que hay como si se viera al otro lado :p)*/}
                                    <div className="flex justify-between w-full" style={{transform:`rotateY(180deg)`}}>
                                        
                                    </div>
                                    {/*<div className="mt-4 h-1.5 w-11 rounded bg-black shadow-[0_0.5px_0_rgb(255_255_255/0.075)]"></div>*/}
                                    {/*background card*/}
                                    <div className="absolute inset-0 flex items-start justify-center">
                                        <div className="h-full w-full [mask-image:linear-gradient(black_75%,transparent)]">
                                            {wavesBackground}
                                        </div>
                                    </div>
                                    {/*body*/}
                                    {isFlipped ?
                                    <div style={{transform:`rotateY(180deg)`}}>
                                        
                                    </div>
                                    :
                                    <div className="mt-28">
                                        <span className="sr-only">
                                            Connect
                                        </span>
                                        {/*logo y titulo */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="171" height="168" fill="none" className="overflow-visible" aria-hidden="true">
                                                {/*logo*/}
                                                <path fill="#fff" fillOpacity=".6" fillRule="evenodd" d="M86 0C64.75 0 51.469 10.625 46.156 31.875c7.969-10.625 17.266-14.61 27.89-11.953 6.063 1.515 10.396 5.913 15.192 10.781 7.813 7.93 16.855 17.11 36.606 17.11 21.25 0 34.531-10.626 39.844-31.876-7.969 10.626-17.266 14.61-27.891 11.954-6.062-1.516-10.395-5.914-15.191-10.782C114.793 9.179 105.75 0 86 0ZM46.156 47.812c-21.25 0-34.531 10.625-39.843 31.875 7.968-10.625 17.265-14.609 27.89-11.953 6.062 1.516 10.395 5.914 15.191 10.782C57.207 86.446 66.25 95.625 86 95.625c21.25 0 34.531-10.625 39.844-31.875-7.969 10.625-17.266 14.61-27.89 11.953-6.063-1.516-10.396-5.913-15.192-10.782-7.813-7.93-16.855-17.109-36.606-17.109Z" clipRule="evenodd" style={{mixBlendMode:`screen`}}></path>
                                                <g filter="url(#:Rr6idja:-b)">
                                                    <path fill="#60E7FB" fillRule="evenodd" d="M86 0C64.75 0 51.469 10.625 46.156 31.875c7.969-10.625 17.266-14.61 27.89-11.953 6.063 1.515 10.396 5.913 15.192 10.781 7.813 7.93 16.855 17.11 36.606 17.11 21.25 0 34.531-10.626 39.844-31.876-7.969 10.626-17.266 14.61-27.891 11.954-6.062-1.516-10.395-5.914-15.191-10.782C114.793 9.179 105.75 0 86 0ZM46.156 47.812c-21.25 0-34.531 10.625-39.843 31.875 7.968-10.625 17.265-14.609 27.89-11.953 6.062 1.516 10.395 5.914 15.191 10.782C57.207 86.446 66.25 95.625 86 95.625c21.25 0 34.531-10.625 39.844-31.875-7.969 10.625-17.266 14.61-27.89 11.953-6.063-1.516-10.396-5.913-15.192-10.782-7.813-7.93-16.855-17.109-36.606-17.109Z" clipRule="evenodd"></path>
                                                </g>
                                                <g filter="url(#:Rr6idja:-c)">
                                                    <path fill="#fff" fillRule="evenodd" d="M86 0C64.75 0 51.469 10.625 46.156 31.875c7.969-10.625 17.266-14.61 27.89-11.953 6.063 1.515 10.396 5.913 15.192 10.781 7.813 7.93 16.855 17.11 36.606 17.11 21.25 0 34.531-10.626 39.844-31.876-7.969 10.626-17.266 14.61-27.891 11.954-6.062-1.516-10.395-5.914-15.191-10.782C114.793 9.179 105.75 0 86 0ZM46.156 47.812c-21.25 0-34.531 10.625-39.843 31.875 7.968-10.625 17.265-14.609 27.89-11.953 6.062 1.516 10.395 5.914 15.191 10.782C57.207 86.446 66.25 95.625 86 95.625c21.25 0 34.531-10.625 39.844-31.875-7.969 10.625-17.266 14.61-27.89 11.953-6.063-1.516-10.396-5.913-15.192-10.782-7.813-7.93-16.855-17.109-36.606-17.109Z" clipRule="evenodd"></path>
                                                </g>
                                                <mask id=":Rr6idja:-d" width="160" height="96" x="6" y="0" maskUnits="userSpaceOnUse" style={{maskType:`alpha`}}>
                                                    <path fill="#fff" fillRule="evenodd" d="M86 0C64.75 0 51.469 10.625 46.156 31.875c7.969-10.625 17.266-14.61 27.89-11.953 6.063 1.515 10.396 5.913 15.192 10.781 7.813 7.93 16.855 17.11 36.606 17.11 21.25 0 34.531-10.626 39.844-31.876-7.969 10.626-17.266 14.61-27.891 11.954-6.062-1.516-10.395-5.914-15.191-10.782C114.793 9.179 105.75 0 86 0ZM46.156 47.812c-21.25 0-34.531 10.625-39.843 31.875 7.968-10.625 17.265-14.609 27.89-11.953 6.062 1.516 10.395 5.914 15.191 10.782C57.207 86.446 66.25 95.625 86 95.625c21.25 0 34.531-10.625 39.844-31.875-7.969 10.625-17.266 14.61-27.89 11.953-6.063-1.516-10.396-5.913-15.192-10.782-7.813-7.93-16.855-17.109-36.606-17.109Z" clipRule="evenodd"></path>
                                                </mask>
                                                <g mask="url(#:Rr6idja:-d)">
                                                    <path fill="url(#:Rr6idja:-e)" fillRule="evenodd" d="M61.04 7.246C67.549 2.416 75.869 0 86 0c19.75 0 28.793 9.178 36.606 17.109 4.796 4.868 9.129 9.266 15.191 10.782 7.282 1.82 13.941.521 19.975-3.897-6.075 4.51-12.786 5.848-20.131 4.012-6.063-1.516-10.395-5.914-15.191-10.782C114.637 9.294 105.594.115 85.844.115c-10.05 0-18.319 2.377-24.804 7.13ZM46.19 31.737c-.01.046-.022.092-.034.138 2.459-3.278 5.044-5.924 7.755-7.938-.489.358-.974.737-1.455 1.137-2.172 1.803-4.26 4.024-6.265 6.663Zm104.454 8.948c7.229-5.297 12.243-13.546 15.044-24.748l-.191.253c-.841 3.334-1.879 6.405-3.113 9.214-2.858 6.5-6.771 11.594-11.74 15.28ZM6.312 79.686c5.313-21.25 18.594-31.875 39.844-31.875 19.75 0 28.793 9.179 36.606 17.11 4.796 4.868 9.129 9.266 15.191 10.781 10.625 2.656 19.922-1.328 27.891-11.953-2.063 2.751-4.215 5.056-6.456 6.917-6.416 5.326-13.56 7.005-21.435 5.036-6.062-1.515-10.395-5.913-15.191-10.781-7.813-7.93-16.856-17.11-36.606-17.11-17.863 0-30.095 7.509-36.696 22.524-1.251 2.847-2.3 5.964-3.147 9.351Zm51.062-62.33c-.343.146-.683.3-1.02.462 1.787-2.603 3.823-4.798 6.09-6.612 5.77-4.615 13.451-7.092 23.4-7.092 9.199 0 15.705 2.123 20.783 5.047 5.171 2.978 9.034 6.87 12.973 10.87l.341.346c4.534 4.605 9.566 9.718 16.729 11.508 6.087 1.522 11.968 1.166 17.488-1.2.342-.146.682-.3 1.02-.462-1.788 2.603-3.824 4.798-6.091 6.611-5.769 4.616-13.451 7.093-23.4 7.093-9.198 0-15.705-2.123-20.783-5.047-5.17-2.978-9.033-6.87-12.973-10.87l-.341-.346c-4.534-4.605-9.566-9.718-16.73-11.508-6.085-1.522-11.967-1.166-17.486 1.2ZM17.685 65.054c-.343.147-.683.301-1.02.462 1.788-2.602 3.823-4.797 6.09-6.611 5.77-4.616 13.452-7.092 23.4-7.092 9.199 0 15.705 2.122 20.783 5.047 5.171 2.977 9.034 6.87 12.974 10.869l.34.346c4.534 4.606 9.567 9.718 16.73 11.509 6.086 1.522 11.967 1.165 17.487-1.2.343-.147.683-.301 1.021-.462-1.789 2.602-3.824 4.797-6.091 6.611-5.77 4.615-13.452 7.092-23.4 7.092-9.199 0-15.705-2.122-20.783-5.047-5.17-2.977-9.034-6.87-12.973-10.869l-.342-.347c-4.533-4.605-9.566-9.717-16.729-11.508-6.086-1.521-11.967-1.166-17.487 1.2Z" clipRule="evenodd"></path>
                                                </g>
                                                {/*connect*/}
                                                <path fill="#fff" fillRule="evenodd" d="M171.184 143.021v5.064h-6.038v11.686c0 3.116 2.045 3.068 6.038 2.873v4.723c-8.083.974-11.297-1.266-11.297-7.596v-11.686h-4.479v-5.064h4.479v-5.259l5.259-1.558v6.817h6.038ZM20.898 165.208c-2.158 1.761-4.97 2.792-8.043 2.792C5.502 168 0 162.4 0 155.194c0-7.255 5.502-12.806 12.855-12.806 3.08 0 5.896 1.035 8.03 2.789a17.785 17.785 0 0 0-2.318 5.081c-1.237-1.681-3.31-2.709-5.761-2.709-4.285 0-7.547 3.263-7.547 7.645s3.262 7.645 7.547 7.645c2.424 0 4.48-1.04 5.777-2.673a17.815 17.815 0 0 0 2.315 5.042Zm30.516-.479v2.638h5.259v-13.049c0-4.967 2.727-7.012 6.184-7.012 3.31 0 5.453 1.948 5.453 5.648v14.413h5.259v-14.948c0-6.33-3.895-10.031-9.349-10.031-3.311 0-5.94 1.217-7.547 3.749v-3.116h-5.259v2.614c1.698 2.747 2.678 6.01 2.678 9.558 0 3.529-.98 6.788-2.678 9.536Zm39.65-22.341c-3.312 0-5.941 1.217-7.548 3.749v-3.116h-5.259v24.346h5.26v-13.049c0-4.967 2.726-7.012 6.183-7.012 3.311 0 5.453 1.948 5.453 5.648v14.413h5.259v-14.948c0-6.33-3.895-10.031-9.349-10.031Zm37.555 15.046H109.24c.827 3.798 3.895 5.745 7.79 5.745 2.922 0 5.113-1.314 6.282-3.018l4.333 2.532c-2.24 3.311-5.892 5.307-10.663 5.307-8.035 0-13.245-5.502-13.245-12.806 0-7.206 5.21-12.806 12.855-12.806 7.255 0 12.222 5.843 12.222 12.855 0 .73-.098 1.509-.195 2.191Zm-12.076-10.274c-3.944 0-6.622 2.337-7.352 5.989h14.315c-.73-4.188-3.798-5.989-6.963-5.989ZM143.816 168c4.772 0 8.911-2.483 10.956-6.33l-4.529-2.581c-1.168 2.24-3.554 3.75-6.476 3.75-4.285 0-7.547-3.263-7.547-7.645s3.262-7.645 7.547-7.645c2.922 0 5.308 1.461 6.379 3.75l4.528-2.63c-1.947-3.798-6.086-6.281-10.858-6.281-7.353 0-12.855 5.551-12.855 12.806 0 7.206 5.502 12.806 12.855 12.806Z" clipRule="evenodd"></path>
                                                <path fill="#fff" d="M35.995 168c7.158 0 12.855-5.6 12.855-12.806 0-7.255-5.697-12.806-12.855-12.806-7.109 0-12.854 5.551-12.854 12.806C23.14 162.4 28.886 168 35.995 168Zm0-5.113c-4.285 0-7.596-3.262-7.596-7.693 0-4.431 3.311-7.694 7.596-7.694s7.596 3.263 7.596 7.694-3.31 7.693-7.596 7.693Z"></path>
                                                <defs>
                                                        <filter id=":Rr6idja:-b" width="327.375" height="313.625" x="-77.688" y="-134" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                                                                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                                                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                                                                <feGaussianBlur result="effect1_foregroundBlur_131_17" stdDeviation="42"></feGaussianBlur>
                                                        </filter>
                                                        <filter id=":Rr6idja:-c" width="179.375" height="115.625" x="-3.688" y="-10" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                                                                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                                                <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                                                                <feOffset></feOffset>
                                                                <feGaussianBlur stdDeviation="5"></feGaussianBlur>
                                                                <feComposite in2="hardAlpha" operator="out"></feComposite>
                                                                <feColorMatrix values="0 0 0 0 0.584314 0 0 0 0 0.94902 0 0 0 0 1 0 0 0 0.7 0"></feColorMatrix>
                                                                <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_131_17"></feBlend>
                                                                <feBlend in="SourceGraphic" in2="effect1_dropShadow_131_17" result="shape"></feBlend>
                                                                <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"></feColorMatrix>
                                                                <feOffset></feOffset>
                                                                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                                                                <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"></feComposite>
                                                                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.88 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
                                                                <feBlend in2="shape" result="effect2_innerShadow_131_17"></feBlend>
                                                        </filter>
                                                        <linearGradient id=":Rr6idja:-e" x1="46.241" x2="88.644" y1="12.615" y2="94.038" gradientUnits="userSpaceOnUse">
                                                                <stop stopColor="#7FFFFF"></stop><stop offset=".454" stopColor="#BDFFFF" stopOpacity=".519"></stop>
                                                                <stop offset=".49" stopColor="#fff" stopOpacity="0"></stop>
                                                        </linearGradient>
                                                        <clipPath id=":Rr6idja:-a">
                                                            <path fill="#fff" d="M0 0h171v168H0z"></path>
                                                        </clipPath>
                                                </defs>
                                        </svg>
                                    </div>
                                    }
                                    {/*date*/}
                                    {isFlipped ?
                                    <div className="absolute flex justify-center bottom-3 w-72" style={{transform:`rotateY(180deg)`}}>
                                        
                                    </div>
                                    :    
                                    <div className="relative mt-10 text-center font-display font-semibold uppercase tracking-[0.2em]">
                                        <h1 className="sr-only">Tailwind Connect 2023</h1>
                                        <time dateTime="2023-06-20T18:00-04:00" className="flex items-center text-[0.8125rem]/6 text-zinc-300">
                                            June 20, 2023
                                        <svg viewBox="0 0 2 2" className="mx-3 h-[0.1875rem] w-[0.1875rem] flex-none fill-zinc-300/30"><circle cx="1" cy="1" r="1"></circle></svg>
                                            6PM
                                        </time>
                                        <div className="mt-1 text-2xs leading-6 text-zinc-500">Cambridge, Ontario</div>
                                    </div>
                                    }
                                </div>
                                {/*footer card*/}
                                {isFlipped ?
                                    <div className="absolute -bottom-6 flex justify-between w-full" style={{transform:`rotateY(180deg)`}}>
                                        
                                    </div>
                                :
                                    <div className="flex items-center justify-between overflow-hidden p-4 font-mono text-[.6875rem]/4 font-bold text-zinc-500 md:p-6">
                                        <div className="text-left">
                                            <div>
                                                <a href="https://www.tapestryhall.ca/rooms/grand-hall/" className="transition hover:text-zinc-400" target="_blank">
                                                Tapestry Hall
                                                </a>
                                            </div>
                                            <div className="mt-0.5 text-zinc-700">
                                                <a href="https://goo.gl/maps/5wGoStB9Y3HjNno38?coh=178572&amp;entry=tt" className="transition hover:text-zinc-400" target="_blank">
                                                74 Grand Ave S
                                                </a>
                                            </div>
                                        </div>
                                        <div className="flex justify-center">
                                            <div className="relative" aria-hidden="true">
                                                <svg width="135" height="43" viewBox="0 0 135 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.6">
                                                    <rect width="2" height="43" fill="#3F3F46"></rect>
                                                    <rect x="64" width="2" height="43" fill="#3F3F46"></rect>
                                                    <rect x="36" width="2" height="43" fill="#3F3F46"></rect>
                                                    <rect x="100" width="2" height="43" fill="#3F3F46"></rect>
                                                    <rect x="5" width="1" height="43" fill="#27272A"></rect>
                                                    <rect x="69" width="1" height="43" fill="#27272A"></rect>
                                                    <rect x="41" width="1" height="43" fill="#27272A"></rect>
                                                    <rect x="105" width="1" height="43" fill="#27272A"></rect>
                                                    <rect width="1" height="43" transform="matrix(-1 0 0 1 35 0)" fill="#27272A"></rect>
                                                    <rect width="1" height="43" transform="matrix(-1 0 0 1 99 0)" fill="#27272A"></rect>
                                                    <rect width="1" height="43" transform="matrix(-1 0 0 1 71 0)" fill="#27272A"></rect>
                                                    <rect width="1" height="43" transform="matrix(-1 0 0 1 135 0)" fill="#27272A"></rect>
                                                    <path d="M15 0H19V43H15V0Z" fill="#27272A"></path>
                                                    <path d="M79 0H83V43H79V0Z" fill="#27272A"></path>
                                                    <path d="M51 0H55V43H51V0Z" fill="#27272A"></path>
                                                    <path d="M115 0H119V43H115V0Z" fill="#27272A"></path>
                                                    <path d="M25 0H24V43H25V0Z" fill="#3F3F46"></path>
                                                    <path d="M89 0H88V43H89V0Z" fill="#3F3F46"></path>
                                                    <path d="M61 0H60V43H61V0Z" fill="#3F3F46"></path>
                                                    <path d="M125 0H124V43H125V0Z" fill="#3F3F46"></path>
                                                    <rect x="12" width="1" height="43" fill="#3F3F46"></rect>
                                                    <rect x="76" width="1" height="43" fill="#3F3F46"></rect>
                                                    <rect x="48" width="1" height="43" fill="#3F3F46"></rect>
                                                    <rect x="112" width="1" height="43" fill="#3F3F46"></rect>
                                                    <rect width="1" height="43" transform="matrix(-1 0 0 1 28 0)" fill="#3F3F46"></rect>
                                                    <rect width="1" height="43" transform="matrix(-1 0 0 1 92 0)" fill="#3F3F46"></rect>
                                                    <rect width="1" height="43" transform="matrix(-1 0 0 1 64 0)" fill="#3F3F46"></rect>
                                                    <rect width="1" height="43" transform="matrix(-1 0 0 1 128 0)" fill="#3F3F46"></rect>
                                                    <path d="M8 0H11V43H8V0Z" fill="#3F3F46"></path>
                                                    <path d="M72 0H75V43H72V0Z" fill="#3F3F46"></path>
                                                    <path d="M44 0H47V43H44V0Z" fill="#3F3F46"></path>
                                                    <path d="M108 0H111V43H108V0Z" fill="#3F3F46"></path>
                                                    <path d="M32 0H29V43H32V0Z" fill="#3F3F46"></path>
                                                    <path d="M96 0H93V43H96V0Z" fill="#3F3F46"></path>
                                                    <path d="M68 0H65V43H68V0Z" fill="#3F3F46"></path>
                                                    <path d="M132 0H129V43H132V0Z" fill="#3F3F46"></path>
                                                    </g>
                                                </svg>
                                                <div className="absolute inset-0 overflow-hidden">
                                                    <svg width="135" height="43" fill="none" xmlns="http://www.w3.org/2000/svg" style={{transform: `translateY(0%)`, opacity: 0}}>
                                                        <g opacity="0.6"><rect width="2" height="43" fill="#38BDF8"></rect>
                                                        <rect x="64" width="2" height="43" fill="#38BDF8"></rect>
                                                        <rect x="36" width="2" height="43" fill="#38BDF8"></rect>
                                                        <rect x="100" width="2" height="43" fill="#38BDF8"></rect>
                                                        <rect x="5" width="1" height="43" fill="#38BDF8"></rect>
                                                        <rect x="69" width="1" height="43" fill="#38BDF8"></rect>
                                                        <rect x="41" width="1" height="43" fill="#38BDF8"></rect>
                                                        <rect x="105" width="1" height="43" fill="#38BDF8"></rect>
                                                        <rect width="1" height="43" transform="matrix(-1 0 0 1 35 0)" fill="#38BDF8"></rect>
                                                        <rect width="1" height="43" transform="matrix(-1 0 0 1 99 0)" fill="#38BDF8"></rect>
                                                        <rect width="1" height="43" transform="matrix(-1 0 0 1 71 0)" fill="#38BDF8"></rect>
                                                        <rect width="1" height="43" transform="matrix(-1 0 0 1 135 0)" fill="#38BDF8"></rect>
                                                        <path d="M15 0H19V43H15V0Z" fill="#38BDF8"></path>
                                                        <path d="M79 0H83V43H79V0Z" fill="#38BDF8"></path>
                                                        <path d="M51 0H55V43H51V0Z" fill="#38BDF8"></path>
                                                        <path d="M115 0H119V43H115V0Z" fill="#38BDF8"></path>
                                                        <path d="M25 0H24V43H25V0Z" fill="#38BDF8"></path>
                                                        <path d="M89 0H88V43H89V0Z" fill="#38BDF8"></path>
                                                        <path d="M61 0H60V43H61V0Z" fill="#38BDF8"></path>
                                                        <path d="M125 0H124V43H125V0Z" fill="#38BDF8"></path>
                                                        <rect x="12" width="1" height="43" fill="#38BDF8"></rect>
                                                        <rect x="76" width="1" height="43" fill="#38BDF8"></rect>
                                                        <rect x="48" width="1" height="43" fill="#38BDF8"></rect>
                                                        <rect x="112" width="1" height="43" fill="#38BDF8"></rect>
                                                        <rect width="1" height="43" transform="matrix(-1 0 0 1 28 0)" fill="#38BDF8"></rect>
                                                        <rect width="1" height="43" transform="matrix(-1 0 0 1 92 0)" fill="#38BDF8"></rect>
                                                        <rect width="1" height="43" transform="matrix(-1 0 0 1 64 0)" fill="#38BDF8"></rect>
                                                        <rect width="1" height="43" transform="matrix(-1 0 0 1 128 0)" fill="#38BDF8"></rect>
                                                        <path d="M8 0H11V43H8V0Z" fill="#38BDF8"></path><path d="M72 0H75V43H72V0Z" fill="#38BDF8"></path>
                                                        <path d="M44 0H47V43H44V0Z" fill="#38BDF8"></path><path d="M108 0H111V43H108V0Z" fill="#38BDF8"></path>
                                                        <path d="M32 0H29V43H32V0Z" fill="#38BDF8"></path><path d="M96 0H93V43H96V0Z" fill="#38BDF8"></path>
                                                        <path d="M68 0H65V43H68V0Z" fill="#38BDF8"></path><path d="M132 0H129V43H132V0Z" fill="#38BDF8"></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                                <div style={{transform: `translateX(-50%) translateY(0.7232px) translateZ(0px)`, opacity: 0.2048}} className="absolute -bottom-2 left-1/2 z-10 h-px w-[110%] bg-gradient-to-r from-[#38BDF8]/10 via-[#38BDF8]/50 to-[#38BDF8]/10">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#38BDF8]/20 via-[#38BDF8]/50 to-[#38BDF8]/20 blur-[1px]"></div>
                                                        <div className="absolute -inset-x-4 top-0 flex h-[100px] justify-center overflow-hidden">
                                                        <div className="absolute h-32 w-32 -translate-y-1/2 rounded-full bg-sky-300/10 blur-xl"></div>
                                                            <div className="absolute h-20 w-20 -translate-y-3/4 rounded-full bg-sky-300/10 blur-xl"></div>
                                                            <div className="absolute h-16 w-16 -translate-y-1/2 rounded-full bg-sky-300/20 blur-xl"></div>
                                                </div>
                                            </div>
                                                </div>
                                        </div>
                                        <div className="text-right">
                                            <div>In-person</div>
                                            <div className="mt-0.5 text-zinc-700">150 guests</div>
                                        </div>
                                    </div>
                                }
                        </div>    
                        </div>
                    </div>
                </div>
                
            </div>

            
        </div>
    )
}