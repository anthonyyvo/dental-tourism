"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"

const pricingData = {
  implants: {
    name: "Dental Implants",
    description: "Complete single tooth implant solution",
    prices: [
      { country: "Vietnam", price: "$800 - $1,200", savings: "Save 75%" },
      { country: "USA", price: "$3,000 - $6,000", savings: null },
      { country: "Australia", price: "$2,500 - $5,000", savings: null },
      { country: "UK", price: "$2,800 - $5,500", savings: null },
    ],
    includes: ["Implant fixture", "Abutment", "Premium crown", "Follow-up care", "Warranty included"],
  },
  veneers: {
    name: "Porcelain Veneers",
    description: "Per tooth - Premium quality porcelain",
    prices: [
      { country: "Vietnam", price: "$250 - $400", savings: "Save 80%" },
      { country: "USA", price: "$1,000 - $2,500", savings: null },
      { country: "Australia", price: "$800 - $2,000", savings: null },
      { country: "UK", price: "$900 - $2,200", savings: null },
    ],
    includes: [
      "Comprehensive consultation",
      "Custom smile design",
      "High-quality porcelain",
      "Precise bonding procedure",
      "Color matching guarantee",
    ],
  },
  fullMouth: {
    name: "Full Mouth Smile Design",
    description: "Complete smile transformation",
    prices: [
      { country: "Vietnam", price: "$5,000 - $8,000", savings: "Save 80%" },
      { country: "USA", price: "$20,000 - $45,000", savings: null },
      { country: "Australia", price: "$15,000 - $35,000", savings: null },
      { country: "UK", price: "$18,000 - $40,000", savings: null },
    ],
    includes: [
      "Comprehensive examination",
      "Digital smile design preview",
      "Full set of veneers or crowns",
      "Multiple adjustments",
      "Extended warranty",
    ],
  },
  whitening: {
    name: "Teeth Whitening",
    description: "Professional whitening treatment",
    prices: [
      { country: "Vietnam", price: "$150 - $250", savings: "Save 70%" },
      { country: "USA", price: "$500 - $1,000", savings: null },
      { country: "Australia", price: "$400 - $800", savings: null },
      { country: "UK", price: "$450 - $900", savings: null },
    ],
    includes: [
      "Professional whitening treatment",
      "Custom-fitted trays",
      "Take-home maintenance kit",
      "Follow-up consultation",
    ],
  },
  rootCanal: {
    name: "Root Canal Treatment",
    description: "Complete endodontic treatment",
    prices: [
      { country: "Vietnam", price: "$200 - $350", savings: "Save 75%" },
      { country: "USA", price: "$800 - $1,500", savings: null },
      { country: "Australia", price: "$600 - $1,200", savings: null },
      { country: "UK", price: "$700 - $1,400", savings: null },
    ],
    includes: ["Local anesthesia", "Complete root canal procedure", "Crown if needed", "Follow-up examination"],
  },
  crown: {
    name: "Dental Crown",
    description: "Porcelain crown - Premium quality",
    prices: [
      { country: "Vietnam", price: "$300 - $500", savings: "Save 75%" },
      { country: "USA", price: "$1,000 - $2,500", savings: null },
      { country: "Australia", price: "$800 - $2,000", savings: null },
      { country: "UK", price: "$900 - $2,200", savings: null },
    ],
    includes: ["Digital impression scan", "Custom fabrication", "Fitting and adjustment", "Comprehensive warranty"],
  },
}

export function PricingSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-green-50/30 to-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            Transparent Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance mb-4">
            Compare Our Affordable Prices
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Experience world-class dental care at a fraction of the cost. Save 60-80% compared to Western countries
            without compromising quality
          </p>
        </div>

        <Tabs defaultValue="implants" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 max-w-5xl mx-auto mb-8 h-auto gap-2 bg-transparent">
            <TabsTrigger
              value="implants"
              className="text-xs md:text-sm py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Implants
            </TabsTrigger>
            <TabsTrigger
              value="veneers"
              className="text-xs md:text-sm py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Veneers
            </TabsTrigger>
            <TabsTrigger
              value="fullMouth"
              className="text-xs md:text-sm py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Full Mouth
            </TabsTrigger>
            <TabsTrigger
              value="whitening"
              className="text-xs md:text-sm py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Whitening
            </TabsTrigger>
            <TabsTrigger
              value="rootCanal"
              className="text-xs md:text-sm py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Root Canal
            </TabsTrigger>
            <TabsTrigger
              value="crown"
              className="text-xs md:text-sm py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Crowns
            </TabsTrigger>
          </TabsList>

          {Object.entries(pricingData).map(([key, service]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{service.name}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {service.prices.map((priceData, index) => (
                    <Card
                      key={index}
                      className={`border-2 transition-all ${
                        priceData.country === "Vietnam"
                          ? "border-primary bg-primary/5 shadow-lg scale-105 lg:scale-110"
                          : "border-muted hover:shadow-md"
                      }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between mb-1">
                          <CardTitle className="text-lg">{priceData.country}</CardTitle>
                          {priceData.savings && (
                            <Badge className="bg-primary text-white text-xs">{priceData.savings}</Badge>
                          )}
                        </div>
                        <div className="text-2xl md:text-3xl font-bold text-primary">{priceData.price}</div>
                      </CardHeader>
                      {priceData.country === "Vietnam" && (
                        <CardContent className="pt-0">
                          <div className="text-xs text-primary font-medium">Best Value Guarantee</div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>

                <Card className="border-2 border-primary/20 bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">What&apos;s Included in Vietnam</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {service.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 p-6 bg-primary/5 border-2 border-primary/20 rounded-lg max-w-5xl mx-auto">
          <h3 className="text-xl font-bold mb-3 text-primary text-center">Why Choose Vietnam for Dental Care?</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Lower operational costs without compromising quality</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Same international-standard materials and equipment</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Internationally trained and certified dentists</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Comprehensive warranties and follow-up care included</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-pretty max-w-3xl mx-auto text-sm">
            All prices are estimates and may vary based on individual cases. Contact us for a detailed, personalized
            treatment plan and quote. Prices include consultation, treatment, and standard follow-up care.
          </p>
        </div>
      </div>
    </section>
  )
}
