import { useNavigate } from "react-router-dom";
import { useCreateSpecial, SpecialInsert } from "@/hooks/useSpecials";
import { SpecialForm } from "@/components/admin/SpecialForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const AdminSpecialNew = () => {
  const navigate = useNavigate();
  const createSpecial = useCreateSpecial();

  const handleSubmit = async (data: SpecialInsert) => {
    try {
      await createSpecial.mutateAsync(data);
      toast.success("Special offer created successfully");
      navigate("/admin/specials");
    } catch (error) {
      console.error("Error creating special:", error);
      toast.error("Failed to create special offer");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/admin/specials")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-serif text-foreground">
            Create Special Offer
          </h1>
          <p className="text-muted-foreground mt-1">
            Add a new promotional offer to display on the homepage
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <SpecialForm onSubmit={handleSubmit} isSubmitting={createSpecial.isPending} />
      </div>
    </div>
  );
};

export default AdminSpecialNew;
