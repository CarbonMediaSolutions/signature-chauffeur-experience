import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Upload, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VehicleRow {
  name: string;
  category: string;
  daily_rate: number;
  description?: string;
  engine?: string;
  transmission?: string;
  seats?: number;
  fuel_type?: string;
  drive_type?: string;
  luggage_capacity?: string;
  mileage_limit?: string;
  security_deposit?: number;
  insurance_excess?: number;
  why_we_chose?: string;
  features?: string[];
  limited_availability?: boolean;
  is_active?: boolean;
  featured?: boolean;
  acceleration?: string;
  top_speed?: string;
  doors?: number;
  excess_mileage_rate?: number;
  minimum_rental_days?: number;
  errors?: string[];
}

const CSV_TEMPLATE = `name,category,daily_rate,description,engine,transmission,seats,fuel_type,drive_type,luggage_capacity,mileage_limit,security_deposit,insurance_excess,why_we_chose,features,limited_availability,is_active,featured,acceleration,top_speed,doors,excess_mileage_rate,minimum_rental_days
Ferrari California,Sports Car,6500,A stunning convertible with exhilarating performance,4.5L V8,Automatic,2,Petrol,RWD,2 Small Bags,300km/day,50000,25000,Pure driving pleasure meets Italian elegance,"Leather seats,GPS,Bluetooth,Parking sensors",false,true,true,3.8 sec,310 km/h,2,150,1
Mercedes-Benz S-Class,Luxury Sedan,4500,The pinnacle of luxury motoring,3.0L Inline-6,Automatic,5,Petrol,AWD,3 Large Bags,Unlimited,30000,15000,Unmatched comfort for executive travel,"Massage seats,Burmester sound,Night vision,Heated steering",false,true,false,4.5 sec,250 km/h,4,100,1`;

const AdminBulkImport = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parsedData, setParsedData] = useState<VehicleRow[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importComplete, setImportComplete] = useState(false);

  const downloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vehicle-import-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const parseCSV = (text: string): VehicleRow[] => {
    const lines = text.trim().split("\n");
    if (lines.length < 2) return [];

    const headers = lines[0].split(",").map((h) => h.trim());
    const rows: VehicleRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const row: any = {};
      const errors: string[] = [];

      headers.forEach((header, index) => {
        const value = values[index]?.trim() || "";

        switch (header) {
          case "name":
            row.name = value;
            if (!value) errors.push("Name is required");
            break;
          case "category":
            row.category = value;
            if (!value) errors.push("Category is required");
            break;
          case "daily_rate":
            row.daily_rate = parseInt(value) || 0;
            if (!value || row.daily_rate <= 0) errors.push("Valid daily rate is required");
            break;
          case "seats":
          case "security_deposit":
          case "insurance_excess":
          case "doors":
          case "excess_mileage_rate":
          case "minimum_rental_days":
            row[header] = value ? parseInt(value) : undefined;
            break;
          case "limited_availability":
          case "is_active":
          case "featured":
            row[header] = value.toLowerCase() === "true";
            break;
          case "features":
            row.features = value ? value.split(",").map((f) => f.trim()) : [];
            break;
          default:
            row[header] = value || undefined;
        }
      });

      row.errors = errors;
      rows.push(row as VehicleRow);
    }

    return rows;
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const data = parseCSV(text);
      setParsedData(data);
      setImportComplete(false);
    };
    reader.readAsText(file);
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleImport = async () => {
    const validRows = parsedData.filter((row) => !row.errors?.length);
    if (validRows.length === 0) {
      toast.error("No valid rows to import");
      return;
    }

    setIsImporting(true);

    try {
      const vehiclesToInsert = validRows.map((row) => {
        const slug = generateSlug(row.name);
        return {
          id: slug,
          slug,
          name: row.name,
          category: row.category,
          daily_rate: row.daily_rate,
          description: row.description || null,
          engine: row.engine || null,
          transmission: row.transmission || null,
          seats: row.seats || null,
          fuel_type: row.fuel_type || null,
          drive_type: row.drive_type || null,
          luggage_capacity: row.luggage_capacity || null,
          mileage_limit: row.mileage_limit || null,
          security_deposit: row.security_deposit || null,
          insurance_excess: row.insurance_excess || null,
          why_we_chose: row.why_we_chose || null,
          features: row.features || [],
          limited_availability: row.limited_availability ?? false,
          is_active: row.is_active ?? true,
          featured: row.featured ?? false,
          image: "/placeholder.svg",
          gallery_urls: [],
          video_urls: [],
          acceleration: row.acceleration || null,
          top_speed: row.top_speed || null,
          doors: row.doors || null,
          excess_mileage_rate: row.excess_mileage_rate || null,
          minimum_rental_days: row.minimum_rental_days || 1,
        };
      });

      const { error } = await supabase.from("vehicles").insert(vehiclesToInsert);

      if (error) throw error;

      toast.success(`Successfully imported ${validRows.length} vehicles`);
      setImportComplete(true);
    } catch (error: any) {
      console.error("Import error:", error);
      toast.error(error.message || "Failed to import vehicles");
    } finally {
      setIsImporting(false);
    }
  };

  const validCount = parsedData.filter((row) => !row.errors?.length).length;
  const errorCount = parsedData.filter((row) => row.errors?.length).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/admin/fleet")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-serif">Bulk Import Vehicles</h1>
            <p className="text-muted-foreground">Upload a CSV file to add multiple vehicles at once</p>
          </div>
        </div>
      </div>

      {/* Step 1: Download Template */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Step 1: Download Template</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Download the CSV template, fill in your vehicle data in Excel or Google Sheets, then save as CSV.
          </p>
          <Button variant="outline" onClick={downloadTemplate}>
            <Download className="h-4 w-4 mr-2" />
            Download CSV Template
          </Button>
        </CardContent>
      </Card>

      {/* Step 2: Upload CSV */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Step 2: Upload Your CSV</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-4 w-4 mr-2" />
            Choose CSV File
          </Button>
        </CardContent>
      </Card>

      {/* Step 3: Preview & Import */}
      {parsedData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Step 3: Review & Import</span>
              <div className="flex gap-2">
                {validCount > 0 && (
                  <Badge variant="default" className="bg-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {validCount} valid
                  </Badge>
                )}
                {errorCount > 0 && (
                  <Badge variant="destructive">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errorCount} with errors
                  </Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <div className="max-h-96 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky top-0 bg-background">Status</TableHead>
                      <TableHead className="sticky top-0 bg-background">Name</TableHead>
                      <TableHead className="sticky top-0 bg-background">Category</TableHead>
                      <TableHead className="sticky top-0 bg-background">Daily Rate</TableHead>
                      <TableHead className="sticky top-0 bg-background">Issues</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parsedData.map((row, index) => (
                      <TableRow key={index} className={row.errors?.length ? "bg-destructive/5" : ""}>
                        <TableCell>
                          {row.errors?.length ? (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{row.name || "-"}</TableCell>
                        <TableCell>{row.category || "-"}</TableCell>
                        <TableCell>R{row.daily_rate?.toLocaleString() || "-"}</TableCell>
                        <TableCell className="text-destructive text-sm">
                          {row.errors?.join(", ")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {importComplete ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span>Import complete! You can now add images to each vehicle.</span>
              </div>
            ) : (
              <Button onClick={handleImport} disabled={validCount === 0 || isImporting}>
                {isImporting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Import {validCount} Vehicles
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminBulkImport;
