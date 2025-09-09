import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Home, BarChart3, Settings, ChevronRight } from "lucide-react";

export default function DemoSection() {
  return (
    <section id="demo" className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            See It In <span className="gradient-text">Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our interactive component library and see how beautiful your
            applications can be
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column - Component Examples */}
          <div className="space-y-6">
            {/* Button Demo */}
            <Card
              className="glass rounded-3xl border-border/20"
              data-testid="demo-buttons"
            >
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Interactive Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button className="glass-orange rounded-xl px-6 py-3 font-medium hover:scale-105 transition-all">
                    Primary Button
                  </Button>
                  <Button
                    variant="outline"
                    className="glass rounded-xl px-6 py-3 font-medium hover:scale-105 transition-all border-border/20"
                  >
                    Secondary Button
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary/30 rounded-xl px-6 py-3 font-medium text-primary hover:bg-primary/10 transition-all"
                  >
                    Outline Button
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Form Demo */}
            <Card
              className="glass rounded-3xl border-border/20"
              data-testid="demo-forms"
            >
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Form Elements</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="glass rounded-xl focus:ring-2 focus:ring-primary/50 border-border/20"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-2">Message</Label>
                    <Textarea
                      placeholder="Your message here..."
                      rows={3}
                      className="glass rounded-xl focus:ring-2 focus:ring-primary/50 resize-none border-border/20"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Card Examples */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <Card
              className="glass rounded-3xl border-border/20"
              data-testid="demo-stats"
            >
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Data Display</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-orange rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">50K+</div>
                    <div className="text-sm text-muted-foreground">
                      Downloads
                    </div>
                  </div>
                  <div className="glass-orange rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">99%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div className="glass-orange rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">4.9</div>
                    <div className="text-sm text-muted-foreground">Rating</div>
                  </div>
                  <div className="glass-orange rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Demo */}
            <Card
              className="glass rounded-3xl border-border/20"
              data-testid="demo-navigation"
            >
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">Navigation Elements</h3>
                <div className="space-y-4">
                  <div className="glass rounded-xl p-4 flex items-center justify-between hover:glass-orange transition-all cursor-pointer">
                    <div className="flex items-center">
                      <Home className="text-primary mr-3" size={20} />
                      <span>Dashboard</span>
                    </div>
                    <ChevronRight className="text-muted-foreground" size={16} />
                  </div>
                  <div className="glass rounded-xl p-4 flex items-center justify-between hover:glass-orange transition-all cursor-pointer">
                    <div className="flex items-center">
                      <BarChart3 className="text-primary mr-3" size={20} />
                      <span>Analytics</span>
                    </div>
                    <ChevronRight className="text-muted-foreground" size={16} />
                  </div>
                  <div className="glass rounded-xl p-4 flex items-center justify-between hover:glass-orange transition-all cursor-pointer">
                    <div className="flex items-center">
                      <Settings className="text-primary mr-3" size={20} />
                      <span>Settings</span>
                    </div>
                    <ChevronRight className="text-muted-foreground" size={16} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Code Preview */}
        <Card
          className="glass rounded-3xl border-border/20"
          data-testid="demo-code"
        >
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Code Example</h3>
              <Button
                className="glass-orange rounded-lg px-4 py-2 text-sm font-medium"
                data-testid="button-copy-code"
              >
                <Copy className="mr-2" size={16} />
                Copy Code
              </Button>
            </div>
            <div className="bg-secondary/50 rounded-2xl p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-muted-foreground">
                <code>
                  {`import { Button, Card, Input } from '@monoui/react'

export function App() {
  return (
    <Card variant="glass" className="p-6">
      <Input placeholder="Enter text..." />
      <Button variant="primary" size="lg">
        Submit
      </Button>
    </Card>
  )
}`}
                </code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
