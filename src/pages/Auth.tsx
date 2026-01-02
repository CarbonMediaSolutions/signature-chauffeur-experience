import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().optional(),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validation = authSchema.safeParse({ 
        email, 
        password, 
        fullName: isLogin ? undefined : fullName 
      });

      if (!validation.success) {
        toast({
          title: "Validation Error",
          description: validation.error.errors[0].message,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      let error;
      if (isLogin) {
        const result = await signIn(email, password);
        error = result.error;
      } else {
        if (!fullName.trim()) {
          toast({
            title: "Validation Error",
            description: "Please enter your full name",
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
        const result = await signUp(email, password, fullName);
        error = result.error;
      }

      if (error) {
        let message = error.message;
        if (message.includes("User already registered")) {
          message = "An account with this email already exists. Please sign in.";
        }
        toast({
          title: isLogin ? "Sign In Failed" : "Sign Up Failed",
          description: message,
          variant: "destructive",
        });
      } else if (!isLogin) {
        toast({
          title: "Account Created",
          description: "You can now sign in with your credentials.",
        });
        setIsLogin(true);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-12">
              <p className="text-caption text-muted-foreground mb-4">
                {isLogin ? "Welcome Back" : "Join Us"}
              </p>
              <h1 className="text-display-sm text-foreground">
                {isLogin ? "Sign In" : "Create Account"}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-background border-border"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-background border-border"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="bg-background border-border"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? "Please wait..." 
                  : isLogin 
                    ? "Sign In" 
                    : "Create Account"
                }
              </Button>
            </form>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isLogin
                  ? "Don't have an account? Create one"
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
