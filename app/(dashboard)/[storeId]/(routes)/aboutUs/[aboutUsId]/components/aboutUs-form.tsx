"use client"

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import { AboutUs} from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  phoneNo: z.string().min(1),
  address: z.string().min(1),
  ourMembersUrl: z.string().min(1),
});

type AboutUsFormValues = z.infer<typeof formSchema>;

interface AboutUsFormProps {
  initialData: AboutUs | null;
}

export const AboutUsForm: React.FC<AboutUsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit AboutUs" : "Create AboutUs";
  const description = initialData ? "Edit an AboutUs." : "Add a new AboutUs";
  const toastMessage = initialData ? "AboutUs updated." : "AboutUs created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues: AboutUsFormValues = initialData
  ? {
      phoneNo: initialData.phoneNo || "",
      address: initialData.address || "",
      ourMembersUrl: initialData.ourMembersUrl || "",
    }
  : {
      phoneNo: "",
      address: "",
      ourMembersUrl: "",
    };

const form = useForm<AboutUsFormValues>({
  resolver: zodResolver(formSchema),
  defaultValues,
});


  const onSubmit = async (data: AboutUsFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/aboutUs/${params.aboutUsId}`, data);
      } else {
        await axios.post(`/api/${params.storeId}/aboutUs`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/aboutUs`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/aboutUs/${params.aboutUsId}`);
      router.refresh();
      router.push(`/${params.storeId}/aboutUs`);
      toast.success("AboutUs deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all AboutUs first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
    <AlertModal
      isOpen={open}
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
    <div className="flex items-center justify-between">
      <Heading title={title} description={description} />
      {initialData && (
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      )}
    </div>
    <Separator />
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PhoneNo</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="phoneNo name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Address name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ourMembersUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ourMembersUrl image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={loading} className="ml-auto" type="submit">
          {action}
        </Button>
      </form>
    </Form>
  </>
);
};