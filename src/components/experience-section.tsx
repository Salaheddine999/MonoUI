import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Play, Sparkles } from "lucide-react";
import { useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function ExperienceSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [activeButton, setActiveButton] = useState(0);
  const [switchEnabled, setSwitchEnabled] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = ["Home", "Profile", "Settings"];

  return (
    <section className="relative py-24 px-4">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Create Eye-Catching
            <br />
            <span className="gradient-text">Experiences With Mono UI</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Simple Components Card */}
          <Card
            className="glass rounded-3xl border-border/20 hover:glass-orange card-hover"
            data-testid="experience-simple-components"
          >
            <CardContent className="p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6">Simple Components</h3>

                {/* Interactive Button Demo */}
                <div className="space-y-4 mb-6">
                  <div className="flex gap-3">
                    <Button
                      variant={activeButton === 0 ? "default" : "outline"}
                      className={`rounded-xl px-4 py-2 transition-all ${
                        activeButton === 0
                          ? "glass-orange border-0"
                          : "glass border-border/20 hover:glass-orange"
                      }`}
                      onClick={() => setActiveButton(0)}
                    >
                      Button
                    </Button>
                    <Button
                      variant="outline"
                      className="glass rounded-xl px-4 py-2 border-border/20 hover:glass-orange transition-all"
                    >
                      Button
                    </Button>
                  </div>

                  {/* Toggle/Switch Demo */}
                  <div className="flex items-center justify-between glass rounded-xl p-4">
                    <span className="text-sm">Enable notifications</span>
                    <Switch
                      checked={switchEnabled}
                      onCheckedChange={setSwitchEnabled}
                    />
                  </div>

                  {/* Status Badges */}
                  <div className="flex gap-2">
                    <Badge
                      variant="secondary"
                      className="glass-orange rounded-full"
                    >
                      <Circle className="w-2 h-2 fill-current mr-2" />
                      Active
                    </Badge>
                    <Badge
                      variant="outline"
                      className="glass rounded-full border-border/20"
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Complete
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clean Layouts Card */}
          <Card
            className="glass rounded-3xl border-border/20 hover:glass-orange card-hover"
            data-testid="experience-clean-layouts"
          >
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Clean Layouts</h3>

              {/* Mock Window Interface */}
              <div className="glass rounded-2xl border-border/20 overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/20">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    monoui.app
                  </div>
                </div>

                {/* Window Content */}
                <div className="p-6 space-y-4">
                  {/* Navigation Tabs */}
                  <div className="flex space-x-1 glass rounded-xl p-1">
                    {tabs.map((tab, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTab(index)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedTab === index
                            ? "glass-orange"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Content Lines */}
                  <div className="space-y-2">
                    <div className="h-3 glass rounded w-3/4"></div>
                    <div className="h-3 glass rounded w-1/2"></div>
                    <div className="h-3 glass rounded w-2/3"></div>
                  </div>

                  {/* Action Button */}
                  <Button className="glass-orange rounded-xl px-4 py-2 text-sm w-full">
                    Get Started
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Smooth Animations Card */}
          <Card
            className="glass rounded-3xl border-border/20 hover:glass-orange card-hover"
            data-testid="experience-smooth-animations"
          >
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Smooth Animations</h3>

              <div className="space-y-6">
                {/* Floating Elements */}
                <div className="relative h-32 glass rounded-2xl p-4 overflow-hidden">
                  <div className="absolute top-4 left-4">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg animate-float flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-8 right-6">
                    <div
                      className="w-4 h-4 bg-gradient-to-br from-accent to-primary rounded-full animate-float"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div
                      className="w-5 h-5 bg-gradient-to-br from-primary/50 to-accent/50 rounded-lg animate-float"
                      style={{ animationDelay: "2s" }}
                    ></div>
                  </div>

                  {/* Animated Progress */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="h-2 glass rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Animated Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg mb-2 animate-glow"></div>
                    <div className="h-2 glass rounded w-3/4 mb-1"></div>
                    <div className="h-2 glass rounded w-1/2"></div>
                  </div>
                  <div className="glass rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg mb-2 animate-glow"></div>
                    <div className="h-2 glass rounded w-2/3 mb-1"></div>
                    <div className="h-2 glass rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
