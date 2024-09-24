import React, { useEffect, useState } from 'react'
import { Switch, Slider } from './custom-components'

const PricingCard = ({ title, price, originalPrice, description, features, cta, popular = false, monthlyBilled, users, isMonthly }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md ${popular ? 'border-2 border-teal-400' : ''}`}>
    {popular && (
      <div className="bg-teal-400 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
        Most popular
      </div>
    )}
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="mb-4">
      <span className="text-3xl font-bold">${price}</span>
      <span className="text-gray-500 line-through ml-2">${originalPrice}/lb</span>
    </div>
    <div className='mb-4 text-gray-600'>
        <p className='text-sm'><b className='text-black'>${monthlyBilled}</b> billed monthly for <b className='text-black'>{users} user</b></p>
        {isMonthly && <span className='text-xs'>Pay in 4 installment of $1350 with Flex pay.</span>}
    </div>
    <button className="w-full bg-black text-white py-2 rounded-full mb-4">{cta}</button>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
)

export default function PricingPage() {
  const [isFamilyPlan, setIsFamilyPlan] = useState(true)
  const [familyMembers, setFamilyMembers] = useState(20000)
  const [isMonthlyBilled, setIsMonthlyBilled] = useState(true);
  const [users, setUsers] = useState(1);
  const [monthlyBilled, setMonthlyBilled] = useState([350.00, 250.00]);

  useEffect(() => {
    setUsers(Math.floor(familyMembers / 10000));
  }, [familyMembers]);

  const handleSliderChange = (e) => {
    const familyData = Number(e.target.value);
    setFamilyMembers(familyData);
  }

  const handleBillMonthly = () => {
    setIsMonthlyBilled(true);
    setMonthlyBilled([350.00, 250.00]);
  }

  const handleBillAnnual = () => {
    setIsMonthlyBilled(false);
    setMonthlyBilled([4200.00, 3000.00]);
  }

  const handlePlanChange = (checked) => {
    setIsFamilyPlan(checked)
    if (isFamilyPlan) setFamilyMembers(10000)
    else setFamilyMembers(20000)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Choreless comitative Pricing</h1>
        
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <span className={`text-sm ${!isFamilyPlan ? 'font-bold' : ''}`}>Individual Plan</span>
            <Switch checked={isFamilyPlan} onChange={handlePlanChange} />
            <span className={`text-sm ${isFamilyPlan ? 'font-bold' : ''}`}>Family Plan</span>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">All you need for your family laundry</h2>
          <p className="text-gray-600 mb-8">
            Unlimited laundry for your family so that they can enjoy their life, get together more and do what's important in life.
          </p>

          {isFamilyPlan && (
            <div className="mb-8">
              <p className="text-sm font-medium mb-2">How many family members do you have?</p>
              <div className="flex items-center space-x-4">
                <span className="text-sm">2</span>
                <Slider
                  value={[familyMembers]}
                  onChange={handleSliderChange}
                  max={100000}
                  min={20000}
                  className="w-64"
                />
                <span className="text-sm">10+</span>
                <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {users}
                </span>
              </div>
            </div>
          )}

          <div className="flex space-x-4 mb-8">
            <button className={`${isMonthlyBilled ? "bg-black text-white" : "bg-white text-black border border-gray-300"} px-4 py-2 rounded-full text-sm`} onClick={handleBillMonthly}>
              Billed Monthly
            </button>
            <button className={`${!isMonthlyBilled ? "bg-black text-white" : "bg-white text-black border border-gray-300"} px-4 py-2 rounded-full text-sm`} onClick={handleBillAnnual}>
              Annual Savings
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              PLUS
            </div>
            <h3 className="text-xl font-bold mb-4">All Subscription plans include</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <h4 className="font-semibold">Damage protection</h4>
                  <p className="text-sm text-gray-600">Coverage for cleaning mishaps</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div>
                  <h4 className="font-semibold">Unlimited guarantee</h4>
                  <p className="text-sm text-gray-600">Continuous laundry, every week</p>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold">Satisfaction Assurance</h4>
                  <p className="text-sm text-gray-600">100% money-back guarantee</p>
                </div>
              </li>
            </ul>
          </div>
          <PricingCard
            title="Unlimited +"
            price="1.64"
            originalPrice="2.99"
            description="Experience family harmony with our generous 250 lb monthly laundry start. Conquer your family's laundry effortlessly."
            features={[
              "250 lb / month family laundry base",
              "Always covered: Guaranteed weekly service",
              "Free pickup & delivery - we come to you",
              "20% savings on family care services"
            ]}
            cta="Schedule my pickup"
            popular={true}
            monthlyBilled = {monthlyBilled[0] * users}
            users={users}
            isMonthly = {isMonthlyBilled}
          />
          <PricingCard
            title="Unlimited"
            price="1.39"
            originalPrice="2.99"
            description="Embrace hassle-free family care with our 200 lb monthly laundry base. Use it all at once or spread out - you're in control."
            features={[
              "200 lb / month family laundry base",
              "Always covered: Guaranteed weekly service",
              "Free pickup & delivery - we come to you",
              "15% savings on family care services"
            ]}
            cta="Schedule my pickup"
            monthlyBilled = {monthlyBilled[1] * users}
            users={users}
            isMonthly = {isMonthlyBilled}
          />
        </div>
      </div>
    </div>
  )
}