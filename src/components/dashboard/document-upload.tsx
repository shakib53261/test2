"use client";

import { useState } from "react";
import { createClient } from "../../../supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Upload, X } from "lucide-react";

interface DocumentUploadProps {
  clientId: string;
  onUploadComplete: () => void;
}

export default function DocumentUpload({
  clientId,
  onUploadComplete,
}: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const clearSelectedFile = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Upload file to storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `client-documents/${clientId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create record in client_documents table
      const { error: dbError } = await supabase
        .from("client_documents")
        .insert({
          client_id: clientId,
          name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          uploaded_by: user?.id,
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      // Clear form and notify parent
      setFile(null);
      onUploadComplete();
    } catch (error: any) {
      console.error("Error uploading document:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload document",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="document">Select Document</Label>
        <div className="flex items-center gap-2">
          <Input
            id="document"
            type="file"
            onChange={handleFileChange}
            className="flex-1"
            disabled={uploading}
          />
          {file && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSelectedFile}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {file && (
        <div className="text-sm text-muted-foreground">
          <p>File: {file.name}</p>
          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>Type: {file.type || "Unknown"}</p>
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        {uploading ? "Uploading..." : "Upload Document"}
      </Button>
    </div>
  );
}
