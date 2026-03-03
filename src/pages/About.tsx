import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { LuxuryButton } from "@/components/ui/luxury-button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Sparkles, Shield, Heart } from "lucide-react";
import capeTownRoad from "@/assets/cape-town-road.jpg";
import aboutDean from "@/assets/about-dean.jpg";
import { useSiteSetting } from "@/hooks/useSiteSettings";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { usePageContent, getContent, getJsonContent } from "@/hooks/usePageContent";

const ABOUT_VIDEO_URL: string | null = null;
const ABOUT_VIDEO_POSTER = capeTownRoad;

const defaultValues = [
  { title: "Possibility", description: "Access to experiences once only dreamed of" },
  { title: "Discretion", description: "Personal, attentive, never transactional" },
  { title: "Humanity", description: "A family-led business with a face behind the name" },
];

const valueIcons: Record<string, any> = { Possibility: Sparkles, Discretion: Shield, Humanity: Heart };

const About = () => {
  const { data: founderImageUrl } = useSiteSetting("founder_image_url");
  const founderImage = founderImageUrl || aboutDean;
  const { data: content } = usePageContent("about");

  const { data: teamMembers = [] } = useQuery({
    queryKey: ["team_members"],
    queryFn: async () => {
      const { data, error } = await supabase.from("team_members" as any).select("*").eq("is_active", true).order("display_order");
      if (error) throw error;
      return data as any[];
    },
  });

  const values = getJsonContent(content, "about.values", defaultValues);
  const whoList = getJsonContent(content, "about.experience.who_list", [
    "Business leaders arriving with presence",
    "Travellers seeking something extraordinary",
    "Those celebrating milestones worth remembering",
  ]);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0">
          {ABOUT_VIDEO_URL ? (
            <video src={ABOUT_VIDEO_URL} autoPlay muted loop playsInline poster={ABOUT_VIDEO_POSTER} className="w-full h-full object-cover" />
          ) : (
            <img src={ABOUT_VIDEO_POSTER} alt="Signature Car Rentals - Scenic coastal road" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/40" />
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-caption text-muted-foreground mb-4 tracking-[0.25em]">OUR STORY</p>
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground italic leading-relaxed">
              "{getContent(content, "about.story.quote", "Cars aren't just driven. They're felt.")}"
            </h1>
          </div>
          <div className="w-16 h-px bg-primary/30 mx-auto mb-12" />
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              {getContent(content, "about.story.paragraph_1", "Cars have always meant more than the destination. Long before status or success, they live in our imagination. Symbols of confidence, freedom, and possibility. As we grow, that meaning evolves. Cars become part of our milestones: how we arrive, how we're perceived, and how we feel stepping into moments that matter.")}
            </p>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              {getContent(content, "about.story.paragraph_2", "Signature Car Rentals was created from that understanding. We don't see cars as machines alone, but as emotional experiences shaped by design, sound, and the feeling they create behind the wheel. A great car doesn't just take you somewhere. It changes how you show up.")}
            </p>
            <p className="text-body-lg text-muted-foreground leading-relaxed">
              {getContent(content, "about.story.paragraph_3", "Signature exists to give people access to that feeling. For moments where ambition meets emotion.")}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-charcoal rounded-sm overflow-hidden relative">
              {ABOUT_VIDEO_URL ? (
                <video src={ABOUT_VIDEO_URL} autoPlay muted loop playsInline poster={ABOUT_VIDEO_POSTER} className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-primary/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center mx-auto mb-4">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary-foreground/60 border-b-8 border-b-transparent ml-1" />
                      </div>
                      <p className="text-caption text-primary-foreground/60 tracking-[0.2em]">VIDEO COMING SOON</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Signature Experience */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-luxury">
          <div className="max-w-5xl mx-auto">
            <p className="text-caption text-muted-foreground mb-6 tracking-[0.25em] text-center">THE SIGNATURE EXPERIENCE</p>
            <div className="w-16 h-px bg-primary/30 mx-auto mb-16" />
            <div className="hidden md:grid md:grid-cols-2 gap-12 lg:gap-24">
              <div className="text-center">
                <h3 className="font-serif text-xl text-foreground mb-4">{getContent(content, "about.experience.why_title", "Why Signature")}</h3>
                <p className="text-body text-muted-foreground leading-relaxed">{getContent(content, "about.experience.why_text", "We focus on how a drive makes you feel - not just what you drive. Every booking, every car, every interaction is handled with intention.")}</p>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-xl text-foreground mb-4">{getContent(content, "about.experience.who_title", "Who We Serve")}</h3>
                <p className="text-body text-muted-foreground leading-relaxed mb-4">{getContent(content, "about.experience.who_text", "For those who see a car as part of the moment:")}</p>
                <ul className="space-y-2 text-body text-muted-foreground">
                  {whoList.map((item: string, i: number) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>
            <div className="md:hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem>
                    <div className="text-center px-4">
                      <h3 className="font-serif text-xl text-foreground mb-4">{getContent(content, "about.experience.why_title", "Why Signature")}</h3>
                      <p className="text-body text-muted-foreground leading-relaxed">{getContent(content, "about.experience.why_text", "We focus on how a drive makes you feel - not just what you drive. Every booking, every car, every interaction is handled with intention.")}</p>
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="text-center px-4">
                      <h3 className="font-serif text-xl text-foreground mb-4">{getContent(content, "about.experience.who_title", "Who We Serve")}</h3>
                      <p className="text-body text-muted-foreground leading-relaxed mb-4">{getContent(content, "about.experience.who_text", "For those who see a car as part of the moment:")}</p>
                      <ul className="space-y-2 text-body text-muted-foreground">
                        {whoList.map((item: string, i: number) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
              <div className="flex justify-center gap-2 mt-6"><div className="w-2 h-2 rounded-full bg-primary/30" /><div className="w-2 h-2 rounded-full bg-primary/30" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-ivory">
        <div className="container-luxury">
          <p className="text-caption text-muted-foreground mb-8 tracking-[0.25em] text-center">OUR VALUES</p>
          <div className="w-16 h-px bg-primary/30 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
            {values.map((value: any, idx: number) => {
              const Icon = valueIcons[value.title] || [Sparkles, Shield, Heart][idx] || Sparkles;
              return (
                <div key={value.title} className="text-center group">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-background border border-border mb-4 group-hover:border-brass/50 transition-colors">
                    <Icon className="w-6 h-6 text-brass" />
                  </div>
                  <h3 className="font-serif text-lg md:text-xl text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-caption text-muted-foreground mb-6 tracking-[0.25em]">MEET THE FOUNDER</p>
            <div className="w-16 h-px bg-primary/30 mx-auto" />
          </div>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="aspect-square overflow-hidden rounded-sm">
              <img src={founderImage} alt="Dean Oliver - Founder" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-body-lg text-muted-foreground leading-relaxed">
                {getContent(content, "about.founder.bio", "My love for cars started with a Ferrari F40 poster and weekends watching Formula One. To me, they symbolised possibility - the belief that one day, more was achievable. That fascination never left. When I eventually owned the cars I once dreamed about, what stayed with me wasn't status, but how they made me feel: focused, confident, fully present. Signature was born from that feeling.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      {teamMembers.length > 0 && (
        <section className="py-24 md:py-32 bg-ivory">
          <div className="container-luxury">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <p className="text-caption text-muted-foreground mb-6 tracking-[0.25em]">MEET THE TEAM</p>
              <div className="w-16 h-px bg-primary/30 mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {teamMembers.map((member: any) => (
                <div key={member.id} className="text-center">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden bg-muted">
                    {member.image_url ? <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl font-serif text-muted-foreground">{member.name?.charAt(0)}</div>}
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-accent font-medium mb-3">{member.role}</p>
                  {member.bio && <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote */}
      <section className="relative py-32 md:py-40">
        <div className="absolute inset-0">
          <img src={capeTownRoad} alt="The journey" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="container-luxury relative z-10">
          <blockquote className="max-w-4xl mx-auto text-center font-serif text-xl md:text-2xl lg:text-3xl text-primary-foreground italic leading-relaxed mb-6">
            "{getContent(content, "about.founder.quote", "To let someone sit behind the wheel of a car they once dreamed about, and feel like that kid staring at a poster on the wall.")}"
          </blockquote>
          <p className="text-center text-primary-foreground/80 text-sm tracking-[0.15em]">
            {getContent(content, "about.founder.attribution", "- Dean Oliver, Founder")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-ivory">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-headline text-foreground mb-12">{getContent(content, "about.cta.heading", "Begin Your Signature Experience")}</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/fleet"><LuxuryButton variant="default" size="lg">Explore Your Dream Ride</LuxuryButton></Link>
              <Link to="/contact"><LuxuryButton variant="outline" size="lg">Book Now</LuxuryButton></Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
