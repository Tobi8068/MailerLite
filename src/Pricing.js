import React, { useState, useCallback, useRef, useEffect } from 'react';
import { initialState, State50K, State100K, State250K, State500K, State1M, State1_5M, State2M } from './Data';

const Slider = ({ min, max, value, onChange }) => {
    const sliderRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    const handleMouseDown = useCallback(() => {
        setIsDragging(true)
    }, [])

    const handleMouseUp = useCallback(() => {
        setIsDragging(false)
    }, [])

    const handleMouseMove = useCallback(
        (event) => {
            if (isDragging && sliderRef.current) {
                const sliderRect = sliderRef.current.getBoundingClientRect()
                const percentage = (event.clientX - sliderRect.left) / sliderRect.width
                const newValue = Math.round(percentage * (max - min) + min)
                onChange({ target: { value: Math.max(min, Math.min(max, newValue)) } })
            }
        },
        [isDragging, min, max, onChange]
    )

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [handleMouseMove, handleMouseUp])

    const percentage = ((value - min) / (max - min)) * 100

    return (
        <div
            ref={sliderRef}
            className="relative w-full h-6 cursor-pointer"
            onMouseDown={handleMouseDown}
        >
            <div className="absolute w-full h-2 bg-gray-200 rounded-full top-1/2 transform -translate-y-1/2">
                <div
                    className="absolute h-full bg-purple-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <div
                className="absolute w-6 h-6 bg-purple-500 rounded-full top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${percentage}%` }}
            ></div>
        </div>
    )
}

export default function Pricing() {
    const [emailCount, setEmailCount] = useState(3000)

    const handleSliderChange = useCallback((e) => {
        const emailNum = Number(e.target.value);
        setEmailCount(emailNum);
        if (emailNum === 3000) {
            setPricingTiers(initialState);
        } else if (emailNum <= 50000) {
            setPricingTiers(State50K);
        } else if (emailNum <= 100000) {
            setPricingTiers(State100K);
        } else if (emailNum <= 250000) {
            setPricingTiers(State250K);
        } else if (emailNum <= 500000) {
            setPricingTiers(State500K);
        } else if (emailNum <= 1000000) {
            setPricingTiers(State1M);
        } else if (emailNum <= 1500000) {
            setPricingTiers(State1_5M);
        } else {
            setPricingTiers(State2M);
        }
    }, [])

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const [pricingTiers, setPricingTiers] = useState(initialState);

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-gray-900">mailer<span className="bg-green-500 text-white px-1">lite</span></span>
                        </div>
                        <nav className="hidden md:flex space-x-10">
                            <a href="#" className="text-gray-500 hover:text-gray-900">Features</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">Pricing</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">Gallery</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">Why Lite</a>
                            <a href="#" className="text-gray-500 hover:text-gray-900">Resources</a>
                        </nav>
                        <div className="flex items-center">
                            <a href="#" className="text-gray-500 hover:text-gray-900 mr-4">Log in</a>
                            <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                                Sign up
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Transactional Email and SMS Service
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        MailerSend offers the same great deliverability and experience you enjoy with MailerLite,
                        including award-winning support, intuitive design, and fair pricing.
                    </p>
                </div>

                <div className="mt-16">
                    <div className="flex flex-col items-center space-y-4 mb-8">
                        <span className="text-sm font-medium text-gray-700">How many emails do you plan to send?</span>
                        <div className="w-full max-w-3xl">
                            <Slider
                                min={3000}
                                max={2000000}
                                value={emailCount}
                                onChange={handleSliderChange}
                            />
                        </div>
                        <div className="flex justify-between w-full max-w-3xl">
                            <span className="text-sm text-gray-500">3K</span>
                            <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                                {formatNumber(emailCount)}
                            </span>
                            <span className="text-sm text-gray-500">2M</span>
                        </div>
                    </div>

                    <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
                        {pricingTiers.map((tier) => (
                            <div
                                key={tier.name}
                                className={`border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 ${tier.recommended ? 'border-purple-500' : ''
                                    }`}
                            >
                                <div className="p-6">
                                    <h2 className={`text-lg leading-6 font-medium ${tier.isDisabled ? 'text-gray-400' : 'text-gray-900'}`}>{tier.name}</h2>
                                    {tier.recommended && (
                                        <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-cyan-500 px-3 py-0.5 text-sm font-semibold text-white">
                                            Recommended
                                        </p>
                                    )}
                                    <p className="mt-8">
                                        <span className={`text-4xl font-extrabold ${tier.isDisabled ? 'text-gray-400' : 'text-gray-900'}`}>{tier.price}</span>
                                        {tier.price !== "Free" && tier.price !== "Let's talk" && (
                                            <span className="text-base font-medium text-gray-500">/mo</span>
                                        )}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">{tier.yearlyPrice} billed yearly</p>
                                    <ul className="mt-6 space-y-4">
                                        <li className="flex items-center">
                                            <span className="text-sm text-gray-500">{tier.emails} emails</span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-sm text-gray-500">{tier.sms} SMS</span>
                                        </li>
                                        <li className="flex items-center">
                                            <span className="text-sm text-gray-500">{tier.verificationCredits} email verifications credits</span>
                                        </li>
                                    </ul>
                                    <div className="mt-8">
                                        <div className="rounded-md shadow">
                                            <a
                                                href={tier.isDisabled ? undefined : "#"} // Set href to undefined when disabled
                                                className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white ${tier.recommended ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-800 hover:bg-gray-900'
                                                    } ${tier.isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} // Add styles for disabled state
                                                onClick={tier.isDisabled ? (e) => e.preventDefault() : undefined} // Prevent default action if disabled
                                            >
                                                Get started
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-6 pb-8 px-6">
                                    <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">Extra usage</h3>
                                    <ul className="mt-6 space-y-4">
                                        <li className="flex justify-between">
                                            <span className="text-sm text-gray-500">Email</span>
                                            <span className="text-sm text-gray-900">{tier.extraEmailPrice}/1000 emails</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span className="text-sm text-gray-500">SMS</span>
                                            <span className="text-sm text-gray-900">{tier.extraSmsPrice}/100 SMS</span>
                                        </li>
                                    </ul>
                                    <h3 className="mt-8 text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h3>
                                    <ul className="mt-6 space-y-4">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex space-x-3">
                                                <svg
                                                    className="flex-shrink-0 h-5 w-5 text-green-500"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span className="text-sm text-gray-500">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}