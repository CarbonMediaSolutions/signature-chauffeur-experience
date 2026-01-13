import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Special, SpecialInsert } from "@/hooks/useSpecials";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";

const specialSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  category_tag: z.string().min(1, "Category tag is required"),
  image_url: z.string().optional(),
  cta_text: z.string().min(1, "Button text is required"),
  cta_link: z.string().min(1, "Button link is required"),
  is_active: z.boolean(),
  display_order: z.number().int().min(0),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

type SpecialFormValues = z.infer<typeof specialSchema>;

interface SpecialFormProps {
  special?: Special;
  onSubmit: (data: SpecialInsert) => Promise<void>;
  isSubmitting: boolean;
}

export const SpecialForm = ({
  special,
  onSubmit,
  isSubmitting,
}: SpecialFormProps) => {
  const [uploading, setUploading] = useState(false);

  const form = useForm<SpecialFormValues>({
    resolver: zodResolver(specialSchema),
    defaultValues: {
      title: special?.title || "",
      description: special?.description || "",
      category_tag: special?.category_tag || "",
      image_url: special?.image_url || "",
      cta_text: special?.cta_text || "Learn More",
      cta_link: special?.cta_link || "/fleet",
      is_active: special?.is_active ?? true,
      display_order: special?.display_order || 0,
      start_date: special?.start_date || "",
      end_date: special?.end_date || "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `special-${Date.now()}.${fileExt}`;
      const filePath = `specials/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("vehicle-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("vehicle-media").getPublicUrl(filePath);

      form.setValue("image_url", publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    form.setValue("image_url", "");
  };

  const handleFormSubmit = async (values: SpecialFormValues) => {
    const data: SpecialInsert = {
      title: values.title,
      category_tag: values.category_tag,
      cta_text: values.cta_text,
      cta_link: values.cta_link,
      is_active: values.is_active,
      display_order: values.display_order,
      description: values.description || null,
      image_url: values.image_url || null,
      start_date: values.start_date || null,
      end_date: values.end_date || null,
    };
    await onSubmit(data);
  };

  const imageUrl = form.watch("image_url");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Summer Special Offer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category Tag */}
          <FormField
            control={form.control}
            name="category_tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Tag</FormLabel>
                <FormControl>
                  <Input placeholder="Summer Promotion" {...field} />
                </FormControl>
                <FormDescription>
                  Displayed as a badge (e.g., "Long Term Offer")
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the special offer..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="image_url"
          render={() => (
            <FormItem>
              <FormLabel>Promotional Image</FormLabel>
              <div className="space-y-4">
                {imageUrl ? (
                  <div className="relative inline-block">
                    <img
                      src={imageUrl}
                      alt="Special preview"
                      className="w-64 h-40 object-cover rounded-sm border"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-64 h-40 border-2 border-dashed border-border rounded-sm cursor-pointer hover:bg-muted/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    {uploading ? (
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload
                        </span>
                      </>
                    )}
                  </label>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CTA Text */}
          <FormField
            control={form.control}
            name="cta_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button Text</FormLabel>
                <FormControl>
                  <Input placeholder="Learn More" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CTA Link */}
          <FormField
            control={form.control}
            name="cta_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button Link</FormLabel>
                <FormControl>
                  <Input placeholder="/fleet" {...field} />
                </FormControl>
                <FormDescription>
                  Internal path (e.g., /fleet) or external URL
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Display Order */}
          <FormField
            control={form.control}
            name="display_order"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Lower numbers appear first</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Start Date */}
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date (Optional)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Date */}
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date (Optional)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Active Toggle */}
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-sm border p-4">
              <div>
                <FormLabel>Active</FormLabel>
                <FormDescription>
                  Only active specials are shown on the homepage
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {special ? "Update Special" : "Create Special"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
