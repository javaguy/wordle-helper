import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cell } from "../guesses/Guesses";

// import { XCircleIcon } from '@heroicons/react/outline'

// type Props = {
//   title: string
//   children: React.ReactNode
//   isOpen: boolean
//   handleClose: () => void
// }
function CloseIcon() {
    return (
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 1280.000000 1280.000000"
            preserveAspectRatio="xMidYMid meet"
        >
            <metadata>
                Created by potrace 1.15, written by Peter Selinger 2001-2017
            </metadata>
            <g
                transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
            >
                <path
                    d="M6180 11089 c-921 -38 -1841 -368 -2584 -926 -356 -267 -701 -614
-961 -963 -907 -1222 -1165 -2801 -694 -4250 127 -389 329 -804 561 -1149 987
-1473 2722 -2269 4468 -2050 966 121 1831 515 2559 1165 1571 1403 2010 3690
1070 5574 -418 836 -1056 1515 -1869 1985 -608 352 -1377 582 -2040 610 -283
12 -330 12 -510 4z m555 -719 c1327 -114 2497 -871 3146 -2035 484 -870 622
-1920 378 -2895 -175 -702 -530 -1330 -1039 -1840 -329 -330 -687 -585 -1095
-781 -545 -261 -1114 -389 -1725 -389 -641 0 -1227 139 -1795 425 -760 383
-1377 1001 -1760 1763 -588 1171 -560 2582 74 3717 648 1160 1815 1918 3131
2034 139 12 546 12 685 1z"
                />
                <path
                    d="M4609 8719 c-26 -4 -57 -13 -70 -19 -40 -21 -409 -392 -432 -435 -29
-53 -30 -173 -3 -225 10 -19 378 -395 817 -835 l799 -800 -796 -795 c-462
-462 -804 -812 -817 -835 -33 -62 -31 -175 5 -235 39 -66 394 -414 442 -434
49 -20 152 -21 202 0 29 11 255 231 842 817 l802 802 803 -802 c586 -586 812
-806 841 -817 50 -21 153 -20 202 0 48 20 403 368 442 434 36 60 38 173 5 235
-13 23 -355 373 -817 835 l-796 795 799 800 c439 440 807 816 817 835 27 52
26 172 -3 225 -32 59 -399 420 -448 441 -51 21 -148 21 -200 -1 -30 -12 -249
-225 -842 -818 l-803 -802 -802 802 c-464 464 -816 807 -833 814 -47 19 -106
25 -156 18z"
                />
            </g>
        </svg>
    );
}

export const AboutModal = ({ isOpen, handleClose }) => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                onClose={handleClose}
            >
                <div className="flex items-center justify-center min-h-screen py-10 px-4 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                            <div className="absolute right-4 top-4">
                                <div onClick={() => handleClose()}>
                                    <CloseIcon />
                                </div>
                            </div>
                            <div>
                                <div className="text-center">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg leading-6 font-medium text-gray-900"
                                    >
                                        How to Use
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            I built this app to help you play
                                            Wordle. To get started,
                                            <br />
                                            1. Enter your guess as you did in
                                            Wordle. <br />
                                            2. For each letter in your guess,
                                            enter the hint that Wordle gave you.{" "}
                                            <br />
                                        </p>

                                        <div className="flex justify-center mb-1 mt-4">
                                            <Cell value="W" state="c" />
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            The letter W is in the word and in
                                            the{" "}
                                            <b className="font-bold text-green-500">
                                                correct
                                            </b>{" "}
                                            spot.
                                        </p>

                                        <div className="flex justify-center mb-1 mt-4">
                                            <Cell value="L" state="p" />
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            The letter L is{" "}
                                            <b className="font-bold text-yellow-500">
                                                present
                                            </b>{" "}
                                            in the word but in the wrong spot.
                                        </p>

                                        <div className="flex justify-center mb-1 mt-4">
                                            <Cell value="U" state="a" />
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            The letter U is{" "}
                                            <b className="font-bold text-slate-400">
                                                absent
                                            </b>{" "}
                                            from the word in any spot.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
