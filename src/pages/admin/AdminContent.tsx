import { useState } from "react";
import { useAllPageContent, useUpdatePageContent, ContentBlock } from "@/hooks/usePageContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2 } from "lucide-react";

const PAGES = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "process", label: "Process" },
  { key: "contact", label: "Contact" },
  { key: "faq", label: "FAQ" },
  { key: "terms", label: "Terms" },
  { key: "listvehicle", label: "List Vehicle" },
  { key: "footer", label: "Footer" },
];

const AdminContent = () => {
  const { data: allContent, isLoading } = useAllPageContent();
  const updateMutation = useUpdatePageContent();
  const { toast } = useToast();
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setEditedValues((prev) => ({ ...prev, [id]: value }));
  };

  const getDisplayValue = (block: ContentBlock) => {
    return editedValues[block.id] ?? block.value ?? "";
  };

  const getPageBlocks = (page: string) => {
    return allContent?.filter((b) => b.page === page) ?? [];
  };

  const getPageSections = (page: string) => {
    const blocks = getPageBlocks(page);
    const sections = new Map<string, ContentBlock[]>();
    blocks.forEach((b) => {
      const section = b.section || "general";
      if (!sections.has(section)) sections.set(section, []);
      sections.get(section)!.push(b);
    });
    return sections;
  };

  const handleSavePage = async (page: string) => {
    const blocks = getPageBlocks(page);
    const updates = blocks
      .filter((b) => editedValues[b.id] !== undefined && editedValues[b.id] !== (b.value ?? ""))
      .map((b) => ({ id: b.id, value: editedValues[b.id] }));

    if (updates.length === 0) {
      toast({ title: "No changes", description: "Nothing has been modified." });
      return;
    }

    try {
      await updateMutation.mutateAsync(updates);
      // Clear edited values for this page
      const newEdited = { ...editedValues };
      blocks.forEach((b) => delete newEdited[b.id]);
      setEditedValues(newEdited);
      toast({ title: "Saved", description: `${updates.length} field(s) updated successfully.` });
    } catch (e) {
      toast({ title: "Error", description: "Failed to save changes.", variant: "destructive" });
    }
  };

  const hasPageChanges = (page: string) => {
    const blocks = getPageBlocks(page);
    return blocks.some((b) => editedValues[b.id] !== undefined && editedValues[b.id] !== (b.value ?? ""));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const renderField = (block: ContentBlock) => {
    const value = getDisplayValue(block);
    const isJson = block.content_type === "json";
    const isLongText = !isJson && (value.length > 100 || block.content_type === "rich_text");

    return (
      <div key={block.id} className="space-y-2">
        <Label className="text-sm font-medium">
          {block.label || block.id}
          {isJson && (
            <span className="ml-2 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">JSON</span>
          )}
        </Label>
        {isJson ? (
          <Textarea
            value={value}
            onChange={(e) => handleChange(block.id, e.target.value)}
            className="font-mono text-xs min-h-[200px]"
            spellCheck={false}
          />
        ) : isLongText ? (
          <Textarea
            value={value}
            onChange={(e) => handleChange(block.id, e.target.value)}
            className="min-h-[100px]"
          />
        ) : (
          <Input
            value={value}
            onChange={(e) => handleChange(block.id, e.target.value)}
          />
        )}
        <p className="text-xs text-muted-foreground">{block.id}</p>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-medium">Content Management</h1>
        <p className="text-muted-foreground mt-1">Edit all text and content across your website.</p>
      </div>

      <Tabs defaultValue="home">
        <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
          {PAGES.map((p) => (
            <TabsTrigger key={p.key} value={p.key} className="relative">
              {p.label}
              {hasPageChanges(p.key) && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {PAGES.map((p) => (
          <TabsContent key={p.key} value={p.key}>
            <div className="space-y-8">
              {Array.from(getPageSections(p.key).entries()).map(([section, blocks]) => (
                <div key={section} className="border border-border rounded-sm p-6">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-6 capitalize">
                    {section}
                  </h3>
                  <div className="space-y-6">
                    {blocks.map(renderField)}
                  </div>
                </div>
              ))}

              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => handleSavePage(p.key)}
                  disabled={!hasPageChanges(p.key) || updateMutation.isPending}
                >
                  {updateMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save {p.label}
                </Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminContent;
