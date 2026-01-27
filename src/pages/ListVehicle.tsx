import { Layout } from "@/components/layout/Layout";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Shield, Camera, FileCheck, Users, ClipboardCheck, BarChart3, Upload, X, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PhoneInput } from "@/components/ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Import images
import capeRoadImage from "@/assets/cape-town-road.jpg";
import interiorImage from "@/assets/detail-interior.jpg";
import businessImage from "@/assets/lifestyle-business.jpg";
import photoExampleFront from "@/assets/photo-example-front.jpg";
import photoExampleSide from "@/assets/photo-example-side.jpg";
import photoExampleRear from "@/assets/photo-example-rear.jpg";

// Generate years from current year down to 1970
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => currentYear - i);

const ListVehicle = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "+27 ",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    message: "",
  });
  const [vehicleImages, setVehicleImages] = useState<File[]>([]);
  const [uploadPreviews, setUploadPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoGuideOpen, setPhotoGuideOpen] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported format. Use JPG, PNG or WebP.`,
          variant: "destructive",
        });
      }
      if (!isValidSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 5MB limit.`,
          variant: "destructive",
        });
      }
      return isValidType && isValidSize;
    });
    
    // Limit to 3 images total
    const newImages = [...vehicleImages, ...validFiles].slice(0, 3);
    setVehicleImages(newImages);
    
    // Generate previews
    const previews = newImages.map(file => URL.createObjectURL(file));
    setUploadPreviews(previews);
  };

  const removeImage = (index: number) => {
    // Revoke the old preview URL to prevent memory leaks
    URL.revokeObjectURL(uploadPreviews[index]);
    const newImages = vehicleImages.filter((_, i) => i !== index);
    const newPreviews = uploadPreviews.filter((_, i) => i !== index);
    setVehicleImages(newImages);
    setUploadPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Upload images to storage
      const imageUrls: string[] = [];
      for (const file of vehicleImages) {
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name}`;
        const { data, error } = await supabase.storage
          .from('vehicle-submissions')
          .upload(fileName, file);
        
        if (error) {
          console.error('Upload error:', error);
          throw new Error(`Failed to upload ${file.name}`);
        }
        
        if (data) {
          const { data: urlData } = supabase.storage
            .from('vehicle-submissions')
            .getPublicUrl(data.path);
          imageUrls.push(urlData.publicUrl);
        }
      }
      
      // For now, just show toast (could save to DB or send via email later)
      console.log('Submission data:', { ...formData, imageUrls });
      
      toast({
        title: "Submission Received",
        description: "Thank you for your interest. Our team will review your submission and be in touch shortly.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "+27 ",
        vehicleMake: "",
        vehicleModel: "",
        vehicleYear: "",
        message: "",
      });
      // Revoke all preview URLs
      uploadPreviews.forEach(url => URL.revokeObjectURL(url));
      setVehicleImages([]);
      setUploadPreviews([]);
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Upload Error",
        description: "There was an issue uploading your images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { 
      icon: Users,
      headline: "Vetted Clients",
      desc: "Every renter is carefully screened. We select clients who respect exceptional vehicles." 
    },
    { 
      icon: Camera,
      headline: "Premium Presentation",
      desc: "Professional photography and compelling copy that reflects your car's true character." 
    },
    { 
      icon: FileCheck,
      headline: "Zero Admin",
      desc: "Contracts, communications, coordination. Every detail managed on your behalf." 
    },
    { 
      icon: Shield,
      headline: "Personal Handovers",
      desc: "Every rental starts and ends with care. Full familiarisation and secure transfers." 
    },
    { 
      icon: ClipboardCheck,
      headline: "Full Inspections",
      desc: "Thorough checks before and after every rental ensure pristine condition." 
    },
    { 
      icon: BarChart3,
      headline: "Complete Transparency",
      desc: "Regular updates on bookings, performance, and earnings. No surprises." 
    },
  ];

  const services = [
    "Client Screening & Approval",
    "Professional Photography & Presentation",
    "Full Rental Administration",
    "Secure Handovers & Returns",
    "Pre & Post-Rental Inspections",
    "Transparent Reporting & Payouts",
  ];

  const photoExamples = [
    {
      title: "Front View",
      description: "Capture your vehicle head-on, showing the grille, headlights, and overall front profile. Ensure good lighting and a clean background.",
      image: photoExampleFront
    },
    {
      title: "Side Profile",
      description: "A full side view showcasing the vehicle's silhouette and proportions. Stand back to capture the entire vehicle in frame.",
      image: photoExampleSide
    },
    {
      title: "Rear Three-Quarter",
      description: "The classic automotive angle showing the rear and one side. This view highlights the vehicle's character and stance.",
      image: photoExampleRear
    }
  ];

  return (
    <Layout>
      {/* Hero with Vehicle Image */}
      <section className="bg-[hsl(35,30%,95%)]">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 lg:py-24">
            <div className="order-2 lg:order-1">
              <p className="text-caption text-muted-foreground mb-4 tracking-widest uppercase">
                For Vehicle Owners
              </p>
              <h1 className="text-display text-foreground mb-8">
                Partner With Signature
              </h1>
              <p className="text-body-lg text-muted-foreground mb-8">
                Own a luxury or performance vehicle? We offer complete concierge 
                management for a curated selection of exceptional cars. Not a 
                marketplace, but a partnership built on trust, discretion, and care.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="w-12 h-px bg-accent"></span>
                <span>Cape Town & Surrounds</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src="/vehicles/porsche-boxster-718-s.png" 
                  alt="Porsche Boxster 718 S" 
                  className="w-full h-auto object-contain"
                />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-accent/30 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <p className="text-caption text-muted-foreground mb-4 tracking-widest uppercase">
              The Signature Advantage
            </p>
            <h2 className="text-headline text-foreground">
              Why Owners Choose Us
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div 
                key={benefit.headline} 
                className="group p-8 border border-border/50 hover:border-accent/50 transition-all duration-300 bg-background"
              >
                <benefit.icon className="w-8 h-8 text-accent mb-6" strokeWidth={1.5} />
                <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                  {benefit.headline}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Break with Image */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img 
          src={capeRoadImage} 
          alt="Cape Town coastal road" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/70"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-ivory italic leading-relaxed">
            "Your car. Our care.<br />
            <span className="text-ivory/80">A partnership built on trust."</span>
          </p>
        </div>
      </section>

      {/* What We Handle with Image Collage */}
      <section className="section-padding bg-[hsl(35,30%,95%)]">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image Collage */}
            <div className="relative">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-7">
                  <img 
                    src={interiorImage} 
                    alt="Vehicle interior detail" 
                    className="w-full h-64 lg:h-80 object-cover"
                  />
                </div>
                <div className="col-span-5 pt-8">
                  <img 
                    src={businessImage} 
                    alt="Business lifestyle" 
                    className="w-full h-56 lg:h-72 object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-accent/30 -z-10"></div>
            </div>

            {/* Content */}
            <div>
              <p className="text-caption text-muted-foreground mb-4 tracking-widest uppercase">
                Full-Service Management
              </p>
              <h2 className="text-headline text-foreground mb-6">
                What We Handle
              </h2>
              <p className="text-body text-muted-foreground mb-10">
                When you partner with Signature, you gain a dedicated team 
                that treats your vehicle as if it were their own. Every detail 
                is managed with intention and care.
              </p>
              
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={service} className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full border border-accent/50 flex items-center justify-center text-xs text-accent font-medium">
                      {index + 1}
                    </span>
                    <span className="text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Content */}
            <div>
              <p className="text-caption text-muted-foreground mb-4 tracking-widest uppercase">
                Is This Right For You?
              </p>
              <h2 className="text-headline text-foreground mb-8">
                Who This Is For
              </h2>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                  <div>
                    <p className="text-foreground font-medium mb-1">Offset Ownership Costs</p>
                    <p className="text-sm text-muted-foreground">Owners who want their vehicle to work for them while it sits in the garage.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                  <div>
                    <p className="text-foreground font-medium mb-1">Hands-Off Management</p>
                    <p className="text-sm text-muted-foreground">Those who prefer not to manage rentals, clients, or logistics themselves.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                  <div>
                    <p className="text-foreground font-medium mb-1">Discretion & Care</p>
                    <p className="text-sm text-muted-foreground">Individuals who value privacy and careful handling of their prized possession.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                  <div>
                    <p className="text-foreground font-medium mb-1">Right Clientele</p>
                    <p className="text-sm text-muted-foreground">Owners who want their vehicle represented to discerning, respectful renters.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Vehicle Image */}
            <div className="relative">
              <img 
                src="/vehicles/mercedes-amg-e63-s.png" 
                alt="Mercedes-AMG E63 S" 
                className="w-full h-auto object-contain"
              />
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-accent/30 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding bg-[hsl(35,30%,95%)]">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-caption text-muted-foreground mb-4 tracking-widest uppercase">
                Get Started
              </p>
              <h2 className="text-headline text-foreground mb-4">
                Submit Your Vehicle
              </h2>
              <p className="text-body text-muted-foreground">
                Interested in listing your vehicle with Signature? Share your details 
                and our team will be in touch to discuss suitability and next steps. 
                This is a curated partnership. Not every vehicle is accepted.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-background p-8 lg:p-12 border border-border/30">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-foreground mb-2">
                  Contact Number *
                </label>
                <PhoneInput
                  value={formData.phone}
                  onChange={(value) => setFormData({ ...formData, phone: value })}
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Vehicle Make *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Porsche"
                    value={formData.vehicleMake}
                    onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Vehicle Model *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 911 Carrera"
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                    className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-2">
                    Year *
                  </label>
                  <Select 
                    value={formData.vehicleYear} 
                    onValueChange={(val) => setFormData({ ...formData, vehicleYear: val })}
                    required
                  >
                    <SelectTrigger className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground h-auto">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border max-h-60">
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-foreground mb-2">
                  Additional Information
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your vehicle, its condition, current mileage, and your expectations..."
                  className="w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors text-foreground placeholder:text-muted-foreground resize-none"
                />
              </div>

              {/* Vehicle Photos Upload */}
              <div>
                <label className="block text-sm text-foreground mb-2">
                  Vehicle Photos (Optional)
                </label>
                <p className="text-xs text-muted-foreground mb-4">
                  Upload up to 3 clear photos of your vehicle. JPG, PNG or WebP. Max 5MB each.
                </p>
                
                {/* Photo Guidelines Collapsible */}
                <Collapsible open={photoGuideOpen} onOpenChange={setPhotoGuideOpen} className="mb-6">
                  <CollapsibleTrigger className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors">
                    <Camera className="w-4 h-4" />
                    <span>Photo Guidelines - What We Need</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${photoGuideOpen ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-secondary/30 border border-border/50">
                      {photoExamples.map((example) => (
                        <div key={example.title} className="text-center">
                          <div className="aspect-[4/3] mb-3 overflow-hidden border border-border/30">
                            <img 
                              src={example.image} 
                              alt={`Example ${example.title}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h4 className="text-sm font-medium text-foreground mb-1">
                            {example.title}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {example.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground italic mt-4">
                      Quality photos help us assess your vehicle quickly. Clear, well-lit images in outdoor 
                      settings work best. Avoid clutter in the background.
                    </p>
                  </CollapsibleContent>
                </Collapsible>
                
                <div className="space-y-4">
                  {/* Upload previews */}
                  {uploadPreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {uploadPreviews.map((preview, index) => (
                        <div key={index} className="relative aspect-video group">
                          <img
                            src={preview}
                            alt={`Vehicle preview ${index + 1}`}
                            className="w-full h-full object-cover border border-border"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Upload button */}
                  {vehicleImages.length < 3 && (
                    <label className="flex items-center justify-center gap-2 px-4 py-6 border border-dashed border-border hover:border-foreground cursor-pointer transition-colors">
                      <Upload className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {vehicleImages.length === 0 ? 'Add vehicle photos' : 'Add more photos'}
                      </span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <LuxuryButton 
                  type="submit" 
                  variant="default" 
                  size="lg" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit for Consideration'}
                </LuxuryButton>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ListVehicle;
