import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for personal projects",
      features: [
        "5 Components",
        "Basic Documentation",
        "Community Support",
        "MIT License"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      testId: "plan-starter"
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "For professional developers",
      features: [
        "50+ Components",
        "Advanced Documentation",
        "Priority Support",
        "Theme Customization",
        "Figma Design Kit"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
      popular: true,
      testId: "plan-professional"
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited Components",
        "White-label Solution",
        "24/7 Dedicated Support",
        "Custom Development",
        "SLA Guarantee"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      testId: "plan-enterprise"
    }
  ];

  return (
    <section id="pricing" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your team. Start free and scale as you grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`rounded-3xl border-border/20 hover:scale-105 transition-all relative ${
                plan.popular ? 'glass-orange' : 'glass'
              }`}
              data-testid={plan.testId}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold mb-2">
                    <span className="gradient-text">{plan.price}</span>
                    {plan.period && <span className="text-lg text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="text-primary mr-3" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.buttonVariant}
                  className={`w-full rounded-xl py-3 font-semibold hover:scale-105 transition-all ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-accent text-white border-0'
                      : plan.buttonVariant === 'outline' 
                        ? 'glass border-border/20 hover:glass-orange' 
                        : ''
                  }`}
                  data-testid={`button-${plan.name.toLowerCase()}`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
