import { Link } from "react-router-dom";
import { useSpecials, useDeleteSpecial, useUpdateSpecial } from "@/hooks/useSpecials";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const AdminSpecials = () => {
  const { data: specials, isLoading } = useSpecials();
  const deleteSpecial = useDeleteSpecial();
  const updateSpecial = useUpdateSpecial();

  const handleDelete = async (id: string) => {
    try {
      await deleteSpecial.mutateAsync(id);
      toast.success("Special deleted successfully");
    } catch (error) {
      toast.error("Failed to delete special");
    }
  };

  const handleToggleActive = async (id: string, currentValue: boolean) => {
    try {
      await updateSpecial.mutateAsync({ id, is_active: !currentValue });
      toast.success(`Special ${!currentValue ? "activated" : "deactivated"}`);
    } catch (error) {
      toast.error("Failed to update special");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-foreground">Special Offers</h1>
          <p className="text-muted-foreground mt-1">
            Manage promotional offers displayed on the homepage
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/specials/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Special
          </Link>
        </Button>
      </div>

      {!specials || specials.length === 0 ? (
        <div className="text-center py-12 border rounded-sm bg-muted/20">
          <p className="text-muted-foreground mb-4">No special offers yet</p>
          <Button asChild variant="outline">
            <Link to="/admin/specials/new">Create your first special</Link>
          </Button>
        </div>
      ) : (
        <div className="border rounded-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Order</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead className="w-24">Active</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specials.map((special) => (
                <TableRow key={special.id}>
                  <TableCell className="font-mono text-sm">
                    {special.display_order}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {special.image_url && (
                        <img
                          src={special.image_url}
                          alt={special.title}
                          className="w-16 h-10 object-cover rounded-sm"
                        />
                      )}
                      <span className="font-medium">{special.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {special.category_tag}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {special.start_date || special.end_date ? (
                      <>
                        {special.start_date
                          ? format(new Date(special.start_date), "MMM d, yyyy")
                          : "—"}{" "}
                        to{" "}
                        {special.end_date
                          ? format(new Date(special.end_date), "MMM d, yyyy")
                          : "—"}
                      </>
                    ) : (
                      "Always"
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={special.is_active}
                      onCheckedChange={() =>
                        handleToggleActive(special.id, special.is_active)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/admin/specials/${special.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Special?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{special.title}".
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(special.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminSpecials;
