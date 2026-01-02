import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { LuxuryButton } from "@/components/ui/luxury-button";

const NotFound = () => {
  return (
    <Layout>
      <section className="section-padding flex items-center justify-center min-h-[60vh]">
        <div className="container-luxury text-center">
          <p className="text-caption text-muted-foreground tracking-luxury mb-4">
            Page Not Found
          </p>
          <h1 className="text-display text-foreground mb-6">404</h1>
          <p className="text-body-lg text-muted-foreground mb-10 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link to="/">
            <LuxuryButton variant="default" size="lg">
              Return Home
            </LuxuryButton>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
