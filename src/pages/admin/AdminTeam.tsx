import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
}

interface FormData {
  name: string;
  role: string;
  bio: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

const emptyForm: FormData = {
  name: "",
  role: "",
  bio: "",
  image_url: "",
  display_order: 0,
  is_active: true,
};

const AdminTeam = () => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [uploading, setUploading] = useState(false);

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["team_members_admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members" as any)
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data as unknown as TeamMember[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: FormData & { id?: string }) => {
      const payload = {
        name: data.name,
        role: data.role,
        bio: data.bio || null,
        image_url: data.image_url || null,
        display_order: data.display_order,
        is_active: data.is_active,
      };
      if (data.id) {
        const { error } = await supabase
          .from("team_members" as any)
          .update(payload)
          .eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("team_members" as any)
          .insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members_admin"] });
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      toast.success(editing ? "Team member updated" : "Team member added");
      resetForm();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("team_members" as any)
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members_admin"] });
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      toast.success("Team member removed");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
  };

  const startEdit = (m: TeamMember) => {
    setForm({
      name: m.name,
      role: m.role,
      bio: m.bio || "",
      image_url: m.image_url || "",
      display_order: m.display_order,
      is_active: m.is_active,
    });
    setEditing(m.id);
    setShowForm(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `site-assets/team/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("specials").upload(path, file);
    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("specials").getPublicUrl(path);
    setForm((p) => ({ ...p, image_url: urlData.publicUrl }));
    setUploading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.role) {
      toast.error("Name and role are required");
      return;
    }
    saveMutation.mutate(editing ? { ...form, id: editing } : form);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl text-foreground">Team Members</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage the team shown on the About page
          </p>
        </div>
        {!showForm && (
          <Button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyForm); }}>
            <Plus className="h-4 w-4 mr-2" /> Add Member
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="border border-border rounded-sm p-6 space-y-4 bg-muted/30">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-lg">{editing ? "Edit" : "Add"} Team Member</h3>
            <Button type="button" variant="ghost" size="icon" onClick={resetForm}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label>Role / Title *</Label>
              <Input value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea value={form.bio} onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))} rows={3} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Photo</Label>
              <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
              {uploading && <p className="text-xs text-muted-foreground">Uploading…</p>}
              {form.image_url && (
                <img src={form.image_url} alt="Preview" className="w-20 h-20 object-cover rounded-sm mt-2" />
              )}
            </div>
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input type="number" value={form.display_order} onChange={(e) => setForm((p) => ({ ...p, display_order: parseInt(e.target.value) || 0 }))} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.is_active} onCheckedChange={(c) => setForm((p) => ({ ...p, is_active: c }))} />
            <Label>Active (visible on site)</Label>
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editing ? "Update" : "Add"} Member
            </Button>
          </div>
        </form>
      )}

      {/* List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : members.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">No team members yet. Add your first one above.</p>
      ) : (
        <div className="space-y-3">
          {members.map((m) => (
            <div key={m.id} className="flex items-center gap-4 p-4 border border-border rounded-sm bg-background">
              {m.image_url ? (
                <img src={m.image_url} alt={m.name} className="w-14 h-14 rounded-full object-cover" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-lg font-serif">
                  {m.name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded ${m.is_active ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                {m.is_active ? "Active" : "Hidden"}
              </span>
              <span className="text-xs text-muted-foreground">Order: {m.display_order}</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => startEdit(m)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => {
                  if (confirm(`Remove ${m.name}?`)) deleteMutation.mutate(m.id);
                }}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTeam;
