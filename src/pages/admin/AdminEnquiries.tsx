import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  enquiry_type: string;
  preferred_vehicle: string | null;
  start_date: string | null;
  end_date: string | null;
  message: string;
  referral_source: string;
  created_at: string;
}

const useContactSubmissions = () => {
  return useQuery({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ContactSubmission[];
    },
  });
};

const AdminEnquiries = () => {
  const { data: submissions, isLoading, refetch } = useContactSubmissions();
  const { toast } = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete submission.",
        variant: "destructive",
      });
    } else {
      toast({ title: "Deleted", description: "Submission removed." });
      refetch();
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground mb-2">Enquiries</h1>
        <p className="text-muted-foreground">
          All contact form submissions ({submissions?.length || 0})
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-muted-foreground">Loading...</div>
      ) : !submissions || submissions.length === 0 ? (
        <div className="text-center py-12 border border-border rounded-sm">
          <p className="text-muted-foreground">No enquiries yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="border border-border rounded-sm overflow-hidden"
            >
              {/* Header row */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() =>
                  setExpandedId(expandedId === sub.id ? null : sub.id)
                }
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-medium text-foreground truncate">
                      {sub.name}
                    </p>
                    <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-sm whitespace-nowrap">
                      {sub.enquiry_type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {sub.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(sub.created_at)}
                    </span>
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive ml-2 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Enquiry</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this enquiry from{" "}
                        {sub.name}? This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(sub.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              {/* Expanded details */}
              {expandedId === sub.id && (
                <div className="border-t border-border p-4 bg-muted/10 space-y-3 text-sm">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Phone</p>
                      <p className="text-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {sub.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">
                        Referral Source
                      </p>
                      <p className="text-foreground">{sub.referral_source}</p>
                    </div>
                    {sub.preferred_vehicle && (
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">
                          Preferred Vehicle
                        </p>
                        <p className="text-foreground">{sub.preferred_vehicle}</p>
                      </div>
                    )}
                    {(sub.start_date || sub.end_date) && (
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">
                          Dates
                        </p>
                        <p className="text-foreground">
                          {sub.start_date || "—"} → {sub.end_date || "—"}
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Message</p>
                    <p className="text-foreground whitespace-pre-wrap">
                      {sub.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
