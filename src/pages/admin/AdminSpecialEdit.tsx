import { useNavigate, useParams } from "react-router-dom";
import { useSpecial, useUpdateSpecial, SpecialInsert } from "@/hooks/useSpecials";
import { SpecialForm } from "@/components/admin/SpecialForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AdminSpecialEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: special, isLoading } = useSpecial(id || "");
  const updateSpecial = useUpdateSpecial();

  const handleSubmit = async (data: SpecialInsert) => {
    if (!id) return;
    try {
      await updateSpecial.mutateAsync({ id, ...data });
      toast.success("Special offer updated successfully");
      navigate("/admin/specials");
    } catch (error) {
      console.error("Error updating special:", error);
      toast.error("Failed to update special offer");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!special) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Special offer not found</p>
        <Button variant="outline" onClick={() => navigate("/admin/specials")}>
          Back to Specials
        </Button>
      </div>
    );
  }

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
          <h1 className="text-2xl font-serif text-foreground">Edit Special Offer</h1>
          <p className="text-muted-foreground mt-1">
            Update "{special.title}"
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <SpecialForm
          special={special}
          onSubmit={handleSubmit}
          isSubmitting={updateSpecial.isPending}
        />
      </div>
    </div>
  );
};

export default AdminSpecialEdit;
